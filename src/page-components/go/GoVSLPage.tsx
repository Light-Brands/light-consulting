'use client';

import React, { useState, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { ApplicationModal } from '@/components/go/ApplicationModal';
import { YouTubeEmbed } from '@/components/go/YouTubeEmbed';

// Placeholder video ID — replace with actual VSL
const VSL_VIDEO_ID = 'dQw4w9WgXcQ';

export const GoVSLPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="min-h-screen bg-depth-base">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radiance-gold/5 blur-[150px] rounded-full pointer-events-none" />

        <Container size="wide" className="relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Headline */}
            <div className="space-y-4 animate-fade-in">
              <p className="text-radiance-gold text-sm font-bold uppercase tracking-wider">
                Website Development Agencies:
              </p>
              <Heading
                level="h1"
                className="text-4xl md:text-5xl lg:text-6xl leading-tight"
              >
                We&apos;ll Install AI OS That Guarantees You To Add $100K In Profit &amp; Save You 100 Hours Per Week{' '}
                <span className="block text-radiance-gold mt-2">
                  -- Or You Don&apos;t Pay
                </span>
              </Heading>
            </div>

            {/* VSL Video */}
            <div className="max-w-[900px] mx-auto animate-slide-up">
              <YouTubeEmbed videoId={VSL_VIDEO_ID} />
            </div>

            {/* CTA */}
            <div className="animate-slide-up pt-4">
              <Button
                variant="primary"
                size="xl"
                onClick={openModal}
                className="shadow-illumination hover:shadow-[0_0_40px_rgba(201,148,10,0.35)] transition-shadow duration-500"
              >
                Schedule Call Here
              </Button>
            </div>
          </div>
        </Container>

      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-depth-base/90 backdrop-blur-md border-t border-depth-border md:hidden">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={openModal}
          className="shadow-illumination"
        >
          Schedule Call Here
        </Button>
      </div>

      {/* Application Modal */}
      <ApplicationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default GoVSLPage;
