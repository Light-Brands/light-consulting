/**
 * Vercel Analytics Dashboard API
 * Light Brand Consulting
 *
 * Returns aggregated Vercel deployment and usage statistics
 */

import { NextResponse } from 'next/server';
import type {
  VercelDashboardData,
  VercelSummaryStats,
  VercelDeployment,
  VercelProject,
  VercelDailyStats,
  VercelConfigPublic,
} from '@/types/vercel-analytics';

// Generate mock data for demonstration
// TODO: Replace with actual Vercel API integration
function generateMockData(timeRange: string): VercelDashboardData {
  const now = new Date();
  const daysBack = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : timeRange === '1y' ? 365 : 365;

  // Mock config
  const config: VercelConfigPublic = {
    id: 'vercel-config-1',
    team_name: 'Light Brand Consulting',
    is_active: true,
    last_validated_at: new Date(now.getTime() - 3600000).toISOString(),
    has_token: true,
  };

  // Generate daily stats
  const daily_stats: VercelDailyStats[] = [];
  for (let i = daysBack - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // More activity on weekdays
    const baseDeployments = isWeekend ? 2 : 8;
    const deploymentsCount = Math.floor(baseDeployments + Math.random() * 6);
    const failedRate = 0.05 + Math.random() * 0.05; // 5-10% fail rate
    const failedBuilds = Math.floor(deploymentsCount * failedRate);

    daily_stats.push({
      id: `daily-${i}`,
      stat_date: date.toISOString().split('T')[0],
      deployments_count: deploymentsCount,
      successful_builds: deploymentsCount - failedBuilds,
      failed_builds: failedBuilds,
      build_duration_total_ms: deploymentsCount * (45000 + Math.random() * 30000), // 45-75s per build
      bandwidth_bytes: Math.floor((500 + Math.random() * 2000) * 1024 * 1024), // 500MB - 2.5GB per day
      edge_invocations: Math.floor(50000 + Math.random() * 150000),
      serverless_invocations: Math.floor(10000 + Math.random() * 40000),
    });
  }

  // Calculate summary from daily stats
  const totalDeployments = daily_stats.reduce((sum, d) => sum + d.deployments_count, 0);
  const successfulDeployments = daily_stats.reduce((sum, d) => sum + d.successful_builds, 0);
  const failedDeployments = daily_stats.reduce((sum, d) => sum + d.failed_builds, 0);
  const totalBuildDuration = daily_stats.reduce((sum, d) => sum + d.build_duration_total_ms, 0);
  const totalBandwidth = daily_stats.reduce((sum, d) => sum + d.bandwidth_bytes, 0);
  const totalEdgeInvocations = daily_stats.reduce((sum, d) => sum + d.edge_invocations, 0);
  const totalServerlessInvocations = daily_stats.reduce((sum, d) => sum + d.serverless_invocations, 0);

  const summary: VercelSummaryStats = {
    total_deployments: totalDeployments,
    successful_deployments: successfulDeployments,
    failed_deployments: failedDeployments,
    average_build_time_ms: Math.floor(totalBuildDuration / totalDeployments),
    total_projects: 12,
    total_domains: 18,
    bandwidth_bytes: totalBandwidth,
    edge_invocations: totalEdgeInvocations,
    serverless_invocations: totalServerlessInvocations,
    build_minutes: Math.floor(totalBuildDuration / 60000),
    last_sync_at: now.toISOString(),
    period_start: new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000).toISOString(),
    period_end: now.toISOString(),
  };

  // Mock recent deployments
  const projects = ['light-consulting', 'client-portal', 'marketing-site', 'api-gateway', 'dashboard-app'];
  const branches = ['main', 'develop', 'feature/auth', 'fix/performance', 'staging'];
  const creators = ['lawless', 'sarah', 'mike', 'alex', 'jordan'];

  const recent_deployments: VercelDeployment[] = [];
  for (let i = 0; i < 10; i++) {
    const projectName = projects[Math.floor(Math.random() * projects.length)];
    const createdAt = new Date(now.getTime() - i * 3600000 * (1 + Math.random() * 3));
    const buildDuration = 45000 + Math.random() * 60000;
    const state = i === 0 ? 'BUILDING' : Math.random() > 0.08 ? 'READY' : 'ERROR';

    recent_deployments.push({
      id: `dpl-${i}`,
      uid: `dpl_${Math.random().toString(36).substring(7)}`,
      name: projectName,
      url: `${projectName}-${Math.random().toString(36).substring(7)}.vercel.app`,
      state: state as VercelDeployment['state'],
      ready_state: state,
      created_at: createdAt.toISOString(),
      building_at: state === 'BUILDING' ? createdAt.toISOString() : new Date(createdAt.getTime() + 2000).toISOString(),
      ready_at: state === 'READY' ? new Date(createdAt.getTime() + buildDuration).toISOString() : null,
      build_duration_ms: state === 'READY' ? buildDuration : null,
      creator_username: creators[Math.floor(Math.random() * creators.length)],
      target: Math.random() > 0.3 ? 'production' : 'preview',
      source: 'github',
      git_branch: branches[Math.floor(Math.random() * branches.length)],
      git_commit_sha: Math.random().toString(36).substring(2, 9),
      git_commit_message: ['Update components', 'Fix bug', 'Add feature', 'Refactor code', 'Update deps'][Math.floor(Math.random() * 5)],
    });
  }

  // Mock projects
  const mockProjects: VercelProject[] = projects.map((name, i) => ({
    id: `prj-${i}`,
    name,
    framework: ['Next.js', 'Remix', 'Astro', 'SvelteKit', 'Nuxt'][i % 5],
    latest_deployment_url: `${name}.vercel.app`,
    created_at: new Date(now.getTime() - (365 - i * 30) * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(now.getTime() - i * 86400000).toISOString(),
    deployment_count: Math.floor(100 + Math.random() * 500),
    production_deployment_count: Math.floor(50 + Math.random() * 200),
  }));

  return {
    config,
    summary,
    recent_deployments,
    projects: mockProjects,
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
    console.error('Vercel analytics error:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch Vercel analytics' },
      { status: 500 }
    );
  }
}
