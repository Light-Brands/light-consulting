# Multi-Repo Analytics Service Plan

## Executive Summary

A comprehensive service that connects to all organization repositories to provide deep insights into coding activity, developer productivity, and AI-assisted development patterns. This service will track code changes, understand contribution patterns, and provide analytics similar to (and beyond) what Cursor offers - with potential Claude integration for intelligent analysis.

---

## Problem Statement

Currently, there's no unified way to:
- See all coding activity across the entire organization
- Understand how many lines are edited, kept, or discarded
- Track AI-assisted vs manual code contributions
- Analyze repository usage patterns and developer workflows
- Get intelligent insights about codebase evolution

---

## Proposed Solution: **CodePulse Analytics**

A centralized analytics platform that:
1. Connects to all GitHub repositories in your organization
2. Tracks granular code changes (lines added, modified, deleted, reverted)
3. Monitors AI-assisted development (Claude, Cursor, Copilot contributions)
4. Provides org-wide and repo-specific dashboards
5. Uses Claude to generate intelligent insights and recommendations

---

## Core Features

### 1. Repository Connection & Sync

**GitHub App Integration**
- OAuth-based GitHub App for secure org-wide access
- Webhook listeners for real-time event capture
- Support for both public and private repositories
- Automatic discovery of new repos in the organization

**Data Sync Pipeline**
```
GitHub Webhooks → Event Queue → Processing Pipeline → Analytics DB → Dashboard
```

**Events to Capture:**
- Push events (commits, branches)
- Pull request events (opened, merged, closed, reviewed)
- Issue events
- Release events
- Repository creation/deletion

---

### 2. Code Change Analytics

**Line-Level Tracking**
| Metric | Description |
|--------|-------------|
| Lines Added | New lines introduced |
| Lines Modified | Existing lines changed |
| Lines Deleted | Lines removed |
| Lines Reverted | Lines added then removed within X days |
| Net Lines | Added - Deleted |
| Churn Rate | (Reverted / Added) × 100 |

**Code Retention Analysis**
- Track how long code survives before modification
- Identify "throwaway" code vs "stable" code
- Calculate code half-life per author/repo/project

**Commit Intelligence**
- Commit size distribution
- Commit frequency patterns
- Time-of-day/day-of-week analysis
- Breaking change detection

---

### 3. AI-Assisted Development Tracking

**Detecting AI Contributions**
Methods to identify AI-generated code:

1. **Commit Message Patterns**
   - `[Claude]`, `[Cursor]`, `[Copilot]` prefixes
   - Automated tool signatures

2. **Author Attribution**
   - Bot accounts (e.g., `claude-code[bot]`)
   - Tool-specific user agents

3. **Code Pattern Analysis**
   - Style fingerprinting
   - Common AI code patterns

4. **IDE Plugin Integration**
   - Cursor extension reporting
   - Claude Code CLI integration
   - VS Code extension for Copilot tracking

**AI Metrics Dashboard**
- % of code written with AI assistance
- AI code retention rate (kept vs discarded)
- AI vs human code quality metrics
- Cost savings estimation

---

### 4. Organization-Wide Analytics

