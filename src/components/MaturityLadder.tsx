/**
 * AI Maturity Ladder Visualization
 * Interactive visualization of the 5-level AI maturity framework
 */

import React, { useState, useEffect, useRef } from 'react';
import { AI_MATURITY_LADDER } from '../lib/constants';

interface MaturityLadderProps {
  highlightLevel?: number;
  onLevelClick?: (level: number) => void;
}

export const MaturityLadder: React.FC<MaturityLadderProps> = ({
  highlightLevel,
  onLevelClick
}) => {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLevelClick = (level: number) => {
    setActiveLevel(activeLevel === level ? null : level);
    onLevelClick?.(level);
  };

  const getLevelColor = (level: number) => {
    if (level <= 2) return { bg: 'rgba(139, 134, 130, 0.2)', border: 'rgba(139, 134, 130, 0.5)', text: 'text-text-muted' };
    if (level === 3) return { bg: 'rgba(212, 148, 76, 0.2)', border: 'rgba(212, 148, 76, 0.6)', text: 'text-radiance-amber' };
    if (level === 4) return { bg: 'rgba(232, 184, 74, 0.2)', border: 'rgba(232, 184, 74, 0.7)', text: 'text-radiance-gold' };
    return { bg: 'rgba(253, 246, 227, 0.15)', border: 'rgba(253, 246, 227, 0.6)', text: 'text-clarity-cream' };
  };

  const getLevelGlow = (level: number) => {
    if (level <= 2) return 'rgba(139, 134, 130, 0.3)';
    if (level === 3) return 'rgba(212, 148, 76, 0.4)';
    if (level === 4) return 'rgba(232, 184, 74, 0.5)';
    return 'rgba(253, 246, 227, 0.4)';
  };

  return (
    <div ref={containerRef} className="relative py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-text-muted text-sm mb-2">
          AI does not create leverage. <span className="text-radiance-gold">Structure does.</span>
        </p>
      </div>

      {/* Ladder visualization */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line connecting levels */}
        <div
          className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-text-muted/20 via-radiance-gold/50 to-clarity-cream/40"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease-out',
          }}
        />

        {/* Levels - displayed from bottom (1) to top (5) */}
        <div className="space-y-4 md:space-y-6">
          {[...AI_MATURITY_LADDER].reverse().map((levelData, reversedIndex) => {
            const index = AI_MATURITY_LADDER.length - 1 - reversedIndex;
            const level = levelData.level;
            const colors = getLevelColor(level);
            const isActive = activeLevel === level;
            const isHighlighted = highlightLevel === level;
            const glow = getLevelGlow(level);

            return (
              <div
                key={level}
                className="relative pl-20 md:pl-28"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.5s ease-out ${index * 0.1}s`,
                }}
              >
                {/* Level number node */}
                <button
                  onClick={() => handleLevelClick(level)}
                  className={`absolute left-4 md:left-8 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base border-2 transition-all duration-300 cursor-pointer ${
                    isActive || isHighlighted ? 'scale-125' : 'hover:scale-110'
                  }`}
                  style={{
                    background: colors.bg,
                    borderColor: colors.border,
                    boxShadow: isActive || isHighlighted ? `0 0 20px ${glow}, 0 0 40px ${glow}` : `0 0 10px ${glow}`,
                  }}
                >
                  <span className={colors.text}>{level}</span>
                </button>

                {/* Level content card */}
                <div
                  className={`rounded-xl p-4 md:p-5 border transition-all duration-300 cursor-pointer ${
                    isActive ? 'ring-2 ring-radiance-gold/50' : ''
                  }`}
                  style={{
                    background: isActive ? 'rgba(30, 28, 26, 0.9)' : 'rgba(21, 20, 19, 0.6)',
                    borderColor: isActive ? colors.border : 'rgba(42, 39, 36, 0.5)',
                    boxShadow: isActive ? `0 10px 30px -10px ${glow}` : 'none',
                  }}
                  onClick={() => handleLevelClick(level)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`font-bold text-base md:text-lg ${colors.text}`}>
                          {levelData.identity}
                        </h3>
                        {level >= 4 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-radiance-gold/20 text-radiance-gold border border-radiance-gold/30">
                            {level === 5 ? 'Target' : 'Advanced'}
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm md:text-base">
                        {levelData.description}
                      </p>
                    </div>

                    {/* Expand indicator */}
                    <div className={`text-text-muted transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded characteristics */}
                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-depth-border animate-fade-in">
                      <p className="text-text-muted text-xs uppercase tracking-wider mb-3">Characteristics</p>
                      <ul className="space-y-2">
                        {levelData.characteristics.map((char, i) => (
                          <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                            <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                            </svg>
                            <span>{char}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer insight */}
      <div
        className="mt-10 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.6s',
        }}
      >
        <div className="inline-block p-6 rounded-xl bg-depth-surface/50 border border-depth-border">
          <p className="text-text-secondary text-sm md:text-base mb-2">
            <span className="text-radiance-gold font-semibold">Most founders are at Levels 1–3.</span>
          </p>
          <p className="text-text-muted text-sm">
            Category leaders operate at Level 5.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaturityLadder;
