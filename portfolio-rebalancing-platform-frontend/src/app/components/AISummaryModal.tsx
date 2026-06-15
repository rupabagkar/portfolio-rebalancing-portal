import { useState } from 'react';
import { X, FileText, Download, Sparkles } from 'lucide-react';
import type { Client } from '../../data/mockData';

interface AISummaryModalProps {
  client: Client;
  proposal: {
    proposalId: string;
    allocations: Record<string, number>;
    notes: string;
    aiSummary?: string;
  };
  onClose: () => void;
}

export function AISummaryModal({ client, proposal, onClose }: AISummaryModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState(proposal.aiSummary || '');
  const [isEditing, setIsEditing] = useState(false);

  const generateSummary = () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const allocations = Object.entries(proposal.allocations)
        .map(([asset, pct]) => `${pct.toFixed(1)}% ${asset}`)
        .join(', ');

      const generatedSummary = `Dear ${client.fullName.split(' ')[0]},

Following our recent portfolio review, we recommend rebalancing your investment portfolio to better align with your ${client.riskProfile} risk profile and your stated goal of ${client.investmentGoals.toLowerCase()} over the next ${client.timeHorizon} years.

Current Proposed Allocation:
${Object.entries(proposal.allocations)
  .map(([asset, pct]) => `• ${asset}: ${pct.toFixed(1)}%`)
  .join('\n')}

${proposal.notes ? `\nRationale:\n${proposal.notes}\n` : ''}
This rebalancing strategy is designed to optimize your portfolio's risk-return profile while staying aligned with your long-term financial objectives. The proposed changes will help maintain appropriate diversification and manage market volatility exposure.

We recommend reviewing this proposal and reaching out if you have any questions about the recommended changes. We're here to ensure your portfolio continues to work toward your financial goals.

Best regards,
Your Wealth Advisory Team

---
Proposal ID: ${proposal.proposalId}
Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

      setSummary(generatedSummary);
      setIsGenerating(false);
    }, 2000);
  };

  const handleExportPDF = () => {
    // In a real app, this would generate a PDF
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proposal.proposalId}_Client_Summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div
        className="w-full max-w-4xl rounded-lg shadow-xl max-h-[90vh] flex flex-col"
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <FileText className="size-6" style={{ color: 'var(--color-primary)' }} />
            <div>
              <h2 className="text-xl font-medium" style={{ color: 'var(--color-foreground)' }}>
                AI-Generated Client Summary
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                {client.fullName} • {proposal.proposalId}
              </p>
            </div>
          </div>
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
          {!summary && !isGenerating && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="size-16 mb-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                Generate AI Client Summary
              </h3>
              <p className="text-sm mb-6 max-w-md" style={{ color: 'var(--color-muted-foreground)' }}>
                Create a plain-language summary of this rebalancing proposal that references the client's investment goals and explains the proposed changes in clear, client-friendly terms.
              </p>
              <button
                onClick={generateSummary}
                className="flex items-center gap-2 px-6 py-3 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)'
                }}
              >
                <Sparkles className="size-5" />
                Generate Summary
              </button>
            </div>
          )}

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="size-12 rounded-full border-4 border-t-transparent animate-spin mb-4" style={{ borderColor: 'var(--color-primary)' }} />
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                Generating AI summary... This may take up to 30 seconds.
              </p>
            </div>
          )}

          {summary && !isGenerating && (
            <div>
              {!isEditing && (
                <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>
                  <p className="text-sm font-medium">
                    AI-generated content. Review and edit as needed before sharing with the client.
                  </p>
                </div>
              )}

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                    Client Summary
                  </label>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm px-3 py-1 rounded-lg border"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    {isEditing ? 'Preview' : 'Edit'}
                  </button>
                </div>

                {isEditing ? (
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={20}
                    className="w-full px-4 py-3 rounded-lg border resize-none font-mono text-sm"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-input-background)',
                      color: 'var(--color-foreground)'
                    }}
                  />
                ) : (
                  <div
                    className="p-4 rounded-lg border whitespace-pre-wrap text-sm"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-muted)',
                      color: 'var(--color-foreground)'
                    }}
                  >
                    {summary}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            {summary && (
              <span>
                Generated at {new Date().toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-card)',
                color: 'var(--color-foreground)'
              }}
            >
              Close
            </button>
            {summary && (
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)'
                }}
              >
                <Download className="size-4" />
                Export as PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
