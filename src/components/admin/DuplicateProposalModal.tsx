/**
 * Duplicate Proposal Modal
 * Light Brand Consulting
 *
 * Modal for duplicating a proposal with optional client info changes
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';

interface DuplicateProposalModalProps {
  proposalId: string;
  originalProjectName: string;
  originalClientName: string;
  originalClientEmail: string;
  originalClientCompany: string | null;
  originalClientPhone: string | null;
  onClose: () => void;
  onDuplicate: (newProposalId: string) => void;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

export const DuplicateProposalModal: React.FC<DuplicateProposalModalProps> = ({
  proposalId,
  originalProjectName,
  originalClientName,
  originalClientEmail,
  originalClientCompany,
  originalClientPhone,
  onClose,
  onDuplicate,
  authFetch,
}) => {
  const [projectName, setProjectName] = useState(`Copy of ${originalProjectName}`);
  const [clientName, setClientName] = useState(originalClientName);
  const [clientEmail, setClientEmail] = useState(originalClientEmail);
  const [clientCompany, setClientCompany] = useState(originalClientCompany || '');
  const [clientPhone, setClientPhone] = useState(originalClientPhone || '');
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    setError(null);

    try {
      const response = await authFetch(`/api/proposals/${proposalId}/duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_name: projectName,
          client_name: clientName,
          client_email: clientEmail,
          client_company: clientCompany || null,
          client_phone: clientPhone || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to duplicate proposal');
      }

      onDuplicate(data.data.id);
    } catch (err) {
      console.error('Error duplicating proposal:', err);
      setError(err instanceof Error ? err.message : 'Failed to duplicate proposal');
    } finally {
      setIsDuplicating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Duplicate Proposal
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Create a copy with all phases, milestones, and settings
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:border-radiance-gold focus:outline-none transition-colors"
              placeholder="Project name"
            />
          </div>

          <div className="border-t border-depth-border pt-4 mt-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
              Client Information (Optional)
            </p>
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Client Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:border-radiance-gold focus:outline-none transition-colors"
              placeholder="Client name"
            />
          </div>

          {/* Client Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Client Email
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-3 py-2 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:border-radiance-gold focus:outline-none transition-colors"
              placeholder="client@example.com"
            />
          </div>

          {/* Client Company */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              className="w-full px-3 py-2 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:border-radiance-gold focus:outline-none transition-colors"
              placeholder="Company name (optional)"
            />
          </div>

          {/* Client Phone */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-3 py-2 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:border-radiance-gold focus:outline-none transition-colors"
              placeholder="Phone number (optional)"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-depth-border">
          <Button variant="ghost" onClick={onClose} disabled={isDuplicating}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleDuplicate}
            disabled={isDuplicating || !projectName || !clientName || !clientEmail}
          >
            {isDuplicating ? 'Duplicating...' : 'Duplicate Proposal'}
          </Button>
        </div>
      </div>
    </div>
  );
};
