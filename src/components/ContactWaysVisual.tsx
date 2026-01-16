/**
 * Contact Ways Visual
 * CONCEPT: "The Options"
 * Other ways to contact section with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';

interface ContactWay {
  title: string;
  description: string;
  note: string;
  icon: React.ReactNode;
}

interface ContactWaysVisualProps {
  ways: ContactWay[];
}

export const ContactWaysVisual: React.FC<ContactWaysVisualProps> = ({ ways }) => {
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
      className={`relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Technical header */}
      <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
            Options::Other_Ways_To_Connect
          </span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-text-primary mb-12 text-center">
        Other Ways We Can Help
      </h2>

      {/* Ways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ways.map((way, index) => (
          <div
            key={index}
            className="relative group"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Hover glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card */}
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 text-center backdrop-blur-sm transition-all duration-300 group-hover:border-radiance-gold/30 group-hover:bg-depth-elevated/30">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 rounded-xl bg-radiance-gold/10 border border-dashed border-radiance-gold/30 flex items-center justify-center text-radiance-gold">
                  {way.icon}
                </div>
              </div>
              <h3 className="text-text-primary font-semibold mb-2">
                {way.title}
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                {way.description}
              </p>
              <p className="text-text-muted text-xs">
                {way.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactWaysVisual;
