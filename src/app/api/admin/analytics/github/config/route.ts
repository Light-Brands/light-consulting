/**
 * GitHub Config API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/config - Get connection status
 * PUT /api/admin/analytics/github/config - Update configuration
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { createGitHubClient, isGitHubConfigured } from '@/lib/github-api';
import type { GitHubConfigPublic } from '@/types/github-analytics';

/**
 * GET /api/admin/analytics/github/config
 * Get GitHub connection status and configuration
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

    // Check if GitHub is configured via env vars
    const isConfigured = isGitHubConfigured();
    const orgName = process.env.GITHUB_ORG_NAME || '';

    if (!isConfigured) {
      return NextResponse.json({
        data: {
          id: 'env',
          org_name: orgName,
          token_scopes: [],
          is_active: false,
          last_validated_at: null,
          has_token: false,
        } as GitHubConfigPublic,
        error: null,
      });
    }

    // Validate the token
    const client = createGitHubClient();
    let tokenValid = false;
    let scopes: string[] = [];

    if (client) {
      const validation = await client.validateToken();
      tokenValid = validation.valid;
      scopes = validation.scopes || [];
    }

    // Try to get last sync info from database
    let lastValidatedAt: string | null = null;
    if (isSupabaseConfigured()) {
      const { data: syncLog } = await supabaseAdmin
        .from('github_sync_log')
        .select('completed_at')
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(1)
        .single();

      if (syncLog) {
        lastValidatedAt = (syncLog as { completed_at: string | null }).completed_at;
      }
    }

    const config: GitHubConfigPublic = {
      id: 'env',
      org_name: orgName,
      token_scopes: scopes,
      is_active: tokenValid,
      last_validated_at: lastValidatedAt,
      has_token: true,
    };

    return NextResponse.json({ data: config, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/config:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/analytics/github/config
 * Validate current configuration
 */
export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate the current env var configuration
    const client = createGitHubClient();

    if (!client) {
      return NextResponse.json(
        { data: null, error: 'GitHub not configured. Set GITHUB_ACCESS_TOKEN and GITHUB_ORG_NAME environment variables.' },
        { status: 400 }
      );
    }

    const validation = await client.validateToken();

    if (!validation.valid) {
      return NextResponse.json(
        { data: null, error: 'GitHub token is invalid or expired' },
        { status: 400 }
      );
    }

    // Check rate limit
    const rateLimit = await client.getRateLimit();

    const config: GitHubConfigPublic = {
      id: 'env',
      org_name: process.env.GITHUB_ORG_NAME || '',
      token_scopes: validation.scopes || [],
      is_active: true,
      last_validated_at: new Date().toISOString(),
      has_token: true,
    };

    return NextResponse.json({
      data: {
        config,
        rate_limit: {
          remaining: rateLimit.resources.core.remaining,
          limit: rateLimit.resources.core.limit,
          reset_at: new Date(rateLimit.resources.core.reset * 1000).toISOString(),
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Error in PUT /api/admin/analytics/github/config:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
