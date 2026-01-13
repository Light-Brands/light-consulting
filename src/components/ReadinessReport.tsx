/**
 * Readiness Report Display
 * Shows AI readiness score, brief, and capacity gap analysis
 * Includes booking call CTA
 */

'use client';

import React, { useState } from 'react';
import { Button } from './ui';
import { cn } from '../lib/utils';

interface ReadinessReportProps {
  readinessScore: number;
  readinessBrief: string;
  capacityGapBrief: string;
  techStack?: {
    platform?: string;
    cms?: string;
    frameworks?: string[];
    hosting?: string;
  };
  leadId?: string;
  onBookCall?: (calendlyLink: string) => void;
}

export const ReadinessReport: React.FC<ReadinessReportProps> = ({
  readinessScore,
  readinessBrief,
  capacityGapBrief,
  techStack,
  leadId,
  onBookCall,
}) => {
  const [isBooking, setIsBooking] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendly.com/your-link';

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

  const handleBookCall = async () => {
    setIsBooking(true);
    try {
      // Open Calendly in new window
      const calendlyWindow = window.open(calendlyUrl, '_blank', 'width=800,height=600');
      
      // Listen for Calendly event (if using Calendly embed)
      if (calendlyWindow && leadId) {
        // In a real implementation, you'd use Calendly's webhook or event API
        // For now, we'll just open the link and record it when they return
        // You could also use a Calendly inline embed with event listeners
        
        // Store the booking attempt
        await fetch('/api/book-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId,
            calendlyLink: calendlyUrl,
          }),
        });
      }
      
      if (onBookCall) {
        onBookCall(calendlyUrl);
      }
    } catch (error) {
      console.error('Error booking call:', error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Your AI Readiness Assessment
        </h1>
        <p className="text-text-secondary text-lg">
          Based on analysis of your website and technology stack
        </p>
      </div>

      {/* Readiness Score */}
      <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className={cn('text-6xl font-bold mb-2', getScoreColor(readinessScore))}>
              {readinessScore}
            </div>
            <div className="text-text-secondary text-lg mb-4">
              {getScoreLabel(readinessScore)}
            </div>
            <div className="w-full max-w-md mx-auto h-2 bg-depth-base rounded-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-1000', getScoreColor(readinessScore))}
                style={{ width: `${readinessScore}%`, backgroundColor: 'currentColor' }}
              />
            </div>
          </div>
        </div>
      </div>

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

      {/* CTA */}
      <div className="text-center pt-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Ready to Get Your Full Report?
          </h3>
          <p className="text-text-secondary">
            Book a call to receive your complete AI Readiness Diagnostic Report, detailed Capacity Gap Analysis, and explore 3 versions of your AI Super Intelligence System.
          </p>
        </div>
        <Button
          onClick={handleBookCall}
          isLoading={isBooking}
          size="lg"
          className="px-8"
        >
          Book Your Diagnostic Call
        </Button>
        <p className="mt-4 text-sm text-text-muted">
          After booking, we'll generate your full reports and system demos
        </p>
      </div>
    </div>
  );
};
