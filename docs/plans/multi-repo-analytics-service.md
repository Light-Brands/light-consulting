# Multi-Repo Analytics Service Plan (v2)

## Executive Summary

A **pull-based analytics service** that connects to all organization repositories and reads the existing git history on-demand. No webhooks, no live tracking, no data pipeline - just direct API access to the commit history that already exists in every repo.

**Key Principle:** Git already tracks everything. Every commit, every line change, every author, every timestamp. We just need to read it.

---

## The Approach: Pull, Don't Push

### What This Is NOT (v1 Approach - Rejected)
```
Live Events → Webhooks → Process → Store → Dashboard
❌ Requires data to "flow through" the system
❌ Only sees activity after setup
❌ Complex infrastructure
❌ Misses all historical data
```

### What This IS (v2 Approach)
```
Dashboard → API Request → GitHub API → Git History
✅ Reads existing history directly
✅ Access to ALL historical data immediately
✅ Simple architecture
✅ No processing pipeline needed
✅ Works retroactively
```

---

## How Git Already Tracks Everything

Every git repository already contains:

| Data Point | Where It Lives | How to Access |
|------------|----------------|---------------|
| Every commit ever made | `.git/objects` | `git log` / GitHub API |
| Lines added/deleted per commit | Commit diffs | `git show --stat` / GitHub API |
| Who made each change | Commit metadata | `git log --author` / GitHub API |
| When changes were made | Commit timestamps | `git log --format` / GitHub API |
| File-by-file changes | Commit diffs | `git diff` / GitHub API |
| Branch/merge history | Refs and commits | `git log --graph` / GitHub API |
| Code that was reverted | Revert commits | Pattern matching on commits |

**The data is already there. We just need to query it.**

---

## GitHub API: Our Data Source

GitHub provides rich APIs to access all this historical data:

### Repository Statistics (Pre-Computed by GitHub)
```
GET /repos/{owner}/{repo}/stats/contributors
→ All-time contribution stats per author (additions, deletions, commits)

GET /repos/{owner}/{repo}/stats/commit_activity
→ Weekly commit counts for the last year

GET /repos/{owner}/{repo}/stats/code_frequency
→ Weekly additions/deletions for the entire repo history

GET /repos/{owner}/{repo}/stats/participation
→ Weekly commit counts (owner vs all)

GET /repos/{owner}/{repo}/stats/punch_card
→ Hourly commit distribution (day × hour matrix)
```

### Commit History (On-Demand)
```
GET /repos/{owner}/{repo}/commits
→ List all commits with metadata (paginated)

GET /repos/{owner}/{repo}/commits/{sha}
→ Single commit with full diff stats (files, additions, deletions)

GET /repos/{owner}/{repo}/compare/{base}...{head}
→ Compare two points in history
```

### Organization-Wide
```
GET /orgs/{org}/repos
→ List all repositories in the organization

GET /users/{username}/events
→ Recent activity for a user across repos
```

---

## Core Features

### 1. Organization Repository Discovery

**Connect Once, See Everything**
- OAuth with GitHub (personal token or GitHub App)
- Auto-discover all repos in your org
- See public + private repos you have access to

```typescript
// Simple: just list what you have access to
const repos = await octokit.repos.listForOrg({ org: 'Light-Brands' });
```

### 2. On-Demand History Analysis

**Click a repo → See its entire history**

No sync needed. No waiting. The data is fetched live from GitHub when you request it.

```typescript
// Get contributor stats for any repo, any time
const stats = await octokit.repos.getContributorsStats({
  owner: 'Light-Brands',
  repo: 'light-consulting'
});

// Returns: every contributor's weekly additions/deletions/commits
// Going back to the beginning of the repo
```

### 3. Line-Level Metrics (Computed from Git)

| Metric | How It's Calculated |
|--------|---------------------|
| **Lines Added** | Sum of additions across commits |
| **Lines Deleted** | Sum of deletions across commits |
| **Net Lines** | Additions - Deletions |
| **Churn** | Lines deleted that were recently added |
| **Code Retention** | % of lines that survive > X days |

**For Churn/Retention:** We analyze commit sequences to find patterns where code is added then removed.

### 4. AI Contribution Detection

**Detecting Claude/Cursor/Copilot Commits**

From the existing git history, we can identify AI-assisted commits by:

