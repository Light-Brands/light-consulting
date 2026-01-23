/**
 * Palette Switcher Component
 * Light Brand Consulting Design System
 *
 * Minimal, interactive color palette switcher with smooth animations
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';
import { usePalette } from '../../design-system/PaletteProvider';
import { getAllPalettes, PaletteId } from '../../design-system/palettes';
import { CheckIcon } from '../Icons';

// ============================================================================
// Types
// ============================================================================

interface PaletteSwitcherProps {
  /** Additional class names */
  className?: string;
  /** Variant: 'minimal' shows just dot, 'full' shows label */
  variant?: 'minimal' | 'full';
}

// ============================================================================
// Constants
// ============================================================================

const DISCOVERY_KEY = 'light-brand-palette-discovered';

// ============================================================================
// Component
// ============================================================================

export const PaletteSwitcher: React.FC<PaletteSwitcherProps> = ({
  className,
  variant = 'minimal',
}) => {
  const { palette, paletteId, setPalette } = usePalette();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasDiscovered, setHasDiscovered] = useState(true); // Default true to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const allPalettes = getAllPalettes();

  // Check if user has discovered the palette switcher (client-side only)
  useEffect(() => {
    setIsMounted(true);
    try {
      const discovered = localStorage.getItem(DISCOVERY_KEY);
      if (!discovered) {
        setHasDiscovered(false);
        // Show hint after a delay
        const timer = setTimeout(() => setShowHint(true), 2000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  // Mark as discovered when interacted
  const markDiscovered = useCallback(() => {
    if (!hasDiscovered) {
      setHasDiscovered(true);
      setShowHint(false);
      localStorage.setItem(DISCOVERY_KEY, 'true');
    }
  }, [hasDiscovered]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
          markDiscovered();
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % allPalettes.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + allPalettes.length) % allPalettes.length);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0) {
            const selectedPalette = allPalettes[focusedIndex];
            setPalette(selectedPalette.id as PaletteId);
            setIsOpen(false);
            setFocusedIndex(-1);
            triggerRef.current?.focus();
          }
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(allPalettes.length - 1);
          break;
        case 'Tab':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, focusedIndex, allPalettes, setPalette, markDiscovered]
  );

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  const handleSelect = (id: PaletteId) => {
    setPalette(id);
    setIsOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    markDiscovered();
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hint tooltip for discoverability */}
      {showHint && !isOpen && (
        <div
          className={cn(
            'absolute right-0 -top-10 whitespace-nowrap',
            'px-2.5 py-1 rounded-lg',
            'bg-white/10 backdrop-blur-sm',
            'text-[11px] text-white/80',
            'border border-white/10',
            'animate-fade-in',
            'pointer-events-none'
          )}
        >
          Try different themes
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white/10 border-r border-b border-white/10 rotate-45" />
        </div>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Color theme: ${palette.name}. Click to change.`}
        className={cn(
          'group relative flex items-center gap-2',
          'rounded-full',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-white/20',
          // Minimal variant styling
          variant === 'minimal' && [
            'p-1.5',
            isHovered || isOpen ? 'bg-white/10' : 'bg-transparent',
          ],
          // Full variant styling
          variant === 'full' && [
            'px-3 py-2 rounded-lg',
            'bg-white/[0.06] hover:bg-white/[0.1]',
            'border border-white/[0.08]',
          ]
        )}
      >
        {/* Color dot with animations */}
        <span className="relative">
          {/* Pulse ring for undiscovered state (only after mount to avoid hydration mismatch) */}
          {isMounted && !hasDiscovered && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: palette.preview,
                opacity: 0.4,
                animationDuration: '2s',
              }}
            />
          )}
          {/* Hover glow */}
          <span
            className={cn(
              'absolute inset-0 rounded-full blur-sm transition-opacity duration-300',
              isHovered || isOpen ? 'opacity-60' : 'opacity-0'
            )}
            style={{ backgroundColor: palette.preview }}
          />
          {/* Main dot */}
          <span
            className={cn(
              'relative block rounded-full transition-transform duration-300',
              isHovered || isOpen ? 'scale-110' : 'scale-100',
              variant === 'minimal' ? 'w-4 h-4' : 'w-3 h-3'
            )}
            style={{ backgroundColor: palette.preview }}
          />
        </span>

        {/* Label for full variant */}
        {variant === 'full' && (
          <>
            <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
              {palette.name}
            </span>
            <svg
              className={cn(
                'w-3.5 h-3.5 text-white/50 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Select color theme"
          aria-activedescendant={focusedIndex >= 0 ? `palette-${allPalettes[focusedIndex].id}` : undefined}
          className={cn(
            'absolute right-0 mt-2 z-50',
            'min-w-[200px]',
            'bg-[#0F0E0D]/95 backdrop-blur-xl',
            'rounded-2xl',
            'border border-white/[0.08]',
            'shadow-[0_8px_32px_rgba(0,0,0,0.32)]',
            'py-2 px-1',
            'origin-top-right',
            // Smooth entry animation
            'animate-in fade-in-0 zoom-in-95 duration-200'
          )}
          style={{
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Header */}
          <div className="px-3 py-1.5 mb-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
              Theme
            </span>
          </div>

          {allPalettes.map((p, index) => {
            const isSelected = p.id === paletteId;
            const isFocused = index === focusedIndex;

            return (
              <li
                key={p.id}
                id={`palette-${p.id}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(p.id as PaletteId)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 mx-1 rounded-xl cursor-pointer',
                  'transition-all duration-150',
                  isFocused ? 'bg-white/[0.08]' : 'bg-transparent',
                  isSelected ? 'text-white' : 'text-white/60 hover:text-white/90'
                )}
              >
                {/* Color preview - shows multiple colors */}
                <span className="relative flex items-center justify-center w-6 h-6">
                  {/* Background circle */}
                  <span
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{ backgroundColor: p.preview }}
                  />
                  {/* Main color dot */}
                  <span
                    className={cn(
                      'relative w-4 h-4 rounded-full transition-transform duration-200',
                      'ring-2 ring-offset-1 ring-offset-[#0F0E0D]',
                      isSelected ? 'ring-white/40 scale-100' : 'ring-transparent scale-90'
                    )}
                    style={{ backgroundColor: p.preview }}
                  />
                </span>

                {/* Name and mode indicator */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium block">{p.name}</span>
                  <span className="text-[10px] text-white/30">
                    {p.isDark ? 'Dark' : 'Light'}
                  </span>
                </div>

                {/* Checkmark for selected */}
                {isSelected && (
                  <CheckIcon size={16} className="text-white/60 flex-shrink-0" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PaletteSwitcher;
