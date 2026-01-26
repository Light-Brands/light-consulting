/**
 * Deliverable Link Form Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import type { DeliverableLinkType, DeliverableLinkInsert } from '@/types/deliverables';

interface DeliverableLinkFormProps {
  proposalId: string;
  initialData?: Partial<DeliverableLinkInsert>;
  onSave: (data: DeliverableLinkInsert) => Promise<void>;
  onCancel: () => void;
}

const LINK_TYPES: { value: DeliverableLinkType; label: string }[] = [
  { value: 'document', label: 'Document' },
  { value: 'design', label: 'Design' },
  { value: 'staging', label: 'Staging Site' },
  { value: 'production', label: 'Production' },
  { value: 'repository', label: 'Repository' },
  { value: 'video', label: 'Video' },
  { value: 'spreadsheet', label: 'Spreadsheet' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'prototype', label: 'Prototype' },
  { value: 'other', label: 'Other' },
];

export const DeliverableLinkForm: React.FC<DeliverableLinkFormProps> = ({
  proposalId,
  initialData,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [linkType, setLinkType] = useState<DeliverableLinkType>(initialData?.link_type || 'document');
  const [isClientVisible, setIsClientVisible] = useState(initialData?.is_client_visible ?? true);
  const [requiresPassword, setRequiresPassword] = useState(initialData?.requires_password ?? false);
  const [passwordHint, setPasswordHint] = useState(initialData?.password_hint || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !url) {
      setError('Title and URL are required');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        proposal_id: proposalId,
        title,
        url,
        description: description || null,
        link_type: linkType,
        is_client_visible: isClientVisible,
        requires_password: requiresPassword,
        password_hint: requiresPassword ? passwordHint : null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save link');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Figma Design Files"
          className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          URL *
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the resource"
          rows={2}
          className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Link Type
        </label>
        <select
          value={linkType}
          onChange={(e) => setLinkType(e.target.value as DeliverableLinkType)}
          className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
        >
          {LINK_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isClientVisible}
            onChange={(e) => setIsClientVisible(e.target.checked)}
            className="w-5 h-5 rounded border-depth-border bg-depth-base accent-radiance-gold"
          />
          <span className="text-sm text-text-primary">
            Visible to client in portal
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={requiresPassword}
            onChange={(e) => setRequiresPassword(e.target.checked)}
            className="w-5 h-5 rounded border-depth-border bg-depth-base accent-radiance-gold"
          />
          <span className="text-sm text-text-primary">
            Password protected
          </span>
        </label>

        {requiresPassword && (
          <input
            type="text"
            value={passwordHint}
            onChange={(e) => setPasswordHint(e.target.value)}
            placeholder="Password hint for client"
            className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
          />
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : initialData ? 'Update Link' : 'Add Link'}
        </Button>
      </div>
    </form>
  );
};

export default DeliverableLinkForm;
