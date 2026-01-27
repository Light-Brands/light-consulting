/**
 * Upcoming Team Section Component
 * Light Brand Consulting
 *
 * Displays team members with future start dates for OpEx projections
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import type { TeamOverhead, CostType } from '@/types/financials';
import { getCostTypeConfig, formatCurrency, formatDate } from '@/types/financials';
import { TeamOverheadModal } from './TeamOverheadModal';

interface UpcomingTeamSectionProps {
  team: TeamOverhead[];
  onAdd: (data: {
    name: string;
    role: string | null;
    monthly_cost: number;
    cost_type: CostType;
    notes: string | null;
    start_date: string | null;
  }) => Promise<void>;
  onUpdate: (id: string, data: {
    name: string;
    role: string | null;
    monthly_cost: number;
    cost_type: CostType;
    notes: string | null;
    start_date: string | null;
  }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const UpcomingTeamSection: React.FC<UpcomingTeamSectionProps> = ({
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
    start_date: string | null;
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

  // Sort by start date
  const sortedTeam = [...team].sort((a, b) => {
    if (!a.start_date || !b.start_date) return 0;
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });

  return (
    <div className="bg-depth-surface border border-amber-500/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-text-primary">Upcoming Team</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
              Projections
            </span>
          </div>
          <p className="text-sm text-text-muted">Planned hires for future OpEx</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleAdd}>
          Add Upcoming
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
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-text-muted mb-4">No upcoming hires scheduled</p>
          <Button variant="ghost" onClick={handleAdd}>
            Plan a new hire
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {sortedTeam.map((member) => {
              const costTypeConfig = getCostTypeConfig(member.cost_type);
              return (
                <div
                  key={member.id}
                  className="bg-depth-base border border-amber-500/10 rounded-lg p-4 flex items-center justify-between gap-4"
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
                    <div className="flex items-center gap-2 text-sm">
                      {member.role && (
                        <span className="text-text-muted">{member.role}</span>
                      )}
                      {member.role && member.start_date && (
                        <span className="text-text-muted">·</span>
                      )}
                      {member.start_date && (
                        <span className="text-amber-400 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Starts {formatDate(member.start_date)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-amber-400 whitespace-nowrap">
                      +{formatCurrency(member.monthly_cost)}/mo
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
          <div className="mt-4 pt-4 border-t border-amber-500/20 flex justify-between items-center">
            <span className="text-text-muted">Projected Addition ({team.length})</span>
            <span className="text-lg font-semibold text-amber-400">
              +{formatCurrency(total)}/mo
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
          defaultUpcoming={!editingMember}
        />
      )}
    </div>
  );
};

export default UpcomingTeamSection;
