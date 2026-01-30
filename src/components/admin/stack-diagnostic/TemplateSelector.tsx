/**
 * Template Selector - Step 1
 * Grid of industry template cards with optional lead selector
 */

'use client';

import React, { useState, useEffect } from 'react';
import type { IndustryTemplate } from '@/types/stack-diagnostic';
import { industryTemplates } from '@/lib/stack-diagnostic';
import { useAuthFetch } from '@/hooks/useAuthFetch';

interface TemplateSelectorProps {
  onSelect: (template: IndustryTemplate) => void;
  selectedLeadId: string | null;
  onLeadSelect: (leadId: string | null) => void;
}

interface LeadOption {
  id: string;
  name: string;
  email: string;
  company: string | null;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelect,
  selectedLeadId,
  onLeadSelect,
}) => {
  const { authFetch } = useAuthFetch();
  const [leads, setLeads] = useState<LeadOption[]>([]);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await authFetch('/api/admin/leads');
        const result = await response.json();
        if (result.data) {
          setLeads(
            result.data.map((l: { id: string; name: string; email: string; company: string | null }) => ({
              id: l.id,
              name: l.name,
              email: l.email,
              company: l.company,
            }))
          );
        }
      } catch {
        // Leads are optional, don't block on failure
      }
    };
    fetchLeads();
  }, [authFetch]);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-2">
          Select Industry Template
        </h2>
        <p className="text-text-secondary text-sm">
          Choose a template to pre-populate common tools, or start from scratch with Custom.
        </p>
      </div>

      {/* Optional lead selector */}
      {leads.length > 0 && (
        <div className="mb-6">
          <label className="block text-xs font-mono tracking-widest text-text-muted uppercase mb-2">
            Link to Prospect (Optional)
          </label>
          <select
            value={selectedLeadId || ''}
            onChange={(e) => onLeadSelect(e.target.value || null)}
            className="w-full md:w-80 bg-depth-elevated border border-depth-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-radiance-gold/50"
          >
            <option value="">No prospect linked</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name} {lead.company ? `(${lead.company})` : ''} - {lead.email}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industryTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            className={`relative text-left p-5 rounded-xl border transition-all duration-200 group ${
              hoveredTemplate === template.id
                ? 'bg-radiance-gold/5 border-radiance-gold/30 shadow-lg shadow-radiance-gold/5'
                : 'bg-depth-surface border-depth-border hover:border-depth-border/80'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{template.icon}</span>
              <div>
                <h3 className="font-semibold text-text-primary group-hover:text-radiance-gold transition-colors">
                  {template.name}
                </h3>
                <p className="text-xs text-text-muted mt-1 line-clamp-2">
                  {template.description}
                </p>
              </div>
            </div>

            {template.defaultTools.length > 0 && (
              <div className="mt-3 pt-3 border-t border-depth-border">
                <p className="text-[10px] font-mono tracking-widest text-text-muted uppercase mb-1.5">
                  {template.defaultTools.length} Default Tools
                </p>
                <p className="text-xs text-text-secondary line-clamp-1">
                  {template.painPoints[0]?.replace(/"/g, '')}
                </p>
              </div>
            )}

            {template.id === 'custom' && (
              <div className="mt-3 pt-3 border-t border-depth-border">
                <p className="text-xs text-text-secondary">
                  Start with a blank canvas and add tools manually.
                </p>
              </div>
            )}

            {/* Hover arrow */}
            <div className={`absolute top-5 right-4 transition-opacity ${
              hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
            }`}>
              <svg className="w-4 h-4 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
