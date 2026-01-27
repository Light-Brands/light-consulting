# Light Brand Development Studio - Infrastructure Cost Analysis

## Executive Summary

This analysis projects infrastructure costs from startup through scale (100+ client accounts), based on dedicated use of Vercel, Supabase, GitHub, and Claude Max for AI development.

---

## Current Stack

| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting, serverless functions, edge network |
| **Supabase** | PostgreSQL database, auth, storage, real-time |
| **GitHub** | Version control, CI/CD via Actions |
| **Claude Max** | AI-assisted development (scaling to 4 seats in April) |

---

## Growth Assumptions

| Phase | Timeline | Active Clients | Monthly Proposals | Notes |
|-------|----------|----------------|-------------------|-------|
| **Startup** | Now - Q2 2026 | 5-15 | 3-8 | Building foundation |
| **Growth** | Q3-Q4 2026 | 25-50 | 10-20 | Product-market fit |
| **Scale** | 2027 | 75-150 | 25-50 | Team expansion |
| **Mature** | 2028+ | 200-400 | 50-100+ | Full operation |

---

## Cost Breakdown by Service

### 1. Vercel

| Tier | Monthly Cost | Included | Best For |
|------|--------------|----------|----------|
| **Hobby** | $0 | 100GB bandwidth, basic analytics | Side projects |
| **Pro** | $20/member | 1TB bandwidth, advanced analytics, preview deploys | Small teams |
| **Enterprise** | Custom | SLA, support, compliance | Large orgs |

**Your Trajectory:**

| Phase | Team Size | Bandwidth Est. | Plan | Monthly Cost |
|-------|-----------|----------------|------|--------------|
| Startup | 2-3 | <100GB | Pro | $40-60 |
| Growth | 3-5 | 100-300GB | Pro | $60-100 |
| Scale | 5-8 | 300-600GB | Pro | $100-160 |
| Mature | 8-12 | 600GB-1TB | Pro/Enterprise | $160-400 |

**Key Cost Drivers:**
- Team members on Pro plan ($20/each)
- Bandwidth overages at $40/100GB beyond 1TB
- Serverless function execution (generous free tier)
- Edge middleware execution

**Recommendation:** Pro plan scales well. Enterprise only needed for compliance/SLA requirements.

---

### 2. Supabase

| Tier | Monthly Cost | Database | Storage | Key Limits |
|------|--------------|----------|---------|------------|
| **Free** | $0 | 500MB | 1GB | Paused after 1 week inactivity |
| **Pro** | $25 | 8GB | 100GB | 50GB bandwidth |
| **Team** | $599 | 8GB | 100GB | SOC2, priority support |
| **Enterprise** | Custom | Unlimited | Custom | Dedicated support |

**Your Trajectory:**

| Phase | DB Size Est. | Storage | Plan | Monthly Cost |
|-------|--------------|---------|------|--------------|
| Startup | <1GB | <5GB | Pro | $25 |
| Growth | 1-3GB | 5-20GB | Pro | $25-50* |
| Scale | 3-6GB | 20-50GB | Pro | $50-100* |
| Mature | 6-15GB | 50-100GB | Pro/Team | $100-599 |

*Includes compute/storage add-ons

**Add-on Costs (when needed):**
- Additional compute: $10-290/month
- Additional storage: $0.021/GB/month
- Additional bandwidth: $0.09/GB

**With 200+ Clients (Mature Phase):**
- Proposals table: ~200 active proposals × 50KB = 10MB
- Milestones: ~1000 records × 5KB = 5MB
- Deliverables: ~5000 records × 10KB = 50MB
- Activity logs: ~50,000 records × 2KB = 100MB
- File storage: ~500GB (assets, documents)
- **Realistic DB size: 2-5GB, Storage: 50-200GB**

**Recommendation:** Pro plan with compute upgrades. Team tier only for SOC2 compliance needs.

---

### 3. GitHub

| Tier | Monthly Cost | Actions Minutes | Storage | Key Features |
|------|--------------|-----------------|---------|--------------|
| **Free** | $0 | 2,000 min | 500MB | Public repos unlimited |
| **Team** | $4/user | 3,000 min | 2GB | Protected branches |
| **Enterprise** | $21/user | 50,000 min | 50GB | SAML SSO, audit log |

**Your Trajectory:**

| Phase | Users | Actions Usage | Plan | Monthly Cost |
|-------|-------|---------------|------|--------------|
| Startup | 2-3 | <2000 min | Free | $0 |
| Growth | 3-5 | 2000-4000 min | Team | $12-20 |
| Scale | 5-8 | 4000-8000 min | Team | $20-32 |
| Mature | 8-12 | 8000-15000 min | Team | $32-48 |

