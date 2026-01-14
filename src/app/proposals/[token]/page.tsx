/**
 * Client Proposal Portal Page
 * Light Brand Consulting
 *
 * Clients access their proposals via unique token URL
 */

'use client';

import React, { useState, useEffect, use, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Container, Button } from '@/components/ui';
import type { ProposalWithDetails, OnboardingFormField, PortalSections } from '@/types/proposals';
import { DEFAULT_PORTAL_SECTIONS } from '@/types/proposals';

interface PageProps {
  params: Promise<{ token: string }>;
}

type PortalStep = 'proposal' | 'agreement' | 'billing' | 'onboarding' | 'dashboard';

export default function ProposalPortalPage({ params }: PageProps) {
  const { token } = use(params);
  const searchParams = useSearchParams();
  const [proposal, setProposal] = useState<ProposalWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<PortalStep>('proposal');

  // Password protection state
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  // Agreement state
  const [signatureName, setSignatureName] = useState('');
  const [signatureEmail, setSignatureEmail] = useState('');
  const [isSigning, setIsSigning] = useState(false);

  // Onboarding state
  const [onboardingData, setOnboardingData] = useState<Record<string, string>>({});
  const [isSubmittingOnboarding, setIsSubmittingOnboarding] = useState(false);

  // Comment state
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Payment state
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);
  const [paymentNotification, setPaymentNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Check if this proposal requires a passcode (from database)
  const requiredPasscode = proposal?.portal_password;
  const needsPasscode = !!requiredPasscode && !isUnlocked;

  // Handle payment URL parameters
  useEffect(() => {
    const payment = searchParams.get('payment');
    const milestoneId = searchParams.get('milestone');

    if (payment === 'success' && milestoneId) {
      setPaymentNotification({
        type: 'success',
        message: 'Payment successful! Thank you for your payment. Your milestone status will be updated shortly.',
      });
      setActiveStep('billing');
      // Refresh proposal data to get updated payment status
      fetchProposal();
      // Clear the URL params after showing notification
      window.history.replaceState({}, '', `/proposals/${token}`);
    } else if (payment === 'cancelled') {
      setPaymentNotification({
        type: 'info',
        message: 'Payment was cancelled. You can try again when ready.',
      });
      setActiveStep('billing');
      window.history.replaceState({}, '', `/proposals/${token}`);
    }
  }, [searchParams, token]);

  // Auto-dismiss payment notification after 8 seconds
  useEffect(() => {
    if (paymentNotification) {
      const timer = setTimeout(() => {
        setPaymentNotification(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [paymentNotification]);

  // Initiate payment for a milestone
  const handlePayment = useCallback(async (milestoneId: string) => {
    setPaymentLoading(milestoneId);
    setPaymentNotification(null);

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          milestone_id: milestoneId,
          access_token: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.checkout_url) {
        // Redirect to Stripe checkout
        window.location.href = data.checkout_url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Payment initiation error:', err);
      setPaymentNotification({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to initiate payment. Please try again.',
      });
    } finally {
      setPaymentLoading(null);
    }
  }, [token]);

  // All possible portal steps
  const allSteps = useMemo(() => [
    { key: 'proposal', label: 'Proposal' },
    { key: 'agreement', label: 'Agreement' },
    { key: 'billing', label: 'Billing' },
    { key: 'onboarding', label: 'Onboarding' },
    { key: 'dashboard', label: 'Dashboard' },
  ], []);

  // Compute portal sections from proposal
  const portalSections = proposal?.portal_sections || DEFAULT_PORTAL_SECTIONS;

  // Filter steps based on portal section visibility
  const steps = useMemo(() => {
    return allSteps.filter(step => portalSections[step.key as keyof PortalSections]);
  }, [allSteps, portalSections]);

  // Handle passcode submission
  const handlePasscodeSubmit = () => {
    if (passcode === requiredPasscode) {
      setIsUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  useEffect(() => {
    fetchProposal();
  }, [token]);

  // Ensure activeStep is a visible section, fallback to first visible
  useEffect(() => {
    if (proposal && steps.length > 0) {
      const isActiveStepVisible = steps.some(s => s.key === activeStep);
      if (!isActiveStepVisible) {
        setActiveStep(steps[0].key as PortalStep);
      }
    }
  }, [steps, activeStep, proposal]);

  const fetchProposal = async () => {
    try {
      const response = await fetch(`/api/proposals/token/${token}`);
      const data = await response.json();

      if (data.error || !data.data) {
        setError(data.error || 'Proposal not found');
      } else {
        setProposal(data.data);
        // Set initial step based on proposal status
        if (data.data.agreement?.status === 'signed') {
          if (data.data.onboarding_form?.status === 'submitted') {
            setActiveStep('dashboard');
          } else {
            setActiveStep('onboarding');
          }
        }
      }
    } catch (err) {
      setError('Failed to load proposal');
      console.error('Error fetching proposal:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignAgreement = async () => {
    if (!proposal || !signatureName || !signatureEmail) return;

    setIsSigning(true);
    try {
      const response = await fetch(`/api/proposals/${proposal.id}/agreement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: token,
          signed_by_name: signatureName,
          signed_by_email: signatureEmail,
          signature_data: signatureName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProposal((prev) =>
          prev
            ? {
                ...prev,
                agreement: data.data,
                status: 'agreement_signed',
                agreement_signed_at: new Date().toISOString(),
              }
            : null
        );
        setActiveStep('billing');
      }
    } catch (err) {
      console.error('Error signing agreement:', err);
    } finally {
      setIsSigning(false);
    }
  };

  const handleSubmitOnboarding = async () => {
    if (!proposal) return;

    setIsSubmittingOnboarding(true);
    try {
      const response = await fetch(`/api/proposals/${proposal.id}/onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: token,
          form_data: onboardingData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProposal((prev) =>
          prev ? { ...prev, onboarding_form: data.data } : null
        );
        setActiveStep('dashboard');
      }
    } catch (err) {
      console.error('Error submitting onboarding:', err);
    } finally {
      setIsSubmittingOnboarding(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!proposal || !newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const response = await fetch(`/api/proposals/${proposal.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: token,
          comment_text: newComment.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProposal((prev) =>
          prev ? { ...prev, comments: [data.data, ...prev.comments] } : null
        );
        setNewComment('');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
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
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStepStatus = (step: PortalStep): 'complete' | 'current' | 'upcoming' => {
    const visibleStepKeys = steps.map(s => s.key);
    const currentIndex = visibleStepKeys.indexOf(activeStep);
    const stepIndex = visibleStepKeys.indexOf(step);

    if (step === 'agreement' && proposal?.agreement?.status === 'signed') return 'complete';
    if (step === 'onboarding' && proposal?.onboarding_form?.status === 'submitted') return 'complete';

    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  // Get next visible step
  const getNextStep = (currentStep: PortalStep): PortalStep | null => {
    const visibleStepKeys = steps.map(s => s.key);
    const currentIndex = visibleStepKeys.indexOf(currentStep);
    if (currentIndex < visibleStepKeys.length - 1) {
      return visibleStepKeys[currentIndex + 1] as PortalStep;
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-depth-base flex items-center justify-center relative">
        {/* Ambient Background Effects */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />
        
        <div className="text-center relative z-10">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-radiance-gold/20 blur-2xl rounded-full opacity-50 animate-pulse" />
            <div className="relative w-16 h-16 border-2 border-radiance-gold/20 border-t-radiance-gold rounded-full animate-spin" />
          </div>
          <p className="text-text-secondary text-lg font-mono tracking-wider">Loading your proposal...</p>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-depth-base flex items-center justify-center relative">
        {/* Ambient Background Effects */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-radial-gradient from-red-500/5 to-transparent blur-[120px] pointer-events-none" />
        
        <div className="text-center max-w-xl mx-auto px-4 relative z-10">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-6 bg-red-500/10 blur-3xl rounded-full" />
            <div className="relative w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-4">Proposal Not Found</h1>
          <p className="text-text-secondary mb-10 text-lg leading-relaxed">
            This proposal link may be invalid or expired. Please contact us if you believe this is an error.
          </p>
          <Link href="/">
            <Button variant="primary" size="lg">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Passcode gate for protected proposals
  if (needsPasscode) {
    return (
      <div className="min-h-screen bg-depth-base flex flex-col relative overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-radial-gradient from-radiance-gold/5 to-transparent blur-[150px] pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-96 h-96 bg-radiance-gold/3 blur-[120px] rounded-full pointer-events-none" />

        {/* Blueprint pattern */}
        <div
          className="fixed inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Header */}
        <header className="border-b border-depth-border/30 bg-depth-base/50 backdrop-blur-xl relative z-10">
          <Container size="wide">
            <div className="flex items-center justify-center py-6">
              <Link href="/" className="flex items-center group">
                <img
                  src="/lb-logo.svg"
                  alt="Light Brand Consulting"
                  className="h-8 md:h-10 w-auto transition-opacity group-hover:opacity-80"
                />
              </Link>
            </div>
          </Container>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
          <div className="w-full max-w-md">
            {/* Card Container */}
            <div className="relative group">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-br from-radiance-gold/10 via-radiance-amber/5 to-transparent blur-3xl rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-gradient-to-br from-depth-elevated/40 to-depth-surface/30 border border-radiance-gold/20 rounded-3xl p-12 backdrop-blur-md text-center overflow-hidden">
                {/* Subtle background pattern */}
                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                <div className="relative z-10">
                  {/* Title with better typography */}
                  <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-radiance-gold/10 border border-radiance-gold/20 rounded-full mb-6">
                      <span className="text-radiance-gold text-xs font-mono uppercase tracking-widest">Secure Access</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 tracking-tight">
                      Enter Access Code
                    </h1>
                    <p className="text-text-secondary text-base">
                      This proposal requires a passcode to view
                    </p>
                  </div>

                  {/* PIN Input - Enhanced Individual Boxes */}
                  <div className="flex justify-center gap-4 mb-8">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`w-16 h-16 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                          passcodeError
                            ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/10'
                            : passcode.length > index
                            ? 'border-radiance-gold/60 bg-radiance-gold/10 shadow-lg shadow-radiance-gold/20 scale-105'
                            : 'border-depth-border/50 bg-depth-base/50 hover:border-radiance-gold/30'
                        }`}
                      >
                        <span className={`text-3xl font-mono font-semibold ${
                          passcode.length > index 
                            ? 'text-radiance-gold' 
                            : passcodeError
                            ? 'text-red-400'
                            : 'text-text-muted/20'
                        }`}>
                          {passcode[index] || '•'}
                        </span>
                      </div>
                    ))}
                  </div>

                {/* Hidden Input for actual entry */}
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value.replace(/\D/g, ''));
                    setPasscodeError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && passcode.length === 4) {
                      handlePasscodeSubmit();
                    }
                  }}
                  className="sr-only"
                  autoFocus
                  aria-label="Enter 4-digit access code"
                />

                {/* Clickable overlay to focus input */}
                <button
                  onClick={() => {
                    const input = document.querySelector('input[inputMode="numeric"]') as HTMLInputElement;
                    input?.focus();
                  }}
                  className="absolute inset-0 cursor-text"
                  aria-hidden="true"
                />

                  {/* Error Message */}
                  {passcodeError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center gap-3 animate-pulse">
                      <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-red-400 text-sm font-medium">Invalid access code. Please try again.</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handlePasscodeSubmit}
                    disabled={passcode.length !== 4}
                    className="relative z-10 text-lg py-6 font-semibold shadow-lg shadow-radiance-gold/20 hover:shadow-radiance-gold/30 transition-all"
                  >
                    Access Proposal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-depth-border/20 py-6 relative z-10">
          <Container size="wide">
            <p className="text-center text-text-muted text-xs">
              &copy; {new Date().getFullYear()} Light Brand Consulting
            </p>
          </Container>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-depth-base relative">
      {/* Ambient Background Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-radiance-gold/3 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <header className="border-b border-depth-border/50 bg-depth-base/80 backdrop-blur-xl sticky top-0 z-50 relative">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }} 
        />
        <Container size="wide">
          <div className="flex items-center justify-between py-5 relative z-10">
            <Link href="/" className="flex items-center group">
              <img
                src="/lb-logo.svg"
                alt="Light Brand Consulting"
                className="h-8 md:h-10 w-auto transition-opacity group-hover:opacity-80"
              />
            </Link>
            <div className="text-right hidden md:block">
              <p className="text-text-primary font-medium">{proposal.project_name}</p>
              <p className="text-text-muted text-sm">For {proposal.client_name}</p>
            </div>
          </div>
        </Container>
      </header>

      {/* Progress Steps - Refined Navigation */}
      <div className="border-b border-depth-border/20 bg-depth-base/50 backdrop-blur-md relative overflow-hidden">
        <Container size="wide">
          <nav className="flex overflow-x-auto overflow-y-hidden relative z-10 no-scrollbar py-1">
            {steps.map((step, index) => {
              const status = getStepStatus(step.key as PortalStep);
              const stepNumber = index + 1;
              return (
                <button
                  key={step.key}
                  onClick={() => setActiveStep(step.key as PortalStep)}
                  className={`group flex items-center gap-3 px-5 py-3.5 whitespace-nowrap transition-all duration-300 relative ${
                    status === 'current'
                      ? 'text-text-primary'
                      : status === 'complete'
                      ? 'text-text-secondary hover:text-text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {/* Active indicator line */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300 ${
                      status === 'current'
                        ? 'bg-radiance-gold'
                        : 'bg-transparent group-hover:bg-depth-border'
                    }`}
                  />

                  {/* Step indicator */}
                  <span
                    className={`relative w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono tracking-tight transition-all duration-300 ${
                      status === 'current'
                        ? 'bg-radiance-gold/15 text-radiance-gold ring-1 ring-radiance-gold/30'
                        : status === 'complete'
                        ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20'
                        : 'bg-depth-elevated/50 text-text-muted ring-1 ring-depth-border/50 group-hover:ring-depth-border'
                    }`}
                  >
                    {status === 'complete' ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </span>

                  {/* Label */}
                  <span className={`text-sm font-medium tracking-tight transition-colors duration-300 ${
                    status === 'current' ? 'text-text-primary' : ''
                  }`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </Container>
      </div>

      {/* Main Content */}
      <main className="py-16 relative overflow-hidden min-h-[calc(100vh-200px)]">
        <Container size="wide" className="relative z-10">
          {/* Proposal View */}
          {activeStep === 'proposal' && (
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Hero */}
              <div className="text-center mb-16 relative">
                {/* Decorative glow */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-radiance-gold/5 blur-[100px] pointer-events-none rounded-full" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-radiance-gold/10 border border-radiance-gold/20 rounded-full text-radiance-gold text-sm font-medium mb-8 backdrop-blur-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-mono tracking-wider uppercase text-xs">Proposal</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 tracking-tight leading-tight">
                    {proposal.project_name}
                  </h1>
                  <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                    Prepared exclusively for <span className="text-radiance-gold font-medium">{proposal.client_name}</span>
                    {proposal.client_company && <span className="text-text-muted"> at {proposal.client_company}</span>}
                  </p>
                </div>
              </div>

              {/* Overview */}
              {proposal.project_overview && (
                <div className="relative group">
                  {/* Decorative glow on hover */}
                  <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-10 backdrop-blur-sm overflow-hidden">
                    {/* Blueprint pattern */}
                    <div 
                      className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                      style={{ 
                        backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                        backgroundSize: '24px 24px' 
                      }} 
                    />
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-radiance-gold rounded-full" />
                        Project Overview
                      </h2>
                      <div className="prose prose-invert max-w-none prose-headings:text-text-primary prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-radiance-gold/90 prose-p:text-text-secondary prose-p:leading-relaxed prose-p:text-lg prose-strong:text-text-primary prose-strong:font-semibold prose-ul:space-y-2 prose-li:text-text-secondary">
                        <ReactMarkdown>
                          {proposal.project_overview}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Phases */}
              {proposal.phases.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-radiance-gold rounded-full" />
                    Project Phases
                  </h2>
                  {proposal.phases.map((phase, phaseIndex) => (
                    <div
                      key={phase.id}
                      className="relative group"
                    >
                      {/* Decorative glow on hover */}
                      <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-10 backdrop-blur-sm overflow-hidden hover:border-depth-border/60 transition-all duration-500">
                        {/* Blueprint pattern */}
                        <div
                          className="absolute inset-0 opacity-[0.02] pointer-events-none"
                          style={{
                            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                          }}
                        />
                        <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="w-8 h-8 rounded-full bg-radiance-gold/20 border border-radiance-gold/40 flex items-center justify-center text-radiance-gold text-sm font-bold">
                                {phase.phase_number}
                              </span>
                              <span className="text-radiance-gold text-xs font-mono uppercase tracking-widest">
                                Phase {phase.phase_number}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mt-2">
                              {phase.phase_name}
                            </h3>
                            {phase.timeline && (
                              <p className="text-text-muted text-sm mt-2 font-mono">{phase.timeline}</p>
                            )}
                          </div>
                        </div>

                        {phase.description && (
                          <p className="text-text-secondary mb-8 text-lg leading-relaxed border-l-2 border-radiance-gold/20 pl-6 py-2">
                            {phase.description}
                          </p>
                        )}

                        {phase.deliverables && phase.deliverables.length > 0 && (
                          <div className="mb-8 bg-depth-base/30 rounded-2xl p-6 border border-depth-border/50">
                            <h4 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider text-radiance-gold/80">Deliverables</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {phase.deliverables.map((d) => (
                                <li
                                  key={d.id}
                                  className="flex items-center gap-3 text-text-secondary"
                                >
                                  <svg className="w-5 h-5 text-radiance-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-base">{d.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {phase.objectives && phase.objectives.length > 0 && (
                          <div className="bg-depth-base/30 rounded-2xl p-6 border border-depth-border/50">
                            <h4 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider text-radiance-gold/80">Objectives</h4>
                            <ul className="space-y-3">
                              {phase.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-3 text-text-secondary">
                                  <span className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0" />
                                  <span className="text-base leading-relaxed">{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing Summary */}
              <div className="relative group">
                {/* Decorative glow */}
                <div className="absolute -inset-6 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-3xl rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative bg-gradient-to-br from-radiance-gold/15 to-radiance-amber/5 border border-radiance-gold/30 rounded-3xl p-10 backdrop-blur-md overflow-hidden">
                  {/* Blueprint pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ 
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                      backgroundSize: '32px 32px' 
                    }} 
                  />
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-3">
                      <span className="w-1.5 h-10 bg-radiance-gold rounded-full" />
                      Investment Summary
                    </h2>
                    <div className="space-y-6">
                      <div className="flex justify-between text-lg items-center">
                        <span className="text-text-secondary font-medium">Total Investment</span>
                        <span className="text-text-primary font-semibold text-xl">{formatCurrency(proposal.total_amount)}</span>
                      </div>
                      {proposal.discount_percentage > 0 && (
                        <div className="flex justify-between text-lg items-center">
                          <span className="text-text-secondary font-medium">Discount ({proposal.discount_percentage}%)</span>
                          <span className="text-green-400 font-semibold text-xl">
                            -{formatCurrency(proposal.total_amount * proposal.discount_percentage / 100)}
                          </span>
                        </div>
                      )}
                      <div className="pt-6 border-t border-radiance-gold/30">
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="text-xs font-mono text-radiance-gold/80 uppercase tracking-wider block mb-2">Final Investment</span>
                            <span className="text-2xl font-bold text-text-primary">Total Project Value</span>
                          </div>
                          <span className="text-5xl font-bold text-radiance-gold">
                            {formatCurrency(proposal.final_amount)}
                          </span>
                        </div>
                        {proposal.total_timeline && (
                          <p className="text-text-muted mt-4 font-mono text-sm">Timeline: {proposal.total_timeline}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accept Button */}
              {getNextStep('proposal') && (
                <div className="text-center pt-8">
                  <div className="relative inline-block group">
                    <div className="absolute -inset-2 bg-radiance-gold/20 blur-xl rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        const next = getNextStep('proposal');
                        if (next) setActiveStep(next);
                      }}
                      className="relative"
                    >
                      {portalSections.agreement ? 'Accept Proposal & Sign Agreement' : 'Continue'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Agreement */}
          {activeStep === 'agreement' && (
            <div className="max-w-7xl mx-auto">
              {proposal.agreement?.status === 'signed' ? (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-text-primary mb-4">Consulting Agreement</h2>
                    <p className="text-text-secondary text-lg">
                      Agreement Status
                    </p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-4 bg-green-500/10 blur-3xl rounded-3xl opacity-60" />
                    <div className="relative bg-depth-elevated/30 border border-green-500/30 rounded-3xl p-12 text-center backdrop-blur-sm">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-8">
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-text-primary mb-3">Agreement Signed</h3>
                      <p className="text-text-secondary mb-8 text-lg">
                        Signed by <span className="text-green-400 font-medium">{proposal.agreement.signed_by_name}</span> on{' '}
                        {formatDate(proposal.agreement.signed_at)}
                      </p>
                      {getNextStep('agreement') && (
                        <Button variant="outline" onClick={() => {
                          const next = getNextStep('agreement');
                          if (next) setActiveStep(next);
                        }} size="lg">
                          Continue →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-text-primary mb-4">Consulting Agreement</h2>
                    <p className="text-text-secondary text-lg">
                      Please review and sign the agreement below to proceed
                    </p>
                  </div>

                  {/* Agreement Text */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-radiance-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-10 max-h-[32rem] overflow-y-auto backdrop-blur-sm">
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.015] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      <div className="prose prose-invert max-w-none relative z-10 prose-headings:text-text-primary prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-6 prose-h2:text-lg prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3 prose-p:text-text-secondary prose-p:leading-relaxed prose-ul:space-y-1 prose-li:text-text-secondary">
                        <ReactMarkdown>
                          {proposal.agreement?.agreement_text || ''}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>

                  {/* Signature Form */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-radiance-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-10 backdrop-blur-sm overflow-hidden">
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
                          <span className="w-1.5 h-7 bg-radiance-gold rounded-full" />
                          Electronic Signature
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-text-primary font-medium mb-3">
                              Full Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={signatureName}
                              onChange={(e) => setSignatureName(e.target.value)}
                              placeholder="Type your full legal name"
                              className="w-full bg-depth-base border border-depth-border rounded-xl px-5 py-4 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none transition-colors text-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-text-primary font-medium mb-3">
                              Email <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              value={signatureEmail}
                              onChange={(e) => setSignatureEmail(e.target.value)}
                              placeholder="Your email address"
                              className="w-full bg-depth-base border border-depth-border rounded-xl px-5 py-4 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none transition-colors text-lg"
                            />
                          </div>
                          <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-5">
                            <p className="text-text-secondary text-sm leading-relaxed">
                              By clicking &quot;Sign Agreement&quot;, you agree to the terms and conditions outlined in this consulting agreement.
                            </p>
                          </div>
                          <Button
                            variant="primary"
                            fullWidth
                            onClick={handleSignAgreement}
                            isLoading={isSigning}
                            disabled={!signatureName || !signatureEmail}
                            size="lg"
                          >
                            Sign Agreement
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Billing */}
          {activeStep === 'billing' && (
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-text-primary mb-4">Billing & Payments</h2>
                <p className="text-text-secondary text-lg">
                  View your payment milestones and schedule
                </p>
              </div>

              {/* Payment Notification */}
              {paymentNotification && (
                <div
                  className={`relative rounded-2xl p-6 border backdrop-blur-sm ${
                    paymentNotification.type === 'success'
                      ? 'bg-green-500/10 border-green-500/30'
                      : paymentNotification.type === 'error'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-amber-500/10 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        paymentNotification.type === 'success'
                          ? 'bg-green-500/20'
                          : paymentNotification.type === 'error'
                          ? 'bg-red-500/20'
                          : 'bg-amber-500/20'
                      }`}
                    >
                      {paymentNotification.type === 'success' ? (
                        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : paymentNotification.type === 'error' ? (
                        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          paymentNotification.type === 'success'
                            ? 'text-green-400'
                            : paymentNotification.type === 'error'
                            ? 'text-red-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {paymentNotification.type === 'success'
                          ? 'Payment Successful'
                          : paymentNotification.type === 'error'
                          ? 'Payment Error'
                          : 'Payment Cancelled'}
                      </p>
                      <p className="text-text-secondary mt-1">{paymentNotification.message}</p>
                    </div>
                    <button
                      onClick={() => setPaymentNotification(null)}
                      className="text-text-muted hover:text-text-secondary transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Milestones */}
              <div className="space-y-6">
                {proposal.milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="relative group"
                  >
                    <div className={`absolute -inset-4 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                      milestone.payment_status === 'paid' ? 'bg-green-500/10' : 'bg-radiance-gold/5'
                    }`} />
                    <div className={`relative bg-depth-elevated/30 border rounded-3xl p-8 backdrop-blur-sm overflow-hidden ${
                      milestone.payment_status === 'paid'
                        ? 'border-green-500/30'
                        : 'border-depth-border'
                    }`}
                  >
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      
                      <div className="flex items-start justify-between relative z-10">
                        <div className="flex items-start gap-5">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                              milestone.payment_status === 'paid'
                                ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                : 'bg-depth-base text-text-muted border-depth-border'
                            }`}
                          >
                            {milestone.payment_status === 'paid' ? (
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-text-primary text-lg mb-2">{milestone.milestone_name}</h3>
                            {milestone.description && (
                              <p className="text-text-secondary mb-2 leading-relaxed">{milestone.description}</p>
                            )}
                            {milestone.due_date && (
                              <p className="text-text-muted text-sm font-mono">
                                Due: {formatDate(milestone.due_date)}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-text-muted font-mono mb-1">AMOUNT</div>
                          <p className="text-2xl font-bold text-text-primary mb-3">
                            {formatCurrency(milestone.amount)}
                          </p>
                          {milestone.payment_status !== 'paid' ? (
                            <button
                              onClick={() => handlePayment(milestone.id)}
                              disabled={paymentLoading === milestone.id}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-radiance-gold text-depth-base text-sm font-semibold rounded-full hover:bg-radiance-gold/90 transition-colors shadow-illumination disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {paymentLoading === milestone.id ? (
                                <>
                                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  Pay Now
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                </>
                              )}
                            </button>
                          ) : (
                            <span
                              className={`inline-block px-4 py-2 text-xs rounded-full font-medium uppercase tracking-wider ${
                                milestone.payment_status === 'paid'
                                  ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                  : milestone.payment_status === 'overdue'
                                  ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {milestone.payment_status === 'paid'
                                ? 'Paid'
                                : milestone.payment_status === 'overdue'
                                ? 'Overdue'
                                : 'Pending'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-3xl rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative bg-gradient-to-br from-radiance-gold/15 to-radiance-amber/5 border border-radiance-gold/30 rounded-3xl p-10 backdrop-blur-md overflow-hidden">
                  {/* Blueprint pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ 
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                      backgroundSize: '32px 32px' 
                    }} 
                  />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-radiance-gold/20">
                      <span className="text-xl font-semibold text-text-primary">Total Project Value</span>
                      <span className="text-4xl font-bold text-radiance-gold">
                        {formatCurrency(proposal.final_amount)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                        <span className="text-text-muted text-sm font-mono block mb-2">Paid</span>
                        <span className="text-green-400 text-2xl font-bold">
                          {formatCurrency(
                            proposal.milestones
                              .filter((m) => m.payment_status === 'paid')
                              .reduce((sum, m) => sum + m.amount, 0)
                          )}
                        </span>
                      </div>
                      <div className="bg-depth-base/50 border border-depth-border rounded-xl p-4">
                        <span className="text-text-muted text-sm font-mono block mb-2">Remaining</span>
                        <span className="text-text-primary text-2xl font-bold">
                          {formatCurrency(
                            proposal.milestones
                              .filter((m) => m.payment_status !== 'paid')
                              .reduce((sum, m) => sum + m.amount, 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {getNextStep('billing') && (
                <div className="text-center pt-4">
                  <Button variant="primary" onClick={() => {
                    const next = getNextStep('billing');
                    if (next) setActiveStep(next);
                  }} size="lg">
                    Continue →
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Onboarding */}
          {activeStep === 'onboarding' && (
            <div className="max-w-7xl mx-auto">
              {proposal.onboarding_form?.status === 'submitted' ? (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-text-primary mb-4">Onboarding</h2>
                    <p className="text-text-secondary text-lg">
                      Onboarding Status
                    </p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-4 bg-green-500/10 blur-3xl rounded-3xl opacity-60" />
                    <div className="relative bg-depth-elevated/30 border border-green-500/30 rounded-3xl p-12 text-center backdrop-blur-sm">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-8">
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-text-primary mb-3">Onboarding Complete</h3>
                      <p className="text-text-secondary mb-8 text-lg">
                        Thank you for completing the onboarding form. Our team will review your information.
                      </p>
                      {getNextStep('onboarding') && (
                        <Button variant="outline" onClick={() => {
                          const next = getNextStep('onboarding');
                          if (next) setActiveStep(next);
                        }} size="lg">
                          Continue →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-text-primary mb-4">Onboarding</h2>
                    <p className="text-text-secondary text-lg">
                      Help us get started by providing some additional information
                    </p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-4 bg-radiance-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-10 backdrop-blur-sm overflow-hidden">
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      
                      <div className="relative z-10">
                        <div className="space-y-8">
                          {proposal.onboarding_form?.form_config?.map((field: OnboardingFormField) => (
                            <div key={field.id}>
                              <label className="block text-text-primary font-medium mb-3 text-base">
                                {field.label}
                                {field.required && <span className="text-red-400"> *</span>}
                              </label>
                              {field.type === 'textarea' ? (
                                <textarea
                                  rows={4}
                                  value={onboardingData[field.id] || ''}
                                  onChange={(e) =>
                                    setOnboardingData({ ...onboardingData, [field.id]: e.target.value })
                                  }
                                  placeholder={field.placeholder}
                                  className="w-full bg-depth-base border border-depth-border rounded-xl px-5 py-4 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none resize-none transition-colors"
                                />
                              ) : field.type === 'select' ? (
                                <select
                                  value={onboardingData[field.id] || ''}
                                  onChange={(e) =>
                                    setOnboardingData({ ...onboardingData, [field.id]: e.target.value })
                                  }
                                  className="w-full bg-depth-base border border-depth-border rounded-xl px-5 py-4 text-text-primary focus:border-radiance-gold focus:outline-none transition-colors"
                                >
                                  <option value="">Select an option</option>
                                  {field.options?.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={field.type}
                                  value={onboardingData[field.id] || ''}
                                  onChange={(e) =>
                                    setOnboardingData({ ...onboardingData, [field.id]: e.target.value })
                                  }
                                  placeholder={field.placeholder}
                                  className="w-full bg-depth-base border border-depth-border rounded-xl px-5 py-4 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none transition-colors"
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="mt-10">
                          <Button
                            variant="primary"
                            fullWidth
                            onClick={handleSubmitOnboarding}
                            isLoading={isSubmittingOnboarding}
                            size="lg"
                          >
                            Submit Onboarding Information
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dashboard */}
          {activeStep === 'dashboard' && (
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-text-primary mb-4">Project Dashboard</h2>
                <p className="text-text-secondary text-lg">
                  Track your project progress and communicate with our team
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Progress Overview */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-radiance-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-10 backdrop-blur-sm overflow-hidden">
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
                          <span className="w-1.5 h-7 bg-radiance-gold rounded-full" />
                          Milestone Progress
                        </h3>
                        <div className="space-y-5">
                          {proposal.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center gap-5 p-4 bg-depth-base/30 rounded-xl border border-depth-border/50">
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  milestone.milestone_status === 'completed'
                                    ? 'bg-green-400 border-green-400'
                                    : milestone.milestone_status === 'in_progress'
                                    ? 'bg-amber-400 border-amber-400'
                                    : 'bg-transparent border-text-muted'
                                }`}
                              />
                              <div className="flex-1">
                                <p className="text-text-primary font-medium">{milestone.milestone_name}</p>
                              </div>
                              <span
                                className={`text-xs px-3 py-1.5 rounded-full font-medium uppercase tracking-wider ${
                                  milestone.milestone_status === 'completed'
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                    : milestone.milestone_status === 'in_progress'
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                    : 'bg-depth-elevated text-text-muted border border-depth-border'
                                }`}
                              >
                                {milestone.milestone_status.replace('_', ' ')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Updates */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-radiance-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-10 backdrop-blur-sm overflow-hidden">
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
                          <span className="w-1.5 h-7 bg-radiance-gold rounded-full" />
                          Recent Updates
                        </h3>
                        {proposal.dashboard_updates.length > 0 ? (
                          <div className="space-y-5">
                            {proposal.dashboard_updates.map((update) => (
                              <div
                                key={update.id}
                                className="border-l-2 border-radiance-gold/30 pl-6 py-2 bg-depth-base/30 rounded-r-xl pr-4"
                              >
                                <h4 className="font-semibold text-text-primary text-lg">{update.title}</h4>
                                {update.content && (
                                  <p className="text-text-secondary mt-2 leading-relaxed">{update.content}</p>
                                )}
                                <p className="text-text-muted text-xs mt-3 font-mono">
                                  {formatDate(update.created_at)}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-text-muted text-center py-8">No updates yet. Check back soon!</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-radiance-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-10 backdrop-blur-sm overflow-hidden">
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
                          <span className="w-1.5 h-7 bg-radiance-gold rounded-full" />
                          Comments
                        </h3>

                        {/* Add Comment */}
                        <div className="mb-8">
                          <textarea
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full bg-depth-base border border-depth-border rounded-xl px-5 py-4 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none resize-none mb-4 transition-colors"
                          />
                          <Button
                            variant="outline"
                            onClick={handleSubmitComment}
                            isLoading={isSubmittingComment}
                            disabled={!newComment.trim()}
                          >
                            Post Comment
                          </Button>
                        </div>

                        {/* Comments List */}
                        {proposal.comments.length > 0 ? (
                          <div className="space-y-4">
                            {proposal.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className={`p-5 rounded-xl border ${
                                  comment.is_client_comment
                                    ? 'bg-radiance-gold/5 border-radiance-gold/30'
                                    : 'bg-depth-base/50 border-depth-border'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <span
                                    className={`text-sm font-semibold ${
                                      comment.is_client_comment ? 'text-radiance-gold' : 'text-wisdom-violet'
                                    }`}
                                  >
                                    {comment.is_client_comment ? 'You' : 'Light Brand Team'}
                                  </span>
                                  <span className="text-text-muted text-xs font-mono">
                                    {formatDate(comment.created_at)}
                                  </span>
                                </div>
                                <p className="text-text-secondary leading-relaxed">{comment.comment_text}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-text-muted text-center py-4">No comments yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-10">
                  {/* Project Info */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-radiance-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                          <span className="w-1 h-6 bg-radiance-gold rounded-full" />
                          Project Details
                        </h3>
                        <div className="space-y-5">
                          <div className="bg-depth-base/30 rounded-xl p-4 border border-depth-border/50">
                            <span className="text-text-muted block text-xs font-mono mb-2">STATUS</span>
                            <span className="text-text-primary capitalize font-medium">
                              {proposal.status.replace('_', ' ')}
                            </span>
                          </div>
                          {proposal.total_timeline && (
                            <div className="bg-depth-base/30 rounded-xl p-4 border border-depth-border/50">
                              <span className="text-text-muted block text-xs font-mono mb-2">TIMELINE</span>
                              <span className="text-text-primary font-medium">{proposal.total_timeline}</span>
                            </div>
                          )}
                          <div className="bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/5 rounded-xl p-4 border border-radiance-gold/30">
                            <span className="text-radiance-gold/80 block text-xs font-mono mb-2">INVESTMENT</span>
                            <span className="text-radiance-gold font-bold text-xl">
                              {formatCurrency(proposal.final_amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-radiance-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-depth-elevated/30 border border-depth-border rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
                      {/* Blueprint pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                          backgroundSize: '24px 24px' 
                        }} 
                      />
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                          <span className="w-1 h-6 bg-radiance-gold rounded-full" />
                          Quick Actions
                        </h3>
                        <div className="space-y-3">
                          {portalSections.proposal && (
                            <Button
                              variant="outline"
                              fullWidth
                              onClick={() => setActiveStep('proposal')}
                            >
                              View Proposal
                            </Button>
                          )}
                          {portalSections.billing && (
                            <Button
                              variant="outline"
                              fullWidth
                              onClick={() => setActiveStep('billing')}
                            >
                              View Billing
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* Footer */}
      <footer className="border-t border-depth-border/30 py-12 mt-20 relative">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.01] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }} 
        />
        <Container size="wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-text-muted relative z-10">
            <p className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-radiance-gold" />
              &copy; {new Date().getFullYear()} Light Brand Consulting. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="mailto:hello@lightbrand.co" 
                className="hover:text-radiance-gold transition-colors font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
