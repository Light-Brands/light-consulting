/**
 * Intelligence Ownership Visual
 * CONCEPT: "The Structure Comparison"
 * A minimal, elegant side-by-side visual showing fragmented vs intentional architecture.
 */

import React, { useState, useEffect, useRef } from 'react';

export const IntelligenceOwnershipVisual: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full py-16 px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Fragmented Side */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-error uppercase">FRAGMENTED</span>
            </div>
            
            <div className="relative aspect-square bg-depth-base rounded-2xl border border-error/20 p-8 flex items-center justify-center overflow-hidden">
              {/* Scattered nodes - evenly distributed but disconnected */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {[
                    { x: 25, y: 25 },
                    { x: 75, y: 25 },
                    { x: 25, y: 75 },
                    { x: 75, y: 75 },
                    { x: 15, y: 50 },
                    { x: 85, y: 50 },
                  ].map((pos, i) => (
                    <div 
                      key={i}
                      className="absolute w-12 h-12 rounded-lg border border-error/20 bg-error/5 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-error/40" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* No connections - centered */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center">
                  <div className="text-4xl font-black text-error/20 mb-2">×</div>
                  <div className="text-xs font-mono text-text-muted">NO_CONNECTION</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-error/10 bg-error/5">
              <p className="text-sm text-text-secondary leading-relaxed">
                AI amplifies the chaos. Every tool creates a new silo. You become the manual connector.
              </p>
            </div>
          </div>

          {/* Intentional Side */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-radiance-gold" />
              <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">INTENTIONAL</span>
            </div>
            
            <div className="relative aspect-square bg-depth-base rounded-2xl border border-radiance-gold/30 p-8 flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(232,184,74,0.1)]">
              {/* Central hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-radiance-gold bg-radiance-gold/5 flex items-center justify-center shadow-[0_0_30px_rgba(232,184,74,0.2)]">
                  <div className="w-8 h-8 rounded-full bg-radiance-gold/20" />
                </div>
              </div>

              {/* Connected nodes */}
              {[
                { angle: 0, label: 'S' },
                { angle: 60, label: 'O' },
                { angle: 120, label: 'D' },
                { angle: 180, label: 'C' },
                { angle: 240, label: 'I' },
                { angle: 300, label: 'P' },
              ].map((node, i) => {
                const x = 50 + Math.cos((node.angle * Math.PI) / 180) * 30;
                const y = 50 + Math.sin((node.angle * Math.PI) / 180) * 30;
                return (
                  <React.Fragment key={i}>
                    {/* Connection line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line 
                        x1="50%" y1="50%" 
                        x2={`${x}%`} y2={`${y}%`}
                        className="stroke-radiance-gold/30 stroke-[1px]"
                      />
                    </svg>
                    {/* Node */}
                    <div 
                      className="absolute w-10 h-10 rounded-lg border border-radiance-gold/30 bg-radiance-gold/5 flex items-center justify-center"
                      style={{ left: `${x - 5}%`, top: `${y - 5}%` }}
                    >
                      <span className="text-[10px] font-mono text-radiance-gold font-bold">{node.label}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="p-6 rounded-xl border border-radiance-gold/20 bg-radiance-gold/5">
              <p className="text-sm text-text-secondary leading-relaxed">
                AI amplifies the leverage. Intelligence flows through a central system. You own the architecture.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="mt-16 text-center">
          <p className="text-lg text-text-primary font-light max-w-2xl mx-auto leading-relaxed">
            The difference isn't the tools. <span className="text-radiance-gold font-medium">It's the structure.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceOwnershipVisual;
