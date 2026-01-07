/**
 * Navigation Component
 * Light Brand Consulting Design System
 */

import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { NAV_ITEMS } from '../lib/constants';
import { PageKey } from '../types';
import Button from './Button';
import { MenuIcon, XIcon } from './Icons';

interface NavigationProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page: PageKey) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-depth-base/80 backdrop-blur-xl border-b border-depth-border">
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center shadow-illumination group-hover:shadow-illumination-intense transition-all">
              <span className="text-depth-base font-bold text-sm">LB</span>
            </div>
            <span className="text-text-primary font-semibold hidden sm:block">
              Light Brand
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className={cn(
                  'text-sm font-medium transition-colors',
                  activePage === item.key || activePage.startsWith(item.key + '/')
                    ? 'text-radiance-gold'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavigate('book')}
            >
              Book Session
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-depth-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigate(item.key)}
                  className={cn(
                    'px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors',
                    activePage === item.key || activePage.startsWith(item.key + '/')
                      ? 'bg-radiance-gold/10 text-radiance-gold'
                      : 'text-text-secondary hover:bg-depth-surface hover:text-text-primary'
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 px-4">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleNavigate('book')}
                >
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