**Actions Overages:** $0.008/min Linux, $0.016/min macOS

**Recommendation:** Free tier works initially. Move to Team when you need branch protection and more Actions minutes.

---

### 4. Claude Max (AI Development)

| Count | Monthly Cost | Use Case |
|-------|--------------|----------|
| 1 seat | $200 | Solo developer |
| 2 seats | $400 | Small team |
| 4 seats | $800 | Full team (April target) |

**Your Trajectory:**

| Phase | Seats | Monthly Cost | Notes |
|-------|-------|--------------|-------|
| Now | 1-2 | $200-400 | Core development |
| April 2026 | 4 | $800 | Full team capacity |
| Growth | 4 | $800 | Stable |
| Scale | 4-6 | $800-1,200 | If team expands |
| Mature | 4-8 | $800-1,600 | As needed |

**Note:** Client applications use their own API keys, not your Max subscriptions.

---

## Total Monthly Cost Projection

### Summary Table

| Phase | Timeline | Vercel | Supabase | GitHub | Claude Max | **Total** |
|-------|----------|--------|----------|--------|------------|-----------|
| **Startup** | Q1-Q2 2026 | $50 | $25 | $0 | $400 | **$475** |
| **April 2026** | Q2 2026 | $60 | $25 | $0 | $800 | **$885** |
| **Growth** | Q3-Q4 2026 | $80 | $40 | $20 | $800 | **$940** |
| **Scale** | 2027 | $130 | $75 | $30 | $800 | **$1,035** |
| **Mature** | 2028+ | $250 | $150 | $48 | $1,000 | **$1,448** |

### Annual Cost Projection

| Year | Low Estimate | Mid Estimate | High Estimate |
|------|--------------|--------------|---------------|
| **2026** | $7,200 | $9,600 | $12,000 |
| **2027** | $10,800 | $12,400 | $15,600 |
| **2028** | $14,400 | $17,400 | $24,000 |

---

## Cost Per Client Analysis

| Phase | Monthly Cost | Active Clients | Cost Per Client |
|-------|--------------|----------------|-----------------|
| Startup | $475 | 10 | $47.50 |
| Growth | $940 | 40 | $23.50 |
| Scale | $1,035 | 100 | $10.35 |
| Mature | $1,448 | 250 | $5.79 |

**Key Insight:** Infrastructure cost per client decreases dramatically with scale. At 250 clients, you're paying less than $6/client/month for enterprise-grade infrastructure.

---

## Revenue Context

Assuming average project values from your command center plan:

| Metric | Value |
|--------|-------|
| Average project value | $25,000-45,000 |
| Projects per client | 1-3/year |
| Estimated revenue per active client | $30,000/year |

**Infrastructure as % of Revenue:**

| Phase | Monthly Revenue (Est.) | Infra Cost | % of Revenue |
|-------|------------------------|------------|--------------|
| Startup (10 clients) | $25,000 | $475 | 1.9% |
| Growth (40 clients) | $100,000 | $940 | 0.94% |
| Scale (100 clients) | $250,000 | $1,035 | 0.41% |
| Mature (250 clients) | $625,000 | $1,448 | 0.23% |

**Bottom Line:** Infrastructure costs become negligible (<1%) of revenue very quickly.

---

## Cost Optimization Strategies

### Immediate (Now)
1. Stay on Supabase Pro - plenty of headroom
2. Use Vercel Pro only for active developers
3. Leverage GitHub Free until you need branch protection

### Growth Phase (Q3-Q4 2026)
1. Monitor Supabase bandwidth - optimize queries if needed
2. Implement image optimization on Vercel (reduce bandwidth)
3. Cache aggressively with Vercel Edge Config

### Scale Phase (2027+)
1. Consider Supabase dedicated compute for performance
2. Evaluate Vercel Enterprise if SLA required
3. Implement CDN for static assets (reduces Vercel bandwidth)

---

## Hidden Costs to Budget For

| Item | Estimated Cost | Notes |
|------|----------------|-------|
| Domain renewals | $50-200/year | Multiple client domains |
| SSL certificates | $0 | Included with Vercel |
| Stripe fees | 2.9% + $0.30/txn | Payment processing |
| Email service (Resend/SendGrid) | $20-100/month | Transactional emails |
| Error monitoring (Sentry) | $0-26/month | Recommended |
| Analytics (if beyond Vercel) | $0-100/month | Optional |

**Add ~$100-200/month for these ancillary services at scale.**

---

## Risk Factors

### Pricing Changes
- Vercel and Supabase are VC-backed; pricing could increase
- Mitigate: architecture allows migration to alternatives (Railway, PlanetScale)

### Usage Spikes
- Viral moment or client with heavy traffic
- Mitigate: Vercel spend alerts, Supabase usage alerts

