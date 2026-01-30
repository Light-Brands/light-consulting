# Resources Section: Stack Diagnostic Tool

## Overview

A **coach-driven sales tool** used during live calls with prospects. The coach builds the prospect's current tech stack interactively, reveals the fractures and pain points, then transforms it into an integrated vision—showing them exactly what's possible.

**The Journey:**
1. **BUILD** → Coach adds their tools with them on the line
2. **REVEAL** → Hit "Analyze" to expose all the fractures
3. **TRANSFORM** → Hit "Show Solution" to reorganize into integrated ecosystem

---

## User Flow

### Step 1: Select Industry Template

Coach selects prospect's business type to start with a relevant baseline:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STACK DIAGNOSTIC TOOL                            │
│                                                                     │
│   What type of business are we working with?                        │
│                                                                     │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │   AGENCY    │  │  VC FIRM    │  │ ACCELERATOR │                │
│   │             │  │             │  │             │                │
│   │  Marketing, │  │  Portfolio  │  │  Cohorts,   │                │
│   │  Creative,  │  │  Mgmt, Deal │  │  Mentors,   │                │
│   │  Dev shops  │  │  Flow, LPs  │  │  Startups   │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
│                                                                     │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │  SERVICE    │  │ E-COMMERCE  │  │   CUSTOM    │                │
│   │  BUSINESS   │  │             │  │             │                │
│   │             │  │  Products,  │  │  Start from │                │
│   │  Consulting,│  │  Inventory, │  │   scratch   │                │
│   │  Coaching   │  │  Fulfillment│  │             │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 2: Build Their Stack

Template loads with common tools for that industry. Coach customizes on the call:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AGENCY STACK                                              [Analyze Stack]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   TOOL LIBRARY                    │           CANVAS                        │
│   ─────────────                   │                                         │
│   🔍 Search tools...              │                                         │
│                                   │      ┌─────────┐                        │
│   WEBSITE                         │      │   Wix   │                        │
│   ├─ Wix          [+]             │      │ Website │←──────┐               │
│   ├─ Squarespace  [+]             │      └────┬────┘       │               │
│   ├─ WordPress    [+]             │           │            │               │
│   ├─ Webflow      [+]             │           ▼            │               │
│   └─ Custom       [+]             │      ┌─────────┐  ┌────┴────┐          │
│                                   │      │ Zapier  │  │ HubSpot │          │
│   CRM                             │      │         │  │   CRM   │          │
│   ├─ HubSpot      [+]             │      └────┬────┘  └────┬────┘          │
│   ├─ Salesforce   [+]             │           │            │               │
│   ├─ Pipedrive    [+]             │           ▼            │               │
│   ├─ Monday       [+]             │      ┌─────────┐       │               │
│   └─ Spreadsheet  [+]             │      │Mailchimp│       │               │
│                                   │      │         │       │               │
│   AUTOMATION                      │      └─────────┘       │               │
│   ├─ Zapier       [+]             │                        │               │
│   ├─ Make         [+]             │      ┌─────────┐       │               │
│   └─ n8n          [+]             │      │Calendly │───────┘               │
│                                   │      │         │                        │
│   EMAIL                           │      └─────────┘                        │
│   ├─ Mailchimp    [+]             │                                         │
│   ├─ ConvertKit   [+]             │                                         │
│   └─ Gmail/GSuite [+]             │   [Click tools to connect them]        │
│                                   │   [Drag to reposition]                  │
│   ...more categories...           │                                         │
│                                   │                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Click [+] to add tool to canvas
- Drag tools to position them
- Click two tools to draw a connection between them
- Right-click tool to remove
- Auto-suggest connections based on common integrations

### Step 3: Analyze & Reveal Fractures

