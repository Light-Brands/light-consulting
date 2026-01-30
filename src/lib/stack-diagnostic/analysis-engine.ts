/**
 * Stack Diagnostic Analysis Engine
 * Detects fractures, data silos, and inefficiencies in a tech stack
 */

import type { PlacedTool, ToolConnection, AnalysisResult, Issue, ConnectionType } from '@/types/stack-diagnostic';
import { getToolById } from './tools';

interface ConnectionRule {
  sourceCategory: string;
  targetCategory: string;
  expectedType: ConnectionType;
  issueIfMissing: {
    severity: 'critical' | 'warning';
    title: string;
    description: string;
    category: Issue['category'];
  };
}

// Rules for expected connections between tool categories
const connectionRules: ConnectionRule[] = [
  {
    sourceCategory: 'crm',
    targetCategory: 'email',
    expectedType: 'native',
    issueIfMissing: {
      severity: 'critical',
      title: 'CRM-Email Gap',
      description: 'Your CRM and email marketing are not natively connected. Lead data must be manually transferred, causing delays and data loss.',
      category: 'data-silo',
    },
  },
  {
    sourceCategory: 'advertising',
    targetCategory: 'crm',
    expectedType: 'native',
    issueIfMissing: {
      severity: 'critical',
      title: 'Ad-to-CRM Blind Spot',
      description: 'Ad platform conversions are not flowing into your CRM. You cannot attribute revenue to specific campaigns.',
      category: 'missing-integration',
    },
  },
  {
    sourceCategory: 'website',
    targetCategory: 'analytics',
    expectedType: 'native',
    issueIfMissing: {
      severity: 'warning',
      title: 'Website Analytics Gap',
      description: 'Your website is not properly connected to analytics. Visitor behavior data is being lost.',
      category: 'data-silo',
    },
  },
  {
    sourceCategory: 'ecommerce',
    targetCategory: 'accounting',
    expectedType: 'native',
    issueIfMissing: {
      severity: 'warning',
      title: 'Revenue Reconciliation Gap',
      description: 'Sales data from your e-commerce platform is not automatically flowing to accounting. Manual reconciliation is required.',
      category: 'manual-process',
    },
  },
  {
    sourceCategory: 'crm',
    targetCategory: 'project-management',
    expectedType: 'native',
    issueIfMissing: {
      severity: 'warning',
      title: 'Sales-to-Delivery Handoff Gap',
      description: 'Closed deals are not automatically creating projects. Client context is lost in the handoff.',
      category: 'manual-process',
    },
  },
  {
    sourceCategory: 'communication',
    targetCategory: 'crm',
    expectedType: 'native',
    issueIfMissing: {
      severity: 'warning',
      title: 'Communication Silo',
      description: 'Customer communication history is not captured in your CRM. Teams lack full context on interactions.',
      category: 'data-silo',
    },
  },
];

// Detect issues for broken/manual connections
function analyzeConnectionQuality(connections: ToolConnection[], placedTools: PlacedTool[]): Issue[] {
  const issues: Issue[] = [];

  const brokenConnections = connections.filter(c => c.connectionType === 'broken');
  for (const conn of brokenConnections) {
    const source = placedTools.find(t => t.id === conn.sourceToolId);
    const target = placedTools.find(t => t.id === conn.targetToolId);
    const sourceTool = source ? getToolById(source.toolId) : null;
    const targetTool = target ? getToolById(target.toolId) : null;

    issues.push({
      id: `broken-${conn.id}`,
      severity: 'critical',
      title: `Broken Integration: ${sourceTool?.name || 'Unknown'} → ${targetTool?.name || 'Unknown'}`,
      description: `The connection between ${sourceTool?.name} and ${targetTool?.name} is broken. Data is not flowing between these systems.`,
      affectedTools: [conn.sourceToolId, conn.targetToolId],
      category: 'missing-integration',
    });
  }

  const manualConnections = connections.filter(c => c.connectionType === 'manual');
  if (manualConnections.length > 0) {
    const toolNames = manualConnections.map(conn => {
      const source = placedTools.find(t => t.id === conn.sourceToolId);
      const target = placedTools.find(t => t.id === conn.targetToolId);
      const s = source ? getToolById(source.toolId) : null;
      const t = target ? getToolById(target.toolId) : null;
      return `${s?.name || '?'} → ${t?.name || '?'}`;
    });

    issues.push({
      id: 'manual-processes',
      severity: 'warning',
      title: `${manualConnections.length} Manual Data Transfer${manualConnections.length > 1 ? 's' : ''}`,
      description: `You are manually transferring data between: ${toolNames.join(', ')}. This costs time and introduces human error.`,
      affectedTools: manualConnections.flatMap(c => [c.sourceToolId, c.targetToolId]),
      category: 'manual-process',
    });
  }

  const zapierConnections = connections.filter(c => c.connectionType === 'zapier');
  if (zapierConnections.length >= 3) {
    issues.push({
      id: 'zapier-dependency',
      severity: 'warning',
      title: 'Heavy Automation Dependency',
      description: `You have ${zapierConnections.length} connections running through third-party automation (Zapier/Make). This adds cost, latency, and failure points.`,
      affectedTools: zapierConnections.flatMap(c => [c.sourceToolId, c.targetToolId]),
      category: 'cost-waste',
    });
  }

  return issues;
}

