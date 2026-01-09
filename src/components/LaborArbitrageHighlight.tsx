/**
 * Labor Arbitrage Highlight Component
 * A compelling visual stat showcase for the homepage
 */

import React, { useState, useEffect, useRef } from 'react';

interface LaborArbitrageHighlightProps {
  onLearnMore: () => void;
}

export const LaborArbitrageHighlight: React.FC<LaborArbitrageHighlightProps> = ({ onLearnMore }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [humanYears, setHumanYears] = useState(0);
  const [aiDays, setAiDays] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate the counters
          animateValue(setHumanYears, 0, 60, 2000);
          animateValue(setAiDays, 0, 30, 2000);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    start: number,
    end: number,
    duration: number
  ) => {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setter(Math.floor(start + (end - start) * easeOut));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #0a0908 0%, #1a1816 50%, #0a0908 100%)',
      }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232, 184, 74, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232, 184, 74, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: isVisible ? 'gridMove 20s linear infinite' : 'none',
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radiance-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="relative z-10 p-8 md:p-12">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-sm font-semibold tracking-wider uppercase">
            Industry Disruption Alert
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-4">
          The End of <span className="text-red-400">Labor Arbitrage</span>
        </h3>

        <p className="text-text-secondary mb-8 max-w-2xl">
          For centuries, businesses have profited by marking up human labor. AI is fundamentally breaking this model, and the math is staggering.
        </p>

        {/* Main Comparison Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Human Side */}
          <div 
            className="relative p-6 rounded-xl border border-red-500/20 bg-red-500/5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-red-400 font-semibold">Human Developer</p>
                <p className="text-text-muted text-xs">Traditional Model</p>
              </div>
            </div>

            <div className="text-center py-6">
              <div className="text-5xl md:text-6xl font-black text-red-400 mb-2">
                {humanYears}
              </div>
              <p className="text-text-muted text-sm">Years of Career</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Work Hours</span>
                <span className="text-text-secondary">6-8 hrs/day</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Work Days</span>
                <span className="text-text-secondary">5 days/week</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Career Cost</span>
                <span className="text-red-400 font-semibold">$7,200,000</span>
              </div>
            </div>
          </div>

          {/* AI Side */}
          <div 
            className="relative p-6 rounded-xl border border-radiance-gold/30 bg-radiance-gold/5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s ease-out 0.2s',
            }}
          >
            {/* Pulse rings */}
            <div className="absolute top-6 right-6">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-radiance-gold" />
                <div 
                  className="absolute inset-0 rounded-full border-2 border-radiance-gold"
                  style={{ animation: 'pulse-ring 2s ease-out infinite' }}
                />
                <div 
                  className="absolute inset-0 rounded-full border-2 border-radiance-gold"
                  style={{ animation: 'pulse-ring 2s ease-out infinite 0.5s' }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-radiance-gold/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-radiance-gold font-semibold">AI Agent</p>
                <p className="text-text-muted text-xs">24/7 Capacity</p>
              </div>
            </div>

            <div className="text-center py-6">
              <div 
                className="text-5xl md:text-6xl font-black text-radiance-gold mb-2"
                style={{ animation: isVisible ? 'float-up 3s ease-in-out infinite' : 'none' }}
              >
                {aiDays}
              </div>
              <p className="text-text-muted text-sm">Days</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Work Hours</span>
                <span className="text-text-secondary">24 hrs/day</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Work Days</span>
                <span className="text-text-secondary">7 days/week</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Monthly Cost</span>
                <span className="text-radiance-gold font-semibold">$200-$800</span>
              </div>
            </div>
          </div>
        </div>

        {/* Equals Section */}
        <div 
          className="text-center mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.6s ease-out 0.6s',
          }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-depth-elevated border border-depth-border">
            <span className="text-red-400 font-bold">60 Years</span>
            <span className="text-2xl">=</span>
            <span className="text-radiance-gold font-bold">30 Days</span>
          </div>
          <p className="text-text-muted text-sm mt-3">
            Same output. Different reality.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onLearnMore}
            className="group px-6 py-3 bg-radiance-gold text-depth-base font-semibold rounded-lg hover:bg-radiance-amber transition-all flex items-center gap-2"
          >
            Understand the Full Impact
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <span className="text-text-muted text-sm">
            The businesses that understand this first, win.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LaborArbitrageHighlight;

