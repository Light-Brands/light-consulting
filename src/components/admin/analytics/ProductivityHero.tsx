/**
 * Productivity Hero Component
 * Light Brand Consulting
 *
 * Large hero section with key productivity metrics and animated counters
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { ProductivityMetrics } from '@/types/github-analytics';

interface ProductivityHeroProps {
  metrics: ProductivityMetrics | null;
  loading?: boolean;
  className?: string;
}

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 1500, delay: number = 0): number {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (end === 0) {
      setCount(0);
      return;
    }

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, delay]);

  return count;
}

function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
}

interface HeroStatProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  loading?: boolean;
  delay?: number;
  format?: (n: number) => string;
  highlight?: boolean;
}

const HeroStat: React.FC<HeroStatProps> = ({
  label,
  value,
  suffix = '',
  prefix = '',
  loading,
  delay = 0,
  format = formatLargeNumber,
  highlight = false,
}) => {
  const animatedValue = useAnimatedCounter(value, 1500, delay);

  return (
    <div className={cn(
      'text-center p-4 md:p-6 rounded-xl transition-all',
      highlight && 'bg-radiance-gold/10 border border-radiance-gold/30'
    )}>
      {loading ? (
        <div className="h-12 md:h-16 w-24 md:w-32 mx-auto bg-depth-elevated rounded animate-pulse" />
      ) : (
        <div className={cn(
          'text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight',
          highlight ? 'text-radiance-gold' : 'text-text-primary'
        )}>
          {prefix}{format(animatedValue)}{suffix}
        </div>
      )}
      <div className="text-sm md:text-base text-text-muted mt-2">{label}</div>
    </div>
  );
};

export const ProductivityHero: React.FC<ProductivityHeroProps> = ({
  metrics,
  loading,
  className,
}) => {
  if (loading || !metrics) {
    return (
      <div className={cn(
        'bg-gradient-to-br from-depth-elevated via-depth-surface to-depth-elevated rounded-2xl p-6 md:p-10 border border-border-subtle',
        className
      )}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="text-center p-6">
              <div className="h-16 w-32 mx-auto bg-depth-elevated rounded animate-pulse" />
              <div className="h-4 w-24 mx-auto mt-3 bg-depth-elevated rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'relative overflow-hidden bg-gradient-to-br from-depth-elevated via-depth-surface to-depth-elevated rounded-2xl p-6 md:p-10 border border-border-subtle',
      className
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radiance-gold/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radiance-amber/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {/* Main stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <HeroStat
            label="Net Lines of Code"
            value={metrics.net_lines}
            loading={loading}
            delay={0}
          />
          <HeroStat
            label="Team Developers"
            value={metrics.team_developer_count}
            loading={loading}
            delay={200}
            format={(n) => n.toString()}
          />
          <HeroStat
            label="Efficiency Multiplier"
            value={Math.round(metrics.efficiency_multiplier * 10)}
            suffix="x"
            loading={loading}
            delay={400}
            format={(n) => (n / 10).toFixed(1)}
            highlight
          />
        </div>

        {/* Secondary stats */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border-subtle">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg md:text-xl font-semibold text-green-400">
                +{formatLargeNumber(metrics.total_additions)}
              </div>
              <div className="text-xs md:text-sm text-text-muted">Lines Added</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-semibold text-red-400">
                -{formatLargeNumber(metrics.total_deletions)}
              </div>
              <div className="text-xs md:text-sm text-text-muted">Lines Removed</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-semibold text-text-primary">
                {formatLargeNumber(metrics.total_commits)}
              </div>
              <div className="text-xs md:text-sm text-text-muted">Total Commits</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-semibold text-text-primary">
                {metrics.time_range_days}
              </div>
              <div className="text-xs md:text-sm text-text-muted">Days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityHero;
