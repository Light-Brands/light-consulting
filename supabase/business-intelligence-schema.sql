-- ============================================================================
-- Light Brand Consulting - Business Intelligence Schema Extension
-- ============================================================================
-- This extends the lead_submissions table with enhanced business intelligence fields
-- Run this migration after diagnostic-schema.sql

-- Add new columns to lead_submissions table
ALTER TABLE lead_submissions
ADD COLUMN IF NOT EXISTS business_intelligence JSONB;

-- Create a GIN index for querying JSONB fields efficiently
CREATE INDEX IF NOT EXISTS idx_lead_submissions_business_intelligence
ON lead_submissions USING GIN (business_intelligence);

-- Create indexes for commonly queried business intelligence fields
CREATE INDEX IF NOT EXISTS idx_lead_submissions_business_model
ON lead_submissions ((business_intelligence->>'business_model'));

CREATE INDEX IF NOT EXISTS idx_lead_submissions_industry
ON lead_submissions ((business_intelligence->>'industry'));

CREATE INDEX IF NOT EXISTS idx_lead_submissions_ai_readiness_score
ON lead_submissions ((business_intelligence->'ai_readiness'->>'overall_score'));

-- Add comment for documentation
COMMENT ON COLUMN lead_submissions.business_intelligence IS 'Comprehensive business intelligence data including business model, industry, target audience, digital presence analysis, technical assessment, AI readiness, and operations insights';

-- Example business_intelligence structure:
-- {
--   "business_model": "B2B SaaS",
--   "industry": "Healthcare Technology",
--   "target_audience": {
--     "primary": "Healthcare administrators",
--     "demographics": "Ages 35-55, enterprise decision makers",
--     "psychographics": "Value efficiency, compliance, ROI"
--   },
--   "value_proposition": ["HIPAA-compliant solutions", "Reduced admin burden"],
--   "revenue_model": "Subscription-based",
--   "company_size": {
--     "employees": "50-200",
--     "revenue_range": "$5M-$20M",
--     "growth_stage": "Growth"
--   },
--   "geographic_presence": ["United States", "Canada"],
--   "competitive_positioning": "Mid-market leader",
--   "digital_presence": {
--     "content_quality": "High",
--     "site_structure": "Well-organized",
--     "mobile_responsive": true,
--     "conversion_elements": ["Contact forms", "Demo requests"],
--     "marketing_stack": ["HubSpot", "Google Analytics"],
--     "social_presence": ["LinkedIn", "Twitter"],
--     "seo_signals": {
--       "has_meta_tags": true,
--       "has_structured_data": false,
--       "has_sitemap": true
--     }
--   },
--   "technical_assessment": {
--     "performance": "Good",
--     "security": "Strong",
--     "accessibility": "Moderate",
--     "integrations": ["Stripe", "Zapier"],
--     "backend_architecture": "Modern stack",
--     "cdn_usage": true,
--     "monitoring_tools": ["Google Analytics"]
--   },
--   "ai_readiness": {
--     "overall_score": 65,
--     "current_ai_usage": ["Chatbot"],
--     "data_infrastructure": "Moderate",
--     "automation_level": "Low",
--     "integration_readiness": "High",
--     "content_generation_needs": "High",
--     "customer_intelligence_gaps": ["Personalization", "Segmentation"]
--   },
--   "operations_insights": {
--     "pain_points": ["Manual data entry", "Limited personalization"],
--     "growth_indicators": ["Expanding team", "New product launches"],
--     "efficiency_opportunities": ["Process automation", "AI-powered insights"],
--     "customer_journey_gaps": ["Limited touchpoints", "No automated follow-up"],
--     "support_infrastructure": "Basic help docs"
--   },
--   "analysis_metadata": {
--     "analyzed_at": "2024-01-15T10:30:00Z",
--     "analysis_version": "2.0",
--     "confidence_score": 0.85,
--     "pages_analyzed": 5
--   }
-- }
