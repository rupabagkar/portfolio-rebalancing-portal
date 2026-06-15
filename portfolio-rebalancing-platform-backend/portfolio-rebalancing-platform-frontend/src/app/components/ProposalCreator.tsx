import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Save, Send, AlertTriangle, CheckCircle, XCircle, FileText, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  mockClients,
  mockHoldings,
  mockProposals,
  mockComplianceRules,
  mockAdvisors,
  type SuitabilityResult,
  type Proposal
} from '../../data/mockData';
import { SuitabilityModal } from './SuitabilityModal';
import { AISummaryModal } from './AISummaryModal';

export function ProposalCreator() {
  const { clientId, proposalId } = useParams<{ clientId?: string; proposalId?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Find existing proposal or create new
  const existingProposal = proposalId ? mockProposals.find(p => p.proposalId === proposalId) : null;
  const targetClientId = clientId || existingProposal?.clientId;
  const client = mockClients.find(c => c.clientId === targetClientId);
  const holdings = mockHoldings.filter(h => h.clientId === targetClientId);

  // Get unique asset classes from holdings
  const assetClasses = useMemo(() => {
    return Array.from(new Set(holdings.map(h => h.assetClass)));
  }, [holdings]);

  // Initialize allocations
  const [allocations, setAllocations] = useState<Record<string, number>>(() => {
    if (existingProposal) {
      return existingProposal.allocations;
    }
    // Initialize with target allocations
    const initial: Record<string, number> = {};
    assetClasses.forEach(ac => {
      const totalTarget = holdings
        .filter(h => h.assetClass === ac)
        .reduce((sum, h) => sum + h.targetAllocationPct, 0);
      initial[ac] = totalTarget;
    });
    return initial;
  });

  const [notes, setNotes] = useState(existingProposal?.notes || '');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSuitabilityModal, setShowSuitabilityModal] = useState(false);
  const [showAISummaryModal, setShowAISummaryModal] = useState(false);
  const [suitabilityResult, setSuitabilityResult] = useState<SuitabilityResult | null>(existingProposal?.suitabilityResult || null);
  const [status, setStatus] = useState(existingProposal?.status || 'Draft');

  // Calculate total allocation
  const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const isValid = Math.abs(totalAllocation - 100) < 0.01;

  // Auto-save every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSaved(new Date());
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  // Calculate current allocations by asset class
  const currentAllocations = useMemo(() => {
    const current: Record<string, number> = {};
    assetClasses.forEach(ac => {
      const total = holdings
        .filter(h => h.assetClass === ac)
        .reduce((sum, h) => sum + h.currentAllocationPct, 0);
      current[ac] = total;
    });
    return current;
  }, [assetClasses, holdings]);

  // Calculate estimated value changes
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const valueChanges = useMemo(() => {
    const changes: Record<string, number> = {};
    assetClasses.forEach(ac => {
      const currentPct = currentAllocations[ac] || 0;
      const proposedPct = allocations[ac] || 0;
      const change = (proposedPct - currentPct) / 100 * totalValue;
      changes[ac] = change;
    });
    return changes;
  }, [assetClasses, currentAllocations, allocations, totalValue]);

  const handleAllocationChange = (assetClass: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAllocations(prev => ({
      ...prev,
      [assetClass]: numValue
    }));
  };

  const handleSave = () => {
    setLastSaved(new Date());
    // In a real app, this would save to backend
  };

  const validateSuitability = (): SuitabilityResult => {
    const violations: Array<{ ruleId: string; severity: 'Critical' | 'Warning'; description: string }> = [];

    if (!client) {
      return { overall: 'Fail', violations };
    }

    // Check compliance rules
    const relevantRules = mockComplianceRules.filter(
      rule => rule.isActive && rule.riskProfileTarget === client.riskProfile
    );

    relevantRules.forEach(rule => {
      const proposedAllocation = allocations[rule.assetClass] || 0;

      if (rule.operator === 'max' && proposedAllocation > rule.thresholdPct) {
        violations.push({
          ruleId: rule.ruleId,
          severity: rule.severity,
          description: `${rule.assetClass} allocation (${proposedAllocation.toFixed(1)}%) exceeds maximum of ${rule.thresholdPct}% for ${client.riskProfile} risk profile`
        });
      } else if (rule.operator === 'min' && proposedAllocation < rule.thresholdPct) {
        violations.push({
          ruleId: rule.ruleId,
          severity: rule.severity,
          description: `${rule.assetClass} allocation (${proposedAllocation.toFixed(1)}%) is below minimum of ${rule.thresholdPct}% for ${client.riskProfile} risk profile`
        });
      }
    });

    const hasCritical = violations.some(v => v.severity === 'Critical');
    const hasWarnings = violations.some(v => v.severity === 'Warning');

    return {
      overall: hasCritical ? 'Fail' : hasWarnings ? 'Pass with Warnings' : 'Pass',
      violations
    };
  };

  const handleSubmit = () => {
    const result = validateSuitability();
    setSuitabilityResult(result);
    setShowSuitabilityModal(true);
  };

  const handleSuitabilityConfirm = () => {
    setStatus('Compliance Review');
    setShowSuitabilityModal(false);
    // In real app, would save to backend
    // Navigate to dashboard with success message
    navigate('/dashboard', {
      state: {
        message: 'Proposal submitted for compliance review successfully',
        proposalId: proposalIdDisplay
      }
    });
  };

  const handleDiscard = () => {
    if (confirm('Are you sure you want to discard this proposal? This action cannot be undone.')) {
      navigate(`/portfolio/${targetClientId}`);
    }
  };

  const handleGenerateAISummary = () => {
    setShowAISummaryModal(true);
  };

  if (!client) {
    return (
      <div className="p-8">
        <div className="text-center" style={{ color: 'var(--color-muted-foreground)' }}>
          Client not found
        </div>
      </div>
    );
  }

  const proposalIdDisplay = existingProposal?.proposalId || `PROP-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-NEW`;
  const isEditable = status === 'Draft' || status === 'Rejected';
  const isApproved = status === 'Approved';

  return (
    <>
      <div className="p-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Back Navigation */}
          <button
            onClick={() => navigate(`/portfolio/${targetClientId}`)}
            className="flex items-center gap-2 mb-6 hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            <ArrowLeft className="size-4" />
            Back to Portfolio
          </button>

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                Rebalancing Proposal
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono" style={{ color: 'var(--color-muted-foreground)' }}>
                  {proposalIdDisplay}
                </span>
                <span style={{ color: 'var(--color-muted-foreground)' }}>•</span>
                <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                  {client.fullName}
                </span>
                <span style={{ color: 'var(--color-muted-foreground)' }}>•</span>
                <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                  Advisor: {user?.fullName || mockAdvisors[existingProposal?.advisorId || 'ADV-001']}
                </span>
                {lastSaved && (
                  <>
                    <span style={{ color: 'var(--color-muted-foreground)' }}>•</span>
                    <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                      Last saved at {lastSaved.toLocaleTimeString()}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {isEditable && (
                <>
                  <button
                    onClick={handleDiscard}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-card)',
                      color: 'var(--color-destructive)'
                    }}
                  >
                    <Trash2 className="size-4" />
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-card)',
                      color: 'var(--color-foreground)'
                    }}
                  >
                    <Save className="size-4" />
                    Save Draft
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: isValid ? 'var(--color-primary)' : 'var(--color-muted)',
                      color: isValid ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'
                    }}
                  >
                    <Send className="size-4" />
                    Submit for Review
                  </button>
                </>
              )}
              {isApproved && (
                <button
                  onClick={handleGenerateAISummary}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)'
                  }}
                >
                  <FileText className="size-4" />
                  Generate Client Summary
                </button>
              )}
            </div>
          </div>

          {/* Status Alert */}
          {!isValid && isEditable && (
            <div className="p-4 rounded-lg mb-6 flex items-center gap-3" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
              <AlertTriangle className="size-5" />
              <span className="text-sm font-medium">
                Total allocation must equal 100%. Current total: {totalAllocation.toFixed(2)}%
              </span>
            </div>
          )}

          {!isEditable && status !== 'Approved' && (
            <div className="p-4 rounded-lg mb-6 flex items-center gap-3" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
              <AlertTriangle className="size-5" />
              <span className="text-sm font-medium">
                This proposal is currently in {status} state and cannot be edited.
              </span>
            </div>
          )}

          {isApproved && (
            <div className="p-4 rounded-lg mb-6 flex items-center gap-3" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
              <CheckCircle className="size-5" />
              <span className="text-sm font-medium">
                This proposal has been approved and is ready for client communication.
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Allocation Editor */}
            <div>
              <div className="rounded-lg border p-6 mb-6" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <h3 className="font-medium mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Proposed Allocation
                </h3>

                <div className="space-y-4">
                  {assetClasses.map(assetClass => (
                    <div key={assetClass}>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                        {assetClass}
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={allocations[assetClass] || 0}
                          onChange={(e) => handleAllocationChange(assetClass, e.target.value)}
                          disabled={!isEditable}
                          className="flex-1"
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={allocations[assetClass] || 0}
                          onChange={(e) => handleAllocationChange(assetClass, e.target.value)}
                          disabled={!isEditable}
                          className="w-24 px-3 py-2 rounded-lg border text-right"
                          style={{
                            borderColor: 'var(--color-border)',
                            backgroundColor: isEditable ? 'var(--color-input-background)' : 'var(--color-muted)',
                            color: 'var(--color-foreground)'
                          }}
                        />
                        <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>Total Allocation</span>
                    <span
                      className="text-lg font-medium"
                      style={{ color: isValid ? 'var(--color-foreground)' : 'var(--color-destructive)' }}
                    >
                      {totalAllocation.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <h3 className="font-medium mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Notes
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={!isEditable}
                  placeholder="Add notes about this rebalancing proposal..."
                  maxLength={2000}
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border resize-none"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: isEditable ? 'var(--color-input-background)' : 'var(--color-muted)',
                    color: 'var(--color-foreground)'
                  }}
                />
                <div className="mt-2 text-sm text-right" style={{ color: 'var(--color-muted-foreground)' }}>
                  {notes.length} / 2000 characters
                </div>
              </div>
            </div>

            {/* Right Column - Comparison Preview */}
            <div>
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <h3 className="font-medium mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Impact Analysis
                </h3>

                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-muted)' }}>
                      <th className="text-left px-3 py-2 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Asset Class</th>
                      <th className="text-right px-3 py-2 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Current</th>
                      <th className="text-right px-3 py-2 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Proposed</th>
                      <th className="text-right px-3 py-2 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetClasses.map(assetClass => {
                      const current = currentAllocations[assetClass] || 0;
                      const proposed = allocations[assetClass] || 0;
                      const change = valueChanges[assetClass] || 0;
                      const isIncrease = change > 0;

                      return (
                        <tr key={assetClass} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                          <td className="px-3 py-3 text-sm" style={{ color: 'var(--color-foreground)' }}>{assetClass}</td>
                          <td className="px-3 py-3 text-sm text-right" style={{ color: 'var(--color-muted-foreground)' }}>
                            {current.toFixed(1)}%
                          </td>
                          <td className="px-3 py-3 text-sm text-right font-medium" style={{ color: 'var(--color-foreground)' }}>
                            {proposed.toFixed(1)}%
                          </td>
                          <td className="px-3 py-3 text-sm text-right">
                            <span style={{ color: isIncrease ? '#166534' : '#991b1b' }}>
                              {isIncrease ? '+' : ''}{change < 0 ? '-' : ''}${Math.abs(change).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-muted)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Portfolio Value</span>
                    <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>
                      ${totalValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Client Risk Profile</span>
                    <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>
                      {client.riskProfile}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuitabilityModal && suitabilityResult && (
        <SuitabilityModal
          result={suitabilityResult}
          onClose={() => setShowSuitabilityModal(false)}
          onConfirm={handleSuitabilityConfirm}
        />
      )}

      {showAISummaryModal && (
        <AISummaryModal
          client={client}
          proposal={{
            proposalId: proposalIdDisplay,
            allocations,
            notes,
            aiSummary: existingProposal?.aiSummary
          }}
          onClose={() => setShowAISummaryModal(false)}
        />
      )}
    </>
  );
}
