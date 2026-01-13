/**
 * Business Intelligence Summary Component
 * Admin component for displaying lead business intelligence
 */

'use client';

import React, { useState } from 'react';
import type { BusinessIntelligence } from '@/types/business-intelligence';

interface BusinessIntelligenceSummaryProps {
  businessIntelligence: BusinessIntelligence;
  readinessScore?: number;
  compact?: boolean;
}

export const BusinessIntelligenceSummary: React.FC<BusinessIntelligenceSummaryProps> = ({
  businessIntelligence: bi,
  readinessScore,
  compact = false,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const getQualityColor = (quality: string) => {
    const lowQualities = ['Poor', 'Weak', 'Low', 'None'];
    const highQualities = ['Excellent', 'Strong', 'High', 'Good', 'Advanced'];

    if (highQualities.includes(quality)) return 'text-green-400';
    if (lowQualities.includes(quality)) return 'text-red-400';
    return 'text-amber-400';
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-800 rounded-lg p-2">
            <div className="text-xs text-gray-500">Industry</div>
            <div className="text-sm font-medium text-white truncate">{bi.industry}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-2">
            <div className="text-xs text-gray-500">Business Model</div>
            <div className="text-sm font-medium text-white truncate">{bi.business_model}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-2">
            <div className="text-xs text-gray-500">Company Size</div>
            <div className="text-sm font-medium text-white truncate">{bi.company_size.employees}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-2">
            <div className="text-xs text-gray-500">Stage</div>
            <div className="text-sm font-medium text-white truncate">{bi.company_size.growth_stage}</div>
          </div>
        </div>

        {/* AI Score */}
        {readinessScore !== undefined && (
          <div className={`rounded-lg p-3 border ${getScoreColor(readinessScore)}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Readiness Score</span>
              <span className="text-xl font-bold">{readinessScore}/100</span>
            </div>
          </div>
        )}

        {/* Key Insights */}
        {bi.operations_insights.pain_points.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Key Pain Points</div>
            <ul className="space-y-1">
              {bi.operations_insights.pain_points.slice(0, 3).map((pain, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  {pain}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Score */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Business Intelligence</h3>
        {readinessScore !== undefined && (
          <div className={`px-4 py-2 rounded-lg border ${getScoreColor(readinessScore)}`}>
            <span className="text-sm">AI Readiness: </span>
            <span className="text-lg font-bold">{readinessScore}/100</span>
          </div>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Industry</div>
          <div className="font-medium text-white">{bi.industry}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Business Model</div>
          <div className="font-medium text-white">{bi.business_model}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Company Size</div>
          <div className="font-medium text-white">{bi.company_size.employees}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Revenue Range</div>
          <div className="font-medium text-white">{bi.company_size.revenue_range}</div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-2">
        {/* Target Audience */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('audience')}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <span className="font-medium text-white">Target Audience</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'audience' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === 'audience' && (
            <div className="p-4 bg-gray-900 space-y-2">
              <div>
                <span className="text-gray-500 text-sm">Primary: </span>
                <span className="text-white">{bi.target_audience.primary}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Demographics: </span>
                <span className="text-white">{bi.target_audience.demographics}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Psychographics: </span>
                <span className="text-white">{bi.target_audience.psychographics}</span>
              </div>
            </div>
          )}
        </div>

        {/* Technical Assessment */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('technical')}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <span className="font-medium text-white">Technical Assessment</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'technical' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === 'technical' && (
            <div className="p-4 bg-gray-900">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 text-sm block">Performance</span>
                  <span className={getQualityColor(bi.technical_assessment.performance)}>
                    {bi.technical_assessment.performance}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block">Security</span>
                  <span className={getQualityColor(bi.technical_assessment.security)}>
                    {bi.technical_assessment.security}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block">Accessibility</span>
                  <span className={getQualityColor(bi.technical_assessment.accessibility)}>
                    {bi.technical_assessment.accessibility}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block">Architecture</span>
                  <span className="text-white">{bi.technical_assessment.backend_architecture}</span>
                </div>
              </div>
              {bi.technical_assessment.integrations.length > 0 && (
                <div className="mt-4">
                  <span className="text-gray-500 text-sm block mb-2">Integrations</span>
                  <div className="flex flex-wrap gap-2">
                    {bi.technical_assessment.integrations.map((int, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                        {int}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI Readiness */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('ai')}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <span className="font-medium text-white">AI Readiness Details</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'ai' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === 'ai' && (
            <div className="p-4 bg-gray-900">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-gray-500 text-sm block">Data Infrastructure</span>
                  <span className={getQualityColor(bi.ai_readiness.data_infrastructure)}>
                    {bi.ai_readiness.data_infrastructure}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block">Automation Level</span>
                  <span className={getQualityColor(bi.ai_readiness.automation_level)}>
                    {bi.ai_readiness.automation_level}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block">Integration Readiness</span>
                  <span className={getQualityColor(bi.ai_readiness.integration_readiness)}>
                    {bi.ai_readiness.integration_readiness}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block">Content Needs</span>
                  <span className={getQualityColor(bi.ai_readiness.content_generation_needs)}>
                    {bi.ai_readiness.content_generation_needs}
                  </span>
                </div>
              </div>
              {bi.ai_readiness.current_ai_usage.length > 0 && (
                <div className="mb-4">
                  <span className="text-gray-500 text-sm block mb-2">Current AI Usage</span>
                  <div className="flex flex-wrap gap-2">
                    {bi.ai_readiness.current_ai_usage.map((usage, i) => (
                      <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        {usage}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {bi.ai_readiness.customer_intelligence_gaps.length > 0 && (
                <div>
                  <span className="text-gray-500 text-sm block mb-2">Intelligence Gaps</span>
                  <div className="flex flex-wrap gap-2">
                    {bi.ai_readiness.customer_intelligence_gaps.map((gap, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs">
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Operations Insights */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('operations')}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <span className="font-medium text-white">Operations Insights</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'operations' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === 'operations' && (
            <div className="p-4 bg-gray-900 space-y-4">
              {bi.operations_insights.pain_points.length > 0 && (
                <div>
                  <span className="text-gray-500 text-sm block mb-2">Pain Points</span>
                  <ul className="space-y-1">
                    {bi.operations_insights.pain_points.map((point, i) => (
                      <li key={i} className="text-red-400 text-sm flex items-start gap-2">
                        <span className="mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {bi.operations_insights.efficiency_opportunities.length > 0 && (
                <div>
                  <span className="text-gray-500 text-sm block mb-2">Efficiency Opportunities</span>
                  <ul className="space-y-1">
                    {bi.operations_insights.efficiency_opportunities.map((opp, i) => (
                      <li key={i} className="text-green-400 text-sm flex items-start gap-2">
                        <span className="mt-1">•</span>
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {bi.operations_insights.growth_indicators.length > 0 && (
                <div>
                  <span className="text-gray-500 text-sm block mb-2">Growth Indicators</span>
                  <ul className="space-y-1">
                    {bi.operations_insights.growth_indicators.map((ind, i) => (
                      <li key={i} className="text-amber-400 text-sm flex items-start gap-2">
                        <span className="mt-1">•</span>
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Value Proposition */}
        {bi.value_proposition.length > 0 && (
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('value')}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
            >
              <span className="font-medium text-white">Value Proposition</span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'value' ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSection === 'value' && (
              <div className="p-4 bg-gray-900">
                <ul className="space-y-2">
                  {bi.value_proposition.map((value, i) => (
                    <li key={i} className="text-white text-sm flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      {value}
                    </li>
                  ))}
                </ul>
                {bi.competitive_positioning && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-gray-500 text-sm block mb-1">Market Position</span>
                    <span className="text-white">{bi.competitive_positioning}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Analysis Metadata */}
      {bi.analysis_metadata && (
        <div className="text-xs text-gray-500 flex items-center gap-4 pt-2 border-t border-gray-800">
          <span>Analyzed: {new Date(bi.analysis_metadata.analyzed_at).toLocaleDateString()}</span>
          <span>Confidence: {Math.round(bi.analysis_metadata.confidence_score * 100)}%</span>
          <span>Pages: {bi.analysis_metadata.pages_analyzed}</span>
        </div>
      )}
    </div>
  );
};

export default BusinessIntelligenceSummary;
