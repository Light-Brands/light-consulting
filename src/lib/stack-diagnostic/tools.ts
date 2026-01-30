/**
 * Stack Diagnostic Tool Library
 * Complete library of ~50 tools across 12 categories
 */

import type { DiagnosticTool, ToolCategory } from '@/types/stack-diagnostic';

// Category color mappings for UI
export const categoryColors: Record<ToolCategory, { bg: string; text: string; border: string; node: string }> = {
  crm:                { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/30',   node: '#3B82F6' },
  email:              { bg: 'bg-purple-500/10',  text: 'text-purple-400', border: 'border-purple-500/30', node: '#8B5CF6' },
  'project-management': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', node: '#F97316' },
  analytics:          { bg: 'bg-green-500/10',   text: 'text-green-400',  border: 'border-green-500/30',  node: '#22C55E' },
  'social-media':     { bg: 'bg-pink-500/10',    text: 'text-pink-400',   border: 'border-pink-500/30',   node: '#EC4899' },
  advertising:        { bg: 'bg-red-500/10',     text: 'text-red-400',    border: 'border-red-500/30',    node: '#EF4444' },
  website:            { bg: 'bg-cyan-500/10',    text: 'text-cyan-400',   border: 'border-cyan-500/30',   node: '#06B6D4' },
  ecommerce:          { bg: 'bg-yellow-500/10',  text: 'text-yellow-400', border: 'border-yellow-500/30', node: '#EAB308' },
  accounting:         { bg: 'bg-emerald-500/10', text: 'text-emerald-400',border: 'border-emerald-500/30',node: '#10B981' },
  communication:      { bg: 'bg-indigo-500/10',  text: 'text-indigo-400', border: 'border-indigo-500/30', node: '#6366F1' },
  design:             { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400',border: 'border-fuchsia-500/30',node: '#D946EF' },
  automation:         { bg: 'bg-amber-500/10',   text: 'text-amber-400',  border: 'border-amber-500/30',  node: '#F59E0B' },
};

export const categoryLabels: Record<ToolCategory, string> = {
  crm: 'CRM',
  email: 'Email & Marketing',
  'project-management': 'Project Management',
  analytics: 'Analytics',
  'social-media': 'Social Media',
  advertising: 'Advertising',
  website: 'Website & Landing Pages',
  ecommerce: 'E-Commerce',
  accounting: 'Accounting & Finance',
  communication: 'Communication',
  design: 'Design & Creative',
  automation: 'Automation',
};

export const toolLibrary: DiagnosticTool[] = [
  // CRM
  { id: 'salesforce', name: 'Salesforce', category: 'crm', icon: '☁️', description: 'Enterprise CRM platform', monthlyPrice: 75 },
  { id: 'hubspot-crm', name: 'HubSpot CRM', category: 'crm', icon: '🔶', description: 'Inbound marketing CRM', monthlyPrice: 45 },
  { id: 'pipedrive', name: 'Pipedrive', category: 'crm', icon: '🟢', description: 'Sales pipeline CRM', monthlyPrice: 15 },
  { id: 'close', name: 'Close', category: 'crm', icon: '📞', description: 'Inside sales CRM', monthlyPrice: 29 },
  { id: 'ghl', name: 'GoHighLevel', category: 'crm', icon: '🚀', description: 'All-in-one marketing CRM', monthlyPrice: 97 },

  // Email & Marketing
  { id: 'mailchimp', name: 'Mailchimp', category: 'email', icon: '🐵', description: 'Email marketing platform', monthlyPrice: 13 },
  { id: 'activecampaign', name: 'ActiveCampaign', category: 'email', icon: '⚡', description: 'Marketing automation & email', monthlyPrice: 29 },
  { id: 'convertkit', name: 'ConvertKit', category: 'email', icon: '✉️', description: 'Creator email platform', monthlyPrice: 15 },
  { id: 'constant-contact', name: 'Constant Contact', category: 'email', icon: '📧', description: 'Email & digital marketing', monthlyPrice: 12 },
  { id: 'klaviyo', name: 'Klaviyo', category: 'email', icon: '📬', description: 'E-commerce email & SMS', monthlyPrice: 20 },

  // Project Management
  { id: 'asana', name: 'Asana', category: 'project-management', icon: '🎯', description: 'Work management platform', monthlyPrice: 11 },
  { id: 'monday', name: 'Monday.com', category: 'project-management', icon: '📋', description: 'Work OS platform', monthlyPrice: 10 },
  { id: 'clickup', name: 'ClickUp', category: 'project-management', icon: '✅', description: 'Productivity platform', monthlyPrice: 7 },
  { id: 'trello', name: 'Trello', category: 'project-management', icon: '📌', description: 'Kanban project boards', monthlyPrice: 5 },
  { id: 'basecamp', name: 'Basecamp', category: 'project-management', icon: '🏕️', description: 'Team collaboration', monthlyPrice: 15 },
  { id: 'notion', name: 'Notion', category: 'project-management', icon: '📝', description: 'All-in-one workspace', monthlyPrice: 8 },

  // Analytics
  { id: 'google-analytics', name: 'Google Analytics', category: 'analytics', icon: '📊', description: 'Web analytics', monthlyPrice: 0 },
  { id: 'mixpanel', name: 'Mixpanel', category: 'analytics', icon: '📈', description: 'Product analytics', monthlyPrice: 25 },
  { id: 'hotjar', name: 'Hotjar', category: 'analytics', icon: '🔥', description: 'Heatmaps & recordings', monthlyPrice: 32 },
  { id: 'databox', name: 'Databox', category: 'analytics', icon: '📉', description: 'KPI dashboards', monthlyPrice: 47 },

  // Social Media
  { id: 'hootsuite', name: 'Hootsuite', category: 'social-media', icon: '🦉', description: 'Social media management', monthlyPrice: 49 },
  { id: 'buffer', name: 'Buffer', category: 'social-media', icon: '📱', description: 'Social publishing', monthlyPrice: 6 },
  { id: 'sprout-social', name: 'Sprout Social', category: 'social-media', icon: '🌱', description: 'Social media suite', monthlyPrice: 89 },
  { id: 'later', name: 'Later', category: 'social-media', icon: '📅', description: 'Visual social planner', monthlyPrice: 18 },

  // Advertising
  { id: 'google-ads', name: 'Google Ads', category: 'advertising', icon: '🎯', description: 'Search & display ads', monthlyPrice: 0 },
  { id: 'facebook-ads', name: 'Meta Ads', category: 'advertising', icon: '📘', description: 'Facebook & Instagram ads', monthlyPrice: 0 },
  { id: 'linkedin-ads', name: 'LinkedIn Ads', category: 'advertising', icon: '💼', description: 'B2B advertising', monthlyPrice: 0 },
  { id: 'tiktok-ads', name: 'TikTok Ads', category: 'advertising', icon: '🎵', description: 'Short-form video ads', monthlyPrice: 0 },

  // Website & Landing Pages
  { id: 'wordpress', name: 'WordPress', category: 'website', icon: '🌐', description: 'Content management system', monthlyPrice: 25 },
  { id: 'webflow', name: 'Webflow', category: 'website', icon: '🎨', description: 'Visual web builder', monthlyPrice: 14 },
  { id: 'squarespace', name: 'Squarespace', category: 'website', icon: '⬛', description: 'Website builder', monthlyPrice: 16 },
  { id: 'unbounce', name: 'Unbounce', category: 'website', icon: '🔗', description: 'Landing page builder', monthlyPrice: 74 },
  { id: 'leadpages', name: 'Leadpages', category: 'website', icon: '📄', description: 'Landing pages & popups', monthlyPrice: 37 },
  { id: 'clickfunnels', name: 'ClickFunnels', category: 'website', icon: '🔻', description: 'Sales funnel builder', monthlyPrice: 97 },

  // E-Commerce
  { id: 'shopify', name: 'Shopify', category: 'ecommerce', icon: '🛍️', description: 'E-commerce platform', monthlyPrice: 29 },
  { id: 'woocommerce', name: 'WooCommerce', category: 'ecommerce', icon: '🛒', description: 'WordPress e-commerce', monthlyPrice: 0 },
  { id: 'stripe', name: 'Stripe', category: 'ecommerce', icon: '💳', description: 'Payment processing', monthlyPrice: 0 },
  { id: 'gumroad', name: 'Gumroad', category: 'ecommerce', icon: '💰', description: 'Digital product sales', monthlyPrice: 0 },

  // Accounting & Finance
  { id: 'quickbooks', name: 'QuickBooks', category: 'accounting', icon: '📗', description: 'Accounting software', monthlyPrice: 25 },
  { id: 'xero', name: 'Xero', category: 'accounting', icon: '💙', description: 'Cloud accounting', monthlyPrice: 13 },
  { id: 'freshbooks', name: 'FreshBooks', category: 'accounting', icon: '📘', description: 'Invoicing & accounting', monthlyPrice: 15 },
  { id: 'wave', name: 'Wave', category: 'accounting', icon: '🌊', description: 'Free accounting', monthlyPrice: 0 },

  // Communication
  { id: 'slack', name: 'Slack', category: 'communication', icon: '💬', description: 'Team messaging', monthlyPrice: 7 },
  { id: 'zoom', name: 'Zoom', category: 'communication', icon: '📹', description: 'Video conferencing', monthlyPrice: 13 },
  { id: 'intercom', name: 'Intercom', category: 'communication', icon: '💁', description: 'Customer messaging', monthlyPrice: 39 },
  { id: 'calendly', name: 'Calendly', category: 'communication', icon: '📆', description: 'Scheduling platform', monthlyPrice: 8 },
  { id: 'loom', name: 'Loom', category: 'communication', icon: '🎥', description: 'Async video messaging', monthlyPrice: 12 },

  // Design & Creative
  { id: 'canva', name: 'Canva', category: 'design', icon: '🎨', description: 'Graphic design platform', monthlyPrice: 13 },
  { id: 'figma', name: 'Figma', category: 'design', icon: '✏️', description: 'UI/UX design tool', monthlyPrice: 12 },
  { id: 'adobe-cc', name: 'Adobe CC', category: 'design', icon: '🅰️', description: 'Creative suite', monthlyPrice: 55 },

  // Automation
  { id: 'zapier', name: 'Zapier', category: 'automation', icon: '⚡', description: 'App integration platform', monthlyPrice: 20 },
  { id: 'make', name: 'Make (Integromat)', category: 'automation', icon: '🔧', description: 'Visual automation', monthlyPrice: 9 },
  { id: 'pabbly', name: 'Pabbly Connect', category: 'automation', icon: '🔌', description: 'Budget automation', monthlyPrice: 15 },
];

// Helper to get a tool by ID
export function getToolById(id: string): DiagnosticTool | undefined {
  return toolLibrary.find(t => t.id === id);
}

// Helper to get tools by category
export function getToolsByCategory(category: ToolCategory): DiagnosticTool[] {
  return toolLibrary.filter(t => t.category === category);
}

// Get all categories that have tools
export function getCategories(): ToolCategory[] {
  const cats = new Set(toolLibrary.map(t => t.category));
  return Array.from(cats) as ToolCategory[];
}
