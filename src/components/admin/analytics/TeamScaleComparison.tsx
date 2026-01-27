/**
 * Team Scale Comparison Component
 * Light Brand Consulting
 *
 * Shows career equivalents, team size estimates, and cost comparisons
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { ProductivityMetrics } from '@/types/github-analytics';
import { formatNumber } from '@/types/github-analytics';

interface TeamScaleComparisonProps {
  metrics: ProductivityMetrics | null;
  loading?: boolean;
  className?: string;
}

// Constants for calculations
const CAREER_YEARS = 40; // Full developer career span
const AVG_DEVELOPER_COST_PER_YEAR = 150000; // Fully-loaded cost (salary + benefits + overhead)

interface TeamSizeEstimate {
  size: number;
  label: string;
  timeYears: number;
  timeMonths: number;
  cost: number;
}

function formatTime(years: number): string {
  if (years >= 1) {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
    if (months === 0) {
      return `${wholeYears} ${wholeYears === 1 ? 'year' : 'years'}`;
    }
    return `${wholeYears}y ${months}m`;
  }
  const months = Math.round(years * 12);
  if (months < 1) {
    const weeks = Math.round(years * 52);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  }
  return `${months} ${months === 1 ? 'month' : 'months'}`;
}

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

export const TeamScaleComparison: React.FC<TeamScaleComparisonProps> = ({
  metrics,
  loading,
  className,
}) => {
  if (loading || !metrics) {
    return (
      <div className={cn(
        'bg-depth-elevated rounded-xl p-6 border border-border-subtle',
        className
      )}>
        <div className="h-6 w-64 bg-depth-surface rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-depth-surface rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const humanYears = metrics.human_years_equivalent;
  const careerEquivalent = humanYears / CAREER_YEARS;
  const showCareers = humanYears >= CAREER_YEARS;

  // Calculate team size estimates
  const teamSizes = [5, 10, 20, 50];
  const estimates: TeamSizeEstimate[] = teamSizes.map(size => {
    const timeYears = humanYears / size;
    const timeMonths = timeYears * 12;
    const cost = timeYears * size * AVG_DEVELOPER_COST_PER_YEAR;
    return {
      size,
      label: `${size} developers`,
      timeYears,
      timeMonths,
      cost,
    };
  });

  // Calculate current team's actual cost (based on time range)
  const currentTeamTimeYears = metrics.time_range_days / 365;
  const currentTeamCost = currentTeamTimeYears * metrics.team_developer_count * AVG_DEVELOPER_COST_PER_YEAR;

  return (
    <div className={cn(
      'bg-depth-elevated rounded-xl p-6 border border-border-subtle',
      className
    )}>
      {/* Career Equivalent Hero */}
      {showCareers && (
        <div className="mb-6 p-6 bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/5 rounded-xl border border-radiance-gold/20">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-radiance-gold mb-2">
              {careerEquivalent >= 1 ? careerEquivalent.toFixed(1) : '<1'}
            </div>
            <div className="text-lg text-text-primary font-medium">
              Full-Stack Developer {careerEquivalent >= 2 ? 'Careers' : 'Career'}
            </div>
            <div className="text-sm text-text-muted mt-1">
              {formatNumber(Math.round(humanYears))} years of traditional development work
            </div>
          </div>
        </div>
      )}

      {/* If less than a career, show years equivalent prominently */}
      {!showCareers && (
        <div className="mb-6 p-6 bg-gradient-to-br from-depth-surface to-depth-base rounded-xl border border-border-subtle">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
              {humanYears >= 1 ? humanYears.toFixed(1) : formatNumber(Math.round(humanYears * 12))}
            </div>
            <div className="text-lg text-text-primary font-medium">
              {humanYears >= 1 ? 'Years' : 'Months'} of Traditional Development
            </div>
            <div className="text-sm text-text-muted mt-1">
              Equivalent work at industry benchmark pace
            </div>
          </div>
        </div>
      )}

      {/* Team Size Comparison */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Time to Complete with Traditional Teams
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {estimates.map((estimate) => (
            <div
              key={estimate.size}
              className="p-4 bg-depth-surface rounded-lg border border-border-subtle text-center"
            >
              <div className="text-2xl font-bold text-text-primary">
                {formatTime(estimate.timeYears)}
              </div>
              <div className="text-sm text-text-muted mt-1">
                {estimate.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Comparison */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Traditional Team Cost Comparison
        </h3>
        <div className="space-y-3">
          {estimates.map((estimate) => {
            const savings = estimate.cost - currentTeamCost;
            const savingsPercent = currentTeamCost > 0 ? ((savings / estimate.cost) * 100) : 0;

            return (
              <div
                key={estimate.size}
                className="flex items-center justify-between p-4 bg-depth-surface rounded-lg border border-border-subtle"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-text-primary">
                    {estimate.label}
                  </div>
                  <div className="text-lg font-semibold text-text-primary">
                    {formatCurrency(estimate.cost)}
                  </div>
                </div>
                {savings > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted">vs your team:</span>
                    <span className="px-2 py-1 text-sm font-medium bg-green-500/10 text-green-400 rounded">
                      Save {formatCurrency(savings)} ({savingsPercent.toFixed(0)}%)
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Your Team's Cost */}
        <div className="mt-4 p-4 bg-radiance-gold/10 rounded-lg border border-radiance-gold/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-text-primary">
                Your AI-Augmented Team ({metrics.team_developer_count} {metrics.team_developer_count === 1 ? 'developer' : 'developers'})
              </div>
              <div className="text-xs text-text-muted mt-0.5">
                {formatTime(currentTeamTimeYears)} at ${(AVG_DEVELOPER_COST_PER_YEAR / 1000).toFixed(0)}K/dev/year
              </div>
            </div>
            <div className="text-xl font-bold text-radiance-gold">
              {formatCurrency(currentTeamCost)}
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-6 pt-4 border-t border-border-subtle">
        <p className="text-xs text-text-muted">
          Cost estimates based on ${(AVG_DEVELOPER_COST_PER_YEAR / 1000).toFixed(0)}K fully-loaded cost per developer per year
          (salary, benefits, overhead). Traditional team time calculated using industry benchmark of 5,000 net LOC/dev/month.
        </p>
      </div>
    </div>
  );
};

export default TeamScaleComparison;