Coach clicks **[Analyze Stack]** → Dramatic reveal animation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  STACK ANALYSIS                                          [Show Solution]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────┐     │
│   │  DIAGNOSTIC SUMMARY                                               │     │
│   │                                                                   │     │
│   │   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐    │     │
│   │   │   7    │  │  62%   │  │  ~12   │  │  34%   │  │ $4,200 │    │     │
│   │   │ Tools  │  │  Data  │  │  hrs   │  │ Leads  │  │  /mo   │    │     │
│   │   │Siloed  │  │  Lost  │  │ /week  │  │  Lost  │  │ Wasted │    │     │
│   │   └────────┘  └────────┘  └────────┘  └────────┘  └────────┘    │     │
│   └──────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────┐      │
│   │                                                                  │      │
│   │            ⚠️                                                   │      │
│   │      ┌─────────┐         ┌─────────┐                            │      │
│   │      │   Wix   │╌╌╌╌╌╌╌╌▸│ Zapier  │╌╌╌╌╌⚡ FRAGILE             │      │
│   │      │ Website │  ⚰️     │ (breaks)│                            │      │
│   │      └────┬────┘         └────┬────┘                            │      │
│   │           │                   │                                  │      │
│   │           │ 💀 DATA LOST      │                                  │      │
│   │           ▼                   ▼                                  │      │
│   │      ┌─────────┐         ┌─────────┐                            │      │
│   │      │ Form    │         │Mailchimp│──────✕ NO CONNECTION       │      │
│   │      │ Inbox   │         │(island) │                            │      │
│   │      │ ⚰️      │         └─────────┘                            │      │
│   │      └─────────┘              │                                  │      │
│   │                               │                                  │      │
│   │           👤 MANUAL           │                                  │      │
│   │      ┌─────────┐              │                                  │      │
│   │      │ YOU     │◀─────────────┘                                  │      │
│   │      │ (copy/  │                                                 │      │
│   │      │  paste) │         ┌─────────┐                            │      │
│   │      └────┬────┘         │ HubSpot │                            │      │
│   │           │              │ (ghost  │                            │      │
│   │           └─────────────▸│  town)  │                            │      │
│   │                          └─────────┘                            │      │
│   │                                                                  │      │
│   │   ┌──────────────────────────────────────────────────────────┐  │      │
│   │   │ 💬 "My Zapier broke and I lost 47 leads over 3 weeks"   │  │      │
│   │   │                                        — Agency Owner     │  │      │
│   │   └──────────────────────────────────────────────────────────┘  │      │
│   │                                                                  │      │
│   └─────────────────────────────────────────────────────────────────┘      │
│                                                                             │
│   CRITICAL ISSUES FOUND                                                     │
│   ─────────────────────                                                     │
│   🔴 No AI at the foundation - all tools are Web 2.0                       │
│   🔴 Website has no backend intelligence                                    │
│   🔴 CRM is disconnected from website behavior                             │
│   🔴 Zapier automations are fragile & fail silently                        │
│   🔴 Manual data entry required between 4 systems                          │
│   🔴 No unified view of customer journey                                   │
│   🔴 Lead scoring is manual or non-existent                                │
│   🟡 Email marketing has no behavioral triggers                            │
│   🟡 Calendar bookings don't update pipeline                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Animation Sequence:**
1. Canvas dims slightly
2. Connections animate to show their reliability (flickering, breaking)
3. Warning icons fade in on problem areas
4. Data loss indicators appear (skulls, X marks)
5. Manual intervention points highlight (human icons pulse)
6. Stats bar counts up dramatically
7. Pain point quotes fade in
8. Issue list appears with severity indicators

### Step 4: Transform to Integrated Vision

