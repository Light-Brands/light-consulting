/**
 * GitHub Sync API Route
 * Light Brand Consulting
 *
 * POST /api/admin/analytics/github/sync - Trigger sync
 * GET /api/admin/analytics/github/sync - Get sync status
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { createGitHubClient } from '@/lib/github-api';
import { runSync, getLatestSyncStatus } from '@/lib/github-sync';
import type { SyncType, GitHubSyncLog } from '@/types/github-analytics';

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

    // Calculate 'since' date for incremental sync (last 30 days)
    const since = syncType === 'incremental' ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : undefined;

    // Run sync
    const result = await runSync(client, {
      syncType,
      repositoryId,
      since,
      maxCommitsPerRepo: syncType === 'full' ? 5000 : 200,
    });

    if (!result.success) {
      return NextResponse.json(
        { data: result, error: result.error || 'Sync failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: result, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/analytics/github/sync:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
