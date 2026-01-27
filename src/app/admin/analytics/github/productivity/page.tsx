/**
 * Team Productivity Dashboard Page
 * Light Brand Consulting
 *
 * Showcases team development productivity with AI-augmented workflows
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import type { TimeRange, ProductivityMetrics } from '@/types/github-analytics';
import {
  TimeRangeSelector,
  TeamDeveloperModal,
  ProductivityHero,
  HumanComparisonChart,
  EfficiencyGauge,
  ProductivityTimeline,
} from '@/components/admin/analytics';
import { formatNumber } from '@/types/github-analytics';

export default function TeamProductivityPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [developerCount, setDeveloperCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ProductivityMetrics | null>(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  // Fetch team developer count
  const fetchTeamCount = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics/github/team-developers?include_stats=false');
      const result = await response.json();
      if (!result.error && result.data) {
        setDeveloperCount(result.data.length);
      }
    } catch (err) {
      console.error('Failed to fetch team count:', err);
    }
  }, []);

  const fetchProductivity = useCallback(async () => {
    if (developerCount === 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/admin/analytics/github/productivity?time_range=${timeRange}&developer_count=${developerCount}&_t=${Date.now()}`,
        { cache: 'no-store' }
      );
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      setMetrics(result.data);
    } catch (err) {
      setError('Failed to load productivity data');
      console.error('Productivity fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [timeRange, developerCount]);

  useEffect(() => {
    fetchTeamCount();
  }, [fetchTeamCount]);

  useEffect(() => {
    fetchProductivity();
  }, [fetchProductivity]);

  const handleTeamUpdated = useCallback(() => {
    fetchTeamCount();
  }, [fetchTeamCount]);

  const handleTeamModalClose = useCallback(() => {
    setTeamModalOpen(false);
    fetchTeamCount();
  }, [fetchTeamCount]);

  const headerActions = (
    <div className="flex items-center gap-3">
      <Link
        href="/admin/analytics/github"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Analytics
      </Link>
      <button
        onClick={() => setTeamModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-radiance-gold text-depth-base rounded-lg hover:bg-radiance-amber transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Manage Team ({developerCount})
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Team Productivity"
        subtitle="AI-augmented development metrics compared to industry benchmarks"
        actions={headerActions}
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10 space-y-6">
          {/* Error display */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* No team members warning */}
          {!loading && developerCount === 0 && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="font-medium text-amber-400">No Team Developers Selected</h4>
                  <p className="text-sm text-text-muted mt-1">
                    Click &quot;Manage Team&quot; to select which contributors are on your team.
                    The number of selected developers will be used to calculate productivity metrics.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Time range selector */}
          <TimeRangeSelector
            value={timeRange}
            onChange={setTimeRange}
          />

          {/* Hero section */}
          <ProductivityHero
            metrics={metrics}
            loading={loading}
          />

          {/* Team Averages Card */}
          <div className="bg-depth-elevated rounded-xl p-6 border border-border-subtle">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Per-Developer Averages ({developerCount} {developerCount === 1 ? 'developer' : 'developers'})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-text-primary">
                  {loading ? (
                    <div className="h-9 w-20 mx-auto bg-depth-surface rounded animate-pulse" />
                  ) : (
                    formatNumber(metrics?.avg_net_lines_per_dev || 0)
                  )}
                </div>
                <div className="text-sm text-text-muted mt-1">Avg Net Lines</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-text-primary">
                  {loading ? (
                    <div className="h-9 w-20 mx-auto bg-depth-surface rounded animate-pulse" />
                  ) : (
                    formatNumber(metrics?.avg_commits_per_dev || 0)
                  )}
                </div>
                <div className="text-sm text-text-muted mt-1">Avg Commits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {loading ? (
                    <div className="h-9 w-20 mx-auto bg-depth-surface rounded animate-pulse" />
                  ) : (
                    `+${formatNumber(metrics?.avg_additions_per_dev || 0)}`
                  )}
                </div>
                <div className="text-sm text-text-muted mt-1">Avg Lines Added</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {loading ? (
                    <div className="h-9 w-20 mx-auto bg-depth-surface rounded animate-pulse" />
                  ) : (
                    `-${formatNumber(metrics?.avg_deletions_per_dev || 0)}`
                  )}
                </div>
                <div className="text-sm text-text-muted mt-1">Avg Lines Removed</div>
              </div>
            </div>
          </div>

          {/* Comparison and Gauge row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HumanComparisonChart
              metrics={metrics}
              loading={loading}
            />
            <EfficiencyGauge
              metrics={metrics}
              loading={loading}
            />
          </div>

          {/* Timeline */}
          <ProductivityTimeline
            metrics={metrics}
            loading={loading}
          />

          {/* Footer info */}
          <div className="p-4 bg-depth-elevated rounded-xl border border-border-subtle">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-text-primary">About the Benchmark</h4>
                <p className="text-sm text-text-muted mt-1">
                  The industry benchmark of 5,000 net lines of code per developer per month is based on
                  research from multiple sources including studies by Capers Jones and industry surveys.
                  &quot;Net lines&quot; means lines added minus lines deleted, representing actual codebase growth.
                  This metric helps quantify the productivity impact of AI-augmented development workflows.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Team Management Modal */}
      <TeamDeveloperModal
        isOpen={teamModalOpen}
        onClose={handleTeamModalClose}
        onTeamUpdated={handleTeamUpdated}
      />
    </div>
  );
}