Coach clicks **[Show Solution]** → Transforms into clean, integrated ecosystem:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  INTEGRATED SOLUTION                              [Save] [Export PDF]       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────┐     │
│   │  TRANSFORMATION IMPACT                                            │     │
│   │                                                                   │     │
│   │   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐    │     │
│   │   │   1    │  │  100%  │  │  ~2    │  │  95%   │  │ $4,200 │    │     │
│   │   │Unified │  │  Data  │  │  hrs   │  │ Leads  │  │  /mo   │    │     │
│   │   │Platform│  │Captured│  │ /week  │  │Captured│  │ Saved  │    │     │
│   │   └────────┘  └────────┘  └────────┘  └────────┘  └────────┘    │     │
│   └──────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────┐      │
│   │                                                                  │      │
│   │                    ┌───────────────────┐                        │      │
│   │                    │                   │                        │      │
│   │                    │   AI-POWERED      │                        │      │
│   │                    │   COMMAND CENTER  │                        │      │
│   │                    │                   │                        │      │
│   │                    │  ✦ Unified CRM    │                        │      │
│   │                    │  ✦ Lead Scoring   │                        │      │
│   │                    │  ✦ Auto Follow-up │                        │      │
│   │                    │  ✦ Content Engine │                        │      │
│   │                    │  ✦ Analytics      │                        │      │
│   │                    │                   │                        │      │
│   │                    └─────────┬─────────┘                        │      │
│   │                              │                                   │      │
│   │        ┌──────────┬─────────┼─────────┬──────────┐              │      │
│   │        │          │         │         │          │              │      │
│   │        ▼          ▼         ▼         ▼          ▼              │      │
│   │   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │      │
│   │   │Website │ │ Email  │ │Calendar│ │ Social │ │  CRM   │       │      │
│   │   │  +AI   │ │  +AI   │ │  +AI   │ │  +AI   │ │  +AI   │       │      │
│   │   └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │      │
│   │        ↑          ↑         ↑         ↑          ↑              │      │
│   │        └──────────┴─────────┴─────────┴──────────┘              │      │
│   │                    BIDIRECTIONAL DATA FLOW                       │      │
│   │                    (Real-time, No Data Loss)                     │      │
│   │                                                                  │      │
│   └─────────────────────────────────────────────────────────────────┘      │
│                                                                             │
│   WHAT CHANGES                                                              │
│   ────────────                                                              │
│   ✅ Single source of truth for all contacts                               │
│   ✅ AI scores every lead automatically                                     │
│   ✅ Intelligent follow-up triggered by behavior                           │
│   ✅ No more manual data entry between systems                             │
│   ✅ Real-time analytics across entire customer journey                    │
│   ✅ Content generated and personalized by AI                              │
│   ✅ Built on AI-native infrastructure (not bolted on)                     │
│                                                                             │
│   TOOLS REPLACED: Wix, Zapier, Mailchimp, Calendly, HubSpot               │
│   REPLACED WITH: Unified AI Platform (custom-built for your workflow)     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Animation Sequence:**
1. Fractured nodes collapse toward center
2. Central hub emerges and expands
3. New clean connections animate outward
4. Color shifts from warning reds/oranges to healthy greens/blues
5. Stats transform (numbers animate from bad → good)
6. "Tools Replaced" summary fades in

---

## Data Structures

### Tool Library

```typescript
interface Tool {
  id: string;
  name: string;
  icon: string;                    // Lucide icon name or custom SVG
  category: ToolCategory;
  era: '2.0' | '3.0';              // Web 2.0 (no AI) vs AI-native
  description: string;
  limitations: string[];           // Why it's problematic in isolation
  commonConnections: string[];     // Tool IDs it typically connects to
  dataFlows: {
    inputs: string[];              // What data it receives
    outputs: string[];             // What data it produces
    losses: string[];              // What data gets lost
  };
  manualWorkRequired: string[];    // What humans have to do
  monthlyHours: number;            // Estimated manual hours/month
  alternatives: string[];          // What replaces it in integrated solution
}

type ToolCategory =
  | 'website'
  | 'crm'
  | 'email'
  | 'automation'
  | 'calendar'
  | 'social'
  | 'project-management'
  | 'forms'
  | 'analytics'
  | 'payments'
  | 'documents'
  | 'communication';
```

### Industry Templates

```typescript
interface IndustryTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultTools: string[];          // Tool IDs to pre-populate
  defaultConnections: Connection[];
  commonPainPoints: string[];
  integratedSolution: {
    hubName: string;
    hubFeatures: string[];
    satellites: Satellite[];
  };
}

interface Satellite {
  name: string;
  replaces: string[];              // Tool IDs this replaces
  features: string[];
}
```

### Stack Session (Saved to Lead)

```typescript
interface StackSession {
  id: string;
  leadId: string;                  // Links to CRM lead
  createdBy: string;               // Coach user ID
  createdAt: Date;
  updatedAt: Date;
  template: string;                // Industry template used

  // Current state
  tools: PlacedTool[];
  connections: Connection[];

  // Analysis results
  analysis: {
    totalTools: number;
    dataLossPercentage: number;
    manualHoursPerWeek: number;
    leadsLostPercentage: number;
    monthlyWaste: number;
    criticalIssues: Issue[];
    warnings: Issue[];
  };

  // Notes
  coachNotes: string;
}

interface PlacedTool {
  toolId: string;
  position: { x: number; y: number };
  customName?: string;             // If they use something not in library
}

interface Connection {
  id: string;
  sourceToolId: string;
  targetToolId: string;
  connectionType: 'working' | 'fragile' | 'broken' | 'manual' | 'one-way';
  reliability: number;             // 0-100
  notes?: string;
}

interface Issue {
  severity: 'critical' | 'warning';
  title: string;
  description: string;
  affectedTools: string[];
  icon: string;
}
```

---

## Tool Library (Initial Set)