1. **Commit Message Patterns**
   ```
   feat: Add user authentication [Claude]
   🤖 Generated with Cursor
   Co-authored-by: github-actions[bot]
   ```

2. **Author Patterns**
   ```
   Author: Claude <claude@anthropic.com>
   Author: cursor[bot] <cursor@cursor.sh>
   ```

3. **Branch Name Patterns**
   ```
   claude/feature-xyz
   cursor/fix-bug-123
   ```

4. **Commit Pattern Analysis**
   - Large, well-structured commits
   - Consistent formatting
   - Documentation included

### 5. Cross-Repo Organization View

**See everything at once:**

```
┌─────────────────────────────────────────────────────────────┐
│  Light-Brands Organization Overview                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Repositories: 12        Total Commits: 4,521               │
│  Contributors: 8         Lines of Code: ~125,000            │
│                                                             │
│  All-Time Statistics (pulled from GitHub)                   │
│  ──────────────────────────────────────────                │
│                                                             │
│  Repository          Commits    +Lines    -Lines    Net     │
│  ─────────────────────────────────────────────────────────│
│  light-consulting      892      45,230    12,450   +32,780  │
│  light-brands          456      28,100     8,200   +19,900  │
│  internal-tools        234      15,600     4,300   +11,300  │
│  shared-components     189      12,400     3,100    +9,300  │
│  ...                                                        │
│                                                             │
│  Recent Activity (Last 30 Days)                            │
│  ░░▓▓██▓▓░░▓▓████▓▓░░░░▓▓██████▓▓░░                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6. Claude-Powered Analysis

**Ask questions about your codebase history:**

```
You: "What files have changed the most in the last 3 months?"

Claude: "Based on analyzing 234 commits across your repos:

1. src/app/admin/command-center/page.tsx - 45 changes, 2,340 lines modified
2. src/lib/supabase/queries.ts - 38 changes, 1,890 lines modified
3. src/components/ui/DataTable.tsx - 29 changes, 1,200 lines modified

These represent your most actively developed areas. The command-center
saw a major refactor in December with 12 commits in one week."
```

```
You: "How much of our code was written with AI assistance?"

Claude: "Scanning commit patterns across 12 repositories:

- 342 commits (23%) have AI indicators in commit messages
- 156 commits from 'claude/*' branches
- 89 commits with '[Claude]' or '[Cursor]' tags

Estimated AI-assisted lines: ~28,000 (22% of codebase)
AI code retention rate: 84% (vs 71% for manual code)"
```

---

## Technical Architecture

### Simple, Pull-Based Design

```
┌─────────────────────────────────────────────────────────────────┐
│                     CodePulse Analytics                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐                                              │
│   │   Dashboard  │                                              │
│   │   (Next.js)  │                                              │
│   └──────┬───────┘                                              │
│          │                                                       │
│          │ User requests data                                    │
│          ▼                                                       │
│   ┌──────────────────────────────────────────────────────┐     │
│   │              API Routes (Next.js)                     │     │
│   │   /api/analytics/repos                                │     │
│   │   /api/analytics/repos/[id]/stats                     │     │
│   │   /api/analytics/org/overview                         │     │
│   │   /api/analytics/claude/query                         │     │
│   └──────────────────────┬───────────────────────────────┘     │
│                          │                                       │
│          ┌───────────────┼───────────────┐                      │
│          │               │               │                       │
│          ▼               ▼               ▼                       │
│   ┌────────────┐  ┌────────────┐  ┌────────────┐               │
│   │  GitHub    │  │  Optional  │  │  Claude    │               │
│   │  REST API  │  │  Cache     │  │  API       │               │
│   │            │  │  (Redis/   │  │            │               │
│   │  Octokit   │  │  Supabase) │  │  Analysis  │               │
│   └────────────┘  └────────────┘  └────────────┘               │
│          │                                                       │
│          │ Fetches existing git history                         │
│          ▼                                                       │
│   ┌──────────────────────────────────────────────────────┐     │
│   │              GitHub (Your Repositories)               │     │
│   │                                                       │     │
│   │   light-consulting/.git                               │     │
│   │   light-brands/.git        ← All history lives here  │     │
│   │   internal-tools/.git                                 │     │
│   │   ...                                                 │     │
│   └──────────────────────────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### No Database Required (Optional Caching)

