/**
 * Founders Visual
 * CONCEPT: "The Team"
 * Minimalist presentation of founders
 */

import React, { useState, useEffect, useRef } from 'react';
import { SparkleIcon } from './Icons';

interface Founder {
  name: string;
  role: string;
  description: string;
}

interface FounderFamily {
  familyName: string;
  members: Founder[];
}

interface FoundersVisualProps {
  intro: {
    headline: string;
    tagline: string;
    closing: string;
  };
  families: FounderFamily[];
}

export const FoundersVisual: React.FC<FoundersVisualProps> = ({ intro, families }) => {
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
      className={`relative w-full py-12 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Founders::Team_Composition
            </span>
          </div>
        </div>

        {/* Intro */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">{intro.headline}</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">{intro.tagline}</p>
        </div>

        {/* Families */}
        <div className="space-y-12">
          {families.map((family, familyIndex) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {family.members.map((member, memberIndex) => {
                  const imagePath = `/images/founders/${member.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
                  const initials = member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('');

                  return (
                    <div
                      key={member.name}
                      className="relative p-6 rounded-xl border border-depth-border bg-depth-elevated/30 transition-all duration-500 hover:border-radiance-gold/30 hover:bg-radiance-gold/5"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.6s ease-out ${0.3 + (familyIndex * 0.2) + (memberIndex * 0.1)}s`,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Founder Avatar */}
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-depth-elevated border-2 border-radiance-gold/20">
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
                          <h3 className="text-lg font-semibold text-text-primary mb-1">{member.name}</h3>
                          <p className="text-radiance-gold text-sm font-medium mb-3">{member.role}</p>
                          <p className="text-text-secondary text-sm leading-relaxed">{member.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="pt-8 border-t border-depth-border text-center">
          <div className="inline-block p-8 rounded-xl border border-radiance-gold/20 bg-radiance-gold/5">
            <SparkleIcon className="text-radiance-gold mx-auto mb-4" size={32} />
            <p className="text-text-primary text-lg font-medium italic">"{intro.closing}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersVisual;
