/**
 * Organization Management Modal Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { authFetch } from '@/lib/api-client';
import type { GitHubOrganization } from '@/types/github-analytics';

interface OrgManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrgToggled: () => void;
}

export const OrgManagementModal: React.FC<OrgManagementModalProps> = ({
  isOpen,
  onClose,
  onOrgToggled,
}) => {
  const [orgs, setOrgs] = useState<GitHubOrganization[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [togglingOrg, setTogglingOrg] = useState<string | null>(null);

  const fetchOrgs = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const url = refresh
        ? '/api/admin/analytics/github/orgs?refresh=true'
        : '/api/admin/analytics/github/orgs';

      const response = await authFetch(url);
      const result = await response.json();

      if (!result.error) {
        setOrgs(result.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch organizations:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const toggleOrgTracking = async (org: GitHubOrganization) => {
    try {
      setTogglingOrg(org.login);

      const response = await authFetch(`/api/admin/analytics/github/orgs/${org.login}/track`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_tracked: !org.is_tracked }),
      });

      const result = await response.json();

      if (!result.error) {
        // Update local state
        setOrgs(prev =>
          prev.map(o =>
            o.login === org.login ? { ...o, is_tracked: !o.is_tracked } : o
          )
        );
        onOrgToggled();
      }
    } catch (err) {
      console.error('Failed to toggle organization:', err);
    } finally {
      setTogglingOrg(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrgs();
    }
  }, [isOpen, fetchOrgs]);

  if (!isOpen) return null;

  const trackedCount = orgs.filter(o => o.is_tracked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-depth-surface border border-border-subtle rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Manage Organizations
            </h2>
            <p className="text-sm text-text-muted mt-0.5">
              Select which organizations to include in analytics
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-text-muted">Loading organizations...</span>
            </div>
          ) : orgs.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-text-muted mb-4">
                No organizations found. Click refresh to discover organizations your token has access to.
              </div>
              <button
                onClick={() => fetchOrgs(true)}
                disabled={refreshing}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  refreshing
                    ? 'bg-depth-elevated text-text-muted cursor-not-allowed'
                    : 'bg-radiance-gold text-depth-base hover:bg-radiance-amber'
                )}
              >
                {refreshing ? 'Discovering...' : 'Discover Organizations'}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {orgs.map((org) => (
                <div
                  key={org.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border transition-colors',
                    org.is_tracked
                      ? 'bg-green-500/10 border-green-500/20'
                      : 'bg-depth-elevated border-border-subtle hover:border-border-default'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {org.avatar_url ? (
                      <img
                        src={org.avatar_url}
                        alt={org.login}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-depth-base flex items-center justify-center">
                        <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-text-primary">
                        {org.name || org.login}
                      </div>
                      <div className="text-sm text-text-muted">
                        @{org.login}
                        {org.repos_count > 0 && (
                          <span className="ml-2">
                            {org.repos_count} {org.repos_count === 1 ? 'repo' : 'repos'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleOrgTracking(org)}
                    disabled={togglingOrg === org.login}
                    className={cn(
                      'relative w-12 h-6 rounded-full transition-colors',
                      org.is_tracked ? 'bg-green-500' : 'bg-depth-base',
                      togglingOrg === org.login && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                        org.is_tracked ? 'left-7' : 'left-1'
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle bg-depth-elevated/50 rounded-b-xl">
          <div className="text-sm text-text-muted">
            {trackedCount} of {orgs.length} organizations tracked
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchOrgs(true)}
              disabled={refreshing}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                refreshing
                  ? 'text-text-muted cursor-not-allowed'
                  : 'text-text-secondary hover:text-text-primary hover:bg-depth-elevated'
              )}
            >
              <svg className={cn('w-4 h-4', refreshing && 'animate-spin')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {refreshing ? 'Refreshing...' : 'Refresh from GitHub'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-sm font-medium bg-radiance-gold text-depth-base rounded-lg hover:bg-radiance-amber transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgManagementModal;
