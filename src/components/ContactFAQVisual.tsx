/**
 * Contact FAQ Visual
 * CONCEPT: "The Answers"
 * FAQ section with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface ContactFAQVisualProps {
  faqs: FAQItem[];
}

export const ContactFAQVisual: React.FC<ContactFAQVisualProps> = ({ faqs }) => {
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
      className={`relative mt-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Technical header */}
      <div className="flex items-center gap-2 border-b border-depth-border pb-4 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
          FAQ::Common_Questions
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-text-primary mb-6">
        Common Questions Before Reaching Out
      </h3>

      {/* FAQ Items */}
      <div className="space-y-6">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="relative group"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {/* Hover glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card */}
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-xl p-4 backdrop-blur-sm transition-all duration-300 group-hover:border-radiance-gold/30 group-hover:bg-depth-elevated/30">
              <h4 className="text-text-primary font-medium text-sm mb-2">{item.q}</h4>
              <p className="text-text-muted text-sm">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFAQVisual;
