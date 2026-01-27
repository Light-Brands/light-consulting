/**
 * Team Overhead Section Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import type { TeamOverhead, CostType } from '@/types/financials';
import { getCostTypeConfig, formatCurrency } from '@/types/financials';
import { TeamOverheadModal } from './TeamOverheadModal';

interface TeamOverheadSectionProps {
  team: TeamOverhead[];
  onAdd: (data: {
    name: string;
    role: string | null;
    monthly_cost: number;
    cost_type: CostType;
    notes: string | null;
  }) => Promise<void>;
  onUpdate: (id: string, data: {
    name: string;
    role: string | null;
    monthly_cost: number;
    cost_type: CostType;
    notes: string | null;
  }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const TeamOverheadSection: React.FC<TeamOverheadSectionProps> = ({
  team,
  onAdd,
  onUpdate,
  onDelete,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamOverhead | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const total = team.reduce((sum, t) => sum + Number(t.monthly_cost), 0);

  const handleEdit = (member: TeamOverhead) => {
    setEditingMember(member);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingMember(null);
    setShowModal(true);
  };

  const handleSave = async (data: {
    name: string;
    role: string | null;
    monthly_cost: number;
    cost_type: CostType;
    notes: string | null;
  }) => {
    if (editingMember) {
      await onUpdate(editingMember.id, data);
    } else {
      await onAdd(data);
    }
    setShowModal(false);
    setEditingMember(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Team Overhead</h2>
          <p className="text-sm text-text-muted">Salaries, contractors, and stipends</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleAdd}>
          Add Member
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 bg-depth-base rounded-lg animate-pulse" />
          ))}
        </div>
      ) : team.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted mb-4">No team costs added yet</p>
          <Button variant="ghost" onClick={handleAdd}>
            Add your first team member
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {team.map((member) => {
              const costTypeConfig = getCostTypeConfig(member.cost_type);
              return (
                <div
                  key={member.id}
                  className="bg-depth-base border border-depth-border rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-text-primary truncate">
                        {member.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${costTypeConfig.bgColor} ${costTypeConfig.color}`}>
                        {costTypeConfig.label}
                      </span>
                    </div>
                    {member.role && (
                      <div className="text-sm text-text-muted">
                        {member.role}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-text-primary whitespace-nowrap">
                      {formatCurrency(member.monthly_cost)}/mo
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(member)}
                        className="p-2 text-text-muted hover:text-radiance-gold rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        disabled={deletingId === member.id}
                        className="p-2 text-text-muted hover:text-red-400 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section total */}
          <div className="mt-4 pt-4 border-t border-depth-border flex justify-between items-center">
            <span className="text-text-muted">Total Team ({team.length})</span>
            <span className="text-lg font-semibold text-radiance-gold">
              {formatCurrency(total)}/mo
            </span>
          </div>
        </>
      )}

      {showModal && (
        <TeamOverheadModal
          onClose={() => {
            setShowModal(false);
            setEditingMember(null);
          }}
          onSave={handleSave}
          editData={editingMember}
        />
      )}
    </div>
  );
};

export default TeamOverheadSection;
