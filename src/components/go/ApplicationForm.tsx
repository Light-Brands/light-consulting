'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  monthlyRevenue: string;
  bottleneck: string;
  timeline: string;
}

interface ApplicationFormProps {
  onSubmit: (data: ApplicationData) => Promise<void>;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Steps configuration
// ---------------------------------------------------------------------------

const REVENUE_OPTIONS = [
  { value: '', label: 'Select your range...' },
  { value: 'under-10k', label: 'Under $10K' },
  { value: '10k-50k', label: '$10K \u2013 $50K' },
  { value: '50k-100k', label: '$50K \u2013 $100K' },
  { value: '100k-500k', label: '$100K \u2013 $500K' },
  { value: '500k-plus', label: '$500K+' },
];

const TOTAL_STEPS = 7;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    monthlyRevenue: '',
    bottleneck: '',
    timeline: '',
  });

  // Field updater
  const updateField = useCallback(
    <K extends keyof ApplicationData>(key: K, value: ApplicationData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Validation per step
  const isStepValid = useCallback((): boolean => {
    switch (step) {
      case 0:
        return data.firstName.trim().length > 0;
      case 1:
        return data.lastName.trim().length > 0;
      case 2:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      case 3:
        return data.companyName.trim().length > 0;
      case 4:
        return data.monthlyRevenue !== '';
      case 5:
        return data.bottleneck.trim().length > 0;
      case 6:
        return data.timeline === 'yes' || data.timeline === 'no';
      default:
        return false;
    }
  }, [step, data]);

  // Navigation
  const next = useCallback(() => {
    if (!isStepValid()) return;
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step, isStepValid]);

  const back = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (!isStepValid() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  }, [data, isStepValid, isSubmitting, onSubmit]);

  // Handle Enter key to advance
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (step === TOTAL_STEPS - 1) {
          handleSubmit();
        } else {
          next();
        }
      }
    },
    [step, next, handleSubmit]
  );

  // Animation variants
  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  // ---------------------------------------------------------------------------
  // Steps
  // ---------------------------------------------------------------------------

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepWrapper key="first" label="What's your first name?">
            <Input
              inputSize="lg"
              placeholder="First name"
              value={data.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </StepWrapper>
        );
      case 1:
        return (
          <StepWrapper key="last" label="And your last name?">
            <Input
              inputSize="lg"
              placeholder="Last name"
              value={data.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </StepWrapper>
        );
      case 2:
        return (
          <StepWrapper key="email" label="What's your best email?">
            <Input
              inputSize="lg"
              type="email"
              placeholder="you@company.com"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </StepWrapper>
        );
      case 3:
        return (
          <StepWrapper key="company" label="What's your company name?">
            <Input
              inputSize="lg"
              placeholder="Company name"
              value={data.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </StepWrapper>
        );
      case 4:
        return (
          <StepWrapper
            key="revenue"
            label="What's your approximate monthly revenue?"
          >
            <Select
              selectSize="lg"
              value={data.monthlyRevenue}
              onChange={(e) => updateField('monthlyRevenue', e.target.value)}
              onKeyDown={handleKeyDown}
              options={REVENUE_OPTIONS}
              autoFocus
            />
          </StepWrapper>
        );
      case 5:
        return (
          <StepWrapper
            key="bottleneck"
            label="What's your biggest bottleneck right now?"
          >
            <Textarea
              textareaSize="lg"
              placeholder="E.g., hiring, lead generation, fulfillment, operations..."
              value={data.bottleneck}
              onChange={(e) => updateField('bottleneck', e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              resize="none"
              autoFocus
            />
          </StepWrapper>
        );
      case 6:
        return (
          <StepWrapper
            key="timeline"
            label="Are you actively looking to implement AI in the next 30-60 days?"
          >
            <div className="flex flex-col gap-3">
              <RadioOption
                selected={data.timeline === 'yes'}
                onClick={() => updateField('timeline', 'yes')}
                label="Yes, I'm ready to move"
              />
              <RadioOption
                selected={data.timeline === 'no'}
                onClick={() => updateField('timeline', 'no')}
                label="No, just exploring"
              />
            </div>
          </StepWrapper>
        );
      default:
        return null;
    }
  };

  const isLast = step === TOTAL_STEPS - 1;
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="flex flex-col h-full" onKeyDown={handleKeyDown}>
      {/* Progress bar */}
      <div className="h-1 bg-depth-border rounded-full overflow-hidden mx-6 mt-6">
        <motion.div
          className="h-full bg-gradient-to-r from-radiance-gold to-radiance-amber"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <p className="text-text-muted text-xs text-right px-6 mt-2">
        {step + 1} of {TOTAL_STEPS}
      </p>

      {/* Form steps */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 pb-6">
        <button
          onClick={step === 0 ? onClose : back}
          className="text-text-muted hover:text-text-primary text-sm font-medium transition-colors"
        >
          {step === 0 ? 'Cancel' : 'Back'}
        </button>

        {isLast ? (
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={!isStepValid()}
          >
            Submit Application
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={next}
            disabled={!isStepValid()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const StepWrapper: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="space-y-6">
    <h2 className="text-2xl md:text-3xl font-bold text-text-primary leading-snug">
      {label}
    </h2>
    {children}
  </div>
);

const RadioOption: React.FC<{
  selected: boolean;
  onClick: () => void;
  label: string;
}> = ({ selected, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      w-full text-left px-5 py-4 rounded-xl border text-base font-medium
      transition-all duration-200 cursor-pointer
      ${
        selected
          ? 'border-radiance-gold bg-radiance-gold/10 text-text-primary shadow-illumination'
          : 'border-depth-border bg-depth-base text-text-secondary hover:border-text-muted'
      }
    `}
  >
    <span className="flex items-center gap-3">
      <span
        className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
          ${selected ? 'border-radiance-gold' : 'border-depth-border'}
        `}
      >
        {selected && (
          <span className="w-2.5 h-2.5 rounded-full bg-radiance-gold" />
        )}
      </span>
      {label}
    </span>
  </button>
);
