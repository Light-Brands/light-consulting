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
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  config,
  lastSyncAt,
  className,
}) => {
  const isConnected = config?.is_active && config?.has_token;

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
        <div>
          <span className={cn(
            'font-medium text-sm',
            isConnected ? 'text-green-400' : 'text-amber-400'
          )}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
          {isConnected && config?.org_name && (
            <span className="text-text-secondary text-sm ml-2">
              to <span className="font-mono text-text-primary">{config.org_name}</span>
            </span>
          )}
        </div>
      </div>

      {lastSyncAt && (
        <div className="text-text-muted text-sm">
          Last synced: <span className="text-text-secondary">{getRelativeTime(lastSyncAt)}</span>
        </div>
      )}

      {!isConnected && (
        <div className="text-amber-400 text-sm">
          Set GITHUB_ACCESS_TOKEN and GITHUB_ORG_NAME env vars
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
