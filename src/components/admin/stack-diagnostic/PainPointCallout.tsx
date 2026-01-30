/**
 * Pain Point Callout - Floating quote bubbles
 */

'use client';

import React, { useState, useEffect } from 'react';

interface PainPointCalloutProps {
  painPoints: string[];
  animate?: boolean;
}

export const PainPointCallout: React.FC<PainPointCalloutProps> = ({
  painPoints,
  animate = true,
}) => {
  const [visibleCount, setVisibleCount] = useState(animate ? 0 : painPoints.length);

  useEffect(() => {
    if (!animate || painPoints.length === 0) return;
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= painPoints.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [painPoints.length, animate]);

  if (painPoints.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-2">
        What We Hear
      </h4>
      {painPoints.map((point, i) => (
        <div
          key={i}
          className={`bg-depth-elevated border border-depth-border rounded-lg p-3 transition-all duration-700 ${
            i < visibleCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-text-secondary italic">
            {point}
          </p>
        </div>
      ))}
    </div>
  );
};
