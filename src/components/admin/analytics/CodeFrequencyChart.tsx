/**
 * Code Frequency Chart Component
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
            <div className="w-4 h-0.5 rounded-full bg-green-500" />
            <span className="text-text-muted">Additions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 rounded-full bg-red-500" />
            <span className="text-text-muted">Deletions</span>
          </div>
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="additionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="deletionsGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
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
            <ReferenceLine y={0} stroke="#3D3D40" strokeWidth={1} />
            <Area
              type="monotone"
              dataKey="additions"
              stroke="#22C55E"
              strokeWidth={2}
              fill="url(#additionsGradient)"
              dot={{ fill: '#22C55E', strokeWidth: 0, r: 3 }}
              activeDot={{ fill: '#22C55E', strokeWidth: 2, stroke: '#fff', r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="deletions"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#deletionsGradient)"
              dot={{ fill: '#EF4444', strokeWidth: 0, r: 3 }}
              activeDot={{ fill: '#EF4444', strokeWidth: 2, stroke: '#fff', r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CodeFrequencyChart;
