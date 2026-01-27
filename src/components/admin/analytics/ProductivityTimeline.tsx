/**
 * Productivity Timeline Component
 * Light Brand Consulting
 *
 * Line chart showing productivity metrics over time
 */

'use client';

import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { ProductivityMetrics } from '@/types/github-analytics';
import { INDUSTRY_BENCHMARK_LOC_PER_MONTH } from '@/types/github-analytics';

interface ProductivityTimelineProps {
  metrics: ProductivityMetrics | null;
  loading?: boolean;
  className?: string;
}

export const ProductivityTimeline: React.FC<ProductivityTimelineProps> = ({
  metrics,
  loading,
  className,
}) => {
  const chartData = useMemo(() => {
    if (!metrics?.daily_stats) return [];

    // Calculate cumulative values for the timeline
    let cumulativeNet = 0;
    let cumulativeCommits = 0;

    // Traditional benchmark: team size × 5000 LOC/month ÷ 30 days
    const dailyBenchmark = (metrics.team_developer_count * INDUSTRY_BENCHMARK_LOC_PER_MONTH) / 30;

    return metrics.daily_stats.map((d, index) => {
      cumulativeNet += d.net_lines;
      cumulativeCommits += d.commits_count;

      // Traditional cumulative is linear growth at benchmark rate
      const traditionalCumulative = Math.round(dailyBenchmark * (index + 1));

      return {
        date: new Date(d.stat_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: d.stat_date,
        daily_net: d.net_lines,
        daily_additions: d.additions,
        daily_deletions: d.deletions,
        daily_commits: d.commits_count,
        cumulative_net: cumulativeNet,
        cumulative_commits: cumulativeCommits,
        traditional_cumulative: traditionalCumulative,
      };
    });
  }, [metrics]);

  // Get traditional total for comparison stats
  const traditionalTotal = useMemo(() => {
    if (!chartData.length) return 0;
    return chartData[chartData.length - 1].traditional_cumulative;
  }, [chartData]);

  if (loading) {
    return (
      <div className={cn('bg-gradient-to-br from-depth-elevated to-depth-surface rounded-xl p-6 border border-border-subtle', className)}>
        <div className="h-5 w-40 bg-depth-surface rounded animate-pulse mb-4" />
        <div className="h-[300px] bg-depth-surface rounded animate-pulse" />
      </div>
    );
  }

  if (!metrics || chartData.length === 0) {
    return (
      <div className={cn('bg-gradient-to-br from-depth-elevated to-depth-surface rounded-xl p-6 border border-border-subtle', className)}>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Productivity Timeline</h3>
        <div className="h-[300px] flex items-center justify-center text-text-muted">
          No timeline data available
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-gradient-to-br from-depth-elevated to-depth-surface rounded-xl p-6 border border-border-subtle', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Productivity Timeline</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-radiance-gold" />
            <span className="text-text-muted">Your Team</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-gray-500" style={{ borderTop: '2px dashed #6B7280' }} />
            <span className="text-text-muted">Traditional ({metrics?.team_developer_count} devs)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-text-muted">Daily</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D2D30" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#8B8B8D' }}
              tickLine={false}
              axisLine={{ stroke: '#2D2D30' }}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="cumulative"
              orientation="left"
              tick={{ fontSize: 10, fill: '#8B8B8D' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const absValue = Math.abs(value);
                const sign = value < 0 ? '-' : '';
                if (absValue >= 1000000) return `${sign}${(absValue / 1000000).toFixed(1)}M`;
                if (absValue >= 1000) return `${sign}${(absValue / 1000).toFixed(0)}K`;
                return value.toString();
              }}
            />
            <YAxis
              yAxisId="daily"
              orientation="right"
              tick={{ fontSize: 10, fill: '#8B8B8D' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const absValue = Math.abs(value);
                const sign = value < 0 ? '-' : '';
                if (absValue >= 1000) return `${sign}${(absValue / 1000).toFixed(0)}K`;
                return value.toString();
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E1E20',
                border: '1px solid #2D2D30',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#E8E8E8' }}
              formatter={(value: number, name: string) => {
                const labels: Record<string, string> = {
                  cumulative_net: 'Your Team',
                  traditional_cumulative: 'Traditional Team',
                  daily_net: 'Daily Net LOC',
                };
                return [value.toLocaleString(), labels[name] || name];
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />
            {/* Traditional benchmark line - dashed at the bottom */}
            <Area
              yAxisId="cumulative"
              type="monotone"
              dataKey="traditional_cumulative"
              stroke="#6B7280"
              strokeWidth={2}
              strokeDasharray="6 4"
              fill="none"
              dot={false}
              activeDot={{ fill: '#6B7280', strokeWidth: 2, stroke: '#fff', r: 4 }}
            />
            <Area
              yAxisId="cumulative"
              type="monotone"
              dataKey="cumulative_net"
              stroke="#FBBF24"
              strokeWidth={2}
              fill="url(#cumulativeGradient)"
              dot={false}
              activeDot={{ fill: '#FBBF24', strokeWidth: 2, stroke: '#fff', r: 5 }}
            />
            <Area
              yAxisId="daily"
              type="monotone"
              dataKey="daily_net"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#dailyGradient)"
              dot={false}
              activeDot={{ fill: '#3B82F6', strokeWidth: 2, stroke: '#fff', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-border-subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div>
            <div className="text-text-muted">Avg Daily Net LOC</div>
            <div className="font-semibold text-text-primary">
              {chartData.length > 0
                ? Math.round(chartData.reduce((sum, d) => sum + d.daily_net, 0) / chartData.length).toLocaleString()
                : 0}
            </div>
          </div>
          <div>
            <div className="text-text-muted">Peak Daily Net LOC</div>
            <div className="font-semibold text-text-primary">
              {chartData.length > 0
                ? Math.max(...chartData.map(d => d.daily_net)).toLocaleString()
                : 0}
            </div>
          </div>
          <div>
            <div className="text-text-muted">Active Days</div>
            <div className="font-semibold text-text-primary">
              {chartData.filter(d => d.daily_commits > 0).length}
            </div>
          </div>
          <div>
            <div className="text-text-muted">vs Traditional</div>
            <div className="font-semibold text-radiance-gold">
              {chartData.length > 0 && traditionalTotal > 0
                ? `${Math.round(chartData[chartData.length - 1].cumulative_net / traditionalTotal)}x output`
                : '—'}
            </div>
            <div className="text-xs text-text-muted">
              {traditionalTotal > 0 ? `(${traditionalTotal.toLocaleString()} LOC benchmark)` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityTimeline;
