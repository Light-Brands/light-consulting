/**
 * Diagnostic Stats - Animated stats bar with 5 metrics
 */

'use client';

import React, { useState, useEffect } from 'react';
import type { AnalysisResult } from '@/types/stack-diagnostic';

interface DiagnosticStatsProps {
  stats: AnalysisResult['stats'];
  animate?: boolean;
  goodStats?: {
    toolsSiloed: number;
    dataLostPercent: number;
    manualHoursPerWeek: number;
    leadsLostPercent: number;
    monthlySavings: number;
  };
}

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  color: string;
}

function useAnimatedCounter(target: number, duration: number = 1500, delay: number = 0, enabled: boolean = true): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCurrent(target);
      return;
    }

    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(target * eased));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay, enabled]);

  return current;
}

export const DiagnosticStats: React.FC<DiagnosticStatsProps> = ({
  stats,
  animate = true,
  goodStats,
}) => {
  const displayStats = goodStats || stats;

  const items: StatItem[] = [
    {
      label: 'Tools Siloed',
      value: displayStats.toolsSiloed,
      suffix: '',
      color: displayStats.toolsSiloed > 0 ? 'text-red-400' : 'text-green-400',
    },
    {
      label: 'Data Lost',
      value: displayStats.dataLostPercent,
      suffix: '%',
      color: displayStats.dataLostPercent > 10 ? 'text-red-400' : displayStats.dataLostPercent > 5 ? 'text-amber-400' : 'text-green-400',
    },
    {
      label: 'Manual Hrs/Wk',
      value: displayStats.manualHoursPerWeek,
      suffix: 'h',
      color: displayStats.manualHoursPerWeek > 5 ? 'text-red-400' : displayStats.manualHoursPerWeek > 2 ? 'text-amber-400' : 'text-green-400',
    },
    {
      label: 'Leads Lost',
      value: displayStats.leadsLostPercent,
      suffix: '%',
      color: displayStats.leadsLostPercent > 10 ? 'text-red-400' : displayStats.leadsLostPercent > 5 ? 'text-amber-400' : 'text-green-400',
    },
    {
      label: goodStats ? 'Monthly Savings' : 'Monthly Waste',
      value: goodStats ? goodStats.monthlySavings : stats.monthlyWaste,
      suffix: '',
      prefix: '$',
      color: goodStats ? 'text-green-400' : 'text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {items.map((item, i) => (
        <StatCard
          key={item.label}
          item={item}
          animate={animate}
          delay={i * 200}
        />
      ))}
    </div>
  );
};

const StatCard: React.FC<{ item: StatItem; animate: boolean; delay: number }> = ({
  item,
  animate,
  delay,
}) => {
  const animatedValue = useAnimatedCounter(item.value, 1500, delay, animate);
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [animate, delay]);

  return (
    <div
      className={`bg-depth-elevated border border-depth-border rounded-lg p-3 text-center transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className={`text-xl md:text-2xl font-bold font-mono ${item.color}`}>
        {item.prefix || ''}{animatedValue}{item.suffix}
      </div>
      <div className="text-[9px] font-mono tracking-widest text-text-muted uppercase mt-1">
        {item.label}
      </div>
    </div>
  );
};
