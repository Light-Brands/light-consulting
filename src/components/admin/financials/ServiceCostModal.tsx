/**
 * Service Cost Modal Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import type { ServiceCost, ServiceCategory, CATEGORY_CONFIGS } from '@/types/financials';

interface ServiceCostModalProps {
  onClose: () => void;
  onSave: (data: {
    name: string;
    vendor: string | null;
    category: ServiceCategory;
    unit_cost: number;
    unit_type: string;
    quantity: number;
    notes: string | null;
  }) => Promise<void>;
  editData?: ServiceCost | null;
}

const categories: Array<{ value: ServiceCategory; label: string }> = [
  { value: 'software', label: 'Software' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'ai_tools', label: 'AI Tools' },
  { value: 'development', label: 'Development' },
  { value: 'communication', label: 'Communication' },
  { value: 'other', label: 'Other' },
];

export const ServiceCostModal: React.FC<ServiceCostModalProps> = ({
  onClose,
  onSave,
  editData,
}) => {
  const [name, setName] = useState('');
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('software');
  const [unitCost, setUnitCost] = useState('');
  const [unitType, setUnitType] = useState('flat');
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setVendor(editData.vendor || '');
      setCategory(editData.category);
      setUnitCost(editData.unit_cost.toString());
      setUnitType(editData.unit_type);
      setQuantity(editData.quantity.toString());
      setNotes(editData.notes || '');
    }
  }, [editData]);

  const computedMonthly = (parseFloat(unitCost) || 0) * (parseInt(quantity) || 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name) {
      setError('Name is required');
      return;
    }
    if (!unitCost || parseFloat(unitCost) < 0) {
      setError('Valid unit cost is required');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        name,
        vendor: vendor || null,
        category,
        unit_cost: parseFloat(unitCost),
        unit_type: unitType,
        quantity: parseInt(quantity) || 1,
        notes: notes || null,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save service cost');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {editData ? 'Edit Service Cost' : 'Add Service Cost'}
            </h3>
            <p className="text-sm text-text-muted">
              {editData ? 'Update service details' : 'Add a recurring service cost'}
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
              Service Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Google Workspace"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Vendor
            </label>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="e.g., Google"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ServiceCategory)}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Unit Cost ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                placeholder="0.00"
                className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Unit Type
              </label>
              <select
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
              >
                <option value="flat">Flat Rate</option>
                <option value="user">Per User</option>
                <option value="seat">Per Seat</option>
                <option value="account">Per Account</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
            />
          </div>

          {/* Computed monthly cost display */}
          <div className="bg-depth-base border border-depth-border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-muted">Monthly Cost</span>
              <span className="text-lg font-semibold text-radiance-gold">
                ${computedMonthly.toFixed(2)}
              </span>
            </div>
            {unitType !== 'flat' && (
              <p className="text-xs text-text-muted mt-1">
                ${parseFloat(unitCost) || 0}/{unitType} × {parseInt(quantity) || 1}
              </p>
            )}
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
              {isSaving ? 'Saving...' : editData ? 'Update' : 'Add Service'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCostModal;
