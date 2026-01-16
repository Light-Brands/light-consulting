/**
 * Business Intelligence Summary Component
 * Admin component for displaying lead business intelligence
 * Handles missing/unknown data gracefully
 */

'use client';

import React, { useState, useMemo } from 'react';
import type { BusinessIntelligence } from '@/types/business-intelligence';

interface BusinessIntelligenceSummaryProps {
  businessIntelligence: BusinessIntelligence | null | undefined;
  readinessScore?: number;
  compact?: boolean;
}

// Helper to check if a value is meaningful (not Unknown/empty)
const isValidValue = (value: string | undefined | null): boolean => {
  if (!value) return false;
  const invalidValues = ['Unknown', 'unknown', 'N/A', 'n/a', '', 'None', 'none'];
  return !invalidValues.includes(value.trim());
};

// Helper to check if an array has valid items
const hasValidItems = (arr: string[] | undefined | null): boolean => {
  if (!arr || arr.length === 0) return false;
  return arr.some(item => isValidValue(item));
};

// Get display value or fallback
const getDisplayValue = (value: string | undefined | null, fallback: string = 'Not detected'): string => {
  return isValidValue(value) ? value! : fallback;
};

export const BusinessIntelligenceSummary: React.FC<BusinessIntelligenceSummaryProps> = ({
  businessIntelligence: bi,
  readinessScore,
  compact = false,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Calculate data completeness
  const dataCompleteness = useMemo(() => {
    if (!bi) return { score: 0, label: 'No Data', color: 'text-gray-500' };

    let validFields = 0;
    let totalFields = 0;

    // Check core fields
    const coreFields = [bi.industry, bi.business_model, bi.revenue_model];
    totalFields += coreFields.length;
    validFields += coreFields.filter(isValidValue).length;

    // Check company size
    if (bi.company_size) {
      totalFields += 3;
      if (isValidValue(bi.company_size.employees)) validFields++;
      if (isValidValue(bi.company_size.revenue_range)) validFields++;
      if (isValidValue(bi.company_size.growth_stage)) validFields++;
    }

    // Check target audience
    if (bi.target_audience) {
      totalFields += 2;
      if (isValidValue(bi.target_audience.primary)) validFields++;
      if (isValidValue(bi.target_audience.demographics)) validFields++;
    }

    // Check arrays
    if (hasValidItems(bi.value_proposition)) validFields++;
    totalFields++;

    if (hasValidItems(bi.operations_insights?.pain_points)) validFields++;
    totalFields++;

    if (hasValidItems(bi.operations_insights?.efficiency_opportunities)) validFields++;
    totalFields++;

    const score = Math.round((validFields / totalFields) * 100);

    if (score >= 70) return { score, label: 'Rich Data', color: 'text-green-400' };
    if (score >= 40) return { score, label: 'Partial Data', color: 'text-amber-400' };
    return { score, label: 'Limited Data', color: 'text-red-400' };
  }, [bi]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const getQualityColor = (quality: string | undefined) => {
    if (!quality || !isValidValue(quality)) return 'text-gray-500';
    const lowQualities = ['Poor', 'Weak', 'Low', 'None'];
    const highQualities = ['Excellent', 'Strong', 'High', 'Good', 'Advanced'];

    if (highQualities.includes(quality)) return 'text-green-400';
    if (lowQualities.includes(quality)) return 'text-red-400';
    return 'text-amber-400';
  };

  // No business intelligence data
  if (!bi) {
    return (
      <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
        <svg className="w-12 h-12 mx-auto text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p className="text-gray-400 text-sm mb-2">No Business Intelligence</p>
        <p className="text-gray-500 text-xs">
          This lead was created before AI analysis was enabled, or the analysis is still processing.
        </p>
      </div>
    );
  }

  // Compact mode for sidebar
  if (compact) {
    return (
      <div className="space-y-3">
        {/* Data Quality Indicator */}
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-xs text-gray-500">Data Quality</span>
          <span className={`text-xs font-medium ${dataCompleteness.color}`}>
            {dataCompleteness.label} ({dataCompleteness.score}%)
          </span>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-2">
          {isValidValue(bi.industry) && (
            <div className="bg-gray-800 rounded-lg p-2">
              <div className="text-xs text-gray-500">Industry</div>
              <div className="text-sm font-medium text-white truncate">{bi.industry}</div>
            </div>
          )}
          {isValidValue(bi.business_model) && (
            <div className="bg-gray-800 rounded-lg p-2">
              <div className="text-xs text-gray-500">Business Model</div>
              <div className="text-sm font-medium text-white truncate">{bi.business_model}</div>
            </div>
          )}
          {isValidValue(bi.company_size?.employees) && (
            <div className="bg-gray-800 rounded-lg p-2">
              <div className="text-xs text-gray-500">Company Size</div>
              <div className="text-sm font-medium text-white truncate">{bi.company_size.employees}</div>
            </div>
          )}
          {isValidValue(bi.company_size?.growth_stage) && (
            <div className="bg-gray-800 rounded-lg p-2">
              <div className="text-xs text-gray-500">Stage</div>
              <div className="text-sm font-medium text-white truncate">{bi.company_size.growth_stage}</div>
            </div>
          )}
        </div>

        {/* Fallback if no valid core data */}
        {!isValidValue(bi.industry) && !isValidValue(bi.business_model) && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
            <p className="text-amber-400 text-xs">Limited business data available</p>
          </div>
        )}

        {/* AI Score */}
        {readinessScore !== undefined && (
          <div className={`rounded-lg p-3 border ${getScoreColor(readinessScore)}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Readiness</span>
              <span className="text-xl font-bold">{readinessScore}/100</span>
            </div>
          </div>
        )}

        {/* Key Insights */}
        {hasValidItems(bi.operations_insights?.pain_points) && (
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Key Pain Points</div>
            <ul className="space-y-1">
              {bi.operations_insights.pain_points.filter(isValidValue).slice(0, 3).map((pain, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  {pain}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Efficiency Opportunities if no pain points */}
        {!hasValidItems(bi.operations_insights?.pain_points) && hasValidItems(bi.operations_insights?.efficiency_opportunities) && (
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Opportunities</div>
            <ul className="space-y-1">
              {bi.operations_insights.efficiency_opportunities.filter(isValidValue).slice(0, 3).map((opp, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Full display mode
  return (
    <div className="space-y-4">
      {/* Header with Score and Data Quality */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">Business Intelligence</h3>
          <span className={`text-xs px-2 py-1 rounded-full bg-gray-800 ${dataCompleteness.color}`}>
            {dataCompleteness.label}
          </span>
        </div>
        {readinessScore !== undefined && (
          <div className={`px-4 py-2 rounded-lg border ${getScoreColor(readinessScore)}`}>
            <span className="text-sm">AI Readiness: </span>
            <span className="text-lg font-bold">{readinessScore}/100</span>
          </div>
        )}
      </div>

      {/* Overview Cards - Only show cards with valid data */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Industry</div>
          <div className={`font-medium ${isValidValue(bi.industry) ? 'text-white' : 'text-gray-600 italic'}`}>
            {getDisplayValue(bi.industry)}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Business Model</div>
          <div className={`font-medium ${isValidValue(bi.business_model) ? 'text-white' : 'text-gray-600 italic'}`}>
            {getDisplayValue(bi.business_model)}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Company Size</div>
          <div className={`font-medium ${isValidValue(bi.company_size?.employees) ? 'text-white' : 'text-gray-600 italic'}`}>
            {getDisplayValue(bi.company_size?.employees)}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Revenue Range</div>
          <div className={`font-medium ${isValidValue(bi.company_size?.revenue_range) ? 'text-white' : 'text-gray-600 italic'}`}>
            {getDisplayValue(bi.company_size?.revenue_range)}
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-2">
        {/* Target Audience - only show if has data */}
        {(isValidValue(bi.target_audience?.primary) || isValidValue(bi.target_audience?.demographics)) && (
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
                {isValidValue(bi.target_audience?.primary) && (
                  <div>
                    <span className="text-gray-500 text-sm">Primary: </span>
                    <span className="text-white">{bi.target_audience.primary}</span>
                  </div>
                )}
                {isValidValue(bi.target_audience?.demographics) && (
                  <div>
                    <span className="text-gray-500 text-sm">Demographics: </span>
                    <span className="text-white">{bi.target_audience.demographics}</span>
                  </div>
                )}
                {isValidValue(bi.target_audience?.psychographics) && (
                  <div>
                    <span className="text-gray-500 text-sm">Psychographics: </span>
                    <span className="text-white">{bi.target_audience.psychographics}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Technical Assessment */}
        {bi.technical_assessment && (
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
                      {bi.technical_assessment.performance || 'Not assessed'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block">Security</span>
                    <span className={getQualityColor(bi.technical_assessment.security)}>
                      {bi.technical_assessment.security || 'Not assessed'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block">Accessibility</span>
                    <span className={getQualityColor(bi.technical_assessment.accessibility)}>
                      {bi.technical_assessment.accessibility || 'Not assessed'}
                    </span>
                  </div>
                  {isValidValue(bi.technical_assessment.backend_architecture) && (
                    <div>
                      <span className="text-gray-500 text-sm block">Architecture</span>
                      <span className="text-white">{bi.technical_assessment.backend_architecture}</span>
                    </div>
                  )}
                </div>
                {hasValidItems(bi.technical_assessment.integrations) && (
                  <div className="mt-4">
                    <span className="text-gray-500 text-sm block mb-2">Integrations</span>
                    <div className="flex flex-wrap gap-2">
                      {bi.technical_assessment.integrations.filter(isValidValue).map((int, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {hasValidItems(bi.technical_assessment.monitoring_tools) && (
                  <div className="mt-4">
                    <span className="text-gray-500 text-sm block mb-2">Monitoring & Analytics</span>
                    <div className="flex flex-wrap gap-2">
                      {bi.technical_assessment.monitoring_tools.filter(isValidValue).map((tool, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* AI Readiness */}
        {bi.ai_readiness && (
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('ai')}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-white">AI Readiness Details</span>
                <span className={`text-xs px-2 py-0.5 rounded ${getScoreColor(bi.ai_readiness.overall_score || 0)}`}>
                  {bi.ai_readiness.overall_score || 0}/100
                </span>
              </div>
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
                      {bi.ai_readiness.data_infrastructure || 'Not assessed'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block">Automation Level</span>
                    <span className={getQualityColor(bi.ai_readiness.automation_level)}>
                      {bi.ai_readiness.automation_level || 'Not assessed'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block">Integration Readiness</span>
                    <span className={getQualityColor(bi.ai_readiness.integration_readiness)}>
                      {bi.ai_readiness.integration_readiness || 'Not assessed'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block">Content Needs</span>
                    <span className={getQualityColor(bi.ai_readiness.content_generation_needs)}>
                      {bi.ai_readiness.content_generation_needs || 'Not assessed'}
                    </span>
                  </div>
                </div>
                {hasValidItems(bi.ai_readiness.current_ai_usage) && (
                  <div className="mb-4">
                    <span className="text-gray-500 text-sm block mb-2">Current AI Usage</span>
                    <div className="flex flex-wrap gap-2">
                      {bi.ai_readiness.current_ai_usage.filter(isValidValue).map((usage, i) => (
                        <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                          {usage}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {hasValidItems(bi.ai_readiness.customer_intelligence_gaps) && (
                  <div>
                    <span className="text-gray-500 text-sm block mb-2">Intelligence Gaps</span>
                    <div className="flex flex-wrap gap-2">
                      {bi.ai_readiness.customer_intelligence_gaps.filter(isValidValue).map((gap, i) => (
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
        )}

        {/* Operations Insights */}
        {bi.operations_insights && (hasValidItems(bi.operations_insights.pain_points) || hasValidItems(bi.operations_insights.efficiency_opportunities)) && (
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
                {hasValidItems(bi.operations_insights.pain_points) && (
                  <div>
                    <span className="text-gray-500 text-sm block mb-2">Pain Points</span>
                    <ul className="space-y-1">
                      {bi.operations_insights.pain_points.filter(isValidValue).map((point, i) => (
                        <li key={i} className="text-red-400 text-sm flex items-start gap-2">
                          <span className="mt-1">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasValidItems(bi.operations_insights.efficiency_opportunities) && (
                  <div>
                    <span className="text-gray-500 text-sm block mb-2">Efficiency Opportunities</span>
                    <ul className="space-y-1">
                      {bi.operations_insights.efficiency_opportunities.filter(isValidValue).map((opp, i) => (
                        <li key={i} className="text-green-400 text-sm flex items-start gap-2">
                          <span className="mt-1">•</span>
                          {opp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasValidItems(bi.operations_insights.growth_indicators) && (
                  <div>
                    <span className="text-gray-500 text-sm block mb-2">Growth Indicators</span>
                    <ul className="space-y-1">
                      {bi.operations_insights.growth_indicators.filter(isValidValue).map((ind, i) => (
                        <li key={i} className="text-amber-400 text-sm flex items-start gap-2">
                          <span className="mt-1">•</span>
                          {ind}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasValidItems(bi.operations_insights.customer_journey_gaps) && (
                  <div>
                    <span className="text-gray-500 text-sm block mb-2">Customer Journey Gaps</span>
                    <ul className="space-y-1">
                      {bi.operations_insights.customer_journey_gaps.filter(isValidValue).map((gap, i) => (
                        <li key={i} className="text-purple-400 text-sm flex items-start gap-2">
                          <span className="mt-1">•</span>
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Value Proposition */}
        {hasValidItems(bi.value_proposition) && (
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
                  {bi.value_proposition.filter(isValidValue).map((value, i) => (
                    <li key={i} className="text-white text-sm flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      {value}
                    </li>
                  ))}
                </ul>
                {isValidValue(bi.competitive_positioning) && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-gray-500 text-sm block mb-1">Market Position</span>
                    <span className="text-white">{bi.competitive_positioning}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Digital Presence */}
        {bi.digital_presence && (
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('digital')}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
            >
              <span className="font-medium text-white">Digital Presence</span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'digital' ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSection === 'digital' && (
              <div className="p-4 bg-gray-900">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-500 text-sm block">Content Quality</span>
                    <span className={getQualityColor(bi.digital_presence.content_quality)}>
                      {bi.digital_presence.content_quality || 'Not assessed'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block">Site Structure</span>
                    <span className={getQualityColor(bi.digital_presence.site_structure)}>
                      {bi.digital_presence.site_structure || 'Not assessed'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block">Mobile Responsive</span>
                    <span className={bi.digital_presence.mobile_responsive ? 'text-green-400' : 'text-red-400'}>
                      {bi.digital_presence.mobile_responsive ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {bi.digital_presence.page_count_estimate && (
                    <div>
                      <span className="text-gray-500 text-sm block">Est. Page Count</span>
                      <span className="text-white">~{bi.digital_presence.page_count_estimate}</span>
                    </div>
                  )}
                </div>
                {hasValidItems(bi.digital_presence.marketing_stack) && (
                  <div className="mb-4">
                    <span className="text-gray-500 text-sm block mb-2">Marketing Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {bi.digital_presence.marketing_stack.filter(isValidValue).map((tool, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {hasValidItems(bi.digital_presence.social_presence) && (
                  <div>
                    <span className="text-gray-500 text-sm block mb-2">Social Presence</span>
                    <div className="flex flex-wrap gap-2">
                      {bi.digital_presence.social_presence.filter(isValidValue).map((social, i) => (
                        <span key={i} className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs">
                          {social}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Analysis Metadata */}
      {bi.analysis_metadata && (
        <div className="text-xs text-gray-500 flex items-center gap-4 pt-2 border-t border-gray-800 flex-wrap">
          <span>Analyzed: {new Date(bi.analysis_metadata.analyzed_at).toLocaleDateString()}</span>
          <span>Confidence: {Math.round(bi.analysis_metadata.confidence_score * 100)}%</span>
          <span>Pages: {bi.analysis_metadata.pages_analyzed}</span>
          {bi.analysis_metadata.analysis_version && (
            <span>v{bi.analysis_metadata.analysis_version}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessIntelligenceSummary;
