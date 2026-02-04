'use client';

import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ApplicationForm, type ApplicationData } from './ApplicationForm';

// Qualification: revenue >= $10K AND timeline = "yes"
const QUALIFIED_REVENUES = ['10k-50k', '50k-100k', '100k-500k', '500k-plus'];

function isQualified(data: ApplicationData): boolean {
  return (
    QUALIFIED_REVENUES.includes(data.monthlyRevenue) &&
    data.timeline === 'yes'
  );
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Submit handler — send to API, then redirect based on qualification
  const handleSubmit = useCallback(
    async (data: ApplicationData) => {
      try {
        await fetch('/api/go/application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch {
        // Silently continue — don't block the user even if API call fails
      }

      onClose();

      if (isQualified(data)) {
        const params = new URLSearchParams({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
        });
        router.push(`/go/book?${params.toString()}`);
      } else {
        router.push('/go/not-a-fit');
      }
    },
    [onClose, router]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Application form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-depth-base/95 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-lg mx-4 bg-depth-elevated border border-depth-border rounded-2xl shadow-floating overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Form */}
            <ApplicationForm onSubmit={handleSubmit} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
