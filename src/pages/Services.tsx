/**
 * Services Page
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  Card,
  Tag,
  ServiceCard,
  LightbulbIcon,
  BlueprintIcon,
  BookIcon,
  CheckIcon,
  SparkleIcon,
  ImagePlaceholder,
} from '../components';
import { SERVICES, SUCCESS_METRICS, IMAGE_CONFIG } from '../lib/constants';
import { PageKey } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageKey) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [showHeroPrompt, setShowHeroPrompt] = useState(false);

  const serviceIcons: Record<string, React.ReactNode> = {
    illumination: <LightbulbIcon size={24} />,
    blueprint: <BlueprintIcon size={24} />,
    story: <BookIcon size={24} />,
  };

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
                Services Hero Background
              </span>
              <button onClick={() => setShowHeroPrompt(false)} className="text-text-muted hover:text-text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-3 bg-depth-elevated rounded-lg mb-3">
              <p className="text-text-secondary text-sm leading-relaxed">{IMAGE_CONFIG.heroes.services.prompt}</p>
            </div>
            <p className="text-text-muted text-xs">
              <span className="text-radiance-gold">Dimensions:</span> {IMAGE_CONFIG.heroes.services.dimensions}
            </p>
          </div>
        )}

        <div className="container-wide">
          <div className="text-center mb-16">
            <Tag variant="premium" className="mb-4">
              Services
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Illuminate Your Path Forward
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-4">
              Three distinct offerings, each designed to meet you where you are
              and take you where you need to go.
            </p>
            <p className="text-text-muted max-w-xl mx-auto">
              Every engagement ends with you having more clarity and capability than when you started—not more dependency on us.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(SERVICES).map(([key, service]) => (
              <ServiceCard
                key={key}
                service={service}
                featured={key === 'blueprint'}
                icon={serviceIcons[key]}
                onLearnMore={() => onNavigate(`services/${key}` as PageKey)}
                onBook={() => onNavigate('book')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="default" className="mb-4">
              Track Record
            </Tag>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Results That Speak
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Clarity creates momentum. Momentum creates results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {SUCCESS_METRICS.map((item, index) => (
              <Card key={index} elevation="subtle" className="text-center p-6">
                <p className="text-3xl md:text-4xl font-black text-radiance-gold mb-2">
                  {item.metric}
                </p>
                <p className="text-text-primary font-semibold text-sm mb-1">
                  {item.label}
                </p>
                <p className="text-text-muted text-xs">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work - Deep Dive */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              How We Work
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Every engagement follows the Light Touch principle: reveal, don't impose.
              We illuminate what's already within your business—we don't invent something foreign.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="mb-4">
                <ImagePlaceholder
                  src={IMAGE_CONFIG.process.discover.src}
                  alt={IMAGE_CONFIG.process.discover.alt}
                  prompt={IMAGE_CONFIG.process.discover.prompt}
                  dimensions={IMAGE_CONFIG.process.discover.dimensions}
                  aspectRatio="square"
                  className="w-24 h-24 mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Discover
              </h3>
              <p className="text-text-secondary mb-4">
                We start by deeply understanding your unique context, challenges, and aspirations. No templates, no assumptions.
              </p>
              <ul className="text-left text-text-muted text-sm space-y-2 max-w-xs mx-auto">
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                  <span>Business model deep-dive</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                  <span>Current pain points and goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                  <span>Existing tech and team capabilities</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <ImagePlaceholder
                  src={IMAGE_CONFIG.process.illuminate.src}
                  alt={IMAGE_CONFIG.process.illuminate.alt}
                  prompt={IMAGE_CONFIG.process.illuminate.prompt}
                  dimensions={IMAGE_CONFIG.process.illuminate.dimensions}
                  aspectRatio="square"
                  className="w-24 h-24 mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Illuminate
              </h3>
              <p className="text-text-secondary mb-4">
                We reveal the AI opportunities that already exist within your business—hidden in plain sight until now.
              </p>
              <ul className="text-left text-text-muted text-sm space-y-2 max-w-xs mx-auto">
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-radiance-amber mt-1 flex-shrink-0" />
                  <span>Opportunity identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-radiance-amber mt-1 flex-shrink-0" />
                  <span>Feasibility and impact analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-radiance-amber mt-1 flex-shrink-0" />
                  <span>Priority ranking with rationale</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <ImagePlaceholder
                  src={IMAGE_CONFIG.process.activate.src}
                  alt={IMAGE_CONFIG.process.activate.alt}
                  prompt={IMAGE_CONFIG.process.activate.prompt}
                  dimensions={IMAGE_CONFIG.process.activate.dimensions}
                  aspectRatio="square"
                  className="w-24 h-24 mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Activate
              </h3>
              <p className="text-text-secondary mb-4">
                You leave with clear, actionable next steps—not dependency on us. The goal is your independence.
              </p>
              <ul className="text-left text-text-muted text-sm space-y-2 max-w-xs mx-auto">
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-clarity-cream mt-1 flex-shrink-0" />
                  <span>Concrete action plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-clarity-cream mt-1 flex-shrink-0" />
                  <span>Decision frameworks to use</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-clarity-cream mt-1 flex-shrink-0" />
                  <span>Resources to continue independently</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Service Comparison Table */}
          <Card elevation="elevated" className="overflow-hidden">
            <div className="p-6 border-b border-depth-border">
              <h3 className="text-xl font-bold text-text-primary">
                Choose the Right Service for You
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-depth-border">
                    <th className="p-4 text-left text-text-muted text-sm font-medium">Criteria</th>
                    <th className="p-4 text-center text-radiance-gold font-semibold">Illumination</th>
                    <th className="p-4 text-center text-radiance-amber font-semibold">Blueprint</th>
                    <th className="p-4 text-center text-clarity-cream font-semibold">Story</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Best For</td>
                    <td className="p-4 text-center text-text-primary">First clarity session</td>
                    <td className="p-4 text-center text-text-primary">Full strategy needed</td>
                    <td className="p-4 text-center text-text-primary">Thought leadership</td>
                  </tr>
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Investment</td>
                    <td className="p-4 text-center text-text-primary">$500</td>
                    <td className="p-4 text-center text-text-primary">$3,000 – $7,500</td>
                    <td className="p-4 text-center text-text-primary">$2,500 – $12,000</td>
                  </tr>
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Duration</td>
                    <td className="p-4 text-center text-text-primary">90 minutes</td>
                    <td className="p-4 text-center text-text-primary">5–7 days</td>
                    <td className="p-4 text-center text-text-primary">2–6 weeks</td>
                  </tr>
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Your Time</td>
                    <td className="p-4 text-center text-text-primary">90 min</td>
                    <td className="p-4 text-center text-text-primary">5–6 hours</td>
                    <td className="p-4 text-center text-text-primary">5–8 hours</td>
                  </tr>
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Primary Deliverable</td>
                    <td className="p-4 text-center text-text-primary">3 opportunities + plan</td>
                    <td className="p-4 text-center text-text-primary">Full strategy deck</td>
                    <td className="p-4 text-center text-text-primary">Narrative framework</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-text-secondary">Perfect If You're...</td>
                    <td className="p-4 text-center text-text-primary">Exploring possibilities</td>
                    <td className="p-4 text-center text-text-primary">Ready to commit</td>
                    <td className="p-4 text-center text-text-primary">Building authority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag variant="premium" className="mb-4">
                Our Difference
              </Tag>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Not Your Typical AI Consultants
              </h2>
              <p className="text-text-secondary mb-6">
                We've seen what happens when businesses engage traditional consulting firms for AI strategy:
                expensive PowerPoints that sit in drawers, 12-month engagements that create dependency, and
                recommendations that sound impressive but don't fit reality.
              </p>
              <p className="text-text-secondary mb-8">
                We built Light Brand Consulting as the antidote. Every service is designed for clarity,
                speed, and your independence.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Fixed Pricing', desc: 'Know exactly what you\'ll pay before you start' },
                  { title: 'Fast Turnaround', desc: 'Days and weeks, not months' },
                  { title: 'Business Language', desc: 'No jargon, no technical gatekeeping' },
                  { title: 'Action-Focused', desc: 'Deliverables you can actually use' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={14} />
                    </div>
                    <div>
                      <span className="text-text-primary font-medium">{item.title}:</span>
                      <span className="text-text-secondary ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card elevation="elevated" className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <SparkleIcon className="text-radiance-gold" size={24} />
                <h3 className="text-xl font-bold text-text-primary">
                  The Typical Path
                </h3>
              </div>

              <div className="space-y-6">
                <div className="relative pl-8 pb-6 border-l-2 border-depth-border">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-radiance-gold" />
                  <p className="text-text-primary font-medium">Start: Illumination Session</p>
                  <p className="text-text-muted text-sm">Get clarity on your AI opportunities</p>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-depth-border">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-radiance-amber" />
                  <p className="text-text-primary font-medium">If Ready: Blueprint</p>
                  <p className="text-text-muted text-sm">Full strategic roadmap for implementation</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-clarity-cream" />
                  <p className="text-text-primary font-medium">Build Authority: Story</p>
                  <p className="text-text-muted text-sm">Position yourself as a thought leader</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-depth-border">
                <p className="text-text-muted text-sm italic">
                  Most clients start with an Illumination Session. 60% continue to Blueprint.
                  30% add Story work. But each service delivers standalone value.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Common Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'Which service should I start with?',
                a: 'Most clients start with an Illumination Session. It\'s the fastest way to see what AI can do for your specific business. If you already know you need a comprehensive strategy, go straight to Blueprint.',
              },
              {
                q: 'Can you help us implement the recommendations?',
                a: 'Our focus is strategy and clarity, not implementation. However, we maintain relationships with vetted implementation partners and can make warm referrals.',
              },
              {
                q: 'What industries do you work with?',
                a: 'We\'ve worked across healthcare, financial services, e-commerce, professional services, manufacturing, media, education, and real estate. AI opportunities exist everywhere.',
              },
              {
                q: 'How do you stay current with AI developments?',
                a: 'AI moves fast. We dedicate significant time to continuous learning, experimentation, and building relationships with AI practitioners. Our recommendations reflect current reality, not last year\'s hype.',
              },
            ].map((item, index) => (
              <Card key={index} elevation="subtle" className="p-6">
                <h4 className="text-text-primary font-semibold mb-2">{item.q}</h4>
                <p className="text-text-secondary text-sm">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Not Sure? */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-narrow text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            Most clients begin with an Illumination Session. In 90 minutes,
            you'll see exactly what AI can do for your business—and have a clear path forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('services/illumination')}
              className="text-radiance-gold hover:text-radiance-amber transition-colors font-medium"
            >
              Learn about Illumination Sessions →
            </button>
            <span className="text-text-muted hidden sm:inline">|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Have questions? Contact us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