### Data Growth
- File storage grows faster than expected
- Mitigate: Implement retention policies, consider S3 for cold storage

---

## Recommendations

1. **Current (Now → April 2026)**
   - Budget: $500-600/month
   - Focus on building, not optimizing

2. **April 2026 (Claude Max expansion)**
   - Budget: $900-1,000/month
   - 4 Claude Max seats = full team AI capability

3. **End of 2026**
   - Budget: $1,000-1,200/month
   - Should support 50+ active clients comfortably

4. **2027+ at Scale**
   - Budget: $1,200-1,800/month
   - Infrastructure supports 200+ clients
   - Cost per client: <$10/month

---

## Summary

Your infrastructure stack (Vercel + Supabase + GitHub + Claude Max) is **exceptionally cost-effective** for a brand development studio:

- **Year 1 total:** ~$10,000-12,000
- **Year 2 total:** ~$12,000-15,000
- **Year 3 total:** ~$15,000-20,000

At scale (200+ clients), infrastructure represents **<0.5% of revenue** - an excellent foundation for a services business.

The $800/month Claude Max investment (4 seats) is your largest fixed cost, but it directly accelerates development velocity across all client projects.

---

---

## Appendix: Full Pro Infrastructure at Scale

This section models "all Pro tiers" across Vercel, GitHub, and Supabase as you scale team size and client base.

### Vercel Pro - Detailed Scaling

**Base:** $20/member/month

| Team Size | Base Cost | Bandwidth (Est.) | Overage | Functions | **Total** |
|-----------|-----------|------------------|---------|-----------|-----------|
| 2 members | $40 | 200GB | $0 | Included | **$40** |
| 4 members | $80 | 400GB | $0 | Included | **$80** |
| 6 members | $120 | 600GB | $0 | Included | **$120** |
| 8 members | $160 | 800GB | $0 | Included | **$160** |
| 10 members | $200 | 1TB | $0 | Included | **$200** |
| 12 members | $240 | 1.2TB | $80 | Included | **$320** |
| 15 members | $300 | 1.5TB | $200 | Included | **$500** |

**Bandwidth overage:** $40/100GB beyond 1TB included

**At 200+ clients with heavy traffic:**
- Assume 5GB/client/month average (portal access, assets, API calls)
- 200 clients × 5GB = 1TB/month
- 400 clients × 5GB = 2TB/month → $400 overage

**Vercel Pro at Scale (200-400 clients):**
| Scenario | Team | Bandwidth | Monthly Cost |
|----------|------|-----------|--------------|
| Conservative | 8 | 1TB | $160 |
| Moderate | 10 | 1.5TB | $400 |
| Aggressive | 12 | 2TB | $560 |

---

### GitHub Team - Detailed Scaling

**Base:** $4/user/month

| Team Size | Base Cost | Actions (min) | Storage | Overage | **Total** |
|-----------|-----------|---------------|---------|---------|-----------|
| 2 users | $8 | 3,000 | 2GB | $0 | **$8** |
| 4 users | $16 | 3,000 | 2GB | $0 | **$16** |
| 6 users | $24 | 3,000 | 2GB | $0 | **$24** |
| 8 users | $32 | 3,000 | 2GB | ~$20 | **$52** |
| 10 users | $40 | 3,000 | 2GB | ~$40 | **$80** |
| 12 users | $48 | 3,000 | 2GB | ~$60 | **$108** |
| 15 users | $60 | 3,000 | 2GB | ~$100 | **$160** |

**Actions overage:** $0.008/minute (Linux)

**Realistic CI/CD at scale:**
- Each deploy: ~5 min build + test
- 20 deploys/day × 5 min = 100 min/day
- 100 min × 30 days = 3,000 min/month (hits limit)
- Growth adds ~$20-40/month in overages

**GitHub Team at Scale:**
| Scenario | Team | Actions | Monthly Cost |
|----------|------|---------|--------------|
| Conservative | 8 | 4,000 min | $40 |
| Moderate | 10 | 6,000 min | $64 |
| Aggressive | 15 | 10,000 min | $116 |

---

### Supabase Pro - Detailed Scaling

**Base:** $25/month + compute + storage + bandwidth

**Compute Add-ons:**
| Instance | vCPU | RAM | Monthly Cost |
|----------|------|-----|--------------|
| Starter (included) | 2 | 1GB | $0 |
| Small | 2 | 2GB | $10 |
| Medium | 2 | 4GB | $50 |
| Large | 4 | 8GB | $100 |
| XL | 8 | 16GB | $200 |
| 2XL | 16 | 32GB | $400 |

**Storage:**
- Included: 8GB database, 100GB file storage
- Additional: $0.125/GB database, $0.021/GB files

