/**
 * Sessions Drawer - List past sessions with load/delete
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { StackSession } from '@/types/stack-diagnostic';
import { getTemplateById } from '@/lib/stack-diagnostic';
import { useAuthFetch } from '@/hooks/useAuthFetch';

interface SessionsDrawerProps {
  onClose: () => void;
  onLoad: (session: StackSession) => void;
  currentSessionId: string | null;
}

export const SessionsDrawer: React.FC<SessionsDrawerProps> = ({
  onClose,
  onLoad,
  currentSessionId,
}) => {
  const { authFetch } = useAuthFetch();
  const [sessions, setSessions] = useState<StackSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/stack-diagnostic');
      const result = await response.json();
      if (result.data) {
        setSessions(result.data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleDelete = async (id: string) => {
    try {
      await authFetch(`/api/admin/stack-diagnostic/${id}`, { method: 'DELETE' });
      setSessions((prev) => prev.filter((s) => s.id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-md bg-depth-surface border-l border-depth-border h-full overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Saved Sessions</h3>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-secondary text-lg"
            >
              ×
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-radiance-gold/40 border-t-radiance-gold rounded-full animate-spin" />
            </div>
          ) : sessions.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-12">
              No saved sessions yet.
            </p>
          ) : (
            <div className="space-y-2">
              {sessions.map((session) => {
                const template = getTemplateById(session.template_id);
                const isCurrent = session.id === currentSessionId;

                return (
                  <div
                    key={session.id}
                    className={`border rounded-lg p-3 transition-colors ${
                      isCurrent
                        ? 'bg-radiance-gold/5 border-radiance-gold/20'
                        : 'bg-depth-elevated border-depth-border hover:border-depth-border/80'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span>{template?.icon || '🔧'}</span>
                        <span className="text-sm font-medium text-text-primary">
                          {template?.name || session.template_id}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-mono text-radiance-gold bg-radiance-gold/10 px-1.5 py-0.5 rounded">
                            CURRENT
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-text-muted mb-2">
                      {new Date(session.created_at).toLocaleDateString()} ·{' '}
                      {(session.tools as unknown[])?.length || 0} tools
                      {session.analysis && (
                        <> · Score: {(session.analysis as { score?: number })?.score || '?'}</>
                      )}
                    </div>

                    {session.coach_notes && (
                      <p className="text-xs text-text-secondary italic mb-2 line-clamp-2">
                        {session.coach_notes}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      {!isCurrent && (
                        <button
                          onClick={() => onLoad(session)}
                          className="text-xs text-radiance-gold hover:text-radiance-amber transition-colors"
                        >
                          Load
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteId(session.id)}
                        className="text-xs text-text-muted hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Delete confirmation */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setDeleteId(null)} />
            <div className="relative bg-depth-surface border border-depth-border rounded-xl p-5 max-w-sm w-full">
              <h4 className="text-sm font-semibold text-text-primary mb-2">Delete Session?</h4>
              <p className="text-xs text-text-secondary mb-4">
                This action cannot be undone.
              </p>
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setDeleteId(null)}
                  className="text-xs text-text-muted hover:text-text-secondary px-3 py-1.5 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded hover:bg-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
