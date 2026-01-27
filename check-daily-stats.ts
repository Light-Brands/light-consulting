import * as fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = fs.readFileSync('.env.local', 'utf8');
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) process.env[match[1]] = match[2];
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  // Check daily stats
  const { data: stats, count } = await supabase
    .from('github_daily_stats')
    .select('stat_date, additions, deletions', { count: 'exact' })
    .order('additions', { ascending: false })
    .limit(20);

  console.log('=== TOP DAILY STATS BY ADDITIONS ===');
  console.log('Total records:', count);
  for (const s of stats || []) {
    console.log(`${s.stat_date} | +${(s.additions || 0).toLocaleString().padStart(10)} | -${(s.deletions || 0).toLocaleString().padStart(10)}`);
  }

  // Check by time period
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const { data: recentStats } = await supabase
    .from('github_daily_stats')
    .select('additions, deletions')
    .gte('stat_date', sixMonthsAgo.toISOString().split('T')[0]);

  const { data: olderStats } = await supabase
    .from('github_daily_stats')
    .select('additions, deletions')
    .gte('stat_date', oneYearAgo.toISOString().split('T')[0])
    .lt('stat_date', sixMonthsAgo.toISOString().split('T')[0]);

  const recentAdd = (recentStats || []).reduce((sum, s) => sum + (s.additions || 0), 0);
  const olderAdd = (olderStats || []).reduce((sum, s) => sum + (s.additions || 0), 0);

  console.log('\n=== DAILY STATS BY TIME PERIOD ===');
  console.log(`Last 6 months:   +${recentAdd.toLocaleString().padStart(12)} (${(recentStats || []).length} records)`);
  console.log(`6-12 months ago: +${olderAdd.toLocaleString().padStart(12)} (${(olderStats || []).length} records)`);
  console.log(`Total (1 year):  +${(recentAdd + olderAdd).toLocaleString().padStart(12)}`);

  // Check contributor stats (what dashboard uses for All Time)
  const { data: contribStats } = await supabase
    .from('github_contributors')
    .select('total_additions, total_deletions');

  const contribAdd = (contribStats || []).reduce((sum, c) => sum + (c.total_additions || 0), 0);
  const contribDel = (contribStats || []).reduce((sum, c) => sum + (c.total_deletions || 0), 0);

  console.log('\n=== CONTRIBUTOR STATS (All Time source) ===');
  console.log(`Total additions: +${contribAdd.toLocaleString()}`);
  console.log(`Total deletions: -${contribDel.toLocaleString()}`);
}

check().catch(console.error);
