/**
 * Foundation Comparison Visual
 * Shows Web2 vs AI-Native foundation comparison
 */

import React, { useRef, useEffect, useState } from 'react';

const WEB2_FEATURES = [
  'Static pages and content',
  'Plugin-based functionality',
  'Manual workflows',
  'Limited by the platform'
];

const AI_NATIVE_FEATURES = [
  'Dynamic, intelligent responses',
  'Built-in intelligence layer',
  'Automated workflows',
  'Unlimited by design'
];

export const FoundationComparisonVisual: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full py-12 px-4 md:px-8 select-none transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-text-muted" />
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
              Foundation_Comparison::Web2_vs_AI_Native
            </span>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
          {/* Web2 Foundation */}
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-text-muted">Web2 Foundation</h3>
              <span className="px-2 py-0.5 rounded-full border border-text-muted/30 text-[8px] font-mono text-text-muted uppercase tracking-wider bg-depth-elevated">TRADITIONAL</span>
            </div>
            
            <div className="p-6 rounded-2xl border-l-2 border-text-muted/30 bg-depth-surface/30 backdrop-blur-sm flex-1 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-text-muted/5 blur-3xl" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm font-mono uppercase tracking-wider">Traditional Website</p>
                  </div>
                </div>
                
                <ul className="space-y-3.5">
                  {WEB2_FEATURES.map((item, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-3"
                      style={{
                        transitionDelay: `${idx * 100}ms`,
                        animation: isVisible ? `fadeInLeft 0.6s ease-out forwards` : 'none',
                        opacity: isVisible ? 0 : 0
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      <span className="text-text-muted text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* AI-Native Foundation */}
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-radiance-gold">AI-Native Foundation</h3>
              <span className="px-2 py-0.5 rounded-full border border-radiance-gold/30 text-[8px] font-mono text-radiance-gold uppercase tracking-wider bg-radiance-gold/10">INTELLIGENCE</span>
            </div>
            
            <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative shadow-[0_0_30px_rgba(232,184,74,0.05)]">
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/10 to-transparent opacity-50" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(232,184,74,0.3)]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-radiance-gold text-sm font-mono uppercase tracking-wider">Intelligence System</p>
                  </div>
                </div>
                
                <ul className="space-y-3.5">
                  {AI_NATIVE_FEATURES.map((item, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-3"
                      style={{
                        transitionDelay: `${idx * 100}ms`,
                        animation: isVisible ? `fadeInRight 0.6s ease-out forwards` : 'none',
                        opacity: isVisible ? 0 : 0
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-radiance-gold flex-shrink-0 mt-1 shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="pt-6 border-t border-depth-border/50 text-center">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <span className="opacity-40">//</span>
            <span>We move your business from static website to AI intelligence layer</span>
            <span className="opacity-40">//</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default FoundationComparisonVisual;
