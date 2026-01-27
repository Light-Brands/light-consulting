/**
 * Pull Requests Table Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { GitHubPullRequest, PRState } from '@/types/github-analytics';
import { getPRStateColor, getRelativeTime, formatLinesChanged } from '@/types/github-analytics';

interface PRTableProps {
  pullRequests: (GitHubPullRequest & { github_repositories?: { name: string; full_name: string } })[];
  loading?: boolean;
  className?: string;
}

const PRStateBadge: React.FC<{ state: PRState }> = ({ state }) => {
  const { text, bg } = getPRStateColor(state);
  const labels: Record<PRState, string> = {
    open: 'Open',
    closed: 'Closed',
    merged: 'Merged',
  };

  return (
    <span className={cn('px-2 py-0.5 rounded text-xs font-medium', text, bg)}>
      {labels[state]}
    </span>
  );
};

export const PRTable: React.FC<PRTableProps> = ({
  pullRequests,
  loading,
  className,
}) => {
  if (loading) {
    return (
      <div className={cn('bg-depth-elevated rounded-lg border border-depth-border overflow-hidden', className)}>
        <div className="p-4 border-b border-depth-border">
          <div className="h-5 w-32 bg-depth-surface rounded animate-pulse" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-depth-border">
                <th className="text-left p-4 text-xs font-medium text-text-muted">Title</th>
                <th className="text-left p-4 text-xs font-medium text-text-muted">Status</th>
                <th className="text-left p-4 text-xs font-medium text-text-muted">Author</th>
                <th className="text-left p-4 text-xs font-medium text-text-muted">Changes</th>
                <th className="text-left p-4 text-xs font-medium text-text-muted">Created</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-depth-border last:border-b-0">
                  <td className="p-4"><div className="h-4 w-48 bg-depth-surface rounded animate-pulse" /></td>
                  <td className="p-4"><div className="h-5 w-16 bg-depth-surface rounded animate-pulse" /></td>
                  <td className="p-4"><div className="h-4 w-24 bg-depth-surface rounded animate-pulse" /></td>
                  <td className="p-4"><div className="h-4 w-20 bg-depth-surface rounded animate-pulse" /></td>
                  <td className="p-4"><div className="h-4 w-16 bg-depth-surface rounded animate-pulse" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (pullRequests.length === 0) {
    return (
      <div className={cn('bg-depth-elevated rounded-lg border border-depth-border p-8 text-center', className)}>
        <svg className="w-12 h-12 mx-auto text-text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <p className="text-text-muted">No pull requests found</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-depth-elevated rounded-lg border border-depth-border overflow-hidden', className)}>
      <div className="p-4 border-b border-depth-border">
        <h3 className="text-sm font-medium text-text-primary">Pull Requests</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-depth-border bg-depth-surface/50">
              <th className="text-left p-4 text-xs font-medium text-text-muted">Title</th>
              <th className="text-left p-4 text-xs font-medium text-text-muted">Status</th>
              <th className="text-left p-4 text-xs font-medium text-text-muted">Author</th>
              <th className="text-left p-4 text-xs font-medium text-text-muted">Changes</th>
              <th className="text-left p-4 text-xs font-medium text-text-muted">Created</th>
            </tr>
          </thead>
          <tbody>
            {pullRequests.map((pr) => (
              <tr key={pr.id} className="border-b border-depth-border last:border-b-0 hover:bg-depth-surface/30 transition-colors">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-text-primary font-medium line-clamp-1">
                      {pr.title}
                    </span>
                    {pr.github_repositories && (
                      <span className="text-xs text-text-muted font-mono">
                        {pr.github_repositories.name}#{pr.number}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <PRStateBadge state={pr.state} />
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">{pr.author_github_login}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-400">+{pr.additions}</span>
                    <span className="text-red-400">-{pr.deletions}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-muted">{getRelativeTime(pr.created_at_github)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PRTable;
