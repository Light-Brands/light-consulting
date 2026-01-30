/**
 * Industry Templates for Stack Diagnostic
 * 6 templates with default tools, connections, pain points, and solutions
 */

import type { IndustryTemplate, ConnectionType } from '@/types/stack-diagnostic';

export const industryTemplates: IndustryTemplate[] = [
  {
    id: 'agency',
    name: 'Marketing Agency',
    description: 'Digital agencies managing multiple client accounts, campaigns, and deliverables',
    icon: '🏢',
    defaultTools: [
      'hubspot-crm', 'mailchimp', 'asana', 'google-analytics', 'hootsuite',
      'google-ads', 'facebook-ads', 'wordpress', 'slack', 'canva',
      'quickbooks', 'calendly', 'zapier',
    ],
    defaultConnections: [
      { sourceToolId: 'hubspot-crm', targetToolId: 'mailchimp', connectionType: 'zapier' },
      { sourceToolId: 'google-analytics', targetToolId: 'google-ads', connectionType: 'native' },
      { sourceToolId: 'facebook-ads', targetToolId: 'hubspot-crm', connectionType: 'zapier' },
      { sourceToolId: 'hootsuite', targetToolId: 'canva', connectionType: 'manual' },
      { sourceToolId: 'asana', targetToolId: 'slack', connectionType: 'native' },
      { sourceToolId: 'hubspot-crm', targetToolId: 'quickbooks', connectionType: 'manual' },
      { sourceToolId: 'wordpress', targetToolId: 'google-analytics', connectionType: 'native' },
      { sourceToolId: 'calendly', targetToolId: 'hubspot-crm', connectionType: 'zapier' },
    ],
    painPoints: [
      '"We spend hours copying data between our CRM and project management tool."',
      '"Our ad spend data lives in 3 different dashboards - we never get the full picture."',
      '"Client reporting takes a full day because we pull from 6 different tools."',
      '"Leads fall through the cracks between our ad platforms and CRM."',
    ],
    solution: {
      name: 'Unified Agency Platform',
      description: 'A centralized hub connecting client management, campaign execution, and reporting in one flow',
      hub: {
        name: 'Central Command',
        features: ['Unified client dashboard', 'Cross-platform reporting', 'Automated lead routing', 'Campaign orchestration'],
        icon: '🎯',
      },
      satellites: [
        { id: 'client-portal', name: 'Client Portal', replaces: ['Asana', 'Slack', 'Calendly'], features: ['Real-time updates', 'Approval workflows', 'Scheduling'], icon: '👥' },
        { id: 'campaign-engine', name: 'Campaign Engine', replaces: ['Hootsuite', 'Google Ads', 'Meta Ads'], features: ['Cross-channel campaigns', 'Budget optimization', 'Auto-reporting'], icon: '📡' },
        { id: 'content-studio', name: 'Content Studio', replaces: ['Canva', 'WordPress'], features: ['Brand templates', 'Asset library', 'Multi-channel publish'], icon: '🎨' },
        { id: 'revenue-ops', name: 'Revenue Ops', replaces: ['QuickBooks', 'Mailchimp'], features: ['Client billing', 'Revenue attribution', 'Email automation'], icon: '💰' },
      ],
      stats: {
        toolsSiloed: 0,
        dataLostPercent: 2,
        manualHoursPerWeek: 3,
        leadsLostPercent: 2,
        monthlySavings: 850,
      },
    },
  },
  {
    id: 'vc-fund',
    name: 'VC / Investment Fund',
    description: 'Venture capital firms tracking deal flow, portfolio, and LP communications',
    icon: '💎',
    defaultTools: [
      'salesforce', 'mailchimp', 'notion', 'google-analytics',
      'linkedin-ads', 'slack', 'zoom', 'calendly',
      'quickbooks', 'canva', 'zapier',
    ],
    defaultConnections: [
      { sourceToolId: 'salesforce', targetToolId: 'mailchimp', connectionType: 'zapier' },
      { sourceToolId: 'linkedin-ads', targetToolId: 'salesforce', connectionType: 'manual' },
      { sourceToolId: 'notion', targetToolId: 'salesforce', connectionType: 'manual' },
      { sourceToolId: 'calendly', targetToolId: 'salesforce', connectionType: 'zapier' },
      { sourceToolId: 'slack', targetToolId: 'zoom', connectionType: 'native' },
      { sourceToolId: 'salesforce', targetToolId: 'quickbooks', connectionType: 'manual' },
    ],
    painPoints: [
      '"Our deal flow tracking is split between Salesforce and Notion spreadsheets."',
      '"LP reporting takes a week because data is scattered across systems."',
      '"We lose track of portfolio company updates because there is no central feed."',
      '"Our team duplicates data entry between our CRM and internal notes."',
    ],
    solution: {
      name: 'Unified Fund Platform',
      description: 'A single source of truth for deal flow, portfolio management, and LP relations',
      hub: {
        name: 'Fund HQ',
        features: ['Deal flow pipeline', 'Portfolio dashboard', 'LP reporting', 'Team collaboration'],
        icon: '🏛️',
      },
      satellites: [
        { id: 'deal-flow', name: 'Deal Flow', replaces: ['Salesforce', 'LinkedIn Ads'], features: ['Inbound tracking', 'Scoring', 'Outreach automation'], icon: '📥' },
        { id: 'portfolio-mgmt', name: 'Portfolio Manager', replaces: ['Notion', 'Google Analytics'], features: ['KPI tracking', 'Update collection', 'Benchmark data'], icon: '📊' },
        { id: 'lp-comms', name: 'LP Communications', replaces: ['Mailchimp', 'QuickBooks'], features: ['Quarterly reports', 'Capital calls', 'Distribution tracking'], icon: '📨' },
        { id: 'team-hub', name: 'Team Hub', replaces: ['Slack', 'Zoom', 'Calendly'], features: ['Meeting notes', 'IC voting', 'Calendar sync'], icon: '🤝' },
      ],
      stats: {
        toolsSiloed: 0,
        dataLostPercent: 1,
        manualHoursPerWeek: 4,
        leadsLostPercent: 3,
        monthlySavings: 620,
      },
    },
  },
  {
    id: 'accelerator',
    name: 'Startup Accelerator',
    description: 'Accelerator programs managing cohorts, mentors, and demo days',
    icon: '🚀',
    defaultTools: [
      'hubspot-crm', 'activecampaign', 'monday', 'google-analytics',
      'buffer', 'facebook-ads', 'webflow', 'slack', 'zoom',
      'calendly', 'canva', 'zapier', 'stripe',
    ],
    defaultConnections: [
      { sourceToolId: 'hubspot-crm', targetToolId: 'activecampaign', connectionType: 'native' },
      { sourceToolId: 'webflow', targetToolId: 'hubspot-crm', connectionType: 'zapier' },
      { sourceToolId: 'facebook-ads', targetToolId: 'hubspot-crm', connectionType: 'zapier' },
      { sourceToolId: 'monday', targetToolId: 'slack', connectionType: 'native' },
      { sourceToolId: 'calendly', targetToolId: 'hubspot-crm', connectionType: 'zapier' },
      { sourceToolId: 'stripe', targetToolId: 'hubspot-crm', connectionType: 'manual' },
      { sourceToolId: 'zoom', targetToolId: 'calendly', connectionType: 'native' },
    ],
    painPoints: [
      '"Application tracking is a mess - we use forms, email, and spreadsheets."',
      '"Mentor matching is entirely manual and takes hours each cohort."',
      '"We can\'t easily show startups their progress metrics in one place."',
      '"Demo day prep involves copying data from 5 different systems."',
    ],
    solution: {
      name: 'Unified Accelerator Platform',
      description: 'End-to-end cohort management from applications through demo day and alumni tracking',
      hub: {
        name: 'Accelerator OS',
        features: ['Cohort management', 'Application pipeline', 'Progress tracking', 'Demo day prep'],
        icon: '🎯',
      },
      satellites: [
        { id: 'applications', name: 'Applications', replaces: ['HubSpot CRM', 'Webflow'], features: ['Smart forms', 'Auto-scoring', 'Pipeline view'], icon: '📝' },
        { id: 'cohort-mgmt', name: 'Cohort Manager', replaces: ['Monday.com', 'Slack'], features: ['Milestone tracking', 'Mentor matching', 'Curriculum'], icon: '👥' },
        { id: 'comms-engine', name: 'Comms Engine', replaces: ['ActiveCampaign', 'Buffer', 'Meta Ads'], features: ['Automated updates', 'Social proof', 'Alumni network'], icon: '📡' },
        { id: 'payments', name: 'Payments & Equity', replaces: ['Stripe', 'Canva'], features: ['Fee collection', 'SAFE tracking', 'Branded reports'], icon: '💳' },
      ],
      stats: {
        toolsSiloed: 0,
        dataLostPercent: 3,
        manualHoursPerWeek: 5,
        leadsLostPercent: 4,
        monthlySavings: 540,
      },
    },
  },
  {
    id: 'service-business',
    name: 'Service Business',
    description: 'Professional services, consultants, and freelancers managing clients and projects',
    icon: '💼',
    defaultTools: [
      'pipedrive', 'mailchimp', 'clickup', 'google-analytics',
      'wordpress', 'slack', 'zoom', 'calendly',
      'freshbooks', 'canva', 'loom',
    ],
    defaultConnections: [
      { sourceToolId: 'pipedrive', targetToolId: 'mailchimp', connectionType: 'zapier' },
      { sourceToolId: 'wordpress', targetToolId: 'google-analytics', connectionType: 'native' },
      { sourceToolId: 'calendly', targetToolId: 'pipedrive', connectionType: 'zapier' },
      { sourceToolId: 'clickup', targetToolId: 'slack', connectionType: 'native' },
      { sourceToolId: 'pipedrive', targetToolId: 'freshbooks', connectionType: 'manual' },
      { sourceToolId: 'zoom', targetToolId: 'calendly', connectionType: 'native' },
    ],
    painPoints: [
      '"I manually copy client info from my CRM to my invoicing tool every time."',
      '"Project updates live in Slack threads that get lost after a week."',
      '"I have no idea which marketing channel actually brings in clients."',
      '"Onboarding a new client involves 8 different tools and takes hours."',
    ],
    solution: {
      name: 'Unified Service Platform',
      description: 'Streamlined client lifecycle from lead capture through delivery and billing',
      hub: {
        name: 'Service Hub',
        features: ['Client lifecycle view', 'Pipeline to project handoff', 'Time & billing', 'Client portal'],
        icon: '🎯',
      },
      satellites: [
        { id: 'sales-pipeline', name: 'Sales Pipeline', replaces: ['Pipedrive', 'Calendly'], features: ['Lead capture', 'Proposals', 'Auto-scheduling'], icon: '📊' },
        { id: 'project-delivery', name: 'Project Delivery', replaces: ['ClickUp', 'Loom'], features: ['Task management', 'Client updates', 'File sharing'], icon: '📋' },
        { id: 'marketing-hub', name: 'Marketing Hub', replaces: ['Mailchimp', 'WordPress', 'Canva'], features: ['Email campaigns', 'Landing pages', 'Lead magnets'], icon: '📣' },
        { id: 'finance', name: 'Finance', replaces: ['FreshBooks'], features: ['Auto-invoicing', 'Expense tracking', 'Revenue reports'], icon: '💰' },
      ],
      stats: {
        toolsSiloed: 0,
        dataLostPercent: 2,
        manualHoursPerWeek: 2,
        leadsLostPercent: 3,
        monthlySavings: 380,
      },
    },
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Brand',
    description: 'Online stores managing products, orders, marketing, and customer relationships',
    icon: '🛍️',
    defaultTools: [
      'shopify', 'klaviyo', 'google-analytics', 'facebook-ads', 'google-ads',
      'hootsuite', 'canva', 'stripe', 'quickbooks',
      'intercom', 'hotjar', 'zapier',
    ],
    defaultConnections: [
      { sourceToolId: 'shopify', targetToolId: 'klaviyo', connectionType: 'native' },
      { sourceToolId: 'shopify', targetToolId: 'google-analytics', connectionType: 'native' },
      { sourceToolId: 'facebook-ads', targetToolId: 'shopify', connectionType: 'native' },
      { sourceToolId: 'google-ads', targetToolId: 'google-analytics', connectionType: 'native' },
      { sourceToolId: 'shopify', targetToolId: 'stripe', connectionType: 'native' },
      { sourceToolId: 'stripe', targetToolId: 'quickbooks', connectionType: 'zapier' },
      { sourceToolId: 'shopify', targetToolId: 'intercom', connectionType: 'zapier' },
      { sourceToolId: 'hotjar', targetToolId: 'google-analytics', connectionType: 'manual' },
      { sourceToolId: 'hootsuite', targetToolId: 'canva', connectionType: 'manual' },
    ],
    painPoints: [
      '"Our customer data is split between Shopify, Klaviyo, and Intercom."',
      '"We can\'t connect ad spend to actual revenue without manual spreadsheets."',
      '"Inventory syncing between channels is a daily headache."',
      '"Customer support doesn\'t have order context so they ask customers to repeat info."',
    ],
    solution: {
      name: 'Unified Commerce Platform',
      description: 'Integrated commerce stack connecting storefront, marketing, and operations',
      hub: {
        name: 'Commerce HQ',
        features: ['Unified customer profiles', 'Revenue attribution', 'Inventory sync', 'Order management'],
        icon: '🏪',
      },
      satellites: [
        { id: 'storefront', name: 'Storefront', replaces: ['Shopify', 'Stripe'], features: ['Product management', 'Checkout', 'Subscriptions'], icon: '🛒' },
        { id: 'marketing-engine', name: 'Marketing Engine', replaces: ['Klaviyo', 'Meta Ads', 'Google Ads'], features: ['Email/SMS', 'Retargeting', 'Loyalty programs'], icon: '📣' },
        { id: 'analytics-hub', name: 'Analytics Hub', replaces: ['Google Analytics', 'Hotjar'], features: ['Revenue analytics', 'Customer journeys', 'A/B testing'], icon: '📊' },
        { id: 'support', name: 'Support Center', replaces: ['Intercom', 'Hootsuite'], features: ['Order-aware support', 'Social inbox', 'Self-service'], icon: '🎧' },
      ],
      stats: {
        toolsSiloed: 0,
        dataLostPercent: 1,
        manualHoursPerWeek: 4,
        leadsLostPercent: 5,
        monthlySavings: 720,
      },
    },
  },
  {
    id: 'custom',
    name: 'Custom Stack',
    description: 'Start from scratch and build a custom tech stack for any business type',
    icon: '🔧',
    defaultTools: [],
    defaultConnections: [],
    painPoints: [
      '"We know something is broken but can\'t pinpoint what."',
      '"Our tools don\'t talk to each other."',
      '"We\'re paying for features we don\'t use."',
    ],
    solution: {
      name: 'Custom Integrated Solution',
      description: 'A tailored solution designed around your specific business needs',
      hub: {
        name: 'Your Platform',
        features: ['Custom workflows', 'Unified data', 'Automated handoffs', 'Single dashboard'],
        icon: '⚙️',
      },
      satellites: [
        { id: 'custom-1', name: 'Module 1', replaces: [], features: ['Customized to your needs'], icon: '🔷' },
        { id: 'custom-2', name: 'Module 2', replaces: [], features: ['Customized to your needs'], icon: '🔶' },
        { id: 'custom-3', name: 'Module 3', replaces: [], features: ['Customized to your needs'], icon: '🟢' },
      ],
      stats: {
        toolsSiloed: 0,
        dataLostPercent: 2,
        manualHoursPerWeek: 3,
        leadsLostPercent: 3,
        monthlySavings: 500,
      },
    },
  },
];

export function getTemplateById(id: string): IndustryTemplate | undefined {
  return industryTemplates.find(t => t.id === id);
}