**Bandwidth:**
- Included: 250GB
- Additional: $0.09/GB

**Supabase at Scale (by client count):**

| Clients | DB Size | File Storage | Bandwidth | Compute | **Monthly Total** |
|---------|---------|--------------|-----------|---------|-------------------|
| 25 | 500MB | 25GB | 50GB | Starter | **$25** |
| 50 | 1GB | 50GB | 100GB | Small | **$35** |
| 100 | 2GB | 100GB | 200GB | Medium | **$75** |
| 200 | 4GB | 250GB | 400GB | Large | **$140** |
| 300 | 6GB | 400GB | 600GB | Large | **$180** |
| 400 | 8GB | 600GB | 800GB | XL | **$310** |

**Breakdown at 200 clients:**
- Base Pro: $25
- Large compute (4 vCPU, 8GB): $100
- Extra file storage (150GB): ~$3
- Extra bandwidth (150GB): ~$14
- **Total: ~$140/month**

---

### Combined Pro Infrastructure - All Services

#### Scenario A: 50 Clients (Growth Phase)
| Service | Configuration | Monthly Cost |
|---------|---------------|--------------|
| Vercel Pro | 4 members, 400GB bandwidth | $80 |
| GitHub Team | 4 users, 3,500 min actions | $20 |
| Supabase Pro | Small compute, 50GB storage | $35 |
| Claude Max | 4 seats | $800 |
| **Total** | | **$935** |

#### Scenario B: 100 Clients (Scale Phase)
| Service | Configuration | Monthly Cost |
|---------|---------------|--------------|
| Vercel Pro | 6 members, 600GB bandwidth | $120 |
| GitHub Team | 6 users, 5,000 min actions | $40 |
| Supabase Pro | Medium compute, 100GB storage | $75 |
| Claude Max | 4 seats | $800 |
| **Total** | | **$1,035** |

#### Scenario C: 200 Clients (Mature Phase)
| Service | Configuration | Monthly Cost |
|---------|---------------|--------------|
| Vercel Pro | 8 members, 1TB bandwidth | $160 |
| GitHub Team | 8 users, 6,000 min actions | $56 |
| Supabase Pro | Large compute, 250GB storage | $140 |
| Claude Max | 4 seats | $800 |
| **Total** | | **$1,156** |

#### Scenario D: 400 Clients (Full Scale)
| Service | Configuration | Monthly Cost |
|---------|---------------|--------------|
| Vercel Pro | 12 members, 2TB bandwidth | $560 |
| GitHub Team | 12 users, 10,000 min actions | $104 |
| Supabase Pro | XL compute, 600GB storage | $310 |
| Claude Max | 6 seats | $1,200 |
| **Total** | | **$2,174** |

---

### Pro Infrastructure Cost Curve

```
Monthly Cost vs. Active Clients (All Pro Tiers)

$2,500 |                                          ●
       |
$2,000 |                                    ●
       |
$1,500 |                        ●
       |                  ●
$1,000 |            ●
       |      ●
  $500 |  ●
       |
    $0 +----+----+----+----+----+----+----+----
       0   50  100  150  200  250  300  400
                  Active Clients
```

**Cost Scaling Formula (rough):**
- Base: ~$900/month (Claude Max + minimum Pro tiers)
- Per 50 clients: +$50-75/month infrastructure
- Per team member: +$24/month (Vercel + GitHub)

---

### Pro vs Enterprise Decision Points

| Trigger | Service | Upgrade To | Cost Impact |
|---------|---------|------------|-------------|
| Need SLA guarantee | Vercel | Enterprise | +$500-2,000/mo |
| SOC2 compliance required | Supabase | Team ($599) | +$450/mo |
| SAML SSO required | GitHub | Enterprise | +$17/user/mo |
| >2TB bandwidth | Vercel | Enterprise | Negotiated |
| Dedicated database | Supabase | Enterprise | Custom |

**Recommendation:** Stay on Pro tiers until you have a specific compliance or SLA requirement. Pro tiers handle 400+ clients comfortably.

---

### Annual Pro Infrastructure Budget

| Year | Client Target | Monthly Avg | Annual Total |
|------|---------------|-------------|--------------|
| 2026 | 25-75 | $950 | **$11,400** |
| 2027 | 75-150 | $1,100 | **$13,200** |
| 2028 | 150-250 | $1,300 | **$15,600** |
| 2029 | 250-400 | $1,800 | **$21,600** |

**5-Year Total Infrastructure Investment: ~$75,000-85,000**

At $30K average revenue per client, supporting 400 clients = $12M revenue potential against <$25K/year infrastructure cost (0.2% of revenue).

*Last updated: January 2026*
