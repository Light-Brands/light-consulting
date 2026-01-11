/**
 * Footer Component
 * Light Brand Consulting Design System
 */

import React, { useState, useEffect, useRef } from 'react';
import { PageKey } from '../types';
import { MailIcon } from './Icons';
import { Container } from './ui';

interface FooterProps {
  onNavigate: (page: PageKey) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={containerRef} className="bg-depth-base border-t border-depth-border">
      <Container size="wide" className="py-12 md:py-16">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-[0.01] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative space-y-8">
            {/* Header */}
            <div className="flex items-center justify-center border-b border-depth-border pb-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                  Site_Footer::Navigation_Resources
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              {/* Brand */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center">
                  <img 
                    src="/lb-logo.svg" 
                    alt="Light Brand Consulting" 
                    className="h-8 md:h-10 w-auto"
                  />
                </div>
                <p className="text-sm text-text-secondary max-w-md leading-relaxed">
                  Transform your business into an AI super intelligence.
                  Light consulting creates capacity, not dependency.
                </p>
                <a
                  href="mailto:hello@lightbrandconsulting.com"
                  className="inline-flex items-center gap-2 text-radiance-gold hover:text-radiance-amber transition-colors text-sm"
                >
                  <MailIcon size={16} />
                  <span>hello@lightbrandconsulting.com</span>
                </a>
              </div>

              {/* Navigation */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Navigation
                </h4>
                <ul className="space-y-2">
                  {['home', 'services', 'about', 'insights', 'contact'].map((page) => (
                    <li key={page}>
                      <button
                        onClick={() => onNavigate(page as PageKey)}
                        className="text-sm text-text-secondary hover:text-radiance-gold transition-colors capitalize"
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Services
                </h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => onNavigate('services/illumination')}
                      className="text-sm text-text-secondary hover:text-radiance-gold transition-colors"
                    >
                      Illumination Session
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('services/blueprint')}
                      className="text-sm text-text-secondary hover:text-radiance-gold transition-colors"
                    >
                      AI Acceleration Blueprint
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('services/story')}
                      className="text-sm text-text-secondary hover:text-radiance-gold transition-colors"
                    >
                      Breath of Life Story
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-depth-border flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-text-muted">
                &copy; {currentYear} Light Brand Consulting. All rights reserved.
              </p>
              <div className="flex gap-6">
                <button className="text-xs text-text-muted hover:text-text-secondary transition-colors">
                  Privacy Policy
                </button>
                <button className="text-xs text-text-muted hover:text-text-secondary transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
