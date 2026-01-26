/**
 * Deliverable Modal Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { StatusSelector } from './StatusSelector';
import { PrioritySelector } from './PrioritySelector';
import { UserAssignmentDropdown } from './UserAssignmentDropdown';
import type {
  DeliverableWithAssignee,
  DeliverableInsert,
  DeliverableUpdate,
  DeliverableStatus,
  DeliverablePriority,
  DeliverableInlineLink,
} from '@/types/deliverables';

interface Phase {
  id: string;
  phase_name: string;
  phase_number: number;
}

interface Milestone {
  id: string;
  milestone_name: string;
}

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
}

interface DeliverableModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliverable?: DeliverableWithAssignee | null;
  proposalId: string;
  phases: Phase[];
  milestones: Milestone[];
  teamMembers: TeamMember[];
  onSave: (data: DeliverableInsert | DeliverableUpdate, id?: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export const DeliverableModal: React.FC<DeliverableModalProps> = ({
  isOpen,
  onClose,
  deliverable,
  proposalId,
  phases,
  milestones,
  teamMembers,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phaseId, setPhaseId] = useState<string | null>(null);
  const [milestoneId, setMilestoneId] = useState<string | null>(null);
  const [status, setStatus] = useState<DeliverableStatus>('pending');
  const [priority, setPriority] = useState<DeliverablePriority>('medium');
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [links, setLinks] = useState<DeliverableInlineLink[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditing = !!deliverable;

  useEffect(() => {
    if (deliverable) {
      setName(deliverable.name);
      setDescription(deliverable.description || '');
      setPhaseId(deliverable.phase_id);
      setMilestoneId(deliverable.milestone_id);
      setStatus(deliverable.status);
      setPriority(deliverable.priority);
      setAssignedTo(deliverable.assigned_to);
      setDueDate(deliverable.due_date?.split('T')[0] || '');
      setLinks(deliverable.links || []);
    } else {
      setName('');
      setDescription('');
      setPhaseId(null);
      setMilestoneId(null);
      setStatus('pending');
      setPriority('medium');
      setAssignedTo(null);
      setDueDate('');
      setLinks([]);
    }
  }, [deliverable, isOpen]);

  // Link management functions
  const addLink = () => {
    const newLink: DeliverableInlineLink = {
      id: crypto.randomUUID(),
      url: '',
      title: '',
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, field: 'url' | 'title', value: string) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      // Filter out empty links and clean up the data
      const validLinks = links
        .filter(link => link.url.trim())
        .map(link => ({
          id: link.id,
          url: link.url.trim(),
          title: link.title?.trim() || undefined,
        }));

      const data: DeliverableInsert | DeliverableUpdate = {
        name: name.trim(),
        description: description.trim() || null,
        phase_id: phaseId,
        milestone_id: milestoneId,
        status,
        priority,
        assigned_to: assignedTo,
        due_date: dueDate || null,
        links: validLinks.length > 0 ? validLinks : null,
      };

      if (!isEditing) {
        (data as DeliverableInsert).proposal_id = proposalId;
      }

      await onSave(data, deliverable?.id);
      onClose();
    } catch (error) {
      console.error('Error saving deliverable:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deliverable || !onDelete) return;

    if (!confirm('Are you sure you want to delete this deliverable?')) return;

    setIsDeleting(true);
    try {
      await onDelete(deliverable.id);
      onClose();
    } catch (error) {
      console.error('Error deleting deliverable:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {isEditing ? 'Edit Deliverable' : 'New Deliverable'}
            </h3>
            <p className="text-sm text-text-muted">
              {isEditing ? 'Update deliverable details' : 'Add a new work item'}
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

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What needs to be delivered?"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this deliverable..."
              rows={3}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none resize-none"
            />
          </div>

          {/* Phase & Milestone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phase
              </label>
              <select
                value={phaseId || ''}
                onChange={(e) => setPhaseId(e.target.value || null)}
                className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
              >
                <option value="">No phase</option>
                {phases.map((phase) => (
                  <option key={phase.id} value={phase.id}>
                    Phase {phase.phase_number}: {phase.phase_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Milestone
              </label>
              <select
                value={milestoneId || ''}
                onChange={(e) => setMilestoneId(e.target.value || null)}
                className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
              >
                <option value="">No milestone</option>
                {milestones.map((milestone) => (
                  <option key={milestone.id} value={milestone.id}>
                    {milestone.milestone_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <StatusSelector
                value={status}
                onChange={setStatus}
                excludeCancelled={false}
                size="md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Priority
              </label>
              <PrioritySelector
                value={priority}
                onChange={setPriority}
                size="md"
              />
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Assigned To
            </label>
            <UserAssignmentDropdown
              value={assignedTo}
              onChange={setAssignedTo}
              teamMembers={teamMembers}
              size="md"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
            />
          </div>

          {/* Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-text-primary">
                Links
              </label>
              <button
                type="button"
                onClick={addLink}
                className="flex items-center gap-1 text-xs text-radiance-gold hover:text-radiance-amber transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Link
              </button>
            </div>

            {links.length === 0 ? (
              <button
                type="button"
                onClick={addLink}
                className="w-full py-3 border border-dashed border-depth-border rounded-lg text-text-muted hover:text-text-primary hover:border-radiance-gold/50 transition-colors text-sm"
              >
                Click to add a link
              </button>
            ) : (
              <div className="space-y-3">
                {links.map((link, index) => (
                  <div key={link.id} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
                      />
                      <input
                        type="text"
                        value={link.title || ''}
                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                        placeholder="Link title (optional)"
                        className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLink(link.id)}
                      className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1"
                      title="Remove link"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-depth-border">
          <div>
            {isEditing && onDelete && (
              <Button
                variant="ghost"
                onClick={handleDelete}
                disabled={isDeleting || isSaving}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} disabled={isSaving || isDeleting}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving || isDeleting || !name.trim()}
            >
              {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverableModal;