**Org Dashboard**
```
┌─────────────────────────────────────────────────────────────┐
│  Organization: Light-Brands                                  │
│  ═══════════════════════════════════════════════════════════│
│                                                             │
│  Total Repos: 12    Active This Week: 8    Contributors: 5  │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ Lines This Month │  │ Code Retention   │                │
│  │     +45,230      │  │      78.4%       │                │
│  │  ▲ 12% vs last   │  │  ▲ 3% vs last    │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                             │
│  Activity Heatmap (Last 30 Days)                           │
│  ░░▓▓██▓▓░░▓▓████▓▓░░░░▓▓██████▓▓░░                       │
│                                                             │
│  Top Active Repos          AI Assistance Rate              │
│  1. light-consulting  42%  ████████████░░░░ 62%            │
│  2. light-brands      28%  ██████████░░░░░░ 48%            │
│  3. internal-tools    18%  ████████░░░░░░░░ 35%            │
│  4. shared-utils      12%  ██████░░░░░░░░░░ 28%            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Cross-Repo Insights**
- Code duplication across repos
- Shared dependency analysis
- Migration/refactoring tracking
- Tech debt accumulation patterns

---

### 5. Claude Integration for Intelligent Insights

**Automated Analysis Reports**
Claude can analyze patterns and generate:
- Weekly activity summaries
- Code quality trends
- Productivity insights
- Recommendations for improvement

**Natural Language Queries**
```
User: "What changed in our authentication code last month?"
Claude: "Based on repository analysis:
- 342 lines modified across 3 repos
- Primary changes in light-consulting/src/lib/auth.ts
- New OAuth providers added
- 2 security patches applied
- Code retention: 94% (high stability)"
```

**Predictive Analytics**
- Estimate time to complete features based on historical data
- Identify potential bottlenecks
- Forecast code maintenance needs

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        CodePulse Analytics                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   GitHub     │    │   GitLab     │    │  Bitbucket   │      │
│  │   App        │    │   (Future)   │    │  (Future)    │      │
│  └──────┬───────┘    └──────────────┘    └──────────────┘      │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              Webhook Ingestion Service               │      │
│  │         (Next.js API Routes / Vercel Edge)           │      │
│  └──────────────────────┬───────────────────────────────┘      │
│                         │                                        │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              Event Processing Queue                  │      │
│  │              (Supabase Edge Functions)               │      │
│  └──────────────────────┬───────────────────────────────┘      │
│                         │                                        │
│         ┌───────────────┼───────────────┐                       │
│         ▼               ▼               ▼                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │  Commit    │  │    PR      │  │   Repo     │                │
│  │  Analyzer  │  │  Analyzer  │  │  Analyzer  │                │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘                │
│        │               │               │                        │
│        └───────────────┼───────────────┘                        │
│                        ▼                                        │
│  ┌──────────────────────────────────────────────────────┐      │
│  │                  Analytics Database                  │      │
│  │                     (Supabase)                       │      │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │      │
│  │  │  repos   │ │ commits  │ │ metrics  │ │ events │  │      │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘  │      │
│  └──────────────────────┬───────────────────────────────┘      │
│                         │                                        │
│         ┌───────────────┴───────────────┐                       │
│         ▼                               ▼                       │
│  ┌────────────────┐            ┌────────────────┐              │
│  │   Dashboard    │            │  Claude API    │              │
│  │   (React)      │            │  Integration   │              │
│  └────────────────┘            └────────────────┘              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Organizations table
CREATE TABLE analytics_orgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_org_id BIGINT UNIQUE,
  name TEXT NOT NULL,
  github_installation_id BIGINT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Repositories table
CREATE TABLE analytics_repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES analytics_orgs(id),
  github_repo_id BIGINT UNIQUE,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  default_branch TEXT DEFAULT 'main',
  language TEXT,
  is_private BOOLEAN DEFAULT true,
  last_synced_at TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commits table
CREATE TABLE analytics_commits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id UUID REFERENCES analytics_repos(id),
  sha TEXT NOT NULL,
  message TEXT,
  author_email TEXT,
  author_name TEXT,
  authored_at TIMESTAMPTZ,
  committer_email TEXT,
  committer_name TEXT,
  committed_at TIMESTAMPTZ,

  -- Line metrics
  lines_added INT DEFAULT 0,
  lines_deleted INT DEFAULT 0,
  lines_modified INT DEFAULT 0,
  files_changed INT DEFAULT 0,

  -- AI attribution
  is_ai_assisted BOOLEAN DEFAULT false,
  ai_tool TEXT, -- 'claude', 'cursor', 'copilot', etc.
  ai_confidence FLOAT, -- 0-1 confidence score

  -- Parent tracking for revert detection
  parent_shas TEXT[],
  is_merge BOOLEAN DEFAULT false,
  is_revert BOOLEAN DEFAULT false,
  reverts_sha TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(repo_id, sha)
);

-- File changes table (granular tracking)
CREATE TABLE analytics_file_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commit_id UUID REFERENCES analytics_commits(id),
  repo_id UUID REFERENCES analytics_repos(id),
  file_path TEXT NOT NULL,
  change_type TEXT NOT NULL, -- 'added', 'modified', 'deleted', 'renamed'
  lines_added INT DEFAULT 0,
  lines_deleted INT DEFAULT 0,
  previous_path TEXT, -- for renames
  language TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily aggregated metrics
CREATE TABLE analytics_daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id UUID REFERENCES analytics_repos(id),
  date DATE NOT NULL,

  -- Commit metrics
  total_commits INT DEFAULT 0,
  unique_authors INT DEFAULT 0,

  -- Line metrics
  lines_added INT DEFAULT 0,
  lines_deleted INT DEFAULT 0,
  lines_modified INT DEFAULT 0,
  net_lines INT DEFAULT 0,

  -- AI metrics
  ai_assisted_commits INT DEFAULT 0,
  ai_lines_added INT DEFAULT 0,
  ai_lines_kept INT DEFAULT 0,

  -- PR metrics
  prs_opened INT DEFAULT 0,
  prs_merged INT DEFAULT 0,
  prs_closed INT DEFAULT 0,

  -- Code health
  files_changed INT DEFAULT 0,
  avg_commit_size FLOAT,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(repo_id, date)
);

-- Code retention tracking
CREATE TABLE analytics_code_retention (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id UUID REFERENCES analytics_repos(id),
  original_commit_id UUID REFERENCES analytics_commits(id),
  file_path TEXT NOT NULL,
  line_range_start INT,
  line_range_end INT,
  lines_count INT,

  -- Lifecycle tracking
  added_at TIMESTAMPTZ,
  modified_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,

  -- Retention metrics
  lifetime_days INT, -- calculated when deleted
  is_ai_generated BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pull requests table
CREATE TABLE analytics_pull_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id UUID REFERENCES analytics_repos(id),
  github_pr_id BIGINT,
  number INT,
  title TEXT,
  state TEXT, -- 'open', 'closed', 'merged'
  author TEXT,

  -- Timing metrics
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  merged_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,

  -- Size metrics
  additions INT DEFAULT 0,
  deletions INT DEFAULT 0,
  changed_files INT DEFAULT 0,
  commits_count INT DEFAULT 0,

  -- Review metrics
  review_comments INT DEFAULT 0,
  reviewers TEXT[],

  -- AI attribution
  is_ai_generated BOOLEAN DEFAULT false,
  ai_tool TEXT,

  UNIQUE(repo_id, github_pr_id)
);

-- Events log (raw webhook events)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES analytics_orgs(id),
  repo_id UUID REFERENCES analytics_repos(id),
  event_type TEXT NOT NULL,
  action TEXT,
  payload JSONB,
  github_delivery_id TEXT UNIQUE,
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_commits_repo_authored ON analytics_commits(repo_id, authored_at);
CREATE INDEX idx_commits_author ON analytics_commits(author_email);
CREATE INDEX idx_commits_ai ON analytics_commits(is_ai_assisted) WHERE is_ai_assisted = true;
CREATE INDEX idx_file_changes_repo ON analytics_file_changes(repo_id);
CREATE INDEX idx_file_changes_path ON analytics_file_changes(file_path);
CREATE INDEX idx_daily_metrics_repo_date ON analytics_daily_metrics(repo_id, date);
CREATE INDEX idx_events_processed ON analytics_events(processed) WHERE processed = false;
```

