/**
 * Supabase Analytics Dashboard API
 * Light Brand Consulting
 *
 * Returns aggregated Supabase usage and database statistics
 */

import { NextResponse } from 'next/server';
import type {
  SupabaseDashboardData,
  SupabaseSummaryStats,
  SupabaseDatabaseStats,
  SupabaseAuthStats,
  SupabaseStorageBucket,
  SupabaseEdgeFunction,
  SupabaseDailyStats,
  SupabaseConfigPublic,
} from '@/types/supabase-analytics';

// Generate mock data for demonstration
// TODO: Replace with actual Supabase Management API integration
function generateMockData(timeRange: string): SupabaseDashboardData {
  const now = new Date();
  const daysBack = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : timeRange === '1y' ? 365 : 365;

  // Mock config
  const config: SupabaseConfigPublic = {
    id: 'supabase-config-1',
    project_name: 'light-consulting-prod',
    region: 'us-east-1',
    is_active: true,
    last_validated_at: new Date(now.getTime() - 1800000).toISOString(),
    has_token: true,
  };

  // Generate daily stats
  const daily_stats: SupabaseDailyStats[] = [];
  for (let i = daysBack - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Traffic patterns - more on weekdays
    const baseMultiplier = isWeekend ? 0.6 : 1;

    daily_stats.push({
      id: `daily-${i}`,
      stat_date: date.toISOString().split('T')[0],
      api_requests: Math.floor((150000 + Math.random() * 100000) * baseMultiplier),
      database_operations: Math.floor((50000 + Math.random() * 30000) * baseMultiplier),
      storage_operations: Math.floor((5000 + Math.random() * 3000) * baseMultiplier),
      auth_operations: Math.floor((2000 + Math.random() * 1500) * baseMultiplier),
      realtime_messages: Math.floor((25000 + Math.random() * 15000) * baseMultiplier),
      edge_invocations: Math.floor((8000 + Math.random() * 5000) * baseMultiplier),
      bandwidth_bytes: Math.floor((2 + Math.random() * 3) * 1024 * 1024 * 1024 * baseMultiplier), // 2-5GB per day
    });
  }

  // Calculate totals
  const totalApiRequests = daily_stats.reduce((sum, d) => sum + d.api_requests, 0);
  const totalBandwidth = daily_stats.reduce((sum, d) => sum + d.bandwidth_bytes, 0);
  const totalEdgeInvocations = daily_stats.reduce((sum, d) => sum + d.edge_invocations, 0);
  const totalRealtimeMessages = daily_stats.reduce((sum, d) => sum + d.realtime_messages, 0);

  const summary: SupabaseSummaryStats = {
    database_size_bytes: 2.8 * 1024 * 1024 * 1024, // 2.8GB
    storage_size_bytes: 15.6 * 1024 * 1024 * 1024, // 15.6GB
    total_api_requests: totalApiRequests,
    total_users: 4827,
    active_users: 1243,
    total_tables: 47,
    total_storage_buckets: 6,
    total_edge_functions: 8,
    edge_invocations: totalEdgeInvocations,
    realtime_connections_peak: 342,
    bandwidth_bytes: totalBandwidth,
    last_sync_at: now.toISOString(),
    period_start: new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000).toISOString(),
    period_end: now.toISOString(),
  };

  const database_stats: SupabaseDatabaseStats = {
    total_tables: 47,
    total_rows: 2847563,
    total_indexes: 89,
    disk_usage_bytes: 2.8 * 1024 * 1024 * 1024,
    active_connections: 24,
    max_connections: 100,
  };

  const auth_stats: SupabaseAuthStats = {
    total_users: 4827,
    new_users_period: Math.floor(200 + Math.random() * 150),
    active_users_period: 1243,
    email_users: 3654,
    oauth_users: 1089,
    phone_users: 84,
  };

  const storage_buckets: SupabaseStorageBucket[] = [
    {
      id: 'bucket-1',
      name: 'avatars',
      public: true,
      file_count: 4523,
      total_size_bytes: 1.2 * 1024 * 1024 * 1024,
      created_at: new Date(now.getTime() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'bucket-2',
      name: 'documents',
      public: false,
      file_count: 12847,
      total_size_bytes: 8.4 * 1024 * 1024 * 1024,
      created_at: new Date(now.getTime() - 280 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'bucket-3',
      name: 'media',
      public: true,
      file_count: 2156,
      total_size_bytes: 4.8 * 1024 * 1024 * 1024,
      created_at: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'bucket-4',
      name: 'exports',
      public: false,
      file_count: 847,
      total_size_bytes: 0.9 * 1024 * 1024 * 1024,
      created_at: new Date(now.getTime() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'bucket-5',
      name: 'backups',
      public: false,
      file_count: 365,
      total_size_bytes: 0.2 * 1024 * 1024 * 1024,
      created_at: new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'bucket-6',
      name: 'uploads',
      public: false,
      file_count: 1893,
      total_size_bytes: 0.1 * 1024 * 1024 * 1024,
      created_at: new Date(now.getTime() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const edge_functions: SupabaseEdgeFunction[] = [
    {
      id: 'fn-1',
      name: 'send-email',
      slug: 'send-email',
      status: 'active',
      invocations: Math.floor(45000 + Math.random() * 15000),
      errors: Math.floor(50 + Math.random() * 30),
      avg_execution_time_ms: 120 + Math.random() * 80,
      created_at: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fn-2',
      name: 'process-webhook',
      slug: 'process-webhook',
      status: 'active',
      invocations: Math.floor(28000 + Math.random() * 8000),
      errors: Math.floor(20 + Math.random() * 15),
      avg_execution_time_ms: 85 + Math.random() * 40,
      created_at: new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fn-3',
      name: 'generate-report',
      slug: 'generate-report',
      status: 'active',
      invocations: Math.floor(5000 + Math.random() * 2000),
      errors: Math.floor(10 + Math.random() * 8),
      avg_execution_time_ms: 2500 + Math.random() * 1000,
      created_at: new Date(now.getTime() - 150 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fn-4',
      name: 'resize-image',
      slug: 'resize-image',
      status: 'active',
      invocations: Math.floor(18000 + Math.random() * 6000),
      errors: Math.floor(30 + Math.random() * 20),
      avg_execution_time_ms: 350 + Math.random() * 150,
      created_at: new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fn-5',
      name: 'sync-stripe',
      slug: 'sync-stripe',
      status: 'active',
      invocations: Math.floor(12000 + Math.random() * 4000),
      errors: Math.floor(15 + Math.random() * 10),
      avg_execution_time_ms: 180 + Math.random() * 60,
      created_at: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fn-6',
      name: 'validate-input',
      slug: 'validate-input',
      status: 'active',
      invocations: Math.floor(85000 + Math.random() * 25000),
      errors: Math.floor(100 + Math.random() * 50),
      avg_execution_time_ms: 25 + Math.random() * 15,
      created_at: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fn-7',
      name: 'ai-completion',
      slug: 'ai-completion',
      status: 'active',
      invocations: Math.floor(8000 + Math.random() * 3000),
      errors: Math.floor(40 + Math.random() * 25),
      avg_execution_time_ms: 1800 + Math.random() * 800,
      created_at: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fn-8',
      name: 'cron-cleanup',
      slug: 'cron-cleanup',
      status: 'active',
      invocations: daysBack, // Once per day
      errors: 0,
      avg_execution_time_ms: 4500 + Math.random() * 1500,
      created_at: new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return {
    config,
    summary,
    database_stats,
    auth_stats,
    storage_buckets,
    edge_functions,
    daily_stats,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('time_range') || '30d';

    const data = generateMockData(timeRange);

    return NextResponse.json({
      data,
      error: null,
    });
  } catch (error) {
    console.error('Supabase analytics error:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch Supabase analytics' },
      { status: 500 }
    );
  }
}
