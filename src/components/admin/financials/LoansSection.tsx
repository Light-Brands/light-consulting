/**
 * Loans Section Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import type { Loan } from '@/types/financials';
import { formatCurrency, formatDate } from '@/types/financials';
import { LoanModal } from './LoanModal';

interface LoansSectionProps {
  loans: Loan[];
  onAdd: (data: {
    lender_name: string;
    lender_contact: string | null;
    original_amount: number;
    current_balance: number;
    interest_rate: number;
    monthly_payment: number;
    start_date: string;
    maturity_date: string;
    payment_day: number;
    terms: string | null;
  }) => Promise<void>;
  onUpdate: (id: string, data: {
    lender_name: string;
    lender_contact: string | null;
    original_amount: number;
    current_balance: number;
    interest_rate: number;
    monthly_payment: number;
    start_date: string;
    maturity_date: string;
    payment_day: number;
    terms: string | null;
  }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const LoansSection: React.FC<LoansSectionProps> = ({
  loans,
  onAdd,
  onUpdate,
  onDelete,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Split into active and paid off
  const activeLoans = loans.filter(loan => loan.current_balance > 0);
  const paidOffLoans = loans.filter(loan => loan.current_balance <= 0);

  const totalMonthlyPayments = activeLoans.reduce((sum, l) => sum + Number(l.monthly_payment), 0);
  const totalBalance = activeLoans.reduce((sum, l) => sum + Number(l.current_balance), 0);

  const handleEdit = (loan: Loan) => {
    setEditingLoan(loan);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingLoan(null);
    setShowModal(true);
  };

  const handleSave = async (data: {
    lender_name: string;
    lender_contact: string | null;
    original_amount: number;
    current_balance: number;
    interest_rate: number;
    monthly_payment: number;
    start_date: string;
    maturity_date: string;
    payment_day: number;
    terms: string | null;
  }) => {
    if (editingLoan) {
      await onUpdate(editingLoan.id, data);
    } else {
      await onAdd(data);
    }
    setShowModal(false);
    setEditingLoan(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const getPaymentProgress = (loan: Loan) => {
    const paid = loan.original_amount - loan.current_balance;
    return Math.round((paid / loan.original_amount) * 100);
  };

  const getMonthsRemaining = (loan: Loan) => {
    if (loan.current_balance <= 0) return 0;
    return Math.ceil(loan.current_balance / loan.monthly_payment);
  };

  const renderLoanItem = (loan: Loan, isPaidOff = false) => {
    const progress = getPaymentProgress(loan);
    const monthsRemaining = getMonthsRemaining(loan);

    return (
      <div
        key={loan.id}
        className={`bg-depth-base border border-depth-border rounded-lg p-4 ${isPaidOff ? 'opacity-60' : ''}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-text-primary">
                {loan.lender_name}
              </span>
              {loan.interest_rate > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                  {loan.interest_rate}% APR
                </span>
              )}
              {isPaidOff && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                  Paid Off
                </span>
              )}
            </div>
            {loan.lender_contact && (
              <p className="text-sm text-text-muted mb-1">{loan.lender_contact}</p>
            )}

            {/* Progress Bar */}
            {!isPaidOff && (
              <div className="mb-2">
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>{formatCurrency(loan.original_amount - loan.current_balance)} paid</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-depth-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
              <span>
                Original: {formatCurrency(loan.original_amount)}
              </span>
              {!isPaidOff && (
                <span className="text-amber-400">
                  Balance: {formatCurrency(loan.current_balance)}
                </span>
              )}
              <span>
                Due: {loan.payment_day}{getOrdinalSuffix(loan.payment_day)} of month
              </span>
              {!isPaidOff && monthsRemaining > 0 && (
                <span>
                  ~{monthsRemaining} months remaining
                </span>
              )}
            </div>

            {loan.terms && (
              <p className="text-xs text-text-muted mt-2 italic">{loan.terms}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="font-semibold text-text-primary whitespace-nowrap block">
                {formatCurrency(loan.monthly_payment)}/mo
              </span>
              <span className="text-xs text-text-muted">
                Maturity: {formatDate(loan.maturity_date)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(loan)}
                className="p-2 text-text-muted hover:text-radiance-gold rounded-lg transition-colors"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(loan.id)}
                disabled={deletingId === loan.id}
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
          <h2 className="text-xl font-semibold text-text-primary">Loans</h2>
          <p className="text-sm text-text-muted">Track loans, lenders, and repayment terms</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleAdd}>
          Add Loan
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-depth-base rounded-lg animate-pulse" />
          ))}
        </div>
      ) : loans.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted mb-4">No loans tracked yet</p>
          <Button variant="ghost" onClick={handleAdd}>
            Add your first loan
          </Button>
        </div>
      ) : (
        <>
          {/* Active Loans */}
          {activeLoans.length > 0 && (
            <div className="space-y-3 mb-4">
              {activeLoans.map((loan) => renderLoanItem(loan))}
            </div>
          )}

          {/* Paid Off Loans */}
          {paidOffLoans.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-text-muted uppercase tracking-wide mb-2">Paid Off</p>
              <div className="space-y-3">
                {paidOffLoans.map((loan) => renderLoanItem(loan, true))}
              </div>
            </div>
          )}

          {/* Section totals */}
          <div className="mt-4 pt-4 border-t border-depth-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-muted">Monthly Payments ({activeLoans.length} active)</span>
              <span className="text-lg font-semibold text-red-400">
                {formatCurrency(totalMonthlyPayments)}/mo
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Total Outstanding Balance</span>
              <span className="text-lg font-semibold text-amber-400">
                {formatCurrency(totalBalance)}
              </span>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <LoanModal
          onClose={() => {
            setShowModal(false);
            setEditingLoan(null);
          }}
          onSave={handleSave}
          editData={editingLoan}
        />
      )}
    </div>
  );
};

// Helper function for ordinal suffix
function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export default LoansSection;
