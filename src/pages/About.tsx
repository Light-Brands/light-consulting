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
  ValueIcon,
  IndustryIcon,
} from '../components';
import { COMPANY_VALUES, INDUSTRIES_SERVED, IMAGE_CONFIG, FOUNDERS_INTRO, FOUNDER_FAMILIES } from '../lib/constants';
import { PageKey } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageKey) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero */}
      <section 
        className="section-spacing relative"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.about.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-depth-base/80" />
        
        {/* Bottom fade gradient - dissolves into next section */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.5) 50%, rgba(15, 14, 13, 1) 100%)',
          }}
        />
        
        <div className="container-wide relative z-10">
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

      {/* Origin Story - Centered and Prominent */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <Tag variant="default" className="mb-4">
              Our Origin
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Why We Built Light Brand Consulting
            </h2>
          </div>
          
          <Card elevation="elevated" className="p-8 md:p-12 relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-radiance-gold/5 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                We've spent years watching businesses struggle with AI. Not because AI is hard to understand—
                but because the people explaining it make it complicated. Jargon-filled presentations.
                Endless "assessments" that never lead anywhere. Consultants who seem more interested in
                extending engagements than delivering results.
              </p>
              <p>
                The truth is: most businesses already have what they need to benefit from AI. The opportunities
                are hiding in plain sight. What's missing isn't more technology or bigger budgets. It's
                <span className="text-radiance-gold font-semibold"> clarity</span>.
              </p>
              <p>
                That's why we built Light Brand Consulting. We wanted to create a different kind of AI
                consulting—one focused on speed, clarity, and independence. One conversation. Clear insights.
                Actionable next steps. No ongoing dependency required.
              </p>
            </div>
            
            {/* The Light Touch - Integrated */}
            <div className="mt-10 pt-8 border-t border-depth-border">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <SparkleIcon className="text-radiance-gold" size={24} />
                <h3 className="text-xl font-bold text-text-primary">
                  Why "Light"?
                </h3>
              </div>
              <p className="text-text-muted text-center mb-6">
                The name isn't accidental. It captures everything we believe:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-radiance-gold/10 text-radiance-gold flex items-center justify-center mx-auto mb-3 font-bold">
                    1
                  </div>
                  <p className="text-text-primary font-semibold mb-1">Illumination</p>
                  <p className="text-text-muted text-sm">We shine light on what's already there</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-radiance-amber/10 text-radiance-amber flex items-center justify-center mx-auto mb-3 font-bold">
                    2
                  </div>
                  <p className="text-text-primary font-semibold mb-1">Light Touch</p>
                  <p className="text-text-muted text-sm">Minimum friction, maximum impact</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-clarity-cream/10 text-clarity-cream flex items-center justify-center mx-auto mb-3 font-bold">
                    3
                  </div>
                  <p className="text-text-primary font-semibold mb-1">Light Weight</p>
                  <p className="text-text-muted text-sm">Here and gone—not embedded for months</p>
                </div>
              </div>
            </div>
          </Card>
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
            {FOUNDER_FAMILIES.map((family) => (
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
                  {family.members.map((member) => {
                    const imagePath = `/images/founders/${member.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
                    const initials = member.name.split(' ').map(n => n[0]).join('');
                    
                    return (
                      <Card key={member.name} elevation="subtle" className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Founder Avatar */}
                          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-depth-elevated">
                            <img
                              src={imagePath}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center text-depth-base font-bold text-xl">${initials}</div>`;
                              }}
                            />
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
                    );
                  })}
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

      {/* Our Belief About This Moment */}
      <section className="section-spacing">
        <div className="container-narrow">
          <Card elevation="elevated" className="p-8 md:p-12 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-radiance-gold/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-radiance-amber/5 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <SparkleIcon className="text-radiance-gold mx-auto mb-4" size={32} />
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                The Strategic Moment
              </h2>

              <p className="text-text-secondary text-lg mb-6 max-w-2xl mx-auto">
                <span className="text-radiance-gold font-semibold">2024-2026 will be remembered the way we remember 1995 for the web, 2008 for mobile.</span> The businesses that move now—with clarity, not chaos—will define the next decade.
              </p>

              <p className="border-l-4 border-radiance-gold pl-4 text-left italic text-text-muted max-w-xl mx-auto">
                "The businesses that win won't be the ones that did the most AI. They'll be the ones that did the right AI, at the right time, in the right places."
              </p>
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
            {COMPANY_VALUES.map((value, index) => {
              const iconKeyMap: Record<string, keyof typeof IMAGE_CONFIG.values> = {
                'Radical Honesty': 'radicalHonesty',
                'Outcome Obsession': 'outcomeObsession',
                'Intellectual Humility': 'intellectualHumility',
                'Client Independence': 'clientIndependence',
              };
              const iconKey = iconKeyMap[value.title] || 'radicalHonesty';
              const iconConfig = IMAGE_CONFIG.values[iconKey];

              return (
                <Card key={index} elevation="subtle" className="p-6">
                  <ValueIcon
                    src={iconConfig?.src}
                    alt={iconConfig?.alt || value.title}
                    title={value.title}
                    description={value.description}
                  />
                </Card>
              );
            })}
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

          {/* Industries Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {INDUSTRIES_SERVED.map((industry, index) => {
              const industryKeyMap: Record<string, keyof typeof IMAGE_CONFIG.industries> = {
                'Healthcare & Life Sciences': 'healthcare',
                'Financial Services': 'finance',
                'E-commerce & Retail': 'ecommerce',
                'Professional Services': 'professional',
                'Manufacturing & Logistics': 'manufacturing',
                'Media & Entertainment': 'media',
                'Education & EdTech': 'education',
                'Real Estate & PropTech': 'realestate',
              };
              const iconKey = industryKeyMap[industry] || 'healthcare';
              const iconConfig = IMAGE_CONFIG.industries[iconKey];

              return (
                <IndustryIcon
                  key={index}
                  src={iconConfig?.src}
                  alt={iconConfig?.alt || industry}
                  label={industry}
                />
              );
            })}
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

      {/* Stewardship Council */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag variant="premium" className="mb-4">
                Our Partnership Philosophy
              </Tag>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                The Stewardship Council
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  We don't want to work with everyone—and that's intentional. We believe those 
                  meant to work with us will come forward, equally excited as we are to greet 
                  them with open arms.
                </p>
                <p>
                  Our mission is to <span className="text-radiance-gold font-medium">steward light to the planet</span>. 
                  We only want to work with brands that share this mindset—those ready to step into the light.
                </p>
                <p>
                  For brands that align with our values, we offer <span className="text-radiance-gold font-medium">full implementation 
                  and Brand Development services</span>. This opportunity only becomes available after completing 
                  an AI Acceleration Blueprint, which is what empowers the development.
                </p>
              </div>
            </div>

            <Card elevation="elevated" className="p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6">
                The Council Review Process
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Comprehensive Review',
                    description: 'We evaluate your concept, business model, and overall approach to ensure alignment.',
                  },
                  {
                    step: '02',
                    title: 'Founder Interviews',
                    description: 'We conduct in-depth conversations with founders to understand vision and values.',
                  },
                  {
                    step: '03',
                    title: 'Mutual Alignment',
                    description: 'We ensure both parties are ready and excited to work together toward a shared mission.',
                  },
                  {
                    step: '04',
                    title: 'Brand Development',
                    description: 'Aligned partners gain access to full implementation and development services.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-radiance-gold/10 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-text-primary font-medium mb-1">{item.title}</h4>
                      <p className="text-text-muted text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-depth-border">
                <p className="text-text-muted text-sm italic">
                  "We believe in working deeply with the right partners rather than broadly with anyone who asks."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-depth-elevated">
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