### API Endpoints

```typescript
// Repository Management
GET    /api/analytics/repos                    // List all repos
POST   /api/analytics/repos/sync               // Trigger sync for all repos
GET    /api/analytics/repos/:id                // Get repo details
GET    /api/analytics/repos/:id/commits        // Get repo commits
GET    /api/analytics/repos/:id/metrics        // Get repo metrics

// Organization Analytics
GET    /api/analytics/org/overview             // Org-wide summary
GET    /api/analytics/org/activity             // Activity feed
GET    /api/analytics/org/contributors         // Contributor stats
GET    /api/analytics/org/trends               // Trend analysis

// Metrics & Insights
GET    /api/analytics/metrics/lines            // Line-level metrics
GET    /api/analytics/metrics/retention        // Code retention stats
GET    /api/analytics/metrics/ai-usage         // AI assistance metrics
GET    /api/analytics/metrics/productivity     // Productivity metrics

// Claude Integration
POST   /api/analytics/claude/query             // Natural language queries
POST   /api/analytics/claude/summary           // Generate summary report
POST   /api/analytics/claude/insights          // Get AI-powered insights

// Webhooks
POST   /api/analytics/webhooks/github          // GitHub webhook receiver
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Create GitHub App for org authentication
- [ ] Set up database schema in Supabase
- [ ] Build webhook ingestion endpoint
- [ ] Implement basic commit tracking
- [ ] Create initial dashboard page

**Deliverables:**
- GitHub App registered and installable
- Database tables created
- Webhook endpoint receiving events
- Basic repo list view

### Phase 2: Core Analytics (Week 3-4)
- [ ] Build commit analysis pipeline
- [ ] Implement line-level change tracking
- [ ] Create file change tracking
- [ ] Build daily metrics aggregation
- [ ] Design and implement main dashboard

**Deliverables:**
- Commit data flowing into database
- Line metrics calculated and stored
- Daily aggregation running
- Dashboard showing basic metrics

### Phase 3: Advanced Metrics (Week 5-6)
- [ ] Implement code retention tracking
- [ ] Build AI contribution detection
- [ ] Create PR analytics
- [ ] Add contributor insights
- [ ] Build comparison views (repo vs repo, period vs period)

**Deliverables:**
- Code retention metrics available
- AI-assisted code identified
- PR metrics dashboard
- Contributor leaderboards

### Phase 4: Claude Integration (Week 7-8)
- [ ] Integrate Claude API for analysis
- [ ] Build natural language query interface
- [ ] Create automated insight generation
- [ ] Implement weekly summary reports
- [ ] Add predictive analytics

**Deliverables:**
- Ask questions about your code in plain English
- Weekly automated reports
- Intelligent recommendations
- Trend predictions

### Phase 5: Polish & Scale (Week 9-10)
- [ ] Performance optimization
- [ ] Add filtering and search
- [ ] Create export functionality
- [ ] Build notification system
- [ ] Add team/project groupings

**Deliverables:**
- Fast, responsive dashboard
- Data export (CSV, PDF reports)
- Slack/email notifications
- Team-level analytics

---

## Integration with Existing Light Consulting Platform

### Dashboard Location
Add a new section to the admin area:
```
/admin/analytics          - Main analytics dashboard
/admin/analytics/repos    - Repository management
/admin/analytics/insights - Claude-powered insights
/admin/analytics/settings - Configuration
```

### Navigation Integration
```typescript
// Add to sidebar navigation
{
  name: 'Code Analytics',
  href: '/admin/analytics',
  icon: ChartBarIcon,
  children: [
    { name: 'Overview', href: '/admin/analytics' },
    { name: 'Repositories', href: '/admin/analytics/repos' },
    { name: 'AI Insights', href: '/admin/analytics/insights' },
    { name: 'Reports', href: '/admin/analytics/reports' },
  ]
}
```

### Shared Components
Reuse existing UI components:
- Card layouts from command center
- Data tables from project management
- Charts (add Recharts or similar)
- Status badges and indicators

---

## Cost Considerations

### GitHub API
- **Free tier:** 5,000 requests/hour (authenticated)
- **Webhooks:** Free, real-time updates
- **GraphQL API:** More efficient for bulk queries

### Supabase
- **Current usage:** Likely within free tier
- **Additional tables:** Minimal impact
- **Estimated increase:** ~$10-25/month depending on data volume

### Claude API
- **Insight generation:** ~$0.01-0.05 per query
- **Weekly summaries:** ~$0.10-0.20 per org
- **Estimated monthly:** $20-50 depending on usage

### Total Estimated Cost
- **Small org (< 10 repos):** $30-75/month
- **Medium org (10-50 repos):** $75-150/month

---

## Security Considerations

### Data Access
- GitHub App with minimal required permissions
- Read-only access to code sufficient for analytics
- No code storage (only metadata and metrics)

### Authentication
- Reuse existing NextAuth setup
- Admin-only access to analytics
- Audit logging for all queries

### Data Retention
- Raw events: 90 days
- Aggregated metrics: Indefinite
- Commit details: Indefinite (metadata only)

---

## Cursor-Style Features to Implement

Based on Cursor's analytics approach:

1. **Session Tracking**
   - Track coding sessions (start/end times)
   - Lines written per session
   - AI acceptance rate per session

2. **Suggestion Metrics**
   - AI suggestions offered vs accepted
   - Edit distance from suggestion to final code
   - Time saved estimates

3. **Context Usage**
   - Files referenced during coding
   - Cross-file navigation patterns
   - Documentation lookups

4. **Productivity Scoring**
   - Lines per hour (normalized)
   - Bug introduction rate
   - Code review feedback incorporation

---

## Future Enhancements

### Near-term
- GitLab integration
- Bitbucket integration
- Linear/Jira ticket correlation
- Slack bot for queries

### Long-term
- IDE plugins for real-time tracking
- Custom metrics builder
- Benchmark against industry standards
- Team performance analytics
- Code quality scoring (beyond just lines)

---

## Success Metrics

How we'll know this is working:

1. **Adoption**
   - All repos connected within 1 week
   - Daily dashboard usage

2. **Insights Quality**
   - Actionable recommendations generated
   - Accurate AI attribution

3. **Time Savings**
   - Reduced time finding historical changes
   - Faster project planning with historical data

4. **Code Quality**
   - Increased code retention rate
   - Reduced churn

---

## Next Steps

1. **Review this plan** - Provide feedback on priorities and scope
2. **GitHub App setup** - Create the GitHub App in your organization
3. **Database migration** - Add analytics tables to Supabase
4. **Start Phase 1** - Begin with webhook integration

---

## Questions to Consider

1. Which repositories should be included initially?
2. Should we track all branches or just main/production?
3. What's the desired granularity for file-level tracking?
4. How should we handle private/sensitive repos?
5. Who should have access to the analytics dashboard?
6. Should we integrate with any external tools (Slack, Linear, etc.)?

---

*Document created: January 26, 2025*
*Status: Draft - Awaiting Review*
