/**
 * About Page
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  Button,
  Card,
  Tag,
  SparkleIcon,
  CheckIcon,
  ImagePlaceholder,
} from '../components';
import { PHILOSOPHY_ITEMS, COMPANY_VALUES, INDUSTRIES_SERVED, IMAGE_CONFIG, FOUNDERS_INTRO, FOUNDER_FAMILIES } from '../lib/constants';
import { PageKey } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageKey) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [showHeroPrompt, setShowHeroPrompt] = useState(false);

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero */}
      <section className="section-spacing relative">
        {/* Hero Image Prompt Button */}
        <button
          onClick={() => setShowHeroPrompt(!showHeroPrompt)}
          className="absolute top-4 right-6 z-20 w-10 h-10 rounded-full bg-depth-base/80 border border-depth-border flex items-center justify-center hover:bg-depth-elevated transition-colors group"
          title="View hero background image prompt"
        >
          <svg className="w-5 h-5 text-radiance-gold group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        {showHeroPrompt && (
          <div className="absolute top-16 right-6 z-20 w-96 p-5 bg-depth-base/95 border border-depth-border rounded-brand-card shadow-xl animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <span className="text-radiance-gold font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                About Hero Background
              </span>
              <button onClick={() => setShowHeroPrompt(false)} className="text-text-muted hover:text-text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-3 bg-depth-elevated rounded-lg mb-3">
              <p className="text-text-secondary text-sm leading-relaxed">{IMAGE_CONFIG.heroes.about.prompt}</p>
            </div>
            <p className="text-text-muted text-xs">
              <span className="text-radiance-gold">Dimensions:</span> {IMAGE_CONFIG.heroes.about.dimensions}
            </p>
          </div>
        )}

        <div className="container-wide">
          <div className="max-w-3xl">
            <Tag variant="premium" className="mb-4">
              About Us
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Illuminate the Path Between{' '}
              <span className="text-radiance-gold">Where You Are</span> and{' '}
              <span className="text-clarity-cream">Where AI Can Take You</span>
            </h1>
            <p className="text-text-secondary text-lg mb-4">
              Light Brand Consulting exists to help businesses see and realize their
              fullest AI potential—not through dependency, but through clarity.
            </p>
            <p className="text-text-muted">
              We're not here to become your permanent AI team. We're here to give you the clarity
              and confidence to move forward—and then get out of your way.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Team Photo Placeholder */}
            <div className="order-2 lg:order-1">
              <ImagePlaceholder
                src={IMAGE_CONFIG.about.team.src}
                alt={IMAGE_CONFIG.about.team.alt}
                prompt={IMAGE_CONFIG.about.team.prompt}
                dimensions={IMAGE_CONFIG.about.team.dimensions}
                aspectRatio="video"
                className="mb-6"
              />
              <ImagePlaceholder
                src={IMAGE_CONFIG.about.origin.src}
                alt={IMAGE_CONFIG.about.origin.alt}
                prompt={IMAGE_CONFIG.about.origin.prompt}
                dimensions={IMAGE_CONFIG.about.origin.dimensions}
                aspectRatio="video"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Tag variant="default" className="mb-4">
                Our Origin
              </Tag>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Why We Built Light Brand Consulting
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  We've spent years watching businesses struggle with AI. Not because AI is hard to understand—
                  but because the people explaining it make it complicated. Jargon-filled presentations.
                  Endless "assessments" that never lead anywhere. Consultants who seem more interested in
                  extending engagements than delivering results.
                </p>
                <p>
                  The truth is: most businesses already have what they need to benefit from AI. The opportunities
                  are hiding in plain sight. What's missing isn't more technology or bigger budgets. It's
                  <span className="text-radiance-gold font-medium"> clarity</span>.
                </p>
                <p>
                  That's why we built Light Brand Consulting. We wanted to create a different kind of AI
                  consulting—one focused on speed, clarity, and independence. One conversation. Clear insights.
                  Actionable next steps. No ongoing dependency required.
                </p>
              </div>
            </div>

            <Card elevation="elevated" className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <SparkleIcon className="text-radiance-gold" size={24} />
                <h3 className="text-xl font-bold text-text-primary">
                  The Light Touch
                </h3>
              </div>
              <p className="text-text-secondary mb-6">
                The name "Light" isn't accidental. It captures everything we believe:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-radiance-gold/10 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">Illumination</p>
                    <p className="text-text-muted text-sm">We shine light on what's already there—we don't add something foreign</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-radiance-amber/10 text-radiance-amber flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">Light Touch</p>
                    <p className="text-text-muted text-sm">We engage with minimum friction, maximum impact</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-clarity-cream/10 text-clarity-cream flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">Light Weight</p>
                    <p className="text-text-muted text-sm">We're here and gone—not embedded for months</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="premium" className="mb-4">
              Our Founders
            </Tag>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              {FOUNDERS_INTRO.headline}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {FOUNDERS_INTRO.tagline}
            </p>
          </div>

          <div className="space-y-12">
            {FOUNDER_FAMILIES.map((family, familyIndex) => (
              <div key={family.familyName} className="relative">
                {/* Family Name Badge */}
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px flex-1 bg-depth-border max-w-[100px]" />
                  <span className="px-4 text-radiance-gold font-semibold text-sm uppercase tracking-wider">
                    The {family.familyName} Family
                  </span>
                  <div className="h-px flex-1 bg-depth-border max-w-[100px]" />
                </div>

                {/* Family Members */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {family.members.map((member, memberIndex) => (
                    <Card key={member.name} elevation="subtle" className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Avatar Placeholder */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center text-depth-base font-bold text-xl flex-shrink-0">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-text-primary mb-1">
                            {member.name}
                          </h3>
                          <p className="text-radiance-gold text-sm font-medium mb-3">
                            {member.role}
                          </p>
                          <p className="text-text-secondary text-sm leading-relaxed">
                            {member.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="text-center mt-12">
            <Card elevation="elevated" className="inline-block p-8 max-w-2xl">
              <SparkleIcon className="text-radiance-gold mx-auto mb-4" size={32} />
              <p className="text-text-primary text-lg font-medium italic">
                "{FOUNDERS_INTRO.closing}"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              The Light Touch Principle
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We believe consulting should create capacity, not dependency.
              Our approach reveals what's already within your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PHILOSOPHY_ITEMS.map((item, index) => (
              <Card key={index} elevation="subtle" className="text-center">
                <div
                  className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-${item.accent}/10`}
                >
                  <SparkleIcon
                    size={28}
                    className={`text-${item.accent}`}
                    style={{ color: item.accent === 'radiance-gold' ? '#E8B84A' : item.accent === 'radiance-amber' ? '#D4944C' : '#FDF6E3' }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Belief */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-narrow">
          <Card elevation="elevated" className="p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-radiance-gold/5 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Our Belief About This Moment
              </h2>

              <div className="space-y-6 text-text-secondary">
                <p>
                  We're in a strategic moment. <span className="text-radiance-gold font-semibold">2024-2026 will be remembered the way we remember 1995 for the web, 2008 for mobile.</span> The businesses that move now—with clarity, not chaos—will define the next decade.
                </p>

                <p>
                  But here's what most AI consultants won't tell you: the opportunity isn't in doing everything AI can do. It's in doing the right things AI can do <em>for your specific business</em>. Most companies don't need a 50-point AI transformation roadmap. They need to identify the 3-5 opportunities that will actually move the needle—and then execute on them.
                </p>

                <p>
                  That's what illumination means. Not adding complexity. Not creating dependency. Just <span className="text-radiance-gold font-medium">clarity</span>—about what's possible, what's practical, and what's powerful for you.
                </p>

                <p className="border-l-4 border-radiance-gold pl-4 italic">
                  "The businesses that win won't be the ones that did the most AI. They'll be the ones that did the right AI, at the right time, in the right places."
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Company Values */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="premium" className="mb-4">
              Our Values
            </Tag>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              What We Stand For
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              These aren't just words on a wall. They're how we make decisions, every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPANY_VALUES.map((value, index) => (
              <Card key={index} elevation="subtle" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-radiance-gold/10 text-radiance-gold flex items-center justify-center flex-shrink-0">
                    <CheckIcon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            What Makes Us Different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Business First, Technology Second
                </h3>
                <p className="text-text-secondary">
                  We don't lead with AI jargon. We lead with your business reality, your challenges, your opportunities. AI is the tool—your success is the goal. Every recommendation ties directly to business outcomes you care about.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Clarity Over Complexity
                </h3>
                <p className="text-text-secondary">
                  Every recommendation we make passes a simple test: "Will this make things clearer or more complicated?" We choose clarity every time. If we can't explain it in plain language, we don't recommend it.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Speed With Intention
                </h3>
                <p className="text-text-secondary">
                  The window is open now. We move fast—but with purpose. A 70% solution today beats a 100% solution in six months. We help you make progress while others are still planning.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Independence as the Goal
                </h3>
                <p className="text-text-secondary">
                  The best outcome isn't ongoing dependency on us. It's you seeing clearly, moving confidently, and building capacity that compounds. We want to become unnecessary as quickly as possible.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Revelation, Not Imposition
                </h3>
                <p className="text-text-secondary">
                  Your business already contains its own genius. We don't impose external frameworks—we reveal what's already there and show you how AI amplifies it. The best solutions feel obvious in hindsight.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Quality Over Quantity
                </h3>
                <p className="text-text-secondary">
                  We work with a limited number of clients at a time. This isn't about scale—it's about impact. Every engagement gets our full attention and best thinking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Industries We Serve
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              AI opportunities exist in every industry. Our expertise spans:
            </p>
          </div>

          {/* Industries Visual */}
          <div className="max-w-4xl mx-auto mb-8">
            <ImagePlaceholder
              src={IMAGE_CONFIG.about.industries.src}
              alt={IMAGE_CONFIG.about.industries.alt}
              prompt={IMAGE_CONFIG.about.industries.prompt}
              dimensions={IMAGE_CONFIG.about.industries.dimensions}
              aspectRatio="wide"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {INDUSTRIES_SERVED.map((industry, index) => (
              <Card key={index} elevation="subtle" className="p-4 text-center">
                <p className="text-text-primary text-sm font-medium">{industry}</p>
              </Card>
            ))}
          </div>

          <p className="text-text-muted text-sm text-center mt-8 max-w-2xl mx-auto">
            The specific AI opportunities vary by industry, but the approach is the same:
            understand your unique context, reveal the opportunities hiding in plain sight,
            and give you a clear path forward.
          </p>
        </div>
      </section>

      {/* Working With Us */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              What It's Like Working With Us
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'We listen first',
                description: 'Before we offer any insights, we make sure we deeply understand your situation. Your context matters more than generic AI trends.',
              },
              {
                title: 'We speak your language',
                description: 'No technical jargon, no buzzwords. We explain everything in terms of business outcomes you care about.',
              },
              {
                title: 'We\'re honest about limits',
                description: 'If AI isn\'t the right answer, we\'ll tell you. If you\'re not ready, we\'ll tell you that too. The truth serves you better.',
              },
              {
                title: 'We move fast',
                description: 'Our engagements are measured in hours, days, and weeks—not months. You\'ll have clarity quickly.',
              },
              {
                title: 'We let go',
                description: 'The goal is your independence. We give you everything you need to move forward without us.',
              },
            ].map((item, index) => (
              <Card key={index} elevation="subtle" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-radiance-gold text-depth-base flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to See Clearly?
          </h2>
          <p className="text-text-secondary mb-4">
            Start with an Illumination Session. In 90 minutes, you'll see your business in a new light.
          </p>
          <p className="text-text-muted text-sm mb-8 max-w-lg mx-auto">
            No sales pitch. No obligation. Just clarity about what AI can actually do for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('book')}
            >
              Book Your Session
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => onNavigate('contact')}
            >
              Have Questions? Let's Talk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
