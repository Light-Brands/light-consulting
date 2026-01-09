/**
 * Booking Page
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  Button,
  BookProgressVisual,
  ServiceSelectionVisual,
  ContactInfoFormVisual,
  IntakeQuestionsVisual,
  BookingConfirmationVisual,
  BookingSuccessVisual,
} from '../components';
import { Container, Section } from '../components/ui';
import { SERVICES, INTAKE_QUESTIONS } from '../lib/constants';
import { BookingFormData, PageKey } from '../types';
import { isValidEmail } from '../lib/utils';

// Service icons for the new offerings
const DiagnosticIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12h6M12 9v6M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
  </svg>
);

const CommandCenterIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const AuthorityIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const AscensionIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

interface BookPageProps {
  onNavigate: (page: PageKey) => void;
}

type ServiceKey = 'diagnostic' | 'command-center' | 'authority-engine' | 'ascension';

export const BookPage: React.FC<BookPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (currentStep === 2) {
      if (!formData.name?.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (currentStep === 3) {
      const questions = INTAKE_QUESTIONS[formData.service || 'diagnostic'];
      questions.forEach((q) => {
        if (q.required && !formData.intake?.[q.id]?.trim()) {
          newErrors[q.id] = 'This field is required';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 4) {
        handleSubmit();
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsComplete(true);
  };

  const updateFormData = (updates: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear related errors
    Object.keys(updates).forEach((key) => {
      if (errors[key]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[key];
          return newErrors;
        });
      }
    });
  };

  const updateIntake = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      intake: { ...prev.intake, [questionId]: value },
    }));
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const stepLabels = [
    'Select Service',
    'Your Information',
    'Intake Questions',
    'Confirm Booking',
  ];

  // Service icons
  const DiagnosticIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12h6M12 9v6M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
    </svg>
  );

  const CommandCenterIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );

  const AuthorityIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  const AscensionIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );

  const serviceIcons: Record<ServiceKey, React.ReactNode> = {
    diagnostic: <DiagnosticIcon size={24} />,
    'command-center': <CommandCenterIcon size={24} />,
    'authority-engine': <AuthorityIcon size={24} />,
    ascension: <AscensionIcon size={24} />,
  };

  const services = (Object.keys(SERVICES) as ServiceKey[]).map((key) => ({
    key,
    name: SERVICES[key].name,
    tagline: SERVICES[key].tagline,
    investment: SERVICES[key].investment,
    duration: SERVICES[key].duration,
    icon: serviceIcons[key],
  }));

  if (isComplete) {
    return (
      <div className="min-h-screen pt-24 md:pt-32">
        <Section spacing="lg" className="relative overflow-hidden">
          {/* Background atmosphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

          <Container size="narrow">
            <div className="relative z-10">
              <BookingSuccessVisual
                serviceName={SERVICES[formData.service!]?.name || ''}
                onHomeClick={() => onNavigate('home')}
                onServicesClick={() => onNavigate('services')}
              />
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          {/* Progress */}
          <BookProgressVisual
            currentStep={step}
            totalSteps={4}
            stepLabels={stepLabels}
          />

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <ServiceSelectionVisual
              services={services}
              selectedService={formData.service}
              onSelect={(key) => updateFormData({ service: key as ServiceKey })}
              error={errors.service}
            />
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <ContactInfoFormVisual
              formData={{
                name: formData.name,
                email: formData.email,
                company: formData.company,
                phone: formData.phone,
              }}
              errors={errors}
              onFieldChange={(field, value) => {
                const updates: Partial<BookingFormData> = {};
                if (field === 'name') updates.name = value;
                else if (field === 'email') updates.email = value;
                else if (field === 'company') updates.company = value;
                else if (field === 'phone') updates.phone = value;
                updateFormData(updates);
              }}
            />
          )}

          {/* Step 3: Intake Questions */}
          {step === 3 && formData.service && (
            <IntakeQuestionsVisual
              questions={INTAKE_QUESTIONS[formData.service]}
              answers={formData.intake || {}}
              errors={errors}
              onAnswerChange={updateIntake}
            />
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && formData.service && (
            <BookingConfirmationVisual
              serviceName={SERVICES[formData.service].name}
              investment={SERVICES[formData.service].investment}
              name={formData.name || ''}
              email={formData.email || ''}
              company={formData.company}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-6 border-t border-depth-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              isLoading={isSubmitting}
            >
              {step === 4 ? 'Submit Booking' : 'Continue'}
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default BookPage;
