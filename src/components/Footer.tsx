/**
 * Footer Component
 * Light Brand Consulting Design System
 */

import React from 'react';
import { PageKey } from '../types';
import { MailIcon } from './Icons';

interface FooterProps {
  onNavigate: (page: PageKey) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-depth-base border-t border-depth-border">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center">
                <span className="text-depth-base font-bold text-sm">LB</span>
              </div>
              <span className="text-text-primary font-semibold">Light Brand Consulting</span>
            </div>
            <p className="text-text-secondary text-sm max-w-md mb-6">
              Transform your business into an AI super intelligence.
              Light consulting creates capacity, not dependency.
            </p>
            <a
              href="mailto:hello@lightbrandconsulting.com"
              className="inline-flex items-center gap-2 text-radiance-gold hover:text-radiance-amber transition-colors"
            >
              <MailIcon size={16} />
              <span className="text-sm">hello@lightbrandconsulting.com</span>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['home', 'services', 'about', 'insights', 'contact'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page as PageKey)}
                    className="text-text-secondary hover:text-radiance-gold text-sm transition-colors capitalize"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('services/illumination')}
                  className="text-text-secondary hover:text-radiance-gold text-sm transition-colors"
                >
                  Illumination Session
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services/blueprint')}
                  className="text-text-secondary hover:text-radiance-gold text-sm transition-colors"
                >
                  AI Acceleration Blueprint
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services/story')}
                  className="text-text-secondary hover:text-radiance-gold text-sm transition-colors"
                >
                  Breath of Life Story
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-depth-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            &copy; {currentYear} Light Brand Consulting. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-text-muted hover:text-text-secondary text-xs transition-colors">
              Privacy Policy
            </button>
            <button className="text-text-muted hover:text-text-secondary text-xs transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
