/**
 * Fixed Cost Section Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import type { FixedCost, FixedCostCategory } from '@/types/financials';
import { getFixedCostCategoryConfig, formatCurrency, formatDate, getRemainingMonths, getTotalMonths } from '@/types/financials';
import { FixedCostModal } from './FixedCostModal';

interface FixedCostSectionProps {
  fixedCosts: FixedCost[];
  onAdd: (data: {
    name: string;
    description: string | null;
    category: FixedCostCategory;
    total_amount: number;
    start_date: string;
    end_date: string;
    notes: string | null;
  }) => Promise<void>;
  onUpdate: (id: string, data: {
    name: string;
    description: string | null;
    category: FixedCostCategory;
    total_amount: number;
    start_date: string;
    end_date: string;
    notes: string | null;
  }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const FixedCostSection: React.FC<FixedCostSectionProps> = ({
  fixedCosts,
  onAdd,
  onUpdate,
  onDelete,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingCost, setEditingCost] = useState<FixedCost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter to only show currently active costs (within date range)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeCosts = fixedCosts.filter(cost => {
    const start = new Date(cost.start_date);
    const end = new Date(cost.end_date);
    return start <= today && end >= today;
  });

  const completedCosts = fixedCosts.filter(cost => {
    const end = new Date(cost.end_date);
    return end < today;
  });

  const upcomingCosts = fixedCosts.filter(cost => {
    const start = new Date(cost.start_date);
    return start > today;
  });

  const activeTotal = activeCosts.reduce((sum, c) => sum + Number(c.monthly_amount), 0);

  const handleEdit = (cost: FixedCost) => {
    setEditingCost(cost);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCost(null);
    setShowModal(true);
  };

  const handleSave = async (data: {
    name: string;
    description: string | null;
    category: FixedCostCategory;
    total_amount: number;
    start_date: string;
    end_date: string;
    notes: string | null;
  }) => {
    if (editingCost) {
      await onUpdate(editingCost.id, data);
    } else {
      await onAdd(data);
    }
    setShowModal(false);
    setEditingCost(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const renderCostItem = (cost: FixedCost, isCompleted = false) => {
    const categoryConfig = getFixedCostCategoryConfig(cost.category);
    const remaining = getRemainingMonths(cost);
    const total = getTotalMonths(cost);

    return (
      <div
        key={cost.id}
        className={`bg-depth-base border border-depth-border rounded-lg p-4 ${isCompleted ? 'opacity-60' : ''}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-text-primary truncate">
                {cost.name}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${categoryConfig.bgColor} ${categoryConfig.color}`}>
                {categoryConfig.label}
              </span>
            </div>
            {cost.description && (
              <p className="text-sm text-text-muted mb-2">{cost.description}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
              <span>
                {formatDate(cost.start_date)} - {formatDate(cost.end_date)}
              </span>
              <span>
                Total: {formatCurrency(cost.total_amount)}
              </span>
              {!isCompleted && (
                <span className="text-amber-400">
                  {remaining} of {total} months remaining
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="font-semibold text-text-primary whitespace-nowrap block">
                {formatCurrency(cost.monthly_amount)}/mo
              </span>
              {!isCompleted && (
                <span className="text-xs text-text-muted">
                  {formatCurrency(cost.monthly_amount * remaining)} left
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(cost)}
                className="p-2 text-text-muted hover:text-radiance-gold rounded-lg transition-colors"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(cost.id)}
                disabled={deletingId === cost.id}
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
      </div>
    );
  };

  return (
    <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Fixed Costs</h2>
          <p className="text-sm text-text-muted">Time-bound expenses like campaigns, loans, and commitments</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleAdd}>
          Add Fixed Cost
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-depth-base rounded-lg animate-pulse" />
          ))}
        </div>
      ) : fixedCosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted mb-4">No fixed costs added yet</p>
          <Button variant="ghost" onClick={handleAdd}>
            Add your first fixed cost
          </Button>
        </div>
      ) : (
        <>
          {/* Active Fixed Costs */}
          {activeCosts.length > 0 && (
            <div className="space-y-3 mb-4">
              {activeCosts.map((cost) => renderCostItem(cost))}
            </div>
          )}

          {/* Upcoming Fixed Costs */}
          {upcomingCosts.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-text-muted uppercase tracking-wide mb-2">Upcoming</p>
              <div className="space-y-3">
                {upcomingCosts.map((cost) => renderCostItem(cost))}
              </div>
            </div>
          )}

          {/* Completed Fixed Costs */}
          {completedCosts.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-text-muted uppercase tracking-wide mb-2">Completed</p>
              <div className="space-y-3">
                {completedCosts.map((cost) => renderCostItem(cost, true))}
              </div>
            </div>
          )}

          {/* Section total */}
          <div className="mt-4 pt-4 border-t border-depth-border flex justify-between items-center">
            <span className="text-text-muted">Active Monthly ({activeCosts.length})</span>
            <span className="text-lg font-semibold text-pink-400">
              {formatCurrency(activeTotal)}/mo
            </span>
          </div>
        </>
      )}

      {showModal && (
        <FixedCostModal
          onClose={() => {
            setShowModal(false);
            setEditingCost(null);
          }}
          onSave={handleSave}
          editData={editingCost}
        />
      )}
    </div>
  );
};

export default FixedCostSection;