### Website Platforms
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `wix` | Wix | 2.0 | No backend intelligence, forms go to email, no lead scoring |
| `squarespace` | Squarespace | 2.0 | Beautiful but dumb, limited integrations |
| `wordpress` | WordPress | 2.0 | Plugin hell, security issues, no native intelligence |
| `webflow` | Webflow | 2.0 | Designer-focused, limited backend capabilities |
| `shopify` | Shopify | 2.0 | E-commerce silo, limited outside commerce |
| `godaddy` | GoDaddy | 2.0 | Basic, no intelligence, poor integrations |

### CRM Platforms
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `hubspot` | HubSpot | 2.0 | Complex, expensive tiers, AI bolted on |
| `salesforce` | Salesforce | 2.0 | Over-engineered, requires admin, expensive |
| `pipedrive` | Pipedrive | 2.0 | Sales-only focus, limited marketing |
| `monday-crm` | Monday CRM | 2.0 | Project tool pretending to be CRM |
| `airtable` | Airtable | 2.0 | Spreadsheet pretending to be CRM |
| `spreadsheet` | Google Sheets | 2.0 | Not a CRM, manual everything |

### Automation Platforms
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `zapier` | Zapier | 2.0 | Breaks silently, no error recovery, gets expensive |
| `make` | Make (Integromat) | 2.0 | Complex, fragile, requires expertise |
| `n8n` | n8n | 2.0 | Self-hosted complexity, no support |
| `ifttt` | IFTTT | 2.0 | Too basic, consumer-focused |

### Email Marketing
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `mailchimp` | Mailchimp | 2.0 | Email silo, basic automation, no behavior tracking |
| `convertkit` | ConvertKit | 2.0 | Creator-focused, limited for business |
| `constant-contact` | Constant Contact | 2.0 | Outdated, basic features |
| `activecampaign` | ActiveCampaign | 2.0 | Complex, automation breaks easily |
| `klaviyo` | Klaviyo | 2.0 | E-commerce only, expensive |

### Calendar/Scheduling
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `calendly` | Calendly | 2.0 | Booking silo, no pipeline connection |
| `cal-com` | Cal.com | 2.0 | Open source complexity |
| `acuity` | Acuity | 2.0 | Basic, limited integrations |
| `google-calendar` | Google Calendar | 2.0 | No booking intelligence |

### Social Media
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `hootsuite` | Hootsuite | 2.0 | Scheduling only, no feedback loop |
| `buffer` | Buffer | 2.0 | Basic scheduling, no intelligence |
| `later` | Later | 2.0 | Instagram-focused, limited |
| `sprout` | Sprout Social | 2.0 | Expensive, still no behavior connection |

### Project Management
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `asana` | Asana | 2.0 | Task silo, no client visibility |
| `monday` | Monday.com | 2.0 | Over-featured, complex |
| `trello` | Trello | 2.0 | Too basic, board chaos |
| `clickup` | ClickUp | 2.0 | Everything tool, nothing great |
| `notion` | Notion | 2.0 | Documentation, not project management |
| `basecamp` | Basecamp | 2.0 | Opinionated, limited integrations |

### Forms
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `typeform` | Typeform | 2.0 | Beautiful forms, data goes nowhere |
| `jotform` | JotForm | 2.0 | Basic forms, email notifications only |
| `google-forms` | Google Forms | 2.0 | Data trapped in spreadsheets |
| `tally` | Tally | 2.0 | Nice but limited integrations |

### Payments
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `stripe` | Stripe | 2.0 | Payment silo, no CRM connection |
| `paypal` | PayPal | 2.0 | Consumer-focused, poor business tools |
| `square` | Square | 2.0 | POS-focused, limited online |

### Communication
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `slack` | Slack | 2.0 | Conversation graveyard, no action tracking |
| `teams` | Microsoft Teams | 2.0 | Enterprise bloat |
| `intercom` | Intercom | 2.0 | Support silo, expensive |
| `drift` | Drift | 2.0 | Chat only, limited intelligence |

### Documents
| ID | Name | Era | Limitations |
|----|------|-----|-------------|
| `google-drive` | Google Drive | 2.0 | File dump, no organization intelligence |
| `dropbox` | Dropbox | 2.0 | Storage only, no workflows |
| `docusign` | DocuSign | 2.0 | Signatures only, no pipeline connection |

---

## Analysis Engine

### How Fractures Are Detected

