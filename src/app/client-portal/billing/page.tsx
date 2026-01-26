/**
 * Client Billing Center Page
 * Light Brand Consulting
 *
 * Consolidated billing and payment management for clients
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import type { ClientBillingSummary, ClientPaymentItem } from '@/types/client-portal';

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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function BillingCenterPage() {
  const { session, isLoading: authLoading } = useClientAuth();
  const [data, setData] = useState<ClientBillingSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/client-portal/billing');
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || 'Failed to load billing data');
          return;
        }

        setData(result.data);
      } catch (err) {
        console.error('Failed to fetch billing:', err);
        setError('Failed to load billing data');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && session) {
      fetchData();
    }
  }, [authLoading, session]);

  const handlePayment = useCallback(async (payment: ClientPaymentItem) => {
    setPaymentLoading(payment.id);

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          milestone_id: payment.id,
          access_token: payment.access_token,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create checkout session');
      }

      if (result.checkout_url) {
        window.location.href = result.checkout_url;
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setPaymentLoading(null);
    }
  }, []);

  if (authLoading || isLoading) {
    return (
      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-depth-elevated rounded w-1/3" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 bg-depth-elevated rounded-xl" />
              ))}
            </div>
            <div className="h-64 bg-depth-elevated rounded-2xl" />
          </div>
        </Container>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="text-center py-16 bg-depth-surface border border-depth-border rounded-2xl">
            <p className="text-red-400 mb-4">{error || 'Something went wrong'}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-radiance-gold hover:underline"
            >
              Try again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <Container size="wide">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
            Billing Center
          </h1>
          <p className="text-text-muted">
            Manage payments and view your billing history
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-depth-surface border border-depth-border rounded-xl p-6">
            <p className="text-text-muted text-sm mb-2">Total Project Value</p>
            <p className="text-3xl font-bold text-text-primary">
              {formatCurrency(data.total_value)}
            </p>
          </div>
          <div className="bg-depth-surface border border-green-500/30 rounded-xl p-6">
            <p className="text-text-muted text-sm mb-2">Paid to Date</p>
            <p className="text-3xl font-bold text-green-400">
              {formatCurrency(data.total_paid)}
            </p>
            <div className="mt-2 h-1.5 bg-depth-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{
                  width: `${data.total_value > 0 ? (data.total_paid / data.total_value) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
          <div className="bg-depth-surface border border-depth-border rounded-xl p-6">
            <p className="text-text-muted text-sm mb-2">Remaining Balance</p>
            <p className="text-3xl font-bold text-text-primary">
              {formatCurrency(data.total_remaining)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payments Due */}
            <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
              <div className="p-4 md:p-6 border-b border-depth-border">
                <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  {data.payments_due.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                  Payments Due
                </h2>
              </div>
              {data.payments_due.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-green-400/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p>No payments due at this time</p>
                </div>
              ) : (
                <div className="divide-y divide-depth-border">
                  {data.payments_due.map((payment) => (
                    <PaymentDueCard
                      key={payment.id}
                      payment={payment}
                      onPay={handlePayment}
                      isLoading={paymentLoading === payment.id}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Payments */}
            {data.upcoming_payments.length > 0 && (
              <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div className="p-4 md:p-6 border-b border-depth-border">
                  <h2 className="text-lg font-semibold text-text-primary">
                    Upcoming Payments
                  </h2>
                </div>
                <div className="divide-y divide-depth-border">
                  {data.upcoming_payments.map((payment) => (
                    <div key={payment.id} className="p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-text-primary">
                            {payment.milestone_name}
                          </h3>
                          <p className="text-text-muted text-sm">{payment.proposal_name}</p>
                          {payment.due_date && (
                            <p className="text-text-muted/60 text-xs mt-1">
                              Due: {formatDate(payment.due_date)}
                            </p>
                          )}
                        </div>
                        <p className="text-text-primary font-semibold">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Payment History */}
          <div>
            <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
              <div className="p-4 md:p-6 border-b border-depth-border">
                <h2 className="text-lg font-semibold text-text-primary">
                  Payment History
                </h2>
              </div>
              {data.payment_history.length === 0 ? (
                <div className="p-6 text-center text-text-muted text-sm">
                  No payments yet
                </div>
              ) : (
                <div className="divide-y divide-depth-border max-h-[500px] overflow-y-auto">
                  {data.payment_history.map((payment) => (
                    <div key={payment.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-text-primary font-medium text-sm truncate">
                            {payment.milestone_name}
                          </p>
                          <p className="text-text-muted text-xs truncate">
                            {payment.proposal_name}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-green-400 font-semibold text-sm">
                            {formatCurrency(payment.amount)}
                          </p>
                          {payment.paid_at && (
                            <p className="text-text-muted/60 text-xs">
                              {formatDate(payment.paid_at)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Payment Due Card Component
function PaymentDueCard({
  payment,
  onPay,
  isLoading,
}: {
  payment: ClientPaymentItem;
  onPay: (payment: ClientPaymentItem) => void;
  isLoading: boolean;
}) {
  const isOverdue = payment.status === 'overdue';

  return (
    <div className={`p-4 md:p-6 ${isOverdue ? 'bg-red-500/5' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isOverdue
                ? 'bg-red-500/10 text-red-400'
                : 'bg-amber-500/10 text-amber-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text-primary">{payment.milestone_name}</h3>
              {isOverdue && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                  Overdue
                </span>
              )}
            </div>
            <p className="text-text-muted text-sm">{payment.proposal_name}</p>
            {payment.due_date && (
              <p className={`text-xs mt-1 ${isOverdue ? 'text-red-400' : 'text-text-muted/60'}`}>
                Due: {formatDate(payment.due_date)}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-shrink-0">
          <p className="text-xl font-bold text-text-primary">
            {formatCurrency(payment.amount)}
          </p>
          <button
            onClick={() => onPay(payment)}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-radiance-gold text-depth-base font-semibold rounded-lg hover:bg-radiance-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              <>
                Pay Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
