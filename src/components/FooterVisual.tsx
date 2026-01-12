/**
 * Footer Visual
 * Clean, minimal footer
 */

import React from 'react';
import { PageKey } from '../types';

interface FooterVisualProps {
  onNavigate: (page: PageKey) => void;
}

export const FooterVisual: React.FC<FooterVisualProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const navLinks: { label: string; page: PageKey }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Insights', page: 'insights' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <div className="w-full border-t border-depth-border py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo and Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center">
            <span className="text-depth-base font-bold text-[10px]">LB</span>
          </div>
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
  );
};

export default FooterVisual;
