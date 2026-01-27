/**
 * Team Overhead Modal Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { TeamOverhead, CostType } from '@/types/financials';

interface TeamMember {
  id: string;
  full_name: string | null;
  email: string;
  system_role: string;
}

interface TeamOverheadModalProps {
  onClose: () => void;
  onSave: (data: {
    name: string;
    role: string | null;
    monthly_cost: number;
    cost_type: CostType;
    notes: string | null;
  }) => Promise<void>;
  editData?: TeamOverhead | null;
}

const costTypes: Array<{ value: CostType; label: string }> = [
  { value: 'salary', label: 'Salary' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'stipend', label: 'Stipend' },
];

export const TeamOverheadModal: React.FC<TeamOverheadModalProps> = ({
  onClose,
  onSave,
  editData,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [monthlyCost, setMonthlyCost] = useState('');
  const [costType, setCostType] = useState<CostType>('salary');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Team member dropdown state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);

  const { authFetch } = useAuthFetch();

  // Fetch team members on mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await authFetch('/api/admin/team');
        const data = await response.json();
        if (data.data) {
          setTeamMembers(data.data);
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
      } finally {
        setIsLoadingTeam(false);
      }
    };

    fetchTeamMembers();
  }, [authFetch]);

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setRole(editData.role || '');
      setMonthlyCost(editData.monthly_cost.toString());
      setCostType(editData.cost_type);
      setNotes(editData.notes || '');
    }
  }, [editData]);

  // Handle team member selection
  const handleMemberSelect = (memberId: string) => {
    setSelectedMemberId(memberId);

    if (memberId) {
      const member = teamMembers.find(m => m.id === memberId);
      if (member) {
        setName(member.full_name || member.email);
        // Set role based on system_role
        const roleLabel = member.system_role === 'admin' ? 'Admin' : 'Team Member';
        setRole(roleLabel);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name) {
      setError('Name is required');
      return;
    }
    if (!monthlyCost || parseFloat(monthlyCost) < 0) {
      setError('Valid monthly cost is required');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        name,
        role: role || null,
        monthly_cost: parseFloat(monthlyCost),
        cost_type: costType,
        notes: notes || null,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save team member');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {editData ? 'Edit Team Member' : 'Add Team Member'}
            </h3>
            <p className="text-sm text-text-muted">
              {editData ? 'Update team member details' : 'Track a team member cost'}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick select from team */}
          {!editData && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Quick Select from Team
              </label>
              <select
                value={selectedMemberId}
                onChange={(e) => handleMemberSelect(e.target.value)}
                disabled={isLoadingTeam}
                className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none disabled:opacity-50"
              >
                <option value="">
                  {isLoadingTeam ? 'Loading team...' : '-- Select a team member --'}
                </option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.full_name || member.email}
                    {member.system_role === 'admin' ? ' (Admin)' : ''}
                  </option>
                ))}
              </select>
              <p className="text-xs text-text-muted mt-1">
                Or enter details manually below
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., John Smith"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Developer"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Cost Type *
            </label>
            <select
              value={costType}
              onChange={(e) => setCostType(e.target.value as CostType)}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
            >
              {costTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Monthly Cost ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={monthlyCost}
              onChange={(e) => setMonthlyCost(e.target.value)}
              placeholder="0.00"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none resize-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : editData ? 'Update' : 'Add Member'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamOverheadModal;
