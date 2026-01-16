/**
 * Contact Info Visual
 * CONCEPT: "The Details"
 * Contact information cards with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';
import { MailIcon, ClockIcon } from './Icons';
import { Button } from './';

interface ContactInfoCard {
  icon: React.ReactNode;
  title: string;
  content: string;
  subContent?: string;
  link?: string;
  linkText?: string;
}

interface ContactInfoVisualProps {
  onBookClick: () => void;
}

export const ContactInfoVisual: React.FC<ContactInfoVisualProps> = ({
  onBookClick,
}) => {
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

  const infoCards: ContactInfoCard[] = [
    {
      icon: <MailIcon size={20} />,
      title: 'Email Us Directly',
      content: 'hello@lightbrandconsulting.com',
      subContent: 'Prefer email? Skip the form and write directly.',
      link: 'mailto:hello@lightbrandconsulting.com',
      linkText: 'hello@lightbrandconsulting.com',
    },
    {
      icon: <ClockIcon size={20} />,
      title: 'Response Time',
      content: 'We respond within 24 hours during business days.',
      subContent: 'Urgent? Mention it in your message and we\'ll prioritize.',
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative space-y-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {infoCards.map((card, index) => (
        <div
          key={index}
          className="relative group"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Hover glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Card */}
          <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-radiance-gold/30 group-hover:bg-depth-elevated/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-radiance-gold/10 text-radiance-gold flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-text-primary font-semibold mb-1">
                  {card.title}
                </h3>
                {card.link ? (
                  <a
                    href={card.link}
                    className="text-radiance-gold hover:text-radiance-amber transition-colors block mb-1"
                  >
                    {card.content}
                  </a>
                ) : (
                  <p className="text-text-secondary text-sm mb-1">{card.content}</p>
                )}
                {card.subContent && (
                  <p className="text-text-muted text-xs mt-1">{card.subContent}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Booking Card */}
      <div className="relative group mt-6">
        {/* Hover glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card */}
        <div className="relative z-10 bg-depth-elevated/20 border border-radiance-gold/20 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-radiance-gold/30 group-hover:bg-depth-elevated/30">
          <h3 className="text-text-primary font-semibold mb-3">
            Ready to Book?
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            If you already know you want to work with us, skip the contact form and book directly.
            You'll get instant access to our calendar.
          </p>
          <Button variant="primary" size="sm" onClick={onBookClick}>
            Book a Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoVisual;
