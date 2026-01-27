/**
 * Code Frequency Chart Component
 * Light Brand Consulting
 */

'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { cn } from '@/lib/utils';

interface DailyStats {
  stat_date: string;
  commits_count: number;
  additions: number;
  deletions: number;
}

interface CodeFrequencyChartProps {
  data: DailyStats[];
  loading?: boolean;
  className?: string;
}

export const CodeFrequencyChart: React.FC<CodeFrequencyChartProps> = ({
  data,
  loading,
  className,
}) => {
  const chartData = useMemo(() => {
    return data.map((d) => ({
      date: new Date(d.stat_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      additions: d.additions,
      deletions: -d.deletions, // Negative for display below the axis
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
        <h3 className="text-sm font-medium text-text-primary mb-4">Code Frequency</h3>
        <div className="h-[200px] flex items-center justify-center text-text-muted">
          No code frequency data available
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-depth-elevated rounded-lg p-4 border border-depth-border', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-primary">Code Frequency</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span className="text-text-muted">Additions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-text-muted">Deletions</span>
          </div>
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
              tickFormatter={(value) => {
                const absValue = Math.abs(value);
                if (absValue >= 1000) return `${(absValue / 1000).toFixed(0)}k`;
                return absValue.toString();
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
              formatter={(value, name) => {
                const absValue = Math.abs(Number(value));
                const label = name === 'additions' ? 'Added' : 'Removed';
                return [absValue.toLocaleString(), label];
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <ReferenceLine y={0} stroke="#2D2D30" />
            <Bar dataKey="additions" fill="#22C55E" radius={[2, 2, 0, 0]} />
            <Bar dataKey="deletions" fill="#EF4444" radius={[0, 0, 2, 2]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CodeFrequencyChart;
