/**
 * Footer Component
 * Light Brand Consulting Design System
 */

import React from 'react';
import { PageKey } from '../types';

interface FooterProps {
  onNavigate: (page: PageKey) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const navLinks: { label: string; page: PageKey }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Insights', page: 'insights' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <footer className="bg-depth-base border-t border-depth-border">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-3">
            <img
              src="/lb-logo.svg"
              alt="Light Brand Consulting"
              className="h-6 w-auto"
            />
            <span className="text-xs text-text-muted">
              &copy; {currentYear} Light Brand Consulting
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className="text-sm text-text-secondary hover:text-radiance-gold transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
