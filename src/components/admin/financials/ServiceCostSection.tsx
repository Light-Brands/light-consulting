/**
 * Service Cost Section Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import type { ServiceCost } from '@/types/financials';
import { getCategoryConfig, formatCurrency } from '@/types/financials';
import { ServiceCostModal } from './ServiceCostModal';

interface ServiceCostSectionProps {
  services: ServiceCost[];
  onAdd: (data: {
    name: string;
    vendor: string | null;
    category: string;
    unit_cost: number;
    unit_type: string;
    quantity: number;
    notes: string | null;
  }) => Promise<void>;
  onUpdate: (id: string, data: {
    name: string;
    vendor: string | null;
    category: string;
    unit_cost: number;
    unit_type: string;
    quantity: number;
    notes: string | null;
  }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ServiceCostSection: React.FC<ServiceCostSectionProps> = ({
  services,
  onAdd,
  onUpdate,
  onDelete,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceCost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const total = services.reduce((sum, s) => sum + Number(s.monthly_cost), 0);

  const handleEdit = (service: ServiceCost) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleSave = async (data: {
    name: string;
    vendor: string | null;
    category: string;
    unit_cost: number;
    unit_type: string;
    quantity: number;
    notes: string | null;
  }) => {
    if (editingService) {
      await onUpdate(editingService.id, data);
    } else {
      await onAdd(data);
    }
    setShowModal(false);
    setEditingService(null);
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
          <h2 className="text-xl font-semibold text-text-primary">Service Costs</h2>
          <p className="text-sm text-text-muted">Recurring software and infrastructure costs</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleAdd}>
          Add Service
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-depth-base rounded-lg animate-pulse" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted mb-4">No service costs added yet</p>
          <Button variant="ghost" onClick={handleAdd}>
            Add your first service
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {services.map((service) => {
              const categoryConfig = getCategoryConfig(service.category);
              return (
                <div
                  key={service.id}
                  className="bg-depth-base border border-depth-border rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-text-primary truncate">
                        {service.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${categoryConfig.bgColor} ${categoryConfig.color}`}>
                        {categoryConfig.label}
                      </span>
                    </div>
                    <div className="text-sm text-text-muted">
                      {service.vendor && <span>{service.vendor} · </span>}
                      {service.unit_type !== 'flat' ? (
                        <span>
                          {formatCurrency(service.unit_cost)}/{service.unit_type} × {service.quantity}
                        </span>
                      ) : (
                        <span>Flat rate</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-text-primary whitespace-nowrap">
                      {formatCurrency(service.monthly_cost)}/mo
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 text-text-muted hover:text-radiance-gold rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        disabled={deletingId === service.id}
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
            <span className="text-text-muted">Total Services ({services.length})</span>
            <span className="text-lg font-semibold text-radiance-gold">
              {formatCurrency(total)}/mo
            </span>
          </div>
        </>
      )}

      {showModal && (
        <ServiceCostModal
          onClose={() => {
            setShowModal(false);
            setEditingService(null);
          }}
          onSave={handleSave}
          editData={editingService}
        />
      )}
    </div>
  );
};

export default ServiceCostSection;
