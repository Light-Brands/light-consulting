/**
 * Efficiency Gauge Component
 * Light Brand Consulting
 *
 * Visual display of efficiency multiplier with human-equivalent context
 */

'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { ProductivityMetrics } from '@/types/github-analytics';

interface EfficiencyGaugeProps {
  metrics: ProductivityMetrics | null;
  loading?: boolean;
  className?: string;
}

export const EfficiencyGauge: React.FC<EfficiencyGaugeProps> = ({
  metrics,
  loading,
  className,
}) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (metrics && !loading) {
      const timer = setTimeout(() => setAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [metrics, loading]);

  if (loading || !metrics) {
    return (
      <div className={cn(
        'bg-gradient-to-br from-depth-elevated to-depth-surface rounded-xl p-6 border border-border-subtle',
        className
      )}>
        <div className="flex items-center justify-center py-8">
          <div className="w-32 h-32 rounded-full bg-depth-surface animate-pulse" />
        </div>
        <div className="h-6 w-48 mx-auto bg-depth-surface rounded animate-pulse mt-4" />
        <div className="h-4 w-32 mx-auto bg-depth-surface rounded animate-pulse mt-2" />
      </div>
    );
  }

  const multiplier = metrics.efficiency_multiplier;
  const humanMonths = metrics.human_months_equivalent;
  const humanYears = metrics.human_years_equivalent;

  // Determine the display format based on the value
  const displayValue = humanYears >= 1
    ? { value: humanYears.toFixed(1), unit: 'years' }
    : { value: humanMonths.toFixed(1), unit: 'months' };

  // Calculate ring progress (cap at 100% for visual)
  const ringProgress = Math.min(multiplier / 50, 1); // 50x = full ring
  const circumference = 2 * Math.PI * 58; // radius = 58
  const strokeDashoffset = circumference * (1 - (animated ? ringProgress : 0));

  return (
    <div className={cn(
      'bg-gradient-to-br from-depth-elevated to-depth-surface rounded-xl p-6 border border-border-subtle',
      className
    )}>
      <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">
        Efficiency Multiplier
      </h3>

      {/* Gauge */}
      <div className="relative w-40 h-40 mx-auto">
        {/* Background ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-depth-base"
          />
          {/* Progress ring */}
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1500 ease-out"
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={cn(
              'text-4xl font-bold text-radiance-gold transition-all duration-500',
              animated ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            )}
          >
            {multiplier.toFixed(1)}x
          </div>
          <div className="text-xs text-text-muted">faster</div>
        </div>
      </div>

      {/* Context */}
      <div className="mt-6 text-center">
        <div className="text-sm text-text-muted mb-2">
          Output equivalent to
        </div>
        <div className="text-2xl font-bold text-text-primary">
          {displayValue.value} human-{displayValue.unit}
        </div>
        <div className="text-sm text-text-muted mt-1">
          of traditional development
        </div>
      </div>

      {/* Additional context */}
      {humanYears >= 1 && (
        <div className="mt-4 pt-4 border-t border-border-subtle">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-text-muted">That&apos;s</span>
            <span className="font-semibold text-radiance-gold">
              {humanMonths.toFixed(0)} developer-months
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EfficiencyGauge;
