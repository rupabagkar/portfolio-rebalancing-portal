import { useState } from 'react';
import { Link } from 'react-router';
import { CheckCircle, XCircle, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import { statusColors } from '../../utils/statusColors';
import { mockProposals, mockClients, mockAdvisors } from '../../data/mockData';
import { ApprovalModal } from './ApprovalModal';
import { RejectionModal } from './RejectionModal';

export function ComplianceReview() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Filter proposals based on active tab
  const filteredProposals = mockProposals.filter(proposal => {
    if (activeTab === 'pending') {
      return proposal.status === 'Compliance Review';
    } else {
      return proposal.status === 'Approved';
    }
  }).sort((a, b) => {
    const dateA = new Date(a.submittedAt || a.createdAt).getTime();
    const dateB = new Date(b.submittedAt || b.createdAt).getTime();
    return dateB - dateA;
  });

  const selectedProposalData = selectedProposal
    ? mockProposals.find(p => p.proposalId === selectedProposal)
    : null;

  const selectedClient = selectedProposalData
    ? mockClients.find(c => c.clientId === selectedProposalData.clientId)
    : null;

  const pendingCount = mockProposals.filter(p => p.status === 'Compliance Review').length;
  const approvedCount = mockProposals.filter(p => p.status === 'Approved').length;

  const handleApprove = () => {
    if (!selectedProposal) return;
    setShowApprovalModal(true);
  };

  const handleReject = () => {
    if (!selectedProposal) return;

    if (comment.length < 10) {
      alert('Rejection comment must be at least 10 characters.');
      return;
    }

    setShowRejectionModal(true);
  };

  const handleModalClose = () => {
    setShowApprovalModal(false);
    setShowRejectionModal(false);
    setComment('');
    setSelectedProposal(null);
    // Force re-render by updating refresh key
    setRefreshKey(prev => prev + 1);
  };

  const getStatusBadge = (status: string) => {
    const color = statusColors[status as keyof typeof statusColors] || statusColors.Draft;
    const Icon = status === 'Approved' ? CheckCircle : status === 'Rejected' ? XCircle : Clock;

    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium"
        style={{ backgroundColor: color.bg, color: color.text, fontFamily: 'var(--font-body)' }}
      >
        <Icon className="size-3" />
        {status}
      </span>
    );
  };

  const getSuitabilityBadge = (result?: { overall: string }) => {
    if (!result) return null;

    const color = statusColors[result.overall as keyof typeof statusColors];
    if (!color) return null;

    const Icon = result.overall === 'Pass' ? CheckCircle : result.overall === 'Fail' ? XCircle : AlertTriangle;

    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium"
        style={{ backgroundColor: color.bg, color: color.text, fontFamily: 'var(--font-body)' }}
      >
        <Icon className="size-3" />
        {result.overall}
      </span>
    );
  };

  return (
    <>
      <div className="p-8" style={{ fontFamily: 'var(--font-body)' }}>
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl mb-2" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}>
              Compliance Review
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Review and approve rebalancing proposals from financial advisors
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b mb-6" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setActiveTab('pending');
                  setSelectedProposal(null);
                  setComment('');
                }}
                className="px-6 py-3 border-b-4 transition-all"
                style={{
                  borderColor: activeTab === 'pending' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'pending' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  backgroundColor: activeTab === 'pending' ? 'rgba(17, 87, 64, 0.05)' : 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontWeight: activeTab === 'pending' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                }}
              >
                Proposals for Review
                {pendingCount > 0 && (
                  <span
                    className="ml-2 px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-foreground)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('approved');
                  setSelectedProposal(null);
                  setComment('');
                }}
                className="px-6 py-3 border-b-4 transition-all"
                style={{
                  borderColor: activeTab === 'approved' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'approved' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  backgroundColor: activeTab === 'approved' ? 'rgba(17, 87, 64, 0.05)' : 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontWeight: activeTab === 'approved' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                }}
              >
                Proposals Approved
                {approvedCount > 0 && (
                  <span
                    className="ml-2 px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-secondary-foreground)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {approvedCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Proposals List */}
            <div key={refreshKey}>
              <div className="border overflow-hidden shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-primary)' }}>
                  <h3 className="font-medium" style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-body)' }}>
                    {activeTab === 'pending' ? 'Proposals for Review' : 'Approved Proposals'} ({filteredProposals.length})
                  </h3>
                </div>

                <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                  {filteredProposals.map(proposal => {
                    const client = mockClients.find(c => c.clientId === proposal.clientId);
                    const advisorName = mockAdvisors[proposal.advisorId] || proposal.advisorId;
                    const isSelected = selectedProposal === proposal.proposalId;

                    return (
                      <button
                        key={proposal.proposalId}
                        onClick={() => setSelectedProposal(proposal.proposalId)}
                        className="w-full p-4 text-left transition-colors hover:bg-opacity-50"
                        style={{
                          backgroundColor: isSelected ? 'var(--color-muted)' : 'transparent'
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm mb-1" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                              {client?.fullName}
                            </p>
                            <p className="text-xs font-mono mb-1" style={{ color: 'var(--color-muted-foreground)' }}>
                              {proposal.proposalId}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                              Advisor: {advisorName}
                            </p>
                          </div>
                          {getStatusBadge(proposal.status)}
                        </div>

                        <div className="flex items-center gap-4 text-xs mb-2" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                          <span>
                            Submitted: {new Date(proposal.submittedAt || proposal.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {proposal.suitabilityResult && (
                          <div>
                            {getSuitabilityBadge(proposal.suitabilityResult)}
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {filteredProposals.length === 0 && (
                    <div className="p-16 text-center">
                      <div className="mb-3">
                        {activeTab === 'pending' ? (
                          <CheckCircle className="size-12 mx-auto" style={{ color: 'var(--color-muted-foreground)', opacity: 0.3 }} />
                        ) : (
                          <CheckCircle className="size-12 mx-auto" style={{ color: 'var(--color-secondary)', opacity: 0.3 }} />
                        )}
                      </div>
                      <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                        {activeTab === 'pending' ? 'No proposals pending review' : 'No approved proposals yet'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Proposal Detail */}
            <div key={`detail-${refreshKey}`}>
              {selectedProposalData && selectedClient ? (
                <div className="border shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                  <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-primary)' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium mb-1" style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-heading)' }}>
                          Proposal Details
                        </h3>
                        <p className="text-sm font-mono" style={{ color: 'var(--color-primary-foreground)', opacity: 0.8 }}>
                          {selectedProposalData.proposalId}
                        </p>
                      </div>
                      {getStatusBadge(selectedProposalData.status)}
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Client Info */}
                    <div>
                      <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                        Client Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="mb-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>Name</p>
                          <p className="font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>{selectedClient.fullName}</p>
                        </div>
                        <div>
                          <p className="mb-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>Risk Profile</p>
                          <p className="font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>{selectedClient.riskProfile}</p>
                        </div>
                        <div>
                          <p className="mb-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>Advisor</p>
                          <p className="font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                            {mockAdvisors[selectedProposalData.advisorId] || selectedProposalData.advisorId}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>Time Horizon</p>
                          <p className="font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>{selectedClient.timeHorizon} years</p>
                        </div>
                        <div className="col-span-2">
                          <p className="mb-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>Investment Goals</p>
                          <p className="text-sm" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>{selectedClient.investmentGoals}</p>
                        </div>
                      </div>
                    </div>

                    {/* Proposed Allocation */}
                    <div>
                      <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                        Proposed Allocation
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(selectedProposalData.allocations).map(([asset, pct]) => (
                          <div key={asset} className="flex items-center justify-between p-2" style={{ backgroundColor: 'var(--color-muted)' }}>
                            <span className="text-sm" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>{asset}</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>{pct.toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suitability Result */}
                    {selectedProposalData.suitabilityResult && (
                      <div>
                        <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                          Suitability Validation
                        </h4>
                        <div className="p-3 border" style={{ backgroundColor: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>Result</span>
                            {getSuitabilityBadge(selectedProposalData.suitabilityResult)}
                          </div>
                          {selectedProposalData.suitabilityResult.violations.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {selectedProposalData.suitabilityResult.violations.map((violation, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 text-xs"
                                  style={{
                                    backgroundColor: violation.severity === 'Critical' ? '#F5E6D3' : '#FFF4E5',
                                    color: violation.severity === 'Critical' ? '#8B4513' : '#8B6914',
                                    fontFamily: 'var(--font-body)'
                                  }}
                                >
                                  {violation.description}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {selectedProposalData.notes && (
                      <div>
                        <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                          Advisor Notes
                        </h4>
                        <div className="p-3 text-sm border" style={{ backgroundColor: 'var(--color-muted)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                          {selectedProposalData.notes}
                        </div>
                      </div>
                    )}

                    {/* Action Section - Only for pending proposals */}
                    {selectedProposalData.status === 'Compliance Review' && (
                      <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                        <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                          Compliance Action
                        </h4>

                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                            Comment <span style={{ color: '#8B4513' }}>*</span>
                          </label>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add your compliance review comment (required for rejection)..."
                            rows={4}
                            className="w-full px-3 py-2 border resize-none"
                            style={{
                              borderColor: 'var(--color-border)',
                              backgroundColor: 'var(--color-input-background)',
                              color: 'var(--color-foreground)',
                              fontFamily: 'var(--font-body)'
                            }}
                          />
                          <p className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                            {comment.length} characters (minimum 10 required for rejection)
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={handleReject}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border transition-opacity hover:opacity-80"
                            style={{
                              borderColor: '#8B4513',
                              backgroundColor: 'var(--color-card)',
                              color: '#8B4513',
                              fontFamily: 'var(--font-body)'
                            }}
                          >
                            <XCircle className="size-4" />
                            Reject Proposal
                          </button>
                          <button
                            onClick={handleApprove}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-opacity hover:opacity-90"
                            style={{
                              backgroundColor: 'var(--color-secondary)',
                              color: 'var(--color-secondary-foreground)',
                              fontFamily: 'var(--font-body)'
                            }}
                          >
                            <CheckCircle className="size-4" />
                            Approve Proposal
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Compliance Comment for approved/rejected */}
                    {selectedProposalData.complianceComment && (
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                          <MessageSquare className="size-4" />
                          Compliance Comment
                        </h4>
                        <div className="p-3 text-sm border" style={{ backgroundColor: 'var(--color-muted)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                          {selectedProposalData.complianceComment}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <Link
                        to={`/proposal/${selectedProposalData.proposalId}`}
                        className="text-sm transition-opacity hover:opacity-70"
                        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
                      >
                        View Full Proposal Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="border flex flex-col items-center justify-center shadow-sm"
                  style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)', minHeight: '500px' }}
                >
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="size-16 mx-auto flex items-center justify-center" style={{ backgroundColor: 'var(--color-muted)' }}>
                        <CheckCircle className="size-8" style={{ color: 'var(--color-muted-foreground)' }} />
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                      No Proposal Selected
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                      Select a proposal from the list to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showApprovalModal && selectedProposalData && selectedClient && (
        <ApprovalModal
          proposalId={selectedProposalData.proposalId}
          clientName={selectedClient.fullName}
          onClose={handleModalClose}
        />
      )}

      {showRejectionModal && selectedProposalData && selectedClient && (
        <RejectionModal
          proposalId={selectedProposalData.proposalId}
          clientName={selectedClient.fullName}
          comment={comment}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
