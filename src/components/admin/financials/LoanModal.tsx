/**
 * Loan Modal Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import type { Loan } from '@/types/financials';

interface LoanModalProps {
  onClose: () => void;
  onSave: (data: {
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
  editData?: Loan | null;
}

export const LoanModal: React.FC<LoanModalProps> = ({
  onClose,
  onSave,
  editData,
}) => {
  const [lenderName, setLenderName] = useState(editData?.lender_name || '');
  const [lenderContact, setLenderContact] = useState(editData?.lender_contact || '');
  const [originalAmount, setOriginalAmount] = useState(editData?.original_amount?.toString() || '');
  const [currentBalance, setCurrentBalance] = useState(editData?.current_balance?.toString() || '');
  const [interestRate, setInterestRate] = useState(editData?.interest_rate?.toString() || '0');
  const [monthlyPayment, setMonthlyPayment] = useState(editData?.monthly_payment?.toString() || '');
  const [startDate, setStartDate] = useState(editData?.start_date || '');
  const [maturityDate, setMaturityDate] = useState(editData?.maturity_date || '');
  const [paymentDay, setPaymentDay] = useState(editData?.payment_day?.toString() || '1');
  const [terms, setTerms] = useState(editData?.terms || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // When original amount changes and current balance is empty, copy it
  useEffect(() => {
    if (!editData && originalAmount && !currentBalance) {
      setCurrentBalance(originalAmount);
    }
  }, [originalAmount, editData, currentBalance]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      await onSave({
        lender_name: lenderName,
        lender_contact: lenderContact || null,
        original_amount: parseFloat(originalAmount),
        current_balance: parseFloat(currentBalance),
        interest_rate: parseFloat(interestRate) || 0,
        monthly_payment: parseFloat(monthlyPayment),
        start_date: startDate,
        maturity_date: maturityDate,
        payment_day: parseInt(paymentDay) || 1,
        terms: terms || null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save loan');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {editData ? 'Edit Loan' : 'Add Loan'}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Lender Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm text-text-secondary mb-1">
                Lender Name *
              </label>
              <input
                type="text"
                value={lenderName}
                onChange={(e) => setLenderName(e.target.value)}
                required
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                placeholder="John Smith"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm text-text-secondary mb-1">
                Contact Info
              </label>
              <input
                type="text"
                value={lenderContact}
                onChange={(e) => setLenderContact(e.target.value)}
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                placeholder="Email or phone"
              />
            </div>
          </div>

          {/* Amounts */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Original Amount *
              </label>
              <input
                type="number"
                value={originalAmount}
                onChange={(e) => setOriginalAmount(e.target.value)}
                required
                min="0"
                step="0.01"
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Current Balance *
              </label>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                required
                min="0"
                step="0.01"
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                placeholder="8500"
              />
            </div>
          </div>

          {/* Payment Info */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Interest Rate %
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="0"
                max="100"
                step="0.01"
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                placeholder="5.5"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Monthly Payment *
              </label>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                required
                min="0"
                step="0.01"
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Payment Day
              </label>
              <select
                value={paymentDay}
                onChange={(e) => setPaymentDay(e.target.value)}
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Maturity Date *
              </label>
              <input
                type="date"
                value={maturityDate}
                onChange={(e) => setMaturityDate(e.target.value)}
                required
                className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Terms */}
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Terms & Notes
            </label>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              rows={3}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-text-primary focus:border-radiance-gold focus:outline-none resize-none"
              placeholder="Repayment terms, conditions, etc."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : editData ? 'Save Changes' : 'Add Loan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanModal;
