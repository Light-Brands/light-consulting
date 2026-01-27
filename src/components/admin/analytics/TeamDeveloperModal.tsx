/**
 * Team Developer Management Modal Component
 * Light Brand Consulting
 *
 * Select which contributors are internal team developers for productivity tracking
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { authFetch } from '@/lib/api-client';
import type { AggregatedContributor, TeamDeveloper } from '@/types/github-analytics';
import { formatNumber } from '@/types/github-analytics';

interface TeamDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeamUpdated: () => void;
}

export const TeamDeveloperModal: React.FC<TeamDeveloperModalProps> = ({
  isOpen,
  onClose,
  onTeamUpdated,
}) => {
  const [contributors, setContributors] = useState<AggregatedContributor[]>([]);
  const [teamDevelopers, setTeamDevelopers] = useState<TeamDeveloper[]>([]);
  const [loading, setLoading] = useState(false);
  const [togglingUser, setTogglingUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch both contributors and current team developers
      const [contribRes, teamRes] = await Promise.all([
        authFetch('/api/admin/analytics/github/contributors?limit=200'),
        authFetch('/api/admin/analytics/github/team-developers?include_stats=false'),
      ]);

      const contribResult = await contribRes.json();
      const teamResult = await teamRes.json();

      if (!contribResult.error) {
        setContributors(contribResult.data || []);
      }
      if (!teamResult.error) {
        setTeamDevelopers(teamResult.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTeamMember = async (contributor: AggregatedContributor) => {
    const isCurrentlyTeamMember = teamDevelopers.some(
      d => d.github_login === contributor.github_login
    );

    try {
      setTogglingUser(contributor.github_login);

      if (isCurrentlyTeamMember) {
        // Remove from team
        const response = await authFetch(
          `/api/admin/analytics/github/team-developers/${encodeURIComponent(contributor.github_login)}`,
          { method: 'DELETE' }
        );

        const result = await response.json();
        if (!result.error) {
          setTeamDevelopers(prev =>
            prev.filter(d => d.github_login !== contributor.github_login)
          );
          onTeamUpdated();
        }
      } else {
        // Add to team
        const response = await authFetch('/api/admin/analytics/github/team-developers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            github_login: contributor.github_login,
            github_id: contributor.github_id,
            avatar_url: contributor.avatar_url,
          }),
        });

        const result = await response.json();
        if (!result.error && result.data) {
          setTeamDevelopers(prev => [...prev, result.data]);
          onTeamUpdated();
        }
      }
    } catch (err) {
      console.error('Failed to toggle team member:', err);
    } finally {
      setTogglingUser(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, fetchData]);

  if (!isOpen) return null;

  const teamLogins = new Set(teamDevelopers.map(d => d.github_login));

  // Filter contributors by search query
  const filteredContributors = contributors.filter(c =>
    c.github_login.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort: team members first, then by commits
  const sortedContributors = [...filteredContributors].sort((a, b) => {
    const aIsTeam = teamLogins.has(a.github_login);
    const bIsTeam = teamLogins.has(b.github_login);
    if (aIsTeam && !bIsTeam) return -1;
    if (!aIsTeam && bIsTeam) return 1;
    return b.total_commits - a.total_commits;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-depth-surface border border-border-subtle rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Manage Team Developers
            </h2>
            <p className="text-sm text-text-muted mt-0.5">
              Select which contributors are internal team members for productivity tracking
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

        {/* Search */}
        <div className="px-6 py-3 border-b border-border-subtle">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search contributors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-depth-elevated border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-radiance-gold/50"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-text-muted">Loading contributors...</span>
            </div>
          ) : sortedContributors.length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              {searchQuery
                ? 'No contributors match your search'
                : 'No contributors found. Sync your repositories first.'}
            </div>
          ) : (
            <div className="space-y-2">
              {sortedContributors.map((contributor) => {
                const isTeamMember = teamLogins.has(contributor.github_login);

                return (
                  <div
                    key={contributor.github_login}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border transition-colors',
                      isTeamMember
                        ? 'bg-radiance-gold/10 border-radiance-gold/30'
                        : 'bg-depth-elevated border-border-subtle hover:border-border-default'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {contributor.avatar_url ? (
                        <img
                          src={contributor.avatar_url}
                          alt={contributor.github_login}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-depth-base flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-medium text-text-primary flex items-center gap-2">
                          <span className="truncate">{contributor.github_login}</span>
                          {isTeamMember && (
                            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-radiance-gold/20 text-radiance-gold rounded">
                              TEAM
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-text-muted flex items-center gap-3">
                          <span>{formatNumber(contributor.total_commits)} commits</span>
                          <span className="text-green-400">+{formatNumber(contributor.total_additions)}</span>
                          <span className="text-red-400">-{formatNumber(contributor.total_deletions)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleTeamMember(contributor)}
                      disabled={togglingUser === contributor.github_login}
                      className={cn(
                        'relative w-12 h-6 rounded-full transition-colors flex-shrink-0',
                        isTeamMember ? 'bg-radiance-gold' : 'bg-depth-base',
                        togglingUser === contributor.github_login && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                          isTeamMember ? 'left-7' : 'left-1'
                        )}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle bg-depth-elevated/50 rounded-b-xl">
          <div className="text-sm text-text-muted">
            {teamDevelopers.length} team {teamDevelopers.length === 1 ? 'developer' : 'developers'} selected
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium bg-radiance-gold text-depth-base rounded-lg hover:bg-radiance-amber transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamDeveloperModal;
