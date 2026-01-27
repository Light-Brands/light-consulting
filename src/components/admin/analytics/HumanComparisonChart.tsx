/**
 * Human Comparison Chart Component
 * Light Brand Consulting
 *
 * Visual bar chart comparing actual output vs traditional human development benchmark
 */

'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { ProductivityMetrics } from '@/types/github-analytics';
import { INDUSTRY_BENCHMARK_LOC_PER_MONTH, formatNumber } from '@/types/github-analytics';

interface HumanComparisonChartProps {
  metrics: ProductivityMetrics | null;
  loading?: boolean;
  className?: string;
}

export const HumanComparisonChart: React.FC<HumanComparisonChartProps> = ({
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
        'bg-depth-elevated rounded-xl p-6 border border-border-subtle',
        className
      )}>
        <div className="h-6 w-48 bg-depth-surface rounded animate-pulse mb-6" />
        <div className="space-y-6">
          <div className="h-12 bg-depth-surface rounded animate-pulse" />
          <div className="h-12 bg-depth-surface rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const actual = metrics.net_lines;
  const traditional = metrics.traditional_benchmark;
  const maxValue = Math.max(actual, traditional);
  const actualPercentage = maxValue > 0 ? (actual / maxValue) * 100 : 0;
  const traditionalPercentage = maxValue > 0 ? (traditional / maxValue) * 100 : 0;

  return (
    <div className={cn(
      'bg-depth-elevated rounded-xl p-6 border border-border-subtle',
      className
    )}>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        Output Comparison
      </h3>
      <p className="text-sm text-text-muted mb-6">
        AI-augmented development vs traditional benchmark ({formatNumber(INDUSTRY_BENCHMARK_LOC_PER_MONTH)} net LOC/dev/month)
      </p>

      <div className="space-y-6">
        {/* Actual output bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-radiance-gold" />
              AI-Augmented Team
            </span>
            <span className="text-sm font-semibold text-radiance-gold">
              {formatNumber(actual)} LOC
            </span>
          </div>
          <div className="h-10 bg-depth-base rounded-lg overflow-hidden">
            <div
              className={cn(
                'h-full bg-gradient-to-r from-radiance-amber to-radiance-gold rounded-lg transition-all duration-1000 ease-out',
                'flex items-center justify-end pr-3'
              )}
              style={{
                width: animated ? `${Math.max(actualPercentage, 5)}%` : '0%',
              }}
            >
              {actualPercentage > 20 && (
                <span className="text-xs font-semibold text-depth-base">
                  {formatNumber(actual)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Traditional benchmark bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-text-muted" />
              Traditional Benchmark
            </span>
            <span className="text-sm font-semibold text-text-muted">
              {formatNumber(traditional)} LOC
            </span>
          </div>
          <div className="h-10 bg-depth-base rounded-lg overflow-hidden">
            <div
              className={cn(
                'h-full bg-gradient-to-r from-text-muted/50 to-text-muted/80 rounded-lg transition-all duration-1000 ease-out delay-300',
                'flex items-center justify-end pr-3'
              )}
              style={{
                width: animated ? `${Math.max(traditionalPercentage, 5)}%` : '0%',
              }}
            >
              {traditionalPercentage > 20 && (
                <span className="text-xs font-semibold text-depth-base">
                  {formatNumber(traditional)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 pt-4 border-t border-border-subtle">
        <div className="text-sm text-text-muted">
          <p>
            Traditional benchmark: {metrics.team_developer_count} developers &times;{' '}
            {formatNumber(INDUSTRY_BENCHMARK_LOC_PER_MONTH)} LOC/month &times;{' '}
            {(metrics.time_range_days / 30).toFixed(1)} months ={' '}
            <span className="text-text-primary font-medium">{formatNumber(traditional)} LOC</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HumanComparisonChart;
