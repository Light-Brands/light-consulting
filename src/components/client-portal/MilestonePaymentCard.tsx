/**
 * Milestone Payment Card Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { ClientMilestone } from '@/types/client-portal';
import type { PaymentStatus, MilestoneStatus } from '@/types/proposals';

interface MilestonePaymentCardProps {
  milestone: ClientMilestone;
  onPayClick?: (milestoneId: string, paymentUrl: string) => void;
}

const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  paid: { label: 'Paid', color: 'text-green-400', bgColor: 'bg-green-500/10' },
  overdue: { label: 'Overdue', color: 'text-red-400', bgColor: 'bg-red-500/10' },
  cancelled: { label: 'Cancelled', color: 'text-gray-400', bgColor: 'bg-gray-500/10' },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const MilestonePaymentCard: React.FC<MilestonePaymentCardProps> = ({
  milestone,
  onPayClick,
}) => {
  const statusConfig = PAYMENT_STATUS_CONFIG[milestone.payment_status] || PAYMENT_STATUS_CONFIG.pending;
  const isPaid = milestone.payment_status === 'paid';
  const canPay = milestone.payment_status === 'pending' && milestone.stripe_payment_url;

  return (
    <div
      className={`
        bg-depth-surface border border-depth-border rounded-xl p-4
        ${isPaid ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-medium ${isPaid ? 'text-text-muted line-through' : 'text-text-primary'}`}>
              {milestone.milestone_name}
            </h4>
            <span className={`px-2 py-0.5 text-xs rounded-full ${statusConfig.color} ${statusConfig.bgColor}`}>
              {statusConfig.label}
            </span>
          </div>

          {milestone.description && (
            <p className="text-sm text-text-muted mb-2">
              {milestone.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-text-muted">
            {milestone.phase_name && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {milestone.phase_name}
              </span>
            )}
            {milestone.due_date && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Due {formatDate(milestone.due_date)}
              </span>
            )}
            {milestone.paid_at && (
              <span className="flex items-center gap-1 text-green-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Paid {formatDate(milestone.paid_at)}
              </span>
            )}
          </div>
        </div>

        {/* Amount & Action */}
        <div className="text-right flex-shrink-0">
          <p className={`text-lg font-bold ${isPaid ? 'text-text-muted' : 'text-text-primary'}`}>
            {formatCurrency(milestone.amount)}
          </p>

          {canPay && (
            <button
              onClick={() => onPayClick?.(milestone.id, milestone.stripe_payment_url!)}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-radiance-gold to-radiance-amber text-depth-base rounded-lg text-sm font-semibold hover:shadow-illumination transition-all"
            >
              Pay Now
            </button>
          )}

          {isPaid && (
            <div className="mt-2 flex items-center justify-end gap-1 text-green-400 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilestonePaymentCard;