**Minimal Approach:**
- Query GitHub API directly each time
- GitHub caches stats (they compute overnight)
- Fast for small-medium orgs

**With Caching (Optional):**
- Cache responses in Supabase or Redis
- Reduce API calls
- Enable historical comparisons
- Store computed metrics (AI detection, etc.)

```sql
-- Optional: Simple cache table
CREATE TABLE analytics_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT UNIQUE NOT NULL,  -- e.g., "repo:light-consulting:stats"
  data JSONB NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Optional: Store computed AI detection results
CREATE TABLE analytics_ai_commits (
  repo_full_name TEXT NOT NULL,
  commit_sha TEXT NOT NULL,
  is_ai_assisted BOOLEAN,
  ai_tool TEXT,
  confidence FLOAT,
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (repo_full_name, commit_sha)
);
```

### API Endpoints

```typescript
// Repository Discovery
GET  /api/analytics/repos                     // List all org repos from GitHub
GET  /api/analytics/repos/[name]              // Get single repo details

// Statistics (Direct from GitHub)
GET  /api/analytics/repos/[name]/stats        // Contributor stats
GET  /api/analytics/repos/[name]/activity     // Commit activity
GET  /api/analytics/repos/[name]/frequency    // Code frequency
GET  /api/analytics/repos/[name]/commits      // Commit list with filters

// Organization Overview
GET  /api/analytics/org/overview              // Aggregated org stats
GET  /api/analytics/org/contributors          // Top contributors across repos
GET  /api/analytics/org/activity              // Recent activity feed

// Analysis
GET  /api/analytics/repos/[name]/ai-commits   // Detect AI-assisted commits
POST /api/analytics/compare                   // Compare repos or time periods

// Claude Integration
POST /api/analytics/claude/query              // Natural language questions
POST /api/analytics/claude/summarize          // Generate summary reports
```

### Example Implementation

```typescript
// /api/analytics/repos/[name]/stats/route.ts
import { Octokit } from '@octokit/rest';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  // Fetch stats directly from GitHub - no database needed
  const [contributors, activity, frequency] = await Promise.all([
    octokit.repos.getContributorsStats({
      owner: 'Light-Brands',
      repo: params.name
    }),
    octokit.repos.getCommitActivityStats({
      owner: 'Light-Brands',
      repo: params.name
    }),
    octokit.repos.getCodeFrequencyStats({
      owner: 'Light-Brands',
      repo: params.name
    })
  ]);

  // GitHub returns complete historical data
  return Response.json({
    contributors: contributors.data,  // All contributors, all time
    weeklyActivity: activity.data,    // 52 weeks of commit counts
    codeFrequency: frequency.data     // Weekly +/- lines, all time
  });
}
```

---

## What GitHub Gives Us for Free

GitHub pre-computes and caches these statistics:

### 1. Contributors Stats
```json
[
  {
    "author": { "login": "username", "avatar_url": "..." },
    "total": 135,  // total commits
    "weeks": [
      {
        "w": 1367712000,  // Unix timestamp for week start
        "a": 6898,        // Lines added
        "d": 77,          // Lines deleted
        "c": 10           // Commits
      }
      // ... every week since repo creation
    ]
  }
]
```

### 2. Code Frequency
```json
[
  [1302998400, 1124, -435],  // [week_timestamp, additions, deletions]
  [1303603200, 576, -293],
  // ... every week since repo creation
]
```

### 3. Commit Activity
```json
[
  {
    "days": [0, 3, 26, 20, 39, 1, 0],  // Sun-Sat commit counts
    "total": 89,
    "week": 1336280400
  }
  // ... last 52 weeks
]
```

### 4. Punch Card (When Code is Written)
```json
[
  [0, 0, 5],   // [day, hour, commits] - Sunday midnight: 5 commits
  [0, 1, 2],   // Sunday 1am: 2 commits
  // ... 24 hours × 7 days = 168 entries
]
```

**This is all available immediately, for free, via API.**

---

## Implementation Phases

### Phase 1: Connect & Discover
- [ ] Set up GitHub OAuth / Personal Access Token
- [ ] Create repo listing page
- [ ] Display basic repo info (name, language, last updated)
- [ ] Show GitHub's pre-computed stats

**Deliverable:** Dashboard showing all repos with contributor stats

### Phase 2: Deep Dive Analytics
- [ ] Build repo detail pages
- [ ] Visualize code frequency over time
- [ ] Show contributor breakdown
- [ ] Add commit activity heatmap
- [ ] Time-range filtering

