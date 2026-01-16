'use client';

/**
 * Strategic Session Booking Success Page
 * Light Brand Consulting
 *
 * Shows after successful $500 payment, allows scheduling via Calendly
 */

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Section, Button } from '@/components/ui';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('lead_id');
  const paymentStatus = searchParams.get('payment');
  const [isScheduling, setIsScheduling] = useState(false);
  const [hasScheduled, setHasScheduled] = useState(false);

  const calendlyUrl = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendly.com/your-link';

  // Handle scheduling the call
  const handleScheduleCall = async () => {
    setIsScheduling(true);

    // Open Calendly in a new window
    const calendlyWindow = window.open(calendlyUrl, '_blank', 'width=800,height=700');

    if (calendlyWindow && leadId) {
      // Record the booking
      try {
        await fetch('/api/book-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId,
            calendlyLink: calendlyUrl,
          }),
        });
        setHasScheduled(true);
      } catch (error) {
        console.error('Error recording booking:', error);
      }
    }

    setIsScheduling(false);
  };

  // Show error if payment was cancelled
  if (paymentStatus === 'cancelled') {
    return (
      <div className="min-h-screen pt-24 md:pt-32">
        <Section spacing="lg">
          <Container size="narrow">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6">
                <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Payment Cancelled
              </h1>
              <p className="text-text-secondary text-lg mb-8">
                Your payment was cancelled. No charges have been made.
              </p>
              <Button
                onClick={() => window.location.href = '/book'}
                size="lg"
              >
                Return to Booking
              </Button>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-growth-emerald/5 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-growth-emerald/20 to-growth-emerald/5 mb-6">
              <svg className="w-12 h-12 text-growth-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Payment Successful!
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Thank you for investing in your business. Your 90-minute strategic session has been confirmed.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-muted text-sm">Payment Received</span>
              <span className="text-growth-emerald text-sm font-medium">Confirmed</span>
            </div>
            <div className="border-t border-depth-border pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-text-primary font-semibold">90-Minute Strategic Session</h3>
                  <p className="text-text-muted text-sm">Deep-dive AI strategy consultation</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-text-primary">$500</span>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
              What's Included in Your Session
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-radiance-gold/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">Complete AI Readiness Report</h3>
                  <p className="text-sm text-text-secondary">Detailed analysis of your business's AI potential</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-wisdom-violet/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-wisdom-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">Strategic Recommendations</h3>
                  <p className="text-sm text-text-secondary">Actionable AI implementation roadmap</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-growth-emerald/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-growth-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">90 Minutes of Expert Time</h3>
                  <p className="text-sm text-text-secondary">Dedicated session with our AI specialists</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-radiance-amber/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-radiance-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">Custom System Demos</h3>
                  <p className="text-sm text-text-secondary">Personalized AI solutions for your business</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule CTA */}
          <div className="bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/5 border border-radiance-gold/20 rounded-2xl p-8 text-center">
            {hasScheduled ? (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-growth-emerald/20 mb-4">
                  <svg className="w-8 h-8 text-growth-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-text-primary mb-3">
                  You're All Set!
                </h3>
                <p className="text-text-secondary max-w-xl mx-auto mb-6">
                  Check your email for the calendar invite. We're looking forward to speaking with you!
                </p>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  size="lg"
                >
                  Return to Home
                </Button>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-text-primary mb-3">
                    Now, Let's Schedule Your Session
                  </h3>
                  <p className="text-text-secondary max-w-xl mx-auto">
                    Choose a time that works best for you. Our team will be prepared with insights specific to your business.
                  </p>
                </div>
                <Button
                  onClick={handleScheduleCall}
                  isLoading={isScheduling}
                  size="lg"
                  className="px-10"
                >
                  Schedule Your 90-Minute Session
                </Button>
                <p className="mt-4 text-sm text-text-muted">
                  You'll receive a calendar invite and reminder emails
                </p>
              </>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-text-muted">
              Questions? Contact us at{' '}
              <a href="mailto:hello@lightbrand.co" className="text-radiance-gold hover:text-radiance-amber transition-colors">
                hello@lightbrand.co
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <Section spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-depth-surface mb-6 animate-pulse" />
            <div className="h-10 bg-depth-surface rounded-lg w-3/4 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-depth-surface rounded-lg w-1/2 mx-auto animate-pulse" />
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
