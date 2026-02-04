'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export const GoNotAFitPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-depth-base flex items-center justify-center px-4">
      <Container size="narrow" className="text-center space-y-6 py-24">
        <Heading level="h1" className="text-3xl md:text-4xl">
          Thanks for Your Interest
        </Heading>

        <Text
          variant="lead"
          align="center"
          className="text-text-secondary max-w-xl mx-auto"
        >
          Based on your answers, our AI implementation program may not be the
          right fit right now. That doesn&apos;t mean it won&apos;t be in the
          future.
        </Text>

        <Text
          variant="body"
          align="center"
          className="text-text-muted max-w-lg mx-auto"
        >
          In the meantime, here are some resources that might help you on your
          AI journey:
        </Text>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              window.open('https://lightbrandconsulting.com/insights', '_blank')
            }
          >
            Read Our Insights
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() =>
              window.open('https://lightbrandconsulting.com', '_blank')
            }
          >
            Visit Our Website
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default GoNotAFitPage;
