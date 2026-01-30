/**
 * Issues List - Critical issues and warnings with staggered fade-in
 */

'use client';

import React, { useState, useEffect } from 'react';
import type { Issue } from '@/types/stack-diagnostic';

interface IssuesListProps {
  issues: Issue[];
  animate?: boolean;
}

const severityConfig = {
  critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'CRITICAL', icon: '🔴' },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'WARNING', icon: '🟡' },
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'INFO', icon: '🔵' },
};

export const IssuesList: React.FC<IssuesListProps> = ({ issues, animate = true }) => {
  const [visibleCount, setVisibleCount] = useState(animate ? 0 : issues.length);

  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= issues.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [issues.length, animate]);

  const criticalIssues = issues.filter(i => i.severity === 'critical');
  const warningIssues = issues.filter(i => i.severity === 'warning');

  let currentIndex = 0;

  return (
    <div className="space-y-4">
      {criticalIssues.length > 0 && (
        <div>
          <h4 className="text-xs font-mono tracking-widest text-red-400 uppercase mb-2">
            Critical Issues ({criticalIssues.length})
          </h4>
          <div className="space-y-2">
            {criticalIssues.map((issue) => {
              const idx = currentIndex++;
              return (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  visible={idx < visibleCount}
                />
              );
            })}
          </div>
        </div>
      )}

      {warningIssues.length > 0 && (
        <div>
          <h4 className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
            Warnings ({warningIssues.length})
          </h4>
          <div className="space-y-2">
            {warningIssues.map((issue) => {
              const idx = currentIndex++;
              return (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  visible={idx < visibleCount}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const IssueCard: React.FC<{ issue: Issue; visible: boolean }> = ({ issue, visible }) => {
  const config = severityConfig[issue.severity];

  return (
    <div
      className={`${config.bg} border ${config.border} rounded-lg p-3 transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="text-sm mt-0.5">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-medium ${config.text}`}>{issue.title}</span>
            <span className={`text-[9px] font-mono ${config.text} px-1.5 py-0.5 rounded-full border ${config.border}`}>
              {config.badge}
            </span>
          </div>
          <p className="text-xs text-text-secondary">{issue.description}</p>
        </div>
      </div>
    </div>
  );
};
