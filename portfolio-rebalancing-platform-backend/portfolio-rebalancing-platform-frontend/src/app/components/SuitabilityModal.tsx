import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';
import type { SuitabilityResult } from '../../data/mockData';

interface SuitabilityModalProps {
  result: SuitabilityResult;
  onClose: () => void;
  onConfirm: () => void;
}

export function SuitabilityModal({ result, onClose, onConfirm }: SuitabilityModalProps) {
  const [acknowledgedWarnings, setAcknowledgedWarnings] = useState<Set<string>>(new Set());

  const criticalViolations = result.violations.filter(v => v.severity === 'Critical');
  const warnings = result.violations.filter(v => v.severity === 'Warning');

  const canProceed = criticalViolations.length === 0 &&
    (warnings.length === 0 || warnings.every(w => acknowledgedWarnings.has(w.ruleId)));

  const handleWarningAcknowledge = (ruleId: string) => {
    setAcknowledgedWarnings(prev => {
      const next = new Set(prev);
      if (next.has(ruleId)) {
        next.delete(ruleId);
      } else {
        next.add(ruleId);
      }
      return next;
    });
  };

  const getOverallBanner = () => {
    if (result.overall === 'Pass') {
      return {
        bg: '#dcfce7',
        color: '#166534',
        icon: CheckCircle,
        text: 'Suitability Check Passed'
      };
    } else if (result.overall === 'Pass with Warnings') {
      return {
        bg: '#fef3c7',
        color: '#92400e',
        icon: AlertTriangle,
        text: 'Suitability Check Passed with Warnings'
      };
    } else {
      return {
        bg: '#fee2e2',
        color: '#991b1b',
        icon: XCircle,
        text: 'Suitability Check Failed'
      };
    }
  };

  const banner = getOverallBanner();
  const Icon = banner.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div
        className="w-full max-w-2xl rounded-lg shadow-xl max-h-[90vh] flex flex-col"
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-xl font-medium" style={{ color: 'var(--color-foreground)' }}>
            Suitability Validation Report
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-opacity-10"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overall Result Banner */}
          <div className="p-4 rounded-lg mb-6 flex items-center gap-3" style={{ backgroundColor: banner.bg, color: banner.color }}>
            <Icon className="size-6 flex-shrink-0" />
            <div>
              <p className="font-medium">{banner.text}</p>
              <p className="text-sm mt-1">
                {result.overall === 'Pass' && 'The proposed allocation meets all suitability requirements.'}
                {result.overall === 'Pass with Warnings' && 'The proposal has warnings that require acknowledgment before submission.'}
                {result.overall === 'Fail' && 'The proposal has critical violations that must be resolved before submission.'}
              </p>
            </div>
          </div>

          {/* Critical Violations */}
          {criticalViolations.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2" style={{ color: '#991b1b' }}>
                <XCircle className="size-5" />
                Critical Violations ({criticalViolations.length})
              </h3>
              <div className="space-y-3">
                {criticalViolations.map((violation, index) => (
                  <div
                    key={violation.ruleId}
                    className="p-4 rounded-lg border"
                    style={{ borderColor: '#fca5a5', backgroundColor: '#fee2e2' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 size-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#991b1b' }}>
                        <span className="text-xs font-medium" style={{ color: '#ffffff' }}>{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1" style={{ color: '#7f1d1d' }}>
                          Rule ID: {violation.ruleId}
                        </p>
                        <p className="text-sm" style={{ color: '#991b1b' }}>
                          {violation.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                You must modify the allocation to resolve these critical violations before submitting the proposal.
              </p>
            </div>
          )}

          {/* Warnings */}
          {warnings.length > 0 && (
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2" style={{ color: '#92400e' }}>
                <AlertTriangle className="size-5" />
                Warnings ({warnings.length})
              </h3>
              <div className="space-y-3">
                {warnings.map((violation, index) => (
                  <div
                    key={violation.ruleId}
                    className="p-4 rounded-lg border"
                    style={{ borderColor: '#fcd34d', backgroundColor: '#fef3c7' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 size-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92400e' }}>
                        <span className="text-xs font-medium" style={{ color: '#ffffff' }}>{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1" style={{ color: '#78350f' }}>
                          Rule ID: {violation.ruleId}
                        </p>
                        <p className="text-sm mb-3" style={{ color: '#92400e' }}>
                          {violation.description}
                        </p>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={acknowledgedWarnings.has(violation.ruleId)}
                            onChange={() => handleWarningAcknowledge(violation.ruleId)}
                            className="size-4 rounded"
                          />
                          <span className="text-sm font-medium" style={{ color: '#78350f' }}>
                            I acknowledge this warning and accept the risk
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                You must acknowledge all warnings before submitting the proposal.
              </p>
            </div>
          )}

          {/* Success - No Violations */}
          {result.violations.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="size-16 mx-auto mb-4" style={{ color: '#166534' }} />
              <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                All Clear!
              </p>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                The proposed allocation passes all suitability requirements and is ready for submission.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-card)',
              color: 'var(--color-foreground)'
            }}
          >
            {criticalViolations.length > 0 ? 'Back to Edit' : 'Cancel'}
          </button>
          {canProceed && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)'
              }}
            >
              Submit for Compliance Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