```typescript
interface AnalysisRules {
  // Connection analysis
  connectionRules: ConnectionRule[];

  // Tool-specific issues
  toolRules: ToolRule[];

  // Pattern detection
  patternRules: PatternRule[];
}

interface ConnectionRule {
  id: string;
  name: string;
  severity: 'critical' | 'warning';
  condition: (connection: Connection, tools: PlacedTool[]) => boolean;
  message: string;
  icon: string;
}

// Example rules:
const analysisRules: AnalysisRules = {
  connectionRules: [
    {
      id: 'zapier-fragile',
      name: 'Fragile Automation',
      severity: 'critical',
      condition: (conn, tools) =>
        tools.some(t => t.toolId === 'zapier') && conn.reliability < 80,
      message: 'Zapier automations fail silently. When they break, you lose leads.',
      icon: 'Zap'
    },
    {
      id: 'one-way-data',
      name: 'One-Way Data Flow',
      severity: 'warning',
      condition: (conn) => conn.connectionType === 'one-way',
      message: 'Data flows one direction only. No feedback loop.',
      icon: 'ArrowRight'
    },
    {
      id: 'manual-connection',
      name: 'Manual Data Transfer',
      severity: 'critical',
      condition: (conn) => conn.connectionType === 'manual',
      message: 'You are the integration. This requires manual copy/paste.',
      icon: 'User'
    }
  ],

  toolRules: [
    {
      id: 'no-ai-foundation',
      name: 'No AI at Foundation',
      severity: 'critical',
      condition: (tool) => tool.era === '2.0',
      message: 'This tool was built before AI. Intelligence is bolted on, not native.',
      icon: 'Bot'
    },
    {
      id: 'crm-island',
      name: 'CRM Data Island',
      severity: 'critical',
      condition: (tool, connections) =>
        tool.category === 'crm' &&
        connections.filter(c => c.sourceToolId === tool.id || c.targetToolId === tool.id).length < 3,
      message: 'CRM is disconnected from most of your customer touchpoints.',
      icon: 'Database'
    }
  ],

  patternRules: [
    {
      id: 'no-central-hub',
      name: 'No Central Hub',
      severity: 'critical',
      condition: (tools, connections) => {
        // Check if any tool has connections to >50% of other tools
        return !tools.some(tool => {
          const connCount = connections.filter(
            c => c.sourceToolId === tool.toolId || c.targetToolId === tool.toolId
          ).length;
          return connCount >= tools.length * 0.5;
        });
      },
      message: 'No single system connects everything. Data is scattered everywhere.',
      icon: 'Share2'
    },
    {
      id: 'tool-sprawl',
      name: 'Tool Sprawl',
      severity: 'warning',
      condition: (tools) => tools.length > 8,
      message: `You're paying for ${tools.length} tools that don't work together.`,
      icon: 'Layers'
    }
  ]
};
```

### Metrics Calculation

```typescript
function calculateAnalytics(session: StackSession): AnalysisResult {
  const tools = session.tools;
  const connections = session.connections;

  // Data loss percentage (based on connection types)
  const fragileConnections = connections.filter(c =>
    c.connectionType === 'fragile' || c.connectionType === 'broken'
  );
  const dataLossPercentage = Math.round(
    (fragileConnections.length / Math.max(connections.length, 1)) * 100
  );

  // Manual hours per week (sum from tool library)
  const manualHoursPerWeek = tools.reduce((sum, placedTool) => {
    const tool = toolLibrary.find(t => t.id === placedTool.toolId);
    return sum + (tool?.monthlyHours || 0) / 4;
  }, 0);

  // Leads lost percentage (based on dead-end connections)
  const deadEnds = connections.filter(c => c.connectionType === 'broken').length;
  const leadsLostPercentage = Math.min(
    Math.round(deadEnds * 15 + Math.random() * 10),
    50
  );

  // Monthly waste (tools + manual time)
  const toolCosts = tools.length * 50; // Average $50/tool/month
  const manualCost = manualHoursPerWeek * 4 * 50; // $50/hr
  const monthlyWaste = Math.round((toolCosts + manualCost) / 100) * 100;

  return {
    totalTools: tools.length,
    dataLossPercentage,
    manualHoursPerWeek: Math.round(manualHoursPerWeek),
    leadsLostPercentage,
    monthlyWaste,
    criticalIssues: detectCriticalIssues(session),
    warnings: detectWarnings(session)
  };
}
```

---

## Industry Templates

### Agency Template

