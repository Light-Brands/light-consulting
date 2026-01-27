/**
 * GitHub Connection Status Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { GitHubConfigPublic } from '@/types/github-analytics';
import { getRelativeTime } from '@/types/github-analytics';

interface ConnectionStatusProps {
  config: GitHubConfigPublic | null;
  lastSyncAt: string | null;
  trackedOrgsCount?: number;
  onManageOrgs?: () => void;
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  config,
  lastSyncAt,
  trackedOrgsCount = 0,
  onManageOrgs,
  className,
}) => {
  const isConnected = config?.is_active && config?.has_token;

  // Determine the connection display text
  const getConnectionText = () => {
    if (trackedOrgsCount > 0) {
      return `tracking ${trackedOrgsCount} ${trackedOrgsCount === 1 ? 'org' : 'orgs'}`;
    }
    if (config?.org_name) {
      return (
        <>
          to <span className="font-mono text-text-primary">{config.org_name}</span>
        </>
      );
    }
    return null;
  };

  const connectionText = getConnectionText();

  return (
    <div className={cn(
      'flex items-center justify-between px-4 py-3 rounded-lg border',
      isConnected
        ? 'bg-green-500/10 border-green-500/20'
        : 'bg-amber-500/10 border-amber-500/20',
      className
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          'w-2.5 h-2.5 rounded-full',
          isConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
        )} />
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-medium text-sm',
            isConnected ? 'text-green-400' : 'text-amber-400'
          )}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
          {isConnected && connectionText && (
            <span className="text-text-secondary text-sm">
              {connectionText}
            </span>
          )}
          {isConnected && onManageOrgs && (
            <button
              onClick={onManageOrgs}
              className="ml-2 px-2 py-0.5 text-xs font-medium text-text-secondary hover:text-text-primary bg-depth-elevated hover:bg-depth-base rounded transition-colors"
            >
              Manage Orgs
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {lastSyncAt && (
          <div className="text-text-muted text-sm">
            Last synced: <span className="text-text-secondary">{getRelativeTime(lastSyncAt)}</span>
          </div>
        )}

        {!isConnected && (
          <div className="text-amber-400 text-sm">
            Set GITHUB_ACCESS_TOKEN env var
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;
