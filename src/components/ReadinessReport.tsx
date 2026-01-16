/**
 * Enhanced Readiness Report Display
 * Shows AI readiness score, business intelligence, and detailed analysis
 * Includes booking call CTA
 */

'use client';

import React, { useState } from 'react';
import { Button } from './ui';
import { cn } from '../lib/utils';
import type { BusinessIntelligence } from '@/types/business-intelligence';

interface TechStack {
  platform?: string;
  cms?: string;
  frameworks?: string[];
  hosting?: string;
  analytics?: string[];
  marketing_tools?: string[];
  ecommerce?: string[];
  security?: string[];
  performance?: string[];
  other?: string[];
}

interface ReadinessReportProps {
  readinessScore?: number;
  readinessBrief?: string;
  capacityGapBrief?: string;
  techStack?: TechStack;
  businessIntelligence?: BusinessIntelligence;
  websiteStory?: string;
  leadId?: string;
  userName?: string;
  onBookCall?: (calendlyLink: string) => void;
}

export const ReadinessReport: React.FC<ReadinessReportProps> = ({
  readinessScore,
  readinessBrief,
  capacityGapBrief,
  techStack,
  businessIntelligence,
  websiteStory,
  leadId,
  userName,
  onBookCall,
}) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'business' | 'technical' | 'opportunities'>('overview');

  // Strategic session price
  const SESSION_PRICE = 500;

  // Check if we have analysis data
  const hasAnalysis = readinessScore !== undefined && readinessScore !== null;

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-radiance-gold';
    return 'text-amber-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return 'High Readiness';
    if (score >= 50) return 'Moderate Readiness';
    return 'Needs Improvement';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'from-green-500/20 to-green-600/5';
    if (score >= 50) return 'from-radiance-gold/20 to-radiance-amber/5';
    return 'from-amber-500/20 to-amber-600/5';
  };

  const handleBookSession = async () => {
    if (!leadId) {
      setBookingError('Unable to process booking. Please try again.');
      return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
      const response = await fetch('/api/stripe/create-session-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.already_paid) {
          // Redirect to success page if already paid
          window.location.href = `/book/success?lead_id=${leadId}&payment=success`;
          return;
        }
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (error) {
      console.error('Error booking session:', error);
      setBookingError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsBooking(false);
    }
  };

  const bi = businessIntelligence;

  // Simplified view when no analysis is available (user skipped analysis)
  if (!hasAnalysis) {
    return (
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-radiance-gold/20 to-radiance-amber/10 mb-6">
            <svg className="w-10 h-10 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {userName ? `Thanks, ${userName}!` : 'Book Your Strategic Session'}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Let's discuss how AI can transform your business. Book your 90-minute strategic session for personalized recommendations and an actionable AI roadmap.
          </p>
        </div>

        {/* What to Expect Card */}
        <div className="bg-depth-surface border border-depth-border rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
            What's Included in Your Strategic Session
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-radiance-gold/10 mb-4">
                <svg className="w-6 h-6 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-medium text-text-primary mb-2">Discovery</h3>
              <p className="text-sm text-text-secondary">
                We'll learn about your business, goals, and current challenges
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-wisdom-violet/10 mb-4">
                <svg className="w-6 h-6 text-wisdom-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-medium text-text-primary mb-2">Analysis</h3>
              <p className="text-sm text-text-secondary">
                We'll identify AI opportunities specific to your industry
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-growth-emerald/10 mb-4">
                <svg className="w-6 h-6 text-growth-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-medium text-text-primary mb-2">Recommendations</h3>
              <p className="text-sm text-text-secondary">
                You'll receive actionable next steps tailored to your needs
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/5 border border-radiance-gold/20 rounded-2xl p-8 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-text-primary mb-3">
              Ready to Transform Your Business?
            </h3>
            <p className="text-text-secondary max-w-xl mx-auto">
              Book your 90-minute strategic session to receive personalized AI implementation strategies and a complete roadmap for your business.
            </p>
          </div>
          {bookingError && (
            <p className="text-red-400 text-sm mb-4">{bookingError}</p>
          )}
          <Button
            onClick={handleBookSession}
            isLoading={isBooking}
            size="lg"
            className="px-10"
          >
            Book Strategic Session - $500
          </Button>
          <p className="mt-4 text-sm text-text-muted">
            90-minute deep-dive session • Personalized AI roadmap • Expert consultation
          </p>
        </div>

        {/* Optional: Add website for analysis */}
        <div className="text-center">
          <p className="text-sm text-text-muted">
            Want a personalized AI readiness assessment?{' '}
            <button
              onClick={() => window.location.reload()}
              className="text-radiance-gold hover:text-radiance-amber underline transition-colors"
            >
              Start over with your website URL
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Your AI Readiness Assessment
        </h1>
        <p className="text-text-secondary text-lg">
          Comprehensive analysis of your digital presence and AI transformation potential
        </p>
      </div>

      {/* Readiness Score Card */}
      <div className={cn(
        'relative border border-depth-border rounded-2xl p-8 overflow-hidden',
        `bg-gradient-to-br ${getScoreBgColor(readinessScore)}`
      )}>
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score Circle */}
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-depth-surface"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(readinessScore / 100) * 352} 352`}
                  className={getScoreColor(readinessScore)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn('text-4xl font-bold', getScoreColor(readinessScore))}>
                  {readinessScore}
                </span>
                <span className="text-xs text-text-muted">out of 100</span>
              </div>
            </div>

            {/* Score Details */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs font-semibold tracking-wider text-text-muted uppercase mb-1">
                AI Diagnostic Score
              </div>
              <div className={cn('text-2xl font-semibold mb-2', getScoreColor(readinessScore))}>
                {getScoreLabel(readinessScore)}
              </div>
              <p className="text-text-secondary leading-relaxed">{readinessBrief}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats (if business intelligence available) */}
      {bi && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-depth-surface border border-depth-border rounded-xl p-4 text-center">
            <div className="text-xs text-text-muted mb-1">Industry</div>
            <div className="text-sm font-semibold text-text-primary truncate">{bi.industry}</div>
          </div>
          <div className="bg-depth-surface border border-depth-border rounded-xl p-4 text-center">
            <div className="text-xs text-text-muted mb-1">Business Model</div>
            <div className="text-sm font-semibold text-text-primary truncate">{bi.business_model}</div>
          </div>
          <div className="bg-depth-surface border border-depth-border rounded-xl p-4 text-center">
            <div className="text-xs text-text-muted mb-1">Growth Stage</div>
            <div className="text-sm font-semibold text-text-primary truncate">{bi.company_size.growth_stage}</div>
          </div>
          <div className="bg-depth-surface border border-depth-border rounded-xl p-4 text-center">
            <div className="text-xs text-text-muted mb-1">Automation Level</div>
            <div className="text-sm font-semibold text-text-primary truncate">{bi.ai_readiness.automation_level}</div>
          </div>
        </div>
      )}

      {/* Tabs for detailed analysis */}
      {bi && (
        <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-depth-border">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'business', label: 'Business Intel' },
              { key: 'technical', label: 'Technical' },
              { key: 'opportunities', label: 'Opportunities' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={cn(
                  'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === tab.key
                    ? 'text-radiance-gold border-b-2 border-radiance-gold bg-radiance-gold/5'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Tech Stack */}
                {techStack && (techStack.platform || techStack.frameworks?.length) && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Detected Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.platform && (
                        <span className="px-3 py-1 bg-radiance-gold/20 text-radiance-gold rounded-lg text-sm font-medium">
                          {techStack.platform}
                        </span>
                      )}
                      {techStack.frameworks?.map((framework) => (
                        <span
                          key={framework}
                          className="px-3 py-1 bg-wisdom-violet/20 text-wisdom-violet rounded-lg text-sm"
                        >
                          {framework}
                        </span>
                      ))}
                      {techStack.analytics?.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 bg-depth-elevated text-text-secondary rounded-lg text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                      {techStack.marketing_tools?.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 bg-growth-emerald/20 text-growth-emerald rounded-lg text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                      {techStack.hosting && (
                        <span className="px-3 py-1 bg-depth-elevated text-text-muted rounded-lg text-sm">
                          {techStack.hosting}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Value Proposition */}
                {bi.value_proposition.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Your Value Proposition</h3>
                    <ul className="space-y-2">
                      {bi.value_proposition.map((value, index) => (
                        <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                          <svg className="w-4 h-4 text-radiance-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Capacity Gap */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Capacity Gap Analysis</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{capacityGapBrief}</p>
                </div>
              </div>
            )}

            {/* Business Intelligence Tab */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                {/* Target Audience */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Target Audience</h3>
                  <div className="bg-depth-elevated rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-muted text-sm">Primary:</span>
                      <span className="text-text-primary text-sm">{bi.target_audience.primary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted text-sm">Demographics:</span>
                      <span className="text-text-primary text-sm">{bi.target_audience.demographics}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted text-sm">Psychographics:</span>
                      <span className="text-text-primary text-sm">{bi.target_audience.psychographics}</span>
                    </div>
                  </div>
                </div>

                {/* Company Profile */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Company Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Revenue Model</div>
                      <div className="text-sm text-text-primary font-medium">{bi.revenue_model}</div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Company Size</div>
                      <div className="text-sm text-text-primary font-medium">{bi.company_size.employees}</div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Revenue Range</div>
                      <div className="text-sm text-text-primary font-medium">{bi.company_size.revenue_range}</div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Market Position</div>
                      <div className="text-sm text-text-primary font-medium">{bi.competitive_positioning}</div>
                    </div>
                  </div>
                </div>

                {/* Geographic Presence */}
                {bi.geographic_presence.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Geographic Presence</h3>
                    <div className="flex flex-wrap gap-2">
                      {bi.geographic_presence.map((location, index) => (
                        <span key={index} className="px-3 py-1 bg-depth-elevated text-text-secondary rounded-lg text-sm">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Digital Presence */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Digital Presence</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Content Quality</div>
                      <div className="text-sm text-text-primary font-medium">{bi.digital_presence.content_quality}</div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Site Structure</div>
                      <div className="text-sm text-text-primary font-medium">{bi.digital_presence.site_structure}</div>
                    </div>
                  </div>
                  {bi.digital_presence.social_presence.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-text-muted mb-2">Social Presence</div>
                      <div className="flex flex-wrap gap-2">
                        {bi.digital_presence.social_presence.map((social, index) => (
                          <span key={index} className="px-2 py-1 bg-radiance-gold/10 text-radiance-gold rounded text-xs">
                            {social}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Technical Tab */}
            {activeTab === 'technical' && (
              <div className="space-y-6">
                {/* Technical Assessment */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Technical Assessment</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Performance</div>
                      <div className={cn(
                        'text-sm font-medium',
                        bi.technical_assessment.performance === 'Excellent' || bi.technical_assessment.performance === 'Good' ? 'text-green-400' :
                        bi.technical_assessment.performance === 'Fair' ? 'text-amber-400' : 'text-red-400'
                      )}>
                        {bi.technical_assessment.performance}
                      </div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Security</div>
                      <div className={cn(
                        'text-sm font-medium',
                        bi.technical_assessment.security === 'Excellent' || bi.technical_assessment.security === 'Strong' ? 'text-green-400' :
                        bi.technical_assessment.security === 'Moderate' ? 'text-amber-400' : 'text-red-400'
                      )}>
                        {bi.technical_assessment.security}
                      </div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Accessibility</div>
                      <div className="text-sm text-text-primary font-medium">{bi.technical_assessment.accessibility}</div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Architecture</div>
                      <div className="text-sm text-text-primary font-medium">{bi.technical_assessment.backend_architecture}</div>
                    </div>
                  </div>
                </div>

                {/* Technical Features */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Technical Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {bi.technical_assessment.https_enabled && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">HTTPS Enabled</span>
                    )}
                    {bi.technical_assessment.cdn_usage && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">CDN Active</span>
                    )}
                    {bi.technical_assessment.modern_framework && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Modern Framework</span>
                    )}
                    {!bi.technical_assessment.https_enabled && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">No HTTPS</span>
                    )}
                  </div>
                </div>

                {/* Integrations */}
                {bi.technical_assessment.integrations.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Detected Integrations</h3>
                    <div className="flex flex-wrap gap-2">
                      {bi.technical_assessment.integrations.map((integration, index) => (
                        <span key={index} className="px-3 py-1 bg-wisdom-violet/20 text-wisdom-violet rounded-lg text-sm">
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Monitoring Tools */}
                {bi.technical_assessment.monitoring_tools.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Monitoring & Analytics</h3>
                    <div className="flex flex-wrap gap-2">
                      {bi.technical_assessment.monitoring_tools.map((tool, index) => (
                        <span key={index} className="px-3 py-1 bg-depth-elevated text-text-secondary rounded-lg text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Opportunities Tab */}
            {activeTab === 'opportunities' && (
              <div className="space-y-6">
                {/* AI Readiness Breakdown */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">AI Readiness Breakdown</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Data Infrastructure</div>
                      <div className="text-sm text-text-primary font-medium">{bi.ai_readiness.data_infrastructure}</div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Integration Readiness</div>
                      <div className="text-sm text-text-primary font-medium">{bi.ai_readiness.integration_readiness}</div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Content Needs</div>
                      <div className="text-sm text-text-primary font-medium">{bi.ai_readiness.content_generation_needs}</div>
                    </div>
                    <div className="bg-depth-elevated rounded-lg p-3">
                      <div className="text-xs text-text-muted">Current AI Usage</div>
                      <div className="text-sm text-text-primary font-medium">
                        {bi.ai_readiness.current_ai_usage.length > 0 ? bi.ai_readiness.current_ai_usage.join(', ') : 'None detected'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pain Points */}
                {bi.operations_insights.pain_points.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Identified Pain Points</h3>
                    <ul className="space-y-2">
                      {bi.operations_insights.pain_points.map((pain, index) => (
                        <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                          <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {pain}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Efficiency Opportunities */}
                {bi.operations_insights.efficiency_opportunities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Efficiency Opportunities</h3>
                    <ul className="space-y-2">
                      {bi.operations_insights.efficiency_opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                          <svg className="w-4 h-4 text-growth-emerald mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                          </svg>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Customer Intelligence Gaps */}
                {bi.ai_readiness.customer_intelligence_gaps.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Customer Intelligence Gaps</h3>
                    <div className="flex flex-wrap gap-2">
                      {bi.ai_readiness.customer_intelligence_gaps.map((gap, index) => (
                        <span key={index} className="px-3 py-1 bg-radiance-gold/10 text-radiance-gold rounded-lg text-sm">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Growth Indicators */}
                {bi.operations_insights.growth_indicators.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Growth Indicators</h3>
                    <ul className="space-y-2">
                      {bi.operations_insights.growth_indicators.map((indicator, index) => (
                        <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                          <svg className="w-4 h-4 text-radiance-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                          </svg>
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legacy display for when business intelligence is not available */}
      {!bi && (
        <>
          {/* Tech Stack */}
          {techStack && (techStack.platform || techStack.frameworks?.length) && (
            <div className="bg-depth-surface border border-depth-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Detected Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.platform && (
                  <span className="px-3 py-1 bg-radiance-gold/20 text-radiance-gold rounded-lg text-sm font-medium">
                    {techStack.platform}
                  </span>
                )}
                {techStack.frameworks?.map((framework) => (
                  <span
                    key={framework}
                    className="px-3 py-1 bg-wisdom-violet/20 text-wisdom-violet rounded-lg text-sm"
                  >
                    {framework}
                  </span>
                ))}
                {techStack.hosting && (
                  <span className="px-3 py-1 bg-depth-elevated text-text-secondary rounded-lg text-sm">
                    {techStack.hosting}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Readiness Brief */}
          <div className="bg-depth-surface border border-depth-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Readiness Assessment</h3>
            <p className="text-text-secondary leading-relaxed">{readinessBrief}</p>
          </div>

          {/* Capacity Gap */}
          <div className="bg-depth-surface border border-depth-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Capacity Gap Analysis</h3>
            <p className="text-text-secondary leading-relaxed">{capacityGapBrief}</p>
          </div>
        </>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/5 border border-radiance-gold/20 rounded-2xl p-8 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-text-primary mb-3">
            Ready to Unlock Your AI Potential?
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto">
            Book your strategic session to receive your complete AI Readiness Diagnostic Report, detailed Capacity Gap Analysis,
            and personalized AI transformation strategies for your business.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <svg className="w-4 h-4 text-radiance-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>90-minute deep-dive session</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <svg className="w-4 h-4 text-radiance-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Complete readiness report</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <svg className="w-4 h-4 text-radiance-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Custom AI roadmap</span>
          </div>
        </div>

        {bookingError && (
          <p className="text-red-400 text-sm mb-4">{bookingError}</p>
        )}
        <Button
          onClick={handleBookSession}
          isLoading={isBooking}
          size="lg"
          className="px-10"
        >
          Book Strategic Session - $500
        </Button>
        <p className="mt-4 text-sm text-text-muted">
          Secure payment via Stripe • Schedule after purchase
        </p>
      </div>
    </div>
  );
};

export default ReadinessReport;
