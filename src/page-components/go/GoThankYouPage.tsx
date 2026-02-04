'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Grid } from '@/components/ui/Container';
import { YouTubeEmbed } from '@/components/go/YouTubeEmbed';

// Placeholder — replace with actual pre-frame video ID
const PREFRAME_VIDEO_ID = 'dQw4w9WgXcQ';

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'CEO, E-commerce Brand',
    quote:
      'We cut our operations costs by 40% within the first month. The AI systems they built are now the backbone of our business.',
  },
  {
    name: 'James R.',
    role: 'Founder, SaaS Company',
    quote:
      'Finally someone who understands both the tech and the business side. Our team is 3x more productive with the tools they built.',
  },
  {
    name: 'Michelle T.',
    role: 'Director of Ops, Agency',
    quote:
      'The clarity we got from the AI readiness call alone was worth more than months of trying to figure it out ourselves.',
  },
];

export const GoThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-depth-base">
      {/* Disclaimer Block */}
      <section className="pt-16 pb-8 px-4">
        <Container size="narrow" className="text-center space-y-4">
          <div className="inline-block px-4 py-2 rounded-lg bg-error/10 border border-error/20">
            <p className="text-error font-bold text-sm uppercase tracking-wider">
              Important
            </p>
          </div>
          <Heading level="h1" className="text-3xl md:text-4xl">
            Your Call Is <span className="text-error">NOT</span> Confirmed...
          </Heading>
          <Text
            variant="lead"
            align="center"
            className="text-text-secondary max-w-xl mx-auto"
          >
            Please watch the short video below to understand exactly how our
            offer and pricing works <strong>before</strong> your call.
          </Text>
        </Container>
      </section>

      {/* Pre-Frame Video */}
      <section className="pb-16 px-4">
        <Container size="default">
          <div className="max-w-[900px] mx-auto">
            <YouTubeEmbed videoId={PREFRAME_VIDEO_ID} />
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-depth-surface px-4">
        <Container size="wide">
          {/* Trust strip */}
          <p className="text-text-muted text-xs font-bold uppercase tracking-wider text-center mb-12">
            Trusted by 7 &amp; 8-figure businesses
          </p>

          {/* Testimonials */}
          <Grid cols={3} gap={6}>
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.name}
                elevation="elevated"
                padding="lg"
                className="flex flex-col"
              >
                <blockquote className="text-text-secondary text-base leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-depth-border">
                  <p className="font-semibold text-text-primary text-sm">
                    {t.name}
                  </p>
                  <p className="text-text-muted text-xs">{t.role}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default GoThankYouPage;
