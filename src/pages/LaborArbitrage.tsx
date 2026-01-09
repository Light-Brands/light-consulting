/**
 * Labor Arbitrage Deep Dive Page
 * Comprehensive explanation of AI's disruption to labor economics
 */

import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Tag } from '../components';
import { PageKey } from '../types';

interface LaborArbitragePageProps {
  onNavigate: (page: PageKey) => void;
}

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      animateCount();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, end, duration, startOnView]);

  const animateCount = () => {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOut));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return { count, ref };
};

export const LaborArbitragePage: React.FC<LaborArbitragePageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState(0);
  
  // Animated counters for the main stats
  const humanYears = useAnimatedCounter(60, 2500);
  const aiDays = useAnimatedCounter(30, 2500);
  const costSavings = useAnimatedCounter(72, 3000); // $7.2M represented as 72 (will display as 7.2)
  const linesPerHour = useAnimatedCounter(5000, 2000);
  const efficiencyMultiplier = useAnimatedCounter(9000, 2500);

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radiance-gold/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container-wide relative z-10 py-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <Tag variant="default" className="bg-red-500/10 text-red-400 border-red-500/30">
              Industry Analysis
            </Tag>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-6 max-w-4xl">
            The End of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Labor Arbitrage
            </span>
          </h1>

          <p className="text-xl text-text-secondary mb-8 max-w-2xl">
            For centuries, the entire economic system has been built on one principle: 
            profit from the markup on human labor. AI is about to break that model entirely.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => onNavigate('book')}>
              Get Ahead of This Shift
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('services')}>
              Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* What is Labor Arbitrage */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag variant="default" className="mb-4">Understanding the Model</Tag>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                What is Labor Arbitrage?
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  <span className="text-text-primary font-semibold">Labor arbitrage</span> is the foundation 
                  of how businesses have generated profit for centuries. It's elegantly simple:
                </p>
                <div className="p-4 bg-depth-elevated rounded-lg border-l-4 border-radiance-gold">
                  <p className="text-text-primary italic">
                    "Pay someone X to do work, then sell that work for X + markup."
                  </p>
                </div>
                <p>
                  Every consulting firm, agency, staffing company, and most service businesses operate on this model. 
                  A developer costs $120,000/year. Their work is billed at $200/hour. The difference is profit.
                </p>
                <p>
                  Law firms, accounting practices, marketing agencies, software development shops: the entire
                  professional services industry runs on the gap between what labor costs and what it bills for.
                </p>
              </div>
            </div>

            {/* Visual representation */}
            <Card elevation="elevated" className="p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6 text-center">
                The Traditional Model
              </h3>
              <div className="space-y-6">
                {/* Input */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm">Human Labor Cost</p>
                    <p className="text-2xl font-bold text-red-400">$120,000<span className="text-sm text-text-muted">/year</span></p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="text-xs text-text-muted mt-1">Markup Applied</span>
                  </div>
                </div>

                {/* Output */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm">Billed to Client</p>
                    <p className="text-2xl font-bold text-green-400">$200<span className="text-sm text-text-muted">/hour × 2000 hrs</span></p>
                  </div>
                </div>

                {/* Profit */}
                <div className="pt-4 border-t border-depth-border">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Annual Profit Per Employee</span>
                    <span className="text-2xl font-bold text-radiance-gold">$280,000</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Disruption */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="premium" className="mb-4">The Disruption</Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              AI Breaks the Model
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Let's do the math on what AI means for labor economics.
              We'll use software development as our example, but this applies across industries.
            </p>
          </div>

          {/* The Math Breakdown */}
          <div className="space-y-8">
            {/* Step 1: Human baseline */}
            <Card elevation="elevated" className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    The Human Developer Baseline
                  </h3>
                  <p className="text-text-secondary">
                    A skilled developer produces approximately 5,000 lines of quality, usable code per month.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-depth-base rounded-lg text-center">
                  <p className="text-3xl font-bold text-text-primary">5,000</p>
                  <p className="text-text-muted text-sm">Lines/Month</p>
                </div>
                <div className="p-4 bg-depth-base rounded-lg text-center">
                  <p className="text-3xl font-bold text-text-primary">60,000</p>
                  <p className="text-text-muted text-sm">Lines/Year (avg)</p>
                </div>
                <div className="p-4 bg-depth-base rounded-lg text-center">
                  <p className="text-3xl font-bold text-text-primary">100,000</p>
                  <p className="text-text-muted text-sm">Lines/Year (ninja)</p>
                </div>
                <div className="p-4 bg-depth-base rounded-lg text-center">
                  <p className="text-3xl font-bold text-red-400">6-8 hrs</p>
                  <p className="text-text-muted text-sm">Work Day</p>
                </div>
              </div>
            </Card>

            {/* Step 2: AI capability */}
            <Card elevation="elevated" className="p-8 border-radiance-gold/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    The AI Agent Capability
                  </h3>
                  <p className="text-text-secondary">
                    A well-trained AI agent can produce approximately 5,000 lines of usable code <span className="text-radiance-gold font-semibold">per hour</span>.
                  </p>
                </div>
              </div>

              <div 
                ref={linesPerHour.ref}
                className="p-8 bg-gradient-to-r from-radiance-gold/10 to-radiance-amber/10 rounded-xl text-center mb-6"
              >
                <p className="text-6xl md:text-7xl font-black text-radiance-gold mb-2">
                  {linesPerHour.count.toLocaleString()}
                </p>
                <p className="text-text-secondary">Lines of Code Per Hour</p>
              </div>

              <div className="p-4 bg-depth-base rounded-lg border-l-4 border-radiance-gold">
                <p className="text-text-primary font-semibold mb-1">Initial Math:</p>
                <p className="text-text-secondary">
                  1 hour of AI development = 1 month of human development
                </p>
              </div>
            </Card>

            {/* Step 3: The multiplier */}
            <Card elevation="elevated" className="p-8 bg-gradient-to-br from-depth-elevated to-depth-base">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-radiance-amber/20 text-radiance-amber flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Here's Where It Gets Interesting
                  </h3>
                  <p className="text-text-secondary">
                    That human developer was only working 6-8 hours a day, 5 days a week. 
                    The AI has capacity to work <span className="text-radiance-gold font-semibold">24/7</span>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-depth-base rounded-xl">
                  <p className="text-4xl font-bold text-text-primary mb-2">24</p>
                  <p className="text-text-muted text-sm">Hours Per Day</p>
                </div>
                <div className="text-center p-6 bg-depth-base rounded-xl">
                  <p className="text-4xl font-bold text-text-primary mb-2">×</p>
                  <p className="text-text-muted text-sm">Multiplied By</p>
                </div>
                <div className="text-center p-6 bg-depth-base rounded-xl">
                  <p className="text-4xl font-bold text-text-primary mb-2">30</p>
                  <p className="text-text-muted text-sm">Days Per Month</p>
                </div>
              </div>

              <div className="text-center p-8 bg-radiance-gold/10 rounded-xl border border-radiance-gold/30">
                <p className="text-text-muted mb-2">30 Days of Continuous AI Development =</p>
                <p className="text-5xl md:text-6xl font-black text-radiance-gold mb-2">720</p>
                <p className="text-text-secondary">Months of Human Development Time</p>
                <p className="text-2xl font-bold text-text-primary mt-4">
                  That's <span className="text-radiance-gold">60 years</span> of a human developer's career.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Comparison */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              The Side-by-Side Reality
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Human Column */}
            <div 
              ref={humanYears.ref}
              className="relative p-8 rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-500/5 to-transparent"
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
                  TRADITIONAL
                </span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">Human Developer</h3>
                  <p className="text-text-muted">Full Career Output</p>
                </div>
              </div>

              <div className="text-center py-8">
                <p className="text-8xl font-black text-red-400">{humanYears.count}</p>
                <p className="text-xl text-text-secondary mt-2">Years</p>
              </div>

              <div className="space-y-4 pt-8 border-t border-red-500/20">
                <div className="flex justify-between">
                  <span className="text-text-muted">Schedule</span>
                  <span className="text-text-primary">8 hrs × 5 days × 50 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Annual Salary</span>
                  <span className="text-text-primary">$120,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Benefits & Overhead</span>
                  <span className="text-text-primary">~30% additional</span>
                </div>
                <div ref={costSavings.ref} className="flex justify-between pt-4 border-t border-red-500/20">
                  <span className="text-red-400 font-semibold">Career Cost</span>
                  <span className="text-3xl font-bold text-red-400">
                    ${(costSavings.count / 10).toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>

            {/* AI Column */}
            <div 
              ref={aiDays.ref}
              className="relative p-8 rounded-2xl border-2 border-radiance-gold/30 bg-gradient-to-br from-radiance-gold/5 to-transparent"
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-radiance-gold/20 text-radiance-gold text-xs font-semibold rounded-full animate-pulse">
                  AI-POWERED
                </span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-radiance-gold/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">AI Agent</h3>
                  <p className="text-text-muted">Equivalent Output</p>
                </div>
              </div>

              <div className="text-center py-8">
                <p className="text-8xl font-black text-radiance-gold">{aiDays.count}</p>
                <p className="text-xl text-text-secondary mt-2">Days</p>
              </div>

              <div className="space-y-4 pt-8 border-t border-radiance-gold/20">
                <div className="flex justify-between">
                  <span className="text-text-muted">Schedule</span>
                  <span className="text-text-primary">24 hrs × 7 days × 52 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">API & Compute</span>
                  <span className="text-text-primary">$200-$800/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Setup & Management</span>
                  <span className="text-text-primary">Skilled team required</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-radiance-gold/20">
                  <span className="text-radiance-gold font-semibold">Monthly Cost</span>
                  <span className="text-3xl font-bold text-radiance-gold">$800</span>
                </div>
              </div>
            </div>
          </div>

          {/* Efficiency Multiplier */}
          <div ref={efficiencyMultiplier.ref} className="mb-12">
            <Card elevation="elevated" className="p-8 bg-gradient-to-br from-radiance-gold/10 via-depth-elevated to-depth-base border-2 border-radiance-gold/30">
              <div className="text-center mb-8">
                <p className="text-text-muted mb-2">Single Agent Efficiency Multiplier</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-7xl md:text-9xl font-black text-radiance-gold">
                    {efficiencyMultiplier.count.toLocaleString()}x
                  </span>
                </div>
                <p className="text-text-secondary mt-4 text-lg">
                  More efficient than traditional human development
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-depth-base/80 rounded-xl">
                  <p className="text-3xl font-bold text-text-primary">720</p>
                  <p className="text-text-muted text-sm">Hours/Month (AI)</p>
                </div>
                <div className="p-4 bg-depth-base/80 rounded-xl">
                  <p className="text-3xl font-bold text-text-primary">÷</p>
                  <p className="text-text-muted text-sm">Compared To</p>
                </div>
                <div className="p-4 bg-depth-base/80 rounded-xl">
                  <p className="text-3xl font-bold text-text-primary">~160</p>
                  <p className="text-text-muted text-sm">Hours/Month (Human)</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Horizontal Scaling */}
          <Card elevation="elevated" className="p-8 mb-12 border border-radiance-amber/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-radiance-amber/20 text-radiance-amber flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Horizontal Scaling: The Real Power
                </h3>
                <p className="text-text-secondary">
                  Here's where it gets exponential. AI agents can be <span className="text-radiance-gold font-semibold">scaled horizontally</span>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { agents: 1, equivalent: '60 years', cost: '$800/mo' },
                { agents: 5, equivalent: '300 years', cost: '$4,000/mo' },
                { agents: 10, equivalent: '600 years', cost: '$8,000/mo' },
                { agents: 20, equivalent: '1,200 years', cost: '$16,000/mo' },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-depth-base rounded-xl text-center">
                  <p className="text-3xl font-bold text-radiance-gold">{item.agents}</p>
                  <p className="text-text-muted text-xs mb-2">Agent{item.agents > 1 ? 's' : ''}</p>
                  <p className="text-lg font-semibold text-text-primary">{item.equivalent}</p>
                  <p className="text-text-muted text-xs">equivalent output</p>
                  <p className="text-radiance-amber text-sm mt-2">{item.cost}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-radiance-gold/10 rounded-lg border-l-4 border-radiance-gold">
              <p className="text-text-primary font-semibold mb-1">The Limiting Factor</p>
              <p className="text-text-secondary text-sm">
                The only constraint is having enough <span className="text-radiance-gold">quality work to feed them</span>. 
                If you have the specifications, direction, and review capacity, you can scale agents as wide as your business demands.
              </p>
            </div>
          </Card>

          {/* Savings Calculator */}
          <Card elevation="elevated" className="p-8 text-center">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              The Bottom Line
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-6">
              <div>
                <p className="text-4xl font-bold text-red-400 line-through opacity-60">$7.2M</p>
                <p className="text-text-muted text-sm">60-Year Career Cost</p>
              </div>
              <div className="text-4xl text-radiance-gold">→</div>
              <div>
                <p className="text-4xl font-bold text-radiance-gold">$800</p>
                <p className="text-text-muted text-sm">30-Day AI Cost</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-radiance-gold/10 rounded-full border border-radiance-gold/30 mb-6">
              <span className="text-text-muted">Cost Reduction:</span>
              <span className="text-2xl font-black text-radiance-gold">99.99%</span>
            </div>
            <p className="text-text-secondary max-w-2xl mx-auto">
              This isn't about replacing humans. It's about understanding the fundamental shift in how value is created
              and captured. The businesses that adapt to this reality will thrive. Those that don't...
            </p>
          </Card>
        </div>
      </section>

      {/* Reality Check */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag variant="default" className="mb-4">Reality Check</Tag>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                The Practical Constraints
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  Can you actually harness 60 years of development capacity in 30 days? 
                  <span className="text-radiance-gold font-semibold"> Not quite.</span>
                </p>
                <p>
                  The limiting factors aren't the AI's capability. They're:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">1</div>
                    <span><strong className="text-text-primary">Input quality:</strong> The AI needs clear direction, context, and specifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">2</div>
                    <span><strong className="text-text-primary">Review bandwidth:</strong> Humans still need to verify, test, and integrate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">3</div>
                    <span><strong className="text-text-primary">Business context:</strong> Not everything should be built, even if it can be</span>
                  </li>
                </ul>
                <p className="pt-4">
                  But even at <span className="text-radiance-gold font-semibold">10% efficiency</span>, 
                  you're looking at 6 years of equivalent development in 30 days. That's still transformational.
                </p>
              </div>
            </div>

            <Card elevation="elevated" className="p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6 text-center">
                Realistic Projections
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Theoretical Max', value: '60 years / month', opacity: 30, color: 'text-text-muted' },
                  { label: 'Optimistic (25%)', value: '15 years / month', opacity: 50, color: 'text-text-secondary' },
                  { label: 'Realistic (10%)', value: '6 years / month', opacity: 80, color: 'text-radiance-gold' },
                  { label: 'Conservative (5%)', value: '3 years / month', opacity: 100, color: 'text-radiance-gold' },
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-depth-base rounded-lg"
                    style={{ opacity: item.opacity / 100 }}
                  >
                    <span className="text-text-muted">{item.label}</span>
                    <span className={`font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-sm text-center mt-4">
                Even conservative estimates represent massive competitive advantage
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="premium" className="mb-4">Strategic Implications</Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What This Means For Your Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: 'If You Adapt',
                description: 'You gain the ability to move faster than competitors, reduce costs dramatically, and focus human talent on high-value creative work.',
                color: 'text-radiance-gold',
                bgColor: 'bg-radiance-gold/10',
                borderColor: 'border-radiance-gold/30',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'If You Wait',
                description: 'Competitors who move now will have 2-3 years of learning and optimization while you\'re just getting started. In AI, early movers compound.',
                color: 'text-radiance-amber',
                bgColor: 'bg-radiance-amber/10',
                borderColor: 'border-radiance-amber/30',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ),
                title: 'If You Ignore',
                description: 'Your business model becomes increasingly uncompetitive. Labor arbitrage margins collapse. Competitors deliver more for less.',
                color: 'text-red-400',
                bgColor: 'bg-red-500/10',
                borderColor: 'border-red-500/30',
              },
            ].map((item, index) => (
              <Card 
                key={index}
                elevation="subtle" 
                className={`p-6 ${item.bgColor} border ${item.borderColor}`}
              >
                <div className={`w-14 h-14 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className={`text-xl font-bold ${item.color} mb-3`}>
                  {item.title}
                </h3>
                <p className="text-text-secondary">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-gradient-to-b from-depth-elevated to-depth-base">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Get Ahead of This Shift?
          </h2>
          <p className="text-text-secondary mb-4 max-w-xl mx-auto">
            The window for early mover advantage is open now, but not forever.
            Let us help you see exactly how AI applies to your specific business.
          </p>
          <p className="text-text-muted text-sm mb-8 max-w-lg mx-auto">
            In 90 minutes, you'll understand your AI opportunities with the same clarity we've shown you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('book')}
            >
              Book Your Illumination Session - $500
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => onNavigate('contact')}
            >
              Have Questions? Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaborArbitragePage;