```typescript
const agencyTemplate: IndustryTemplate = {
  id: 'agency',
  name: 'Agency',
  description: 'Marketing, creative, or development agencies',
  icon: 'Briefcase',
  defaultTools: ['wix', 'hubspot', 'zapier', 'mailchimp', 'calendly', 'slack', 'asana', 'google-drive'],
  defaultConnections: [
    { source: 'wix', target: 'zapier', type: 'fragile' },
    { source: 'zapier', target: 'hubspot', type: 'fragile' },
    { source: 'zapier', target: 'mailchimp', type: 'fragile' },
    { source: 'calendly', target: 'hubspot', type: 'one-way' },
  ],
  commonPainPoints: [
    'Client onboarding is manual and inconsistent',
    'Project status is never up to date',
    'Proposals live in documents, disconnected from CRM',
    'Time tracking is a nightmare',
    'No visibility into true project profitability'
  ],
  integratedSolution: {
    hubName: 'Agency Command Center',
    hubFeatures: [
      'Unified client portal',
      'AI-powered proposal generation',
      'Automatic project creation from signed deals',
      'Real-time profitability tracking',
      'Intelligent resource allocation'
    ],
    satellites: [
      { name: 'Smart Website', replaces: ['wix', 'webflow'], features: ['Lead scoring', 'Behavior tracking', 'Dynamic content'] },
      { name: 'Client CRM', replaces: ['hubspot', 'pipedrive'], features: ['Unified timeline', 'AI follow-up', 'Revenue forecasting'] },
      { name: 'Project Engine', replaces: ['asana', 'monday'], features: ['Auto-updates', 'Client visibility', 'Time intelligence'] },
      { name: 'Content Hub', replaces: ['mailchimp', 'hootsuite'], features: ['AI generation', 'Multi-channel', 'Performance loop'] }
    ]
  }
};
```

### VC Firm Template

```typescript
const vcTemplate: IndustryTemplate = {
  id: 'vc-firm',
  name: 'VC Firm',
  description: 'Venture capital and investment firms',
  icon: 'TrendingUp',
  defaultTools: ['squarespace', 'salesforce', 'mailchimp', 'calendly', 'google-drive', 'airtable', 'docusign', 'slack'],
  defaultConnections: [
    { source: 'squarespace', target: 'mailchimp', type: 'one-way' },
    { source: 'calendly', target: 'salesforce', type: 'manual' },
    { source: 'airtable', target: 'salesforce', type: 'manual' },
    { source: 'docusign', target: 'google-drive', type: 'one-way' },
  ],
  commonPainPoints: [
    'Deal flow is tracked in spreadsheets',
    'Portfolio company updates are manual emails',
    'LP reporting takes days to compile',
    'No visibility across partners\' pipelines',
    'Founder relationships lost when partners leave'
  ],
  integratedSolution: {
    hubName: 'Fund Command Center',
    hubFeatures: [
      'AI deal flow scoring',
      'Unified portfolio dashboard',
      'Automated LP reporting',
      'Cross-partner visibility',
      'Relationship intelligence'
    ],
    satellites: [
      { name: 'Deal Flow CRM', replaces: ['salesforce', 'airtable'], features: ['Startup scoring', 'Founder tracking', 'Co-investor network'] },
      { name: 'Portfolio Hub', replaces: ['google-drive', 'slack'], features: ['Automated updates', 'KPI tracking', 'Value-add coordination'] },
      { name: 'LP Portal', replaces: ['mailchimp', 'docusign'], features: ['Self-service reporting', 'Document vault', 'Capital calls'] },
      { name: 'Founder Portal', replaces: ['calendly', 'typeform'], features: ['Application flow', 'Scheduling', 'Resource access'] }
    ]
  }
};
```

### Accelerator Template

```typescript
const acceleratorTemplate: IndustryTemplate = {
  id: 'accelerator',
  name: 'Startup Accelerator',
  description: 'Accelerators, incubators, and startup programs',
  icon: 'Rocket',
  defaultTools: ['webflow', 'airtable', 'mailchimp', 'calendly', 'slack', 'notion', 'typeform', 'zoom'],
  defaultConnections: [
    { source: 'typeform', target: 'airtable', type: 'fragile' },
    { source: 'airtable', target: 'mailchimp', type: 'manual' },
    { source: 'calendly', target: 'notion', type: 'manual' },
  ],
  commonPainPoints: [
    'Application review is chaotic spreadsheet work',
    'Mentor matching is manual and inconsistent',
    'Cohort progress tracking doesn\'t exist',
    'Alumni engagement drops off after demo day',
    'Sponsor reporting is a quarterly nightmare'
  ],
  integratedSolution: {
    hubName: 'Accelerator Command Center',
    hubFeatures: [
      'AI application screening',
      'Intelligent mentor matching',
      'Cohort progress dashboard',
      'Alumni network management',
      'Automated sponsor reporting'
    ],
    satellites: [
      { name: 'Application Portal', replaces: ['typeform', 'airtable'], features: ['AI screening', 'Team scoring', 'Pipeline stages'] },
      { name: 'Cohort Hub', replaces: ['notion', 'slack'], features: ['Progress tracking', 'Resource library', 'Milestone automation'] },
      { name: 'Mentor Network', replaces: ['calendly', 'airtable'], features: ['Smart matching', 'Session tracking', 'Feedback loops'] },
      { name: 'Alumni Portal', replaces: ['mailchimp', 'slack'], features: ['Directory', 'Success tracking', 'Referral engine'] }
    ]
  }
};
```