// Detect missing expected connections between categories
function analyzeMissingConnections(placedTools: PlacedTool[], connections: ToolConnection[]): Issue[] {
  const issues: Issue[] = [];

  const toolCategories = new Set(
    placedTools.map(pt => getToolById(pt.toolId)?.category).filter(Boolean)
  );

  for (const rule of connectionRules) {
    if (!toolCategories.has(rule.sourceCategory as never) || !toolCategories.has(rule.targetCategory as never)) {
      continue;
    }

    const sourceTools = placedTools.filter(pt => getToolById(pt.toolId)?.category === rule.sourceCategory);
    const targetTools = placedTools.filter(pt => getToolById(pt.toolId)?.category === rule.targetCategory);

    const hasConnection = connections.some(conn => {
      const source = placedTools.find(t => t.id === conn.sourceToolId);
      const target = placedTools.find(t => t.id === conn.targetToolId);
      if (!source || !target) return false;
      const sourceCat = getToolById(source.toolId)?.category;
      const targetCat = getToolById(target.toolId)?.category;
      return (
        (sourceCat === rule.sourceCategory && targetCat === rule.targetCategory) ||
        (sourceCat === rule.targetCategory && targetCat === rule.sourceCategory)
      );
    });

    if (!hasConnection) {
      issues.push({
        id: `missing-${rule.sourceCategory}-${rule.targetCategory}`,
        severity: rule.issueIfMissing.severity,
        title: rule.issueIfMissing.title,
        description: rule.issueIfMissing.description,
        affectedTools: [...sourceTools.map(t => t.toolId), ...targetTools.map(t => t.toolId)],
        category: rule.issueIfMissing.category,
      });
    }
  }

  return issues;
}

// Detect isolated tools (tools with no connections)
function analyzeIsolatedTools(placedTools: PlacedTool[], connections: ToolConnection[]): Issue[] {
  const issues: Issue[] = [];
  const connectedIds = new Set(
    connections.flatMap(c => [c.sourceToolId, c.targetToolId])
  );

  const isolated = placedTools.filter(pt => !connectedIds.has(pt.id));

  for (const pt of isolated) {
    const tool = getToolById(pt.toolId);
    if (!tool) continue;

    issues.push({
      id: `isolated-${pt.id}`,
      severity: 'warning',
      title: `${tool.name} is Isolated`,
      description: `${tool.name} has no connections to other tools. Data goes in but never flows out, creating a silo.`,
      affectedTools: [pt.toolId],
      category: 'data-silo',
    });
  }

  return issues;
}

// Detect redundant tools in the same category
function analyzeRedundancy(placedTools: PlacedTool[]): Issue[] {
  const issues: Issue[] = [];
  const categoryCount: Record<string, { count: number; tools: string[] }> = {};

  for (const pt of placedTools) {
    const tool = getToolById(pt.toolId);
    if (!tool) continue;
    if (!categoryCount[tool.category]) {
      categoryCount[tool.category] = { count: 0, tools: [] };
    }
    categoryCount[tool.category].count++;
    categoryCount[tool.category].tools.push(tool.name);
  }

  for (const [category, data] of Object.entries(categoryCount)) {
    if (data.count >= 3) {
      issues.push({
        id: `redundancy-${category}`,
        severity: 'warning',
        title: `Redundant ${category.replace(/-/g, ' ')} Tools`,
        description: `You have ${data.count} tools in the same category: ${data.tools.join(', ')}. This indicates overlapping functionality and wasted spend.`,
        affectedTools: data.tools,
        category: 'redundancy',
      });
    }
  }

  return issues;
}

