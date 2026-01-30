/**
 * Stack Diagnostic Session Detail Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, use } from 'react';
import { AdminHeader } from '@/components/admin';
import { StackDiagnosticTool } from '@/components/admin/stack-diagnostic';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { StackSession } from '@/types/stack-diagnostic';

export default function StackDiagnosticSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const { authFetch } = useAuthFetch();
  const [session, setSession] = useState<StackSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await authFetch(`/api/admin/stack-diagnostic/${sessionId}`);
        const result = await response.json();
        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setSession(result.data);
        }
      } catch {
        setError('Failed to load session');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, [sessionId, authFetch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminHeader title="Stack Diagnostic" subtitle="Loading session..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-radiance-gold/40 border-t-radiance-gold rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminHeader title="Stack Diagnostic" subtitle="Session not found" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-muted">{error || 'Session not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Stack Diagnostic"
        subtitle={`Session from ${new Date(session.created_at).toLocaleDateString()}`}
      />
      <div className="flex-1 min-h-0" style={{ height: 'calc(100vh - 120px)' }}>
        <StackDiagnosticTool sessionId={sessionId} initialSession={session} />
      </div>
    </div>
  );
}
