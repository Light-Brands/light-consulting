/**
 * Contact Next Visual
 * CONCEPT: "The Process"
 * What happens next section with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';

interface ContactNextVisualProps {
  steps: string[];
}

export const ContactNextVisual: React.FC<ContactNextVisualProps> = ({ steps }) => {
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
      {/* Hover glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card */}
      <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 backdrop-blur-sm">
        {/* Technical header */}
        <div className="flex items-center gap-2 border-b border-depth-border pb-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
            Process::What_Happens_Next
          </span>
        </div>

        <h3 className="text-text-primary font-semibold mb-4">
          What Happens After You Send
        </h3>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {index + 1}
              </span>
              <span className="text-text-secondary text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ContactNextVisual;
