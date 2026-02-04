'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

const GHL_CALENDAR_BASE =
  'https://api.leadconnectorhq.com/widget/booking/cyOx6pxq3yWi3iQDCBrT';

export const GoBookPage: React.FC = () => {
  const searchParams = useSearchParams();

  // Pre-fill name and email on the GHL calendar so they only need to add phone
  const calendarParams = new URLSearchParams();
  const firstName = searchParams.get('first_name');
  const lastName = searchParams.get('last_name');
  const email = searchParams.get('email');

  if (firstName) calendarParams.set('first_name', firstName);
  if (lastName) calendarParams.set('last_name', lastName);
  if (email) calendarParams.set('email', email);

  const calendarUrl = calendarParams.toString()
    ? `${GHL_CALENDAR_BASE}?${calendarParams.toString()}`
    : GHL_CALENDAR_BASE;

  return (
    <div className="min-h-screen bg-depth-base flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 text-center px-4">
        <Container size="narrow">
          <Heading level="h1" className="text-3xl md:text-4xl mb-3">
            You&apos;re In - Book Your AI Readiness Call
          </Heading>
          <Text variant="lead" align="center" className="text-text-secondary">
            Pick a time that works. We&apos;ll confirm via email.
          </Text>
        </Container>
      </div>

      {/* Calendar Embed */}
      <div className="flex-1 px-4 pb-16">
        <Container size="default">
          <div className="rounded-2xl border border-depth-border overflow-hidden bg-depth-elevated shadow-elevated">
            <iframe
              src={calendarUrl}
              className="w-full border-0"
              style={{ minHeight: '1200px' }}
              title="Book a call"
              allow="geolocation"
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default GoBookPage;
