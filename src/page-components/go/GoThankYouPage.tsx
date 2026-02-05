'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Grid } from '@/components/ui/Container';
import { YouTubeEmbed } from '@/components/go/YouTubeEmbed';
import { TESTIMONIALS } from '@/lib/constants';
import { PORTFOLIO_PROJECTS } from '@/data/projects';

// Placeholder - replace with actual pre-frame video ID
const PREFRAME_VIDEO_ID = 'dQw4w9WgXcQ';

export const GoThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-depth-base">
      {/* Disclaimer Block */}
      <section className="pt-16 pb-8 px-4">
        <Container size="narrow" className="text-center space-y-4">
          <div className="inline-block px-4 py-2 rounded-lg bg-error/10 border border-error/20">
            <p className="text-error font-bold text-sm uppercase tracking-wider">
              Disclaimer
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
            Please Watch The Short Video Below To Understand Exactly How Our
            Offer And Pricing Works <strong>BEFORE</strong> Your Call...
          </Text>
        </Container>
      </section>

      {/* Pre-Frame Video */}
      <section className="pb-4 px-4">
        <Container size="default">
          <div className="max-w-[900px] mx-auto">
            <YouTubeEmbed videoId={PREFRAME_VIDEO_ID} />
          </div>
        </Container>
      </section>

      {/* Video Speed Instruction */}
      <section className="pb-16 px-4">
        <Container size="default">
          <p className="text-text-muted text-sm text-center">
            Click The &apos;Cog&apos; Icon Above For 1.5x Or 2x Speed
          </p>
        </Container>
      </section>

      {/* Logo Grid */}
      <section className="py-16 bg-depth-surface px-4">
        <Container size="wide">
          <p className="text-text-muted text-xs font-bold uppercase tracking-wider text-center mb-12 max-w-3xl mx-auto">
            Trusted By Over 2,100+ High-Ticket Coaches, Agencies, And Online Service Providers Like:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {PORTFOLIO_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="relative aspect-video rounded-lg overflow-hidden border border-depth-border bg-depth-elevated"
              >
                <Image
                  src={project.image_url}
                  alt={project.client_name || project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials & Case Studies */}
      <section className="py-16 px-4">
        <Container size="wide">
          <Heading level="h2" className="text-2xl md:text-3xl text-center mb-12">
            Used By 7 &amp; 8-Figure Agencies And Enterprise Businesses
          </Heading>

          <Grid cols={3} gap={6}>
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.id}
                elevation="elevated"
                padding="lg"
                className="flex flex-col"
              >
                <blockquote className="text-text-secondary text-base leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-depth-border">
                  <p className="font-semibold text-text-primary text-sm">
                    {t.author}
                  </p>
                  <p className="text-text-muted text-xs">
                    {t.role}, {t.company}
                  </p>
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
