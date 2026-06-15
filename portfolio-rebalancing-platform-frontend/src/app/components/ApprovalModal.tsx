import React, { useState } from 'react';
import { CheckCircle, X, Loader2 } from 'lucide-react';

interface ApprovalModalProps {
  proposalId: string;
  clientName: string;
  onClose: () => void;
}

export function ApprovalModal({ proposalId, clientName, onClose }: ApprovalModalProps) {
  const [isProcessing, setIsProcessing] = useState(true);

  // Simulate processing
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div
        className="w-full max-w-md border shadow-xl"
        style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      >
        {isProcessing ? (
          // Processing state
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center size-16 mb-4" style={{ backgroundColor: 'var(--color-muted)' }}>
              <Loader2 className="size-8 animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className="text-lg mb-2" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}>
              Processing Approval
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Please wait while we process your approval...
            </p>
          </div>
        ) : (
          // Success state
          <>
            <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}>
                  Proposal Approved
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-muted-foreground)' }}
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center justify-center size-16 mb-4" style={{ backgroundColor: '#E3F2ED' }}>
                  <CheckCircle className="size-10" style={{ color: 'var(--color-secondary)' }} />
                </div>
                <h3 className="text-lg mb-2" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}>
                  Approval Successful
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                  The rebalancing proposal has been approved and the advisor has been notified.
                </p>
              </div>

              <div className="p-4 border mb-6" style={{ backgroundColor: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>Proposal ID</p>
                    <p className="font-medium font-mono" style={{ color: 'var(--color-foreground)', fontFamily: 'monospace' }}>
                      {proposalId}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>Client</p>
                    <p className="font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                      {clientName}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>Status</p>
                    <p className="font-medium" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                      Approved
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
