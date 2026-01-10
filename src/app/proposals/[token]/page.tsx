/**
 * Client Proposal Portal Page
 * Light Brand Consulting
 *
 * Clients access their proposals via unique token URL
 */

'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import type { ProposalWithDetails, OnboardingFormField } from '@/types/proposals';

interface PageProps {
  params: Promise<{ token: string }>;
}

type PortalStep = 'proposal' | 'agreement' | 'billing' | 'onboarding' | 'dashboard';

export default function ProposalPortalPage({ params }: PageProps) {
  const { token } = use(params);
  const [proposal, setProposal] = useState<ProposalWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<PortalStep>('proposal');

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

  useEffect(() => {
    fetchProposal();
  }, [token]);

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
    const steps: PortalStep[] = ['proposal', 'agreement', 'billing', 'onboarding', 'dashboard'];
    const currentIndex = steps.indexOf(activeStep);
    const stepIndex = steps.indexOf(step);

    if (step === 'agreement' && proposal?.agreement?.status === 'signed') return 'complete';
    if (step === 'onboarding' && proposal?.onboarding_form?.status === 'submitted') return 'complete';

    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-depth-base flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-radiance-gold/20 border-t-radiance-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Loading your proposal...</p>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-depth-base flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Proposal Not Found</h1>
          <p className="text-text-muted mb-6">
            This proposal link may be invalid or expired. Please contact us if you believe this is an error.
          </p>
          <Link href="/">
            <Button variant="primary">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { key: 'proposal', label: 'Proposal' },
    { key: 'agreement', label: 'Agreement' },
    { key: 'billing', label: 'Billing' },
    { key: 'onboarding', label: 'Onboarding' },
    { key: 'dashboard', label: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-depth-base">
      {/* Header */}
      <header className="border-b border-depth-border bg-depth-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <Container size="wide">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center shadow-illumination group-hover:shadow-illumination-intense transition-all group-hover:scale-105">
                <span className="text-depth-base font-bold text-sm">LB</span>
              </div>
              <div>
                <span className="text-text-primary font-semibold block">Light Brand Consulting</span>
                <span className="text-text-muted text-xs">Client Portal</span>
              </div>
            </Link>
            <div className="text-right hidden md:block">
              <p className="text-text-primary font-medium">{proposal.project_name}</p>
              <p className="text-text-muted text-sm">For {proposal.client_name}</p>
            </div>
          </div>
        </Container>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-depth-border bg-depth-surface/50">
        <Container size="wide">
          <nav className="flex overflow-x-auto">
            {steps.map((step, index) => {
              const status = getStepStatus(step.key as PortalStep);
              return (
                <button
                  key={step.key}
                  onClick={() => setActiveStep(step.key as PortalStep)}
                  className={`flex items-center gap-3 px-6 py-4 border-b-2 -mb-px whitespace-nowrap transition-colors ${
                    status === 'current'
                      ? 'border-radiance-gold text-radiance-gold'
                      : status === 'complete'
                      ? 'border-transparent text-green-400 hover:text-green-300'
                      : 'border-transparent text-text-muted hover:text-text-secondary'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      status === 'current'
                        ? 'bg-radiance-gold text-depth-base'
                        : status === 'complete'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-depth-elevated text-text-muted'
                    }`}
                  >
                    {status === 'complete' ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="font-medium">{step.label}</span>
                </button>
              );
            })}
          </nav>
        </Container>
      </div>

      {/* Main Content */}
      <main className="py-12 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Proposal View */}
          {activeStep === 'proposal' && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-radiance-gold/10 rounded-full text-radiance-gold text-sm font-medium mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Proposal
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                  {proposal.project_name}
                </h1>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  Prepared exclusively for {proposal.client_name}
                  {proposal.client_company && ` at ${proposal.client_company}`}
                </p>
              </div>

              {/* Overview */}
              {proposal.project_overview && (
                <div className="bg-depth-surface border border-depth-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-6">Project Overview</h2>
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-text-secondary leading-relaxed">
                      {proposal.project_overview}
                    </div>
                  </div>
                </div>
              )}

              {/* Phases */}
              {proposal.phases.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-text-primary">Project Phases</h2>
                  {proposal.phases.map((phase) => (
                    <div
                      key={phase.id}
                      className="bg-depth-surface border border-depth-border rounded-2xl p-8 relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                          backgroundSize: '32px 32px',
                        }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-radiance-gold text-sm font-mono uppercase tracking-wider">
                              Phase {phase.phase_number}
                            </span>
                            <h3 className="text-xl font-bold text-text-primary mt-1">
                              {phase.phase_name}
                            </h3>
                            {phase.timeline && (
                              <p className="text-text-muted text-sm mt-1">{phase.timeline}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-radiance-gold">
                              {formatCurrency(phase.amount)}
                            </p>
                          </div>
                        </div>

                        {phase.description && (
                          <p className="text-text-secondary mb-6">{phase.description}</p>
                        )}

                        {phase.deliverables && phase.deliverables.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-text-primary font-semibold mb-3">Deliverables</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {phase.deliverables.map((d) => (
                                <li
                                  key={d.id}
                                  className="flex items-center gap-2 text-text-secondary"
                                >
                                  <svg className="w-5 h-5 text-radiance-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {d.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {phase.objectives && phase.objectives.length > 0 && (
                          <div>
                            <h4 className="text-text-primary font-semibold mb-3">Objectives</h4>
                            <ul className="space-y-2">
                              {phase.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2 text-text-secondary">
                                  <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold mt-2 flex-shrink-0" />
                                  {obj}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing Summary */}
              <div className="bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/5 border border-radiance-gold/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Investment Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-text-secondary">Total Investment</span>
                    <span className="text-text-primary">{formatCurrency(proposal.total_amount)}</span>
                  </div>
                  {proposal.discount_percentage > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-text-secondary">Discount ({proposal.discount_percentage}%)</span>
                      <span className="text-red-400">
                        -{formatCurrency(proposal.total_amount * proposal.discount_percentage / 100)}
                      </span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-radiance-gold/20">
                    <div className="flex justify-between">
                      <span className="text-xl font-bold text-text-primary">Final Investment</span>
                      <span className="text-3xl font-bold text-radiance-gold">
                        {formatCurrency(proposal.final_amount)}
                      </span>
                    </div>
                    {proposal.total_timeline && (
                      <p className="text-text-muted mt-2">Timeline: {proposal.total_timeline}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Accept Button */}
              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setActiveStep('agreement')}
                >
                  Accept Proposal & Sign Agreement
                </Button>
              </div>
            </div>
          )}

          {/* Agreement */}
          {activeStep === 'agreement' && (
            <div className="max-w-3xl mx-auto">
              {proposal.agreement?.status === 'signed' ? (
                <div className="bg-depth-surface border border-depth-border rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-2">Agreement Signed</h2>
                  <p className="text-text-muted mb-4">
                    Signed by {proposal.agreement.signed_by_name} on{' '}
                    {formatDate(proposal.agreement.signed_at)}
                  </p>
                  <Button variant="outline" onClick={() => setActiveStep('billing')}>
                    Continue to Billing
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-2">Consulting Agreement</h2>
                    <p className="text-text-muted">
                      Please review and sign the agreement below to proceed
                    </p>
                  </div>

                  {/* Agreement Text */}
                  <div className="bg-depth-surface border border-depth-border rounded-2xl p-8 max-h-96 overflow-y-auto">
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-text-secondary text-sm">
                        {proposal.agreement?.agreement_text}
                      </div>
                    </div>
                  </div>

                  {/* Signature Form */}
                  <div className="bg-depth-surface border border-depth-border rounded-2xl p-8">
                    <h3 className="text-lg font-bold text-text-primary mb-6">Electronic Signature</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-text-primary text-sm font-medium mb-2">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={signatureName}
                          onChange={(e) => setSignatureName(e.target.value)}
                          placeholder="Type your full legal name"
                          className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-text-primary text-sm font-medium mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={signatureEmail}
                          onChange={(e) => setSignatureEmail(e.target.value)}
                          placeholder="Your email address"
                          className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none"
                        />
                      </div>
                      <p className="text-text-muted text-sm">
                        By clicking &quot;Sign Agreement&quot;, you agree to the terms and conditions outlined in this consulting agreement.
                      </p>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={handleSignAgreement}
                        isLoading={isSigning}
                        disabled={!signatureName || !signatureEmail}
                      >
                        Sign Agreement
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Billing */}
          {activeStep === 'billing' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-text-primary mb-2">Billing & Payments</h2>
                <p className="text-text-muted">
                  View your payment milestones and schedule
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                {proposal.milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className={`bg-depth-surface border rounded-2xl p-6 ${
                      milestone.payment_status === 'paid'
                        ? 'border-green-500/30'
                        : 'border-depth-border'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                            milestone.payment_status === 'paid'
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-depth-elevated text-text-muted'
                          }`}
                        >
                          {milestone.payment_status === 'paid' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">{milestone.milestone_name}</h3>
                          {milestone.description && (
                            <p className="text-text-muted text-sm mt-1">{milestone.description}</p>
                          )}
                          {milestone.due_date && (
                            <p className="text-text-muted text-sm mt-1">
                              Due: {formatDate(milestone.due_date)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-text-primary">
                          {formatCurrency(milestone.amount)}
                        </p>
                        <span
                          className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${
                            milestone.payment_status === 'paid'
                              ? 'bg-green-500/10 text-green-400'
                              : milestone.payment_status === 'overdue'
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {milestone.payment_status === 'paid'
                            ? 'Paid'
                            : milestone.payment_status === 'overdue'
                            ? 'Overdue'
                            : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/5 border border-radiance-gold/20 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-text-primary">Total Project Value</span>
                  <span className="text-2xl font-bold text-radiance-gold">
                    {formatCurrency(proposal.final_amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-text-muted">Paid</span>
                  <span className="text-green-400">
                    {formatCurrency(
                      proposal.milestones
                        .filter((m) => m.payment_status === 'paid')
                        .reduce((sum, m) => sum + m.amount, 0)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-text-muted">Remaining</span>
                  <span className="text-text-primary">
                    {formatCurrency(
                      proposal.milestones
                        .filter((m) => m.payment_status !== 'paid')
                        .reduce((sum, m) => sum + m.amount, 0)
                    )}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <Button variant="primary" onClick={() => setActiveStep('onboarding')}>
                  Continue to Onboarding
                </Button>
              </div>
            </div>
          )}

          {/* Onboarding */}
          {activeStep === 'onboarding' && (
            <div className="max-w-2xl mx-auto">
              {proposal.onboarding_form?.status === 'submitted' ? (
                <div className="bg-depth-surface border border-depth-border rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-2">Onboarding Complete</h2>
                  <p className="text-text-muted mb-4">
                    Thank you for completing the onboarding form. Our team will review your information.
                  </p>
                  <Button variant="outline" onClick={() => setActiveStep('dashboard')}>
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-2">Onboarding</h2>
                    <p className="text-text-muted">
                      Help us get started by providing some additional information
                    </p>
                  </div>

                  <div className="bg-depth-surface border border-depth-border rounded-2xl p-8">
                    <div className="space-y-6">
                      {proposal.onboarding_form?.form_config?.map((field: OnboardingFormField) => (
                        <div key={field.id}>
                          <label className="block text-text-primary text-sm font-medium mb-2">
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
                              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none resize-none"
                            />
                          ) : field.type === 'select' ? (
                            <select
                              value={onboardingData[field.id] || ''}
                              onChange={(e) =>
                                setOnboardingData({ ...onboardingData, [field.id]: e.target.value })
                              }
                              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary focus:border-radiance-gold focus:outline-none"
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
                              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={handleSubmitOnboarding}
                        isLoading={isSubmittingOnboarding}
                      >
                        Submit Onboarding Information
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dashboard */}
          {activeStep === 'dashboard' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-text-primary mb-2">Project Dashboard</h2>
                <p className="text-text-muted">
                  Track your project progress and communicate with our team
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Progress Overview */}
                  <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Milestone Progress</h3>
                    <div className="space-y-4">
                      {proposal.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              milestone.milestone_status === 'completed'
                                ? 'bg-green-400'
                                : milestone.milestone_status === 'in_progress'
                                ? 'bg-amber-400'
                                : 'bg-depth-elevated'
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-text-primary text-sm">{milestone.milestone_name}</p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              milestone.milestone_status === 'completed'
                                ? 'bg-green-500/10 text-green-400'
                                : milestone.milestone_status === 'in_progress'
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-depth-elevated text-text-muted'
                            }`}
                          >
                            {milestone.milestone_status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Updates */}
                  <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Updates</h3>
                    {proposal.dashboard_updates.length > 0 ? (
                      <div className="space-y-4">
                        {proposal.dashboard_updates.map((update) => (
                          <div
                            key={update.id}
                            className="border-l-2 border-radiance-gold/30 pl-4"
                          >
                            <h4 className="font-medium text-text-primary">{update.title}</h4>
                            {update.content && (
                              <p className="text-text-secondary text-sm mt-1">{update.content}</p>
                            )}
                            <p className="text-text-muted text-xs mt-2">
                              {formatDate(update.created_at)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-text-muted">No updates yet. Check back soon!</p>
                    )}
                  </div>

                  {/* Comments */}
                  <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Comments</h3>

                    {/* Add Comment */}
                    <div className="mb-6">
                      <textarea
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none resize-none mb-3"
                      />
                      <Button
                        variant="outline"
                        size="sm"
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
                            className={`p-4 rounded-lg ${
                              comment.is_client_comment
                                ? 'bg-radiance-gold/5 border border-radiance-gold/20'
                                : 'bg-depth-elevated'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`text-sm font-medium ${
                                  comment.is_client_comment ? 'text-radiance-gold' : 'text-wisdom-violet'
                                }`}
                              >
                                {comment.is_client_comment ? 'You' : 'Light Brand Team'}
                              </span>
                              <span className="text-text-muted text-xs">
                                {formatDate(comment.created_at)}
                              </span>
                            </div>
                            <p className="text-text-secondary text-sm">{comment.comment_text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-text-muted">No comments yet.</p>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Project Info */}
                  <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                    <h3 className="font-semibold text-text-primary mb-4">Project Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-text-muted block">Status</span>
                        <span className="text-text-primary capitalize">
                          {proposal.status.replace('_', ' ')}
                        </span>
                      </div>
                      {proposal.total_timeline && (
                        <div>
                          <span className="text-text-muted block">Timeline</span>
                          <span className="text-text-primary">{proposal.total_timeline}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-text-muted block">Investment</span>
                        <span className="text-radiance-gold font-bold">
                          {formatCurrency(proposal.final_amount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                    <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        fullWidth
                        size="sm"
                        onClick={() => setActiveStep('proposal')}
                      >
                        View Proposal
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        size="sm"
                        onClick={() => setActiveStep('billing')}
                      >
                        View Billing
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* Footer */}
      <footer className="border-t border-depth-border py-8 mt-12">
        <Container size="wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
            <p>&copy; {new Date().getFullYear()} Light Brand Consulting. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@lightbrand.co" className="hover:text-text-primary transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
