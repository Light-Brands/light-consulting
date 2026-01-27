/**
 * Fixed Cost Modal Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui';
import type { FixedCost, FixedCostCategory } from '@/types/financials';
import { formatCurrency } from '@/types/financials';

interface FixedCostModalProps {
  onClose: () => void;
  onSave: (data: {
    name: string;
    description: string | null;
    category: FixedCostCategory;
    total_amount: number;
    start_date: string;
    end_date: string;
    notes: string | null;
  }) => Promise<void>;
  editData?: FixedCost | null;
}

const categories: Array<{ value: FixedCostCategory; label: string }> = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'loan', label: 'Loan' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'legal', label: 'Legal' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'other', label: 'Other' },
];

export const FixedCostModal: React.FC<FixedCostModalProps> = ({
  onClose,
  onSave,
  editData,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FixedCostCategory>('marketing');
  const [totalAmount, setTotalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setDescription(editData.description || '');
      setCategory(editData.category);
      setTotalAmount(editData.total_amount.toString());
      setStartDate(editData.start_date);
      setEndDate(editData.end_date);
      setNotes(editData.notes || '');
    } else {
      // Default to current month start for new entries
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      setStartDate(firstDay.toISOString().split('T')[0]);
    }
  }, [editData]);

  const { monthlyAmount, totalMonths } = useMemo(() => {
    if (!startDate || !endDate || !totalAmount) {
      return { monthlyAmount: 0, totalMonths: 0 };
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = Math.max(1, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1);
    return {
      monthlyAmount: parseFloat(totalAmount) / months,
      totalMonths: months,
    };
  }, [startDate, endDate, totalAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name) {
      setError('Name is required');
      return;
    }
    if (!totalAmount || parseFloat(totalAmount) <= 0) {
      setError('Valid total amount is required');
      return;
    }
    if (!startDate || !endDate) {
      setError('Start and end dates are required');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError('End date must be after start date');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        name,
        description: description || null,
        category,
        total_amount: parseFloat(totalAmount),
        start_date: startDate,
        end_date: endDate,
        notes: notes || null,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save fixed cost');
    } finally {
      setIsSaving(false);
    }
  };

  // Quick duration presets
  const setDuration = (months: number) => {
    if (!startDate) return;
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + months - 1);
    // Set to end of that month
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    setEndDate(end.toISOString().split('T')[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {editData ? 'Edit Fixed Cost' : 'Add Fixed Cost'}
            </h3>
            <p className="text-sm text-text-muted">
              {editData ? 'Update fixed cost details' : 'Add a time-bound expense'}
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
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Marketing Ad Campaign"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this cost"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FixedCostCategory)}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Total Amount ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="5000.00"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                End Date *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Quick duration buttons */}
          <div className="flex gap-2">
            <span className="text-xs text-text-muted py-1">Quick:</span>
            {[3, 4, 6, 12].map((months) => (
              <button
                key={months}
                type="button"
                onClick={() => setDuration(months)}
                className="px-3 py-1 text-xs bg-depth-base border border-depth-border rounded-lg text-text-muted hover:text-radiance-gold hover:border-radiance-gold/50 transition-colors"
              >
                {months} mo
              </button>
            ))}
          </div>

          {/* Computed monthly cost display */}
          {totalAmount && startDate && endDate && (
            <div className="bg-depth-base border border-depth-border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">Monthly Cost</span>
                <span className="text-lg font-semibold text-pink-400">
                  {formatCurrency(monthlyAmount)}/mo
                </span>
              </div>
              <p className="text-xs text-text-muted">
                {formatCurrency(parseFloat(totalAmount))} over {totalMonths} month{totalMonths !== 1 ? 's' : ''}
              </p>
            </div>
          )}

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
              {isSaving ? 'Saving...' : editData ? 'Update' : 'Add Fixed Cost'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FixedCostModal;