---

## Implementation Plan

### Phase 1: Foundation

**Database Schema**

```sql
-- Resources table (for all resource types)
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- 'stack-diagnostic', 'article', 'template', etc.
  category TEXT NOT NULL,
  content JSONB,
  metadata JSONB,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Stack diagnostic sessions
CREATE TABLE stack_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  created_by UUID REFERENCES team_members(id),
  template_id TEXT NOT NULL,

  -- State
  tools JSONB NOT NULL DEFAULT '[]',
  connections JSONB NOT NULL DEFAULT '[]',

  -- Analysis
  analysis JSONB,

  -- Notes
  coach_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tool library (static, seeded)
CREATE TABLE diagnostic_tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  era TEXT NOT NULL, -- '2.0' or '3.0'
  description TEXT,
  limitations JSONB DEFAULT '[]',
  common_connections JSONB DEFAULT '[]',
  data_flows JSONB,
  manual_work JSONB DEFAULT '[]',
  monthly_hours NUMERIC DEFAULT 0,
  alternatives JSONB DEFAULT '[]',
  sort_order INT DEFAULT 0
);

-- Industry templates
CREATE TABLE diagnostic_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  default_tools JSONB NOT NULL DEFAULT '[]',
  default_connections JSONB NOT NULL DEFAULT '[]',
  common_pain_points JSONB DEFAULT '[]',
  integrated_solution JSONB NOT NULL,
  sort_order INT DEFAULT 0
);
```

**Files to Create**

```
src/
├── app/admin/resources/
│   ├── page.tsx                          # Resources index
│   └── stack-diagnostic/
│       ├── page.tsx                      # Main diagnostic tool
│       └── [sessionId]/
│           └── page.tsx                  # View/edit saved session
│
├── components/admin/resources/
│   ├── index.ts                          # Barrel exports
│   │
│   ├── stack-diagnostic/
│   │   ├── StackDiagnosticTool.tsx       # Main container component
│   │   ├── TemplateSelector.tsx          # Industry template picker
│   │   ├── ToolLibrary.tsx               # Left panel tool browser
│   │   ├── StackCanvas.tsx               # ReactFlow canvas
│   │   ├── ToolNode.tsx                  # Custom node for tools
│   │   ├── ConnectionEdge.tsx            # Custom edge with status
│   │   ├── AnalysisOverlay.tsx           # Fracture reveal layer
│   │   ├── TransformView.tsx             # Integrated solution view
│   │   ├── DiagnosticStats.tsx           # Top stats bar
│   │   ├── IssuesList.tsx                # Critical issues panel
│   │   ├── PainPointCallout.tsx          # Floating quote bubbles
│   │   └── ExportModal.tsx               # PDF export dialog
│   │
│   └── ResourceCard.tsx                  # Card for resource index
│
├── lib/
│   ├── stack-diagnostic/
│   │   ├── tools.ts                      # Tool library data
│   │   ├── templates.ts                  # Industry templates
│   │   ├── analysis-engine.ts            # Fracture detection rules
│   │   ├── layout-algorithm.ts           # Node positioning
│   │   └── pdf-generator.ts              # Export to PDF
│   │
│   └── types/stack-diagnostic.ts         # TypeScript interfaces
│
└── app/api/admin/
    ├── resources/
    │   └── route.ts                      # Resources CRUD
    │
    └── stack-diagnostic/
        ├── route.ts                      # Session CRUD
        ├── [sessionId]/route.ts          # Individual session
        └── export/route.ts               # PDF generation
```

### Phase 2: Core Components

1. **StackCanvas** - ReactFlow integration
   - Drag-and-drop tool placement
   - Click-to-connect workflow
   - Auto-layout suggestions
   - Zoom/pan controls