**Deliverable:** Rich per-repo analytics with charts

### Phase 3: AI Detection
- [ ] Parse commit messages for AI patterns
- [ ] Identify AI-related branches
- [ ] Calculate AI contribution percentages
- [ ] Compare AI vs human code patterns

**Deliverable:** AI assistance metrics per repo

### Phase 4: Organization Overview
- [ ] Aggregate stats across all repos
- [ ] Cross-repo comparisons
- [ ] Org-wide contributor rankings
- [ ] Activity timeline across repos

**Deliverable:** Single dashboard for entire org

### Phase 5: Claude Integration
- [ ] Natural language query interface
- [ ] Intelligent summaries
- [ ] Trend analysis and insights
- [ ] Custom report generation

**Deliverable:** Ask Claude about your code history

---

## API Rate Limits & Optimization

### GitHub API Limits
- **Authenticated:** 5,000 requests/hour
- **GitHub App:** 15,000+ requests/hour

### Optimization Strategies

1. **Use GitHub's Cached Stats**
   - `/stats/*` endpoints are pre-computed
   - Updated once per day (or on push)
   - Much faster than computing ourselves

2. **Batch Requests**
   - Fetch multiple repos in parallel
   - Use GraphQL for complex queries

3. **Optional Local Caching**
   - Cache responses for 1-24 hours
   - Reduce redundant API calls
   - Enable offline dashboard viewing

4. **Conditional Requests**
   - Use `If-None-Match` headers
   - GitHub returns 304 if unchanged
   - Doesn't count against rate limit

---

## Cost Analysis

### GitHub API
- **Free** for public repos
- **Free** for private repos you own/have access to
- No additional GitHub charges

### Infrastructure
- **Vercel:** Free tier likely sufficient
- **Supabase (optional cache):** Free tier
- **Claude API:** ~$0.01-0.10 per analysis query

### Total Estimated Cost
- **Basic (no caching, no Claude):** $0/month
- **With Claude integration:** $10-30/month
- **With heavy Claude usage:** $30-75/month

---

## Security

### Minimal Permissions Needed
```
repo:read        - Read repository data
org:read         - List organization repos
```

### No Code Storage
- We never store your actual code
- Only metadata and statistics
- All data stays in GitHub

### Token Security
- Store GitHub token in environment variables
- Use GitHub App for better security (optional)
- Token only needs read permissions

---

## Comparison: Push vs Pull Approach

| Aspect | Push (Webhooks) | Pull (API) ✓ |
|--------|-----------------|--------------|
| Historical data | ❌ Only after setup | ✅ All history available |
| Setup complexity | High (webhooks, queues) | Low (just API calls) |
| Infrastructure | Database, workers | Minimal (optional cache) |
| Real-time | ✅ Yes | ⚠️ Slight delay (cache) |
| Cost | Higher | Lower |
| Maintenance | More | Less |
| Data ownership | Copied to your DB | Stays in GitHub |

**For your use case (understanding historical activity), Pull is clearly better.**

---

## Example Queries You'll Be Able to Answer

### Immediate (GitHub Stats)
- "How many commits in each repo?"
- "Who are the top contributors?"
- "What's the weekly commit pattern?"
- "How many lines added/deleted over time?"

### With AI Detection
- "What percentage of code is AI-assisted?"
- "Which repos use AI tools most?"
- "What's the retention rate of AI vs manual code?"

### With Claude Analysis
- "Summarize what changed in Q4"
- "Which areas of the codebase are most active?"
- "What patterns do you see in our development?"
- "Compare productivity across projects"

---

## Next Steps

1. **Review this updated plan** - Does this approach make more sense?
2. **GitHub Token Setup** - Create a PAT or GitHub App
3. **Start Phase 1** - Build the basic repo listing with stats
4. **Iterate** - Add features based on what insights you want

---

## Questions

1. Do you have a GitHub Personal Access Token, or should we create a GitHub App?
2. How many repos are in your org? (Helps estimate API usage)
3. What specific questions do you most want answered about your code history?
4. Do you want this integrated into the existing admin dashboard, or as a standalone tool?

---

*Document updated: January 26, 2025*
*Version: 2.0 - Pull-Based Architecture*
*Status: Draft - Awaiting Review*
