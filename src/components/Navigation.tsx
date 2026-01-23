/**
 * Navigation Component
 * Light Brand Consulting Design System
 *
 * Bold floating navigation with dark background
 */

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { NAV_ITEMS } from '../lib/constants';
import { PageKey } from '../types';
import Button from './Button';
import { MenuIcon, XIcon } from './Icons';
import { PaletteSwitcher } from './ui/PaletteSwitcher';
import { Logo } from './Logo';

interface NavigationProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleNavigate = (page: PageKey) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show nav at top of page
          if (currentScrollY < 50) {
            setIsVisible(true);
          } else {
            // Hide when scrolling down, show when scrolling up
            setIsVisible(currentScrollY < lastScrollY.current);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        'fixed left-0 right-0 z-50 px-4 sm:px-6 transition-transform duration-500 ease-out',
        isVisible ? 'top-4 md:top-6 translate-y-0' : '-translate-y-full'
      )}
    >
      <nav
        className={cn(
          'max-w-7xl mx-auto',
          'bg-[#0F0E0D] backdrop-blur-xl',
          'rounded-2xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.24)]',
          'border border-white/[0.08]',
          'transition-all duration-300'
        )}
      >
        <div className="flex items-center justify-between h-16 md:h-[72px] px-5 md:px-8">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center group"
          >
            <Logo className="transition-all duration-300 group-hover:scale-105" />
          </button>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  activePage === item.key || activePage.startsWith(item.key + '/')
                    ? 'text-radiance-gold bg-radiance-gold/10'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button with Palette Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <PaletteSwitcher variant="minimal" />
            <button
              onClick={() => handleNavigate('book')}
              className={cn(
                'px-5 py-2.5 text-sm font-semibold',
                'bg-gradient-to-r from-radiance-gold to-radiance-amber',
                'text-[#0F0E0D]',
                'rounded-xl',
                'transition-all duration-300',
                'hover:shadow-[0_0_24px_rgba(201,148,10,0.4)]',
                'hover:scale-[1.02]',
                'active:scale-[0.98]'
              )}
            >
              Book Session
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-5 border-t border-white/[0.08] animate-fade-in">
            <div className="flex flex-col gap-1 pt-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigate(item.key)}
                  className={cn(
                    'px-4 py-3 text-left text-sm font-medium rounded-xl transition-all duration-200',
                    activePage === item.key || activePage.startsWith(item.key + '/')
                      ? 'bg-radiance-gold/10 text-radiance-gold'
                      : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                  )}
                >
                  {item.label}
                </button>
              ))}
              {/* Palette Switcher for Mobile */}
              <div className="px-4 py-3">
                <PaletteSwitcher variant="full" className="w-full [&>button]:w-full [&>button]:justify-between" />
              </div>
              <div className="pt-3">
                <button
                  onClick={() => handleNavigate('book')}
                  className={cn(
                    'w-full px-5 py-3 text-sm font-semibold',
                    'bg-gradient-to-r from-radiance-gold to-radiance-amber',
                    'text-[#0F0E0D]',
                    'rounded-xl',
                    'transition-all duration-300',
                    'hover:shadow-[0_0_24px_rgba(201,148,10,0.4)]'
                  )}
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
