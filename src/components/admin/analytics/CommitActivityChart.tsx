/**
 * Commit Activity Chart Component
 * Light Brand Consulting
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
} from 'recharts';
import { cn } from '@/lib/utils';

interface DailyStats {
  stat_date: string;
  commits_count: number;
  additions: number;
  deletions: number;
}

interface CommitActivityChartProps {
  data: DailyStats[];
  loading?: boolean;
  className?: string;
}

export const CommitActivityChart: React.FC<CommitActivityChartProps> = ({
  data,
  loading,
  className,
}) => {
  const chartData = useMemo(() => {
    return data.map((d) => ({
      date: new Date(d.stat_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      commits: d.commits_count,
      fullDate: d.stat_date,
    }));
  }, [data]);

  if (loading) {
    return (
      <div className={cn('bg-depth-elevated rounded-lg p-4 border border-depth-border', className)}>
        <div className="h-4 w-32 bg-depth-surface rounded animate-pulse mb-4" />
        <div className="h-[200px] bg-depth-surface rounded animate-pulse" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn('bg-depth-elevated rounded-lg p-4 border border-depth-border', className)}>
        <h3 className="text-sm font-medium text-text-primary mb-4">Commit Activity</h3>
        <div className="h-[200px] flex items-center justify-center text-text-muted">
          No commit data available
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-depth-elevated rounded-lg p-4 border border-depth-border', className)}>
      <h3 className="text-sm font-medium text-text-primary mb-4">Commit Activity</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E8B84A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#E8B84A" stopOpacity={0} />
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
              tick={{ fontSize: 10, fill: '#8B8B8D' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E1E20',
                border: '1px solid #2D2D30',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#E8E8E8' }}
              itemStyle={{ color: '#E8B84A' }}
              formatter={(value) => [value, 'Commits']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="commits"
              stroke="#E8B84A"
              strokeWidth={2}
              fill="url(#commitGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CommitActivityChart;