// Calculate cost waste
function calculateMonthlyWaste(placedTools: PlacedTool[], issues: Issue[]): number {
  let totalCost = 0;
  for (const pt of placedTools) {
    const tool = getToolById(pt.toolId);
    if (tool?.monthlyPrice) {
      totalCost += tool.monthlyPrice;
    }
  }

  // Estimate waste based on issues
  const redundancyIssues = issues.filter(i => i.category === 'redundancy').length;
  const siloIssues = issues.filter(i => i.category === 'data-silo').length;

  // Rough formula: redundant tools waste ~30% of category cost, silos add ~$50/mo opportunity cost each
  const wastePercent = Math.min(0.4, redundancyIssues * 0.1 + siloIssues * 0.05);
  return Math.round(totalCost * wastePercent + siloIssues * 50);
}

/**
 * Main analysis function
 * Takes placed tools and connections, returns a complete analysis
 */
export function analyzeStack(placedTools: PlacedTool[], connections: ToolConnection[]): AnalysisResult {
  if (placedTools.length === 0) {
    return {
      score: 100,
      issues: [],
      stats: {
        toolsSiloed: 0,
        dataLostPercent: 0,
        manualHoursPerWeek: 0,
        leadsLostPercent: 0,
        monthlyWaste: 0,
      },
      painPoints: [],
    };
  }

  // Collect all issues
  const connectionQualityIssues = analyzeConnectionQuality(connections, placedTools);
  const missingConnectionIssues = analyzeMissingConnections(placedTools, connections);
  const isolatedIssues = analyzeIsolatedTools(placedTools, connections);
  const redundancyIssues = analyzeRedundancy(placedTools);

  const allIssues = [
    ...connectionQualityIssues,
    ...missingConnectionIssues,
    ...isolatedIssues,
    ...redundancyIssues,
  ];

  // Calculate stats
  const connectedIds = new Set(connections.flatMap(c => [c.sourceToolId, c.targetToolId]));
  const toolsSiloed = placedTools.filter(pt => !connectedIds.has(pt.id)).length;

  const manualConnections = connections.filter(c => c.connectionType === 'manual').length;
  const brokenConnections = connections.filter(c => c.connectionType === 'broken').length;

  const totalTools = placedTools.length;
  const dataLostPercent = Math.min(95, Math.round(
    (toolsSiloed / Math.max(totalTools, 1)) * 40 +
    (brokenConnections / Math.max(connections.length, 1)) * 30 +
    (manualConnections / Math.max(connections.length, 1)) * 15
  ));

  const manualHoursPerWeek = Math.round(
    manualConnections * 3 + brokenConnections * 2 + toolsSiloed * 1.5
  );

  const criticalIssues = allIssues.filter(i => i.severity === 'critical').length;
  const leadsLostPercent = Math.min(40, Math.round(
    criticalIssues * 8 + toolsSiloed * 3
  ));

  const monthlyWaste = calculateMonthlyWaste(placedTools, allIssues);

  // Calculate health score (lower = worse)
  const score = Math.max(5, Math.round(
    100 -
    criticalIssues * 15 -
    allIssues.filter(i => i.severity === 'warning').length * 5 -
    toolsSiloed * 3 -
    manualConnections * 2
  ));

  // Generate pain points
  const painPoints: string[] = [];
  if (toolsSiloed > 0) {
    painPoints.push(`${toolsSiloed} of your ${totalTools} tools are completely siloed with no data flowing in or out.`);
  }
  if (manualConnections > 0) {
    painPoints.push(`${manualConnections} connection${manualConnections > 1 ? 's require' : ' requires'} manual data transfer every time.`);
  }
  if (brokenConnections > 0) {
    painPoints.push(`${brokenConnections} integration${brokenConnections > 1 ? 's are' : ' is'} currently broken and losing data.`);
  }
  if (criticalIssues > 0) {
    painPoints.push(`${criticalIssues} critical issue${criticalIssues > 1 ? 's are' : ' is'} actively costing you leads and revenue.`);
  }

  return {
    score,
    issues: allIssues.sort((a, b) => {
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
    stats: {
      toolsSiloed,
      dataLostPercent,
      manualHoursPerWeek,
      leadsLostPercent,
      monthlyWaste,
    },
    painPoints,
  };
}
