import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface RejectionModalProps {
  proposalId: string;
  clientName: string;
  comment: string;
  onClose: () => void;
}

export function RejectionModal({ proposalId, clientName, comment, onClose }: RejectionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div
        className="w-full max-w-md border shadow-xl"
        style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}>
              Proposal Rejected
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
            <div className="inline-flex items-center justify-center size-16 mb-4" style={{ backgroundColor: '#F5E6D3' }}>
              <AlertCircle className="size-10" style={{ color: '#8B4513' }} />
            </div>
            <h3 className="text-lg mb-2" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}>
              Rejection Confirmed
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
              The proposal has been rejected and returned to the advisor for revision.
            </p>
          </div>

          <div className="p-4 border mb-6" style={{ backgroundColor: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>
            <div className="mb-4">
              <p className="text-sm mb-2" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                Proposal ID
              </p>
              <p className="font-medium font-mono" style={{ color: 'var(--color-foreground)', fontFamily: 'monospace' }}>
                {proposalId}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm mb-2" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                Client
              </p>
              <p className="font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                {clientName}
              </p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                Rejection Reason
              </p>
              <p className="text-sm" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                {comment}
              </p>
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
      </div>
    </div>
  );
}
