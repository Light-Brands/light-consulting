/**
 * GitHub Sync API Route
 * Light Brand Consulting
 *
 * POST /api/admin/analytics/github/sync - Trigger sync
 * GET /api/admin/analytics/github/sync - Get sync status
 */

import { NextRequest, NextResponse, after } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { createGitHubClient } from '@/lib/github-api';
import { runSync, getLatestSyncStatus, createSyncLog } from '@/lib/github-sync';
import type { SyncType, GitHubSyncLog } from '@/types/github-analytics';

export const maxDuration = 300; // 5 minutes (Vercel Pro max)

/**
 * GET /api/admin/analytics/github/sync
 * Get sync status and history
 */
export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Get sync status
    const status = await getLatestSyncStatus();

    // Get sync history
    const { data: history, error } = await supabaseAdmin
      .from('github_sync_log')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({
          data: {
            status: { lastSync: null, isRunning: false },
            history: [],
          },
          error: null,
        });
      }
      return NextResponse.json(
        { data: null, error: `Failed to get sync status: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: {
        status,
        history: history as GitHubSyncLog[],
      },
      error: null,
    });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/sync:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/analytics/github/sync
 * Trigger a new sync
 */
export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const client = createGitHubClient();
    if (!client) {
      return NextResponse.json(
        { data: null, error: 'GitHub not configured. Set GITHUB_ACCESS_TOKEN and GITHUB_ORG_NAME environment variables.' },
        { status: 400 }
      );
    }

    // Check if sync is already running
    const { isRunning } = await getLatestSyncStatus();
    if (isRunning) {
      return NextResponse.json(
        { data: null, error: 'A sync is already in progress' },
        { status: 409 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const syncType: SyncType = body.sync_type || 'incremental';
    const repositoryId: string | undefined = body.repository_id;

    // Validate sync type
    const validTypes: SyncType[] = ['full', 'incremental', 'repositories', 'commits', 'pull_requests', 'contributors'];
    if (!validTypes.includes(syncType)) {
      return NextResponse.json(
        { data: null, error: `Invalid sync_type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Calculate 'since' date for incremental sync
    let since: Date | undefined;
    if (syncType === 'incremental') {
      // Check when the last successful sync completed
      const { data: lastSync } = await supabaseAdmin
        .from('github_sync_log')
        .select('completed_at')
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(1)
        .single();

      if (lastSync?.completed_at) {
        // Use last sync time, with a small buffer (1 hour overlap to catch any edge cases)
        since = new Date(new Date(lastSync.completed_at).getTime() - 60 * 60 * 1000);
      } else {
        // No previous sync, fall back to last 30 days
        since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      }
    }

    // Create sync log upfront so frontend can poll immediately
    const syncLogId = await createSyncLog(syncType);

    // Fire-and-forget: run sync in background after response is sent
    after(async () => {
      try {
        await runSync(client, {
          syncType,
          repositoryId,
          since,
          syncLogId,
          maxCommitsPerRepo: syncType === 'full' ? 5000 : 200,
          skipCommitDetails: !repositoryId, // Only fetch per-commit details for single-repo syncs
        });
      } catch (error) {
        console.error('Background sync failed:', error);
      }
    });

    // Return immediately with the sync log ID
    return NextResponse.json(
      { data: { syncLogId, started: true }, error: null },
      { status: 202 }
    );
  } catch (error) {
    console.error('Error in POST /api/admin/analytics/github/sync:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
