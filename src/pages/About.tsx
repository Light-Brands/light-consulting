/**
 * About Page
 * Light Brand Consulting
 */

import React from 'react';
import {
  Button,
  Card,
  Tag,
  SparkleIcon,
} from '../components';
import { PHILOSOPHY_ITEMS } from '../lib/constants';
import { PageKey } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageKey) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero */}
      <section className="section-spacing">
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
            <p className="text-text-secondary text-lg">
              Light Brand Consulting exists to help businesses see and realize their
              fullest AI potential—not through dependency, but through clarity.
            </p>
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
      <section className="section-spacing">
        <div className="container-narrow">
          <Card elevation="elevated" className="p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-radiance-gold/5 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Our Belief
              </h2>

              <div className="space-y-6 text-text-secondary">
                <p>
                  We're in a strategic moment. 2024-2026 will be remembered the way we remember 1995 for the web, 2008 for mobile. The businesses that move now—with clarity, not chaos—will define the next decade.
                </p>

                <p>
                  But here's what most AI consultants won't tell you: the opportunity isn't in doing everything AI can do. It's in doing the right things AI can do <em>for your specific business</em>.
                </p>

                <p>
                  That's what illumination means. Not adding complexity. Not creating dependency. Just <span className="text-radiance-gold font-medium">clarity</span>—about what's possible, what's practical, and what's powerful for you.
                </p>
              </div>
            </div>
          </Card>
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
                  We don't lead with AI jargon. We lead with your business reality, your challenges, your opportunities. AI is the tool—your success is the goal.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Clarity Over Complexity
                </h3>
                <p className="text-text-secondary">
                  Every recommendation we make passes a simple test: "Will this make things clearer or more complicated?" We choose clarity every time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Speed With Intention
                </h3>
                <p className="text-text-secondary">
                  The window is open now. We move fast—but with purpose. A 70% solution today beats a 100% solution in six months.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Independence as the Goal
                </h3>
                <p className="text-text-secondary">
                  The best outcome isn't ongoing dependency on us. It's you seeing clearly, moving confidently, and building capacity that compounds.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Revelation, Not Imposition
                </h3>
                <p className="text-text-secondary">
                  Your business already contains its own genius. We don't impose external frameworks—we reveal what's already there and show you how AI amplifies it.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Quality Over Quantity
                </h3>
                <p className="text-text-secondary">
                  We work with a limited number of clients at a time. This isn't about scale—it's about impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to See Clearly?
          </h2>
          <p className="text-text-secondary mb-8">
            Start with an Illumination Session. In 90 minutes, you'll see your business in a new light.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('book')}
          >
            Book Your Session
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