2. **ToolNode** - Custom node rendering
   - Tool icon and name
   - Category color coding
   - Selection states
   - Warning indicators (post-analysis)

3. **ConnectionEdge** - Custom edge rendering
   - Connection type styling (solid, dashed, broken)
   - Animation for data flow
   - Warning indicators
   - Click to edit reliability

4. **AnalysisOverlay** - The "reveal"
   - Dramatic animation sequence
   - Warning icons placement
   - Data loss indicators
   - Manual intervention markers
   - Pain point callouts

5. **TransformView** - The solution
   - Central hub visualization
   - Satellite arrangement
   - Smooth transition animation
   - Comparison stats

### Phase 3: Integration

1. **Lead Connection**
   - Save session to lead record
   - View history of sessions
   - Link from lead detail page

2. **PDF Export**
   - Capture canvas as image
   - Generate report with stats
   - Include recommendations
   - Branded template

3. **Navigation**
   - Add RESOURCES section to sidebar
   - Add to mobile nav
   - Quick access from command center

---

## Visual Design

### Color System

```css
/* Build Mode - Neutral/Professional */
--canvas-bg: #0f172a;
--tool-bg: rgba(30, 41, 59, 0.8);
--tool-border: rgba(148, 163, 184, 0.2);
--connection-default: rgba(148, 163, 184, 0.4);

/* Analysis Mode - Warning/Danger */
--fracture-critical: #EF4444;
--fracture-warning: #F59E0B;
--fracture-info: #3B82F6;
--data-loss: #DC2626;
--manual-work: #8B5CF6;

/* Solution Mode - Healthy/Integrated */
--solution-hub: #10B981;
--solution-satellite: #06B6D4;
--solution-connection: #22C55E;
--solution-glow: rgba(16, 185, 129, 0.3);

/* Category Colors (for tool types) */
--cat-website: #3B82F6;
--cat-crm: #8B5CF6;
--cat-email: #EC4899;
--cat-automation: #F59E0B;
--cat-calendar: #10B981;
--cat-social: #06B6D4;
--cat-project: #6366F1;
--cat-forms: #84CC16;
--cat-payments: #14B8A6;
--cat-docs: #64748B;
```

### Animation Specs

```css
/* Tool placement */
@keyframes tool-drop {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Connection draw */
@keyframes connection-draw {
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
}

/* Fracture reveal - connection break */
@keyframes connection-break {
  0%, 70% { opacity: 1; stroke-dasharray: none; }
  85% { opacity: 0.5; stroke-dasharray: 5 5; }
  100% { opacity: 0.3; stroke-dasharray: 5 5; }
}

/* Warning pulse */
@keyframes warning-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 20px 10px rgba(239, 68, 68, 0.2);
    transform: scale(1.05);
  }
}

/* Data loss indicator */
@keyframes data-loss-float {
  0%, 100% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(-5px); opacity: 1; }
}

/* Transform - collapse to center */
@keyframes collapse-to-center {
  0% { transform: translate(0, 0); }
  100% { transform: translate(var(--to-center-x), var(--to-center-y)); opacity: 0; }
}

/* Transform - hub emerge */
@keyframes hub-emerge {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

/* Transform - satellites expand */
@keyframes satellite-expand {
  0% { transform: translate(0, 0) scale(0); opacity: 0; }
  100% { transform: translate(var(--final-x), var(--final-y)) scale(1); opacity: 1; }
}
```

---

## Questions Resolved

| Question | Decision |
|----------|----------|
| Public or admin-only? | **Admin-only** - used by coaches on calls |
| Personalization? | **Yes** - coach builds it with prospect live |
| Testimonials? | **Realistic composites** for now, can add real ones later |
| Sound effects? | **No** - keep it professional for sales calls |
| Save sessions? | **Yes** - linked to leads, exportable as PDF |

---

## Success Metrics

1. **Usage**
   - Sessions created per week
   - Average tools added per session
   - Completion rate (build → analyze → transform)

2. **Sales Impact**
   - Conversion rate from diagnostic to proposal
   - Deal size correlation
   - Time to close

3. **Qualitative**
   - Coach feedback
   - Prospect reactions ("that's exactly my setup")
   - Objection handling effectiveness

---

## Next Steps

1. Review and approve this plan
2. Create database migrations
3. Build StackCanvas with ReactFlow
4. Implement tool library and templates
5. Build analysis engine
6. Create transform view
7. Add PDF export
8. Connect to leads
9. Add to navigation

Ready to execute on your approval.
