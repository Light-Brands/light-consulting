/**
 * Motion vs Leverage Visual
 * Clean, minimal infographic showing the contrast
 */

import React, { useRef, useEffect, useState } from 'react';

const MOTION_ITEMS = [
  'experimenting with tools',
  'automating isolated tasks',
  'adding AI on top of outdated workflows'
];

const LEVERAGE_ITEMS = [
  'where your business actually stands',
  'where AI can create real compounding advantage',
  'what not to waste time building'
];

export const MotionVsLeverageVisual: React.FC = () => {
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
              System_Diagnosis::Motion_vs_Leverage
            </span>
          </div>
        </div>

        {/* Main Visual: Split Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 items-stretch">
          {/* Left: Motion */}
          <div className="space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-muted tracking-tighter">REF::STATE_01</span>
              <span className="px-3 py-1 rounded-full border border-error/30 text-[10px] font-mono text-error uppercase tracking-wider bg-error/5">
                Motion
              </span>
            </div>
            
            <div className="p-6 rounded-xl border border-error/20 bg-error/5 backdrop-blur-sm relative overflow-hidden flex-1 flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 blur-3xl" />
              
              <div className="relative z-10 space-y-4 flex-1 flex flex-col">
                <p className="text-text-secondary text-sm font-medium mb-4">Most founders are:</p>
                
                <div className="space-y-4 flex-1">
                  {MOTION_ITEMS.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3"
                      style={{
                        transitionDelay: `${idx * 100}ms`,
                        animation: isVisible ? `fadeInLeft 0.6s ease-out forwards` : 'none',
                        opacity: isVisible ? 0 : 0
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0" />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 mt-auto border-t border-error/20">
                  <p className="text-error font-medium text-sm">
                    That creates motion, not leverage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Leverage */}
          <div className="space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-radiance-gold tracking-tighter">REF::STATE_02</span>
              <span className="px-3 py-1 rounded-full border border-radiance-gold/30 text-[10px] font-mono text-radiance-gold uppercase tracking-wider bg-radiance-gold/5">
                Leverage
              </span>
            </div>
            
            <div className="p-6 rounded-xl border border-radiance-gold/20 bg-radiance-gold/5 backdrop-blur-sm relative overflow-hidden shadow-[0_0_30px_rgba(232,184,74,0.05)] flex-1 flex flex-col">
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/10 to-transparent opacity-50" />
              
              <div className="relative z-10 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-radiance-gold" />
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Diagnostic::Purpose_Statement</span>
                </div>
                
                <p className="text-text-primary font-medium text-sm mb-4">
                  This diagnostic helps you see:
                </p>
                
                <div className="space-y-4 flex-1">
                  {LEVERAGE_ITEMS.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3"
                      style={{
                        transitionDelay: `${idx * 100}ms`,
                        animation: isVisible ? `fadeInRight 0.6s ease-out forwards` : 'none',
                        opacity: isVisible ? 0 : 0
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-radiance-gold flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(232,184,74,0.6)]" />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 mt-auto border-t border-radiance-gold/20">
                  <p className="text-text-muted italic text-sm">
                    Clarity first. Decisions second.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="pt-6 border-t border-depth-border/50 text-center">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <span className="opacity-40">//</span>
            <span>The gap between motion and leverage is clarity</span>
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

export default MotionVsLeverageVisual;
