/**
 * Booking Page
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Textarea,
  Tag,
  CheckIcon,
  LightbulbIcon,
  BlueprintIcon,
  BookIcon,
} from '../components';
import { SERVICES, INTAKE_QUESTIONS } from '../lib/constants';
import { BookingFormData, PageKey } from '../types';
import { cn, isValidEmail } from '../lib/utils';

interface BookPageProps {
  onNavigate: (page: PageKey) => void;
}

type ServiceKey = 'illumination' | 'blueprint' | 'story';

export const BookPage: React.FC<BookPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const serviceIcons: Record<ServiceKey, React.ReactNode> = {
    illumination: <LightbulbIcon size={24} />,
    blueprint: <BlueprintIcon size={24} />,
    story: <BookIcon size={24} />,
  };

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
      const questions = INTAKE_QUESTIONS[formData.service || 'illumination'];
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

  if (isComplete) {
    return (
      <div className="min-h-screen pt-24 md:pt-32">
        <div className="container-narrow py-16">
          <Card elevation="elevated" className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-success/20 text-success mx-auto mb-6 flex items-center justify-center">
              <CheckIcon size={32} />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-4">
              Booking Request Received!
            </h1>
            <p className="text-text-secondary mb-8">
              Thank you for your interest in {SERVICES[formData.service!]?.name}.
              We'll be in touch within 24 hours to confirm your session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" onClick={() => onNavigate('home')}>
                Back to Home
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('services')}>
                Explore More Services
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <div className="container-narrow py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">Step {step} of 4</span>
            <span className="text-sm text-radiance-gold font-medium">
              {step === 1 && 'Select Service'}
              {step === 2 && 'Your Information'}
              {step === 3 && 'Intake Questions'}
              {step === 4 && 'Confirm Booking'}
            </span>
          </div>
          <div className="h-2 bg-depth-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-radiance-gold to-radiance-amber transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Choose Your Service
            </h1>
            <p className="text-text-secondary mb-8">
              Select the service that best fits your needs.
            </p>

            <div className="grid gap-4">
              {(Object.keys(SERVICES) as ServiceKey[]).map((key) => {
                const service = SERVICES[key];
                const isSelected = formData.service === key;

                return (
                  <Card
                    key={key}
                    elevation={isSelected ? 'elevated' : 'subtle'}
                    hover
                    onClick={() => updateFormData({ service: key })}
                    className={cn(
                      'cursor-pointer transition-all',
                      isSelected && 'border-radiance-gold ring-1 ring-radiance-gold/20'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                          isSelected
                            ? 'bg-gradient-to-br from-radiance-gold to-radiance-amber text-depth-base'
                            : 'bg-depth-surface text-text-muted'
                        )}
                      >
                        {serviceIcons[key]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                          {service.name}
                        </h3>
                        <p className="text-text-secondary text-sm mb-2">
                          {service.tagline}
                        </p>
                        <div className="flex gap-4 text-sm text-text-muted">
                          <span>{service.investment}</span>
                          <span>•</span>
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                          isSelected
                            ? 'bg-radiance-gold border-radiance-gold'
                            : 'border-depth-border'
                        )}
                      >
                        {isSelected && <CheckIcon size={14} className="text-depth-base" />}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {errors.service && (
              <p className="text-error text-sm mt-2">{errors.service}</p>
            )}
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Your Information
            </h1>
            <p className="text-text-secondary mb-8">
              Tell us a bit about yourself so we can prepare for our conversation.
            </p>

            <div className="space-y-6">
              <Input
                label="Full Name"
                placeholder="John Smith"
                value={formData.name || ''}
                onChange={(e) => updateFormData({ name: e.target.value })}
                error={errors.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="john@company.com"
                value={formData.email || ''}
                onChange={(e) => updateFormData({ email: e.target.value })}
                error={errors.email}
                required
              />

              <Input
                label="Company Name"
                placeholder="Acme Inc"
                value={formData.company || ''}
                onChange={(e) => updateFormData({ company: e.target.value })}
              />

              <Input
                label="Phone (Optional)"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone || ''}
                onChange={(e) => updateFormData({ phone: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 3: Intake Questions */}
        {step === 3 && formData.service && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Help Us Prepare
            </h1>
            <p className="text-text-secondary mb-8">
              These questions help us make the most of our time together.
            </p>

            <div className="space-y-6">
              {INTAKE_QUESTIONS[formData.service].map((question) => (
                <div key={question.id}>
                  {question.type === 'select' ? (
                    <div>
                      <label className="block text-xs font-bold text-radiance-gold uppercase tracking-wider mb-2">
                        {question.question}
                        {question.required && <span className="text-error"> *</span>}
                      </label>
                      <select
                        className="block w-full bg-depth-base border border-depth-border rounded-brand-btn text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold/20 focus:border-radiance-gold transition-all duration-300 px-4 py-3.5 text-sm"
                        value={formData.intake?.[question.id] || ''}
                        onChange={(e) => updateIntake(question.id, e.target.value)}
                      >
                        <option value="">Select an option...</option>
                        {question.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors[question.id] && (
                        <p className="text-error text-xs mt-1">{errors[question.id]}</p>
                      )}
                    </div>
                  ) : question.type === 'textarea' ? (
                    <Textarea
                      label={
                        question.question +
                        (question.required ? ' *' : '')
                      }
                      value={formData.intake?.[question.id] || ''}
                      onChange={(e) => updateIntake(question.id, e.target.value)}
                      error={errors[question.id]}
                      rows={4}
                    />
                  ) : (
                    <Input
                      label={
                        question.question +
                        (question.required ? ' *' : '')
                      }
                      value={formData.intake?.[question.id] || ''}
                      onChange={(e) => updateIntake(question.id, e.target.value)}
                      error={errors[question.id]}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Confirm Your Booking
            </h1>
            <p className="text-text-secondary mb-8">
              Review your information before submitting.
            </p>

            <Card elevation="subtle" className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Booking Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-depth-border">
                  <span className="text-text-muted">Service</span>
                  <span className="text-text-primary font-medium">
                    {formData.service && SERVICES[formData.service].name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-depth-border">
                  <span className="text-text-muted">Investment</span>
                  <span className="text-radiance-gold font-medium">
                    {formData.service && SERVICES[formData.service].investment}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-depth-border">
                  <span className="text-text-muted">Name</span>
                  <span className="text-text-primary">{formData.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-depth-border">
                  <span className="text-text-muted">Email</span>
                  <span className="text-text-primary">{formData.email}</span>
                </div>
                {formData.company && (
                  <div className="flex justify-between py-2">
                    <span className="text-text-muted">Company</span>
                    <span className="text-text-primary">{formData.company}</span>
                  </div>
                )}
              </div>
            </Card>

            <Tag variant="default" className="mb-4">
              What's Next
            </Tag>
            <p className="text-text-secondary text-sm">
              After submitting, we'll reach out within 24 hours to schedule your session
              at a time that works for you. You'll also receive a confirmation email
              with preparation materials.
            </p>
          </div>
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
      </div>
    </div>
  );
};

export default BookPage;
