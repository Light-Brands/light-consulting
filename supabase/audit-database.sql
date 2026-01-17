-- ============================================================================
-- Database Schema Audit Query
-- Light Brand Consulting
-- ============================================================================
-- Run this query to compare your database against the expected schema
-- from the migration files in /supabase/
-- ============================================================================

-- ============================================================================
-- SECTION 1: Check for Required Extensions
-- ============================================================================
SELECT '========== EXTENSIONS ==========' as section;

SELECT 
    'uuid-ossp' as extension_name,
    CASE WHEN EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp') 
         THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- ============================================================================
-- SECTION 2: Check for Required Tables
-- ============================================================================
SELECT '========== TABLES ==========' as section;

WITH expected_tables AS (
    SELECT unnest(ARRAY[
        'projects',
        'lead_submissions',
        'proposals',
        'proposal_phases',
        'milestones',
        'agreements',
        'onboarding_forms',
        'dashboard_updates',
        'proposal_comments'
    ]) as table_name
)
SELECT 
    et.table_name,
    CASE WHEN t.tablename IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
FROM expected_tables et
LEFT JOIN pg_tables t ON t.tablename = et.table_name AND t.schemaname = 'public'
ORDER BY et.table_name;

-- ============================================================================
-- SECTION 3: Check Columns for Each Table
-- ============================================================================
SELECT '========== PROJECTS TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'title', 'description', 'image_url', 'tags', 'case_study_url',
        'client_name', 'industry', 'featured', 'status', 'sort_order',
        'created_at', 'updated_at'
    ]) as column_name
)
SELECT 
    'projects' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'projects' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
SELECT '========== LEAD_SUBMISSIONS TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        -- Base columns from proposals-schema.sql
        'id', 'service', 'name', 'email', 'company', 'phone', 'intake_data',
        'status', 'notes', 'created_at', 'updated_at',
        -- From diagnostic-schema.sql
        'website_url', 'tech_stack', 'website_story', 'readiness_score',
        'readiness_brief', 'capacity_gap_analysis', 'full_readiness_report',
        'system_demo_links', 'booking_calendly_link', 'booked_at',
        -- From business-intelligence-schema.sql
        'business_intelligence',
        -- From add-session-booking-fields.sql
        'session_paid', 'session_paid_at', 'session_payment_id',
        'session_checkout_id', 'session_checkout_url', 'session_amount'
    ]) as column_name
)
SELECT 
    'lead_submissions' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'lead_submissions' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
SELECT '========== PROPOSALS TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'lead_submission_id', 'client_name', 'client_email', 'client_company',
        'client_phone', 'project_name', 'project_overview', 'project_scope',
        'total_timeline', 'start_date', 'estimated_completion_date', 'total_amount',
        'discount_percentage', 'final_amount', 'status', 'access_token',
        'portal_sections', 'portal_password', 'created_by', 'created_at',
        'updated_at', 'sent_at', 'viewed_at', 'agreement_signed_at'
    ]) as column_name
)
SELECT 
    'proposals' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'proposals' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
SELECT '========== PROPOSAL_PHASES TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'proposal_id', 'phase_number', 'phase_name', 'description',
        'timeline', 'start_date', 'end_date', 'deliverables', 'objectives',
        'goals', 'amount', 'sort_order', 'visible_in_portal', 'created_at', 'updated_at'
    ]) as column_name
)
SELECT 
    'proposal_phases' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'proposal_phases' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
SELECT '========== MILESTONES TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'proposal_id', 'phase_id', 'milestone_name', 'description',
        'amount', 'due_date', 'payment_status', 'milestone_status',
        'invoice_number', 'paid_at', 'sort_order',
        -- Stripe fields from add-stripe-fields.sql
        'stripe_checkout_session_id', 'stripe_payment_intent_id', 'stripe_payment_url',
        -- Legacy payment_link from migration-add-missing-columns.sql
        'payment_link',
        'created_at', 'updated_at'
    ]) as column_name
)
SELECT 
    'milestones' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'milestones' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
SELECT '========== AGREEMENTS TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'proposal_id', 'agreement_text', 'terms', 'signed_by_name',
        'signed_by_email', 'signature_data', 'signed_at', 'ip_address',
        'user_agent', 'status', 'created_at', 'updated_at'
    ]) as column_name
)
SELECT 
    'agreements' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'agreements' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
SELECT '========== ONBOARDING_FORMS TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'proposal_id', 'form_config', 'form_data', 'status',
        'submitted_at', 'reviewed_at', 'created_at', 'updated_at'
    ]) as column_name
)
SELECT 
    'onboarding_forms' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'onboarding_forms' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
SELECT '========== DASHBOARD_UPDATES TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'proposal_id', 'milestone_id', 'update_type', 'title',
        'content', 'attachments', 'created_by', 'created_at', 'updated_at'
    ]) as column_name
)
SELECT 
    'dashboard_updates' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'dashboard_updates' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
SELECT '========== PROPOSAL_COMMENTS TABLE COLUMNS ==========' as section;

WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'proposal_id', 'milestone_id', 'comment_text', 'created_by',
        'is_client_comment', 'created_at', 'updated_at'
    ]) as column_name
)
SELECT 
    'proposal_comments' as table_name,
    ec.column_name,
    CASE WHEN c.column_name IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
    COALESCE(c.data_type, '-') as data_type
FROM expected_columns ec
LEFT JOIN information_schema.columns c 
    ON c.table_schema = 'public' 
    AND c.table_name = 'proposal_comments' 
    AND c.column_name = ec.column_name
ORDER BY ec.column_name;

-- ============================================================================
-- SECTION 4: Check for Required Indexes
-- ============================================================================
SELECT '========== INDEXES ==========' as section;

WITH expected_indexes AS (
    SELECT unnest(ARRAY[
        -- Projects indexes
        'idx_projects_status',
        'idx_projects_featured',
        'idx_projects_created_at',
        'idx_projects_sort_order',
        -- Lead submissions indexes
        'idx_lead_submissions_status',
        'idx_lead_submissions_email',
        'idx_lead_submissions_created_at',
        'idx_lead_submissions_readiness_score',
        'idx_lead_submissions_booked_at',
        'idx_lead_submissions_website_url',
        'idx_lead_submissions_business_intelligence',
        'idx_lead_submissions_business_model',
        'idx_lead_submissions_industry',
        'idx_lead_submissions_ai_readiness_score',
        'idx_lead_submissions_session_paid',
        'idx_lead_submissions_session_paid_at',
        -- Proposals indexes
        'idx_proposals_status',
        'idx_proposals_access_token',
        'idx_proposals_client_email',
        'idx_proposals_lead_submission_id',
        'idx_proposals_created_at',
        -- Proposal phases indexes
        'idx_proposal_phases_proposal_id',
        'idx_proposal_phases_sort_order',
        'idx_proposal_phases_visible',
        -- Milestones indexes
        'idx_milestones_proposal_id',
        'idx_milestones_payment_status',
        'idx_milestones_milestone_status',
        'idx_milestones_due_date',
        'idx_milestones_stripe_checkout_session',
        -- Agreements indexes
        'idx_agreements_proposal_id',
        'idx_agreements_status',
        -- Onboarding forms indexes
        'idx_onboarding_forms_proposal_id',
        'idx_onboarding_forms_status',
        -- Dashboard updates indexes
        'idx_dashboard_updates_proposal_id',
        'idx_dashboard_updates_created_at',
        -- Proposal comments indexes
        'idx_proposal_comments_proposal_id',
        'idx_proposal_comments_created_at'
    ]) as index_name
)
SELECT 
    ei.index_name,
    CASE WHEN i.indexname IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
FROM expected_indexes ei
LEFT JOIN pg_indexes i 
    ON i.indexname = ei.index_name 
    AND i.schemaname = 'public'
ORDER BY ei.index_name;

-- ============================================================================
-- SECTION 5: Check for Required Functions
-- ============================================================================
SELECT '========== FUNCTIONS ==========' as section;

SELECT 
    'update_updated_at_column' as function_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE n.nspname = 'public' 
        AND p.proname = 'update_updated_at_column'
    ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- ============================================================================
-- SECTION 6: Check for Required Triggers
-- ============================================================================
SELECT '========== TRIGGERS ==========' as section;

WITH expected_triggers AS (
    SELECT unnest(ARRAY[
        'update_projects_updated_at',
        'update_lead_submissions_updated_at',
        'update_proposals_updated_at',
        'update_proposal_phases_updated_at',
        'update_milestones_updated_at',
        'update_agreements_updated_at',
        'update_onboarding_forms_updated_at',
        'update_dashboard_updates_updated_at',
        'update_proposal_comments_updated_at'
    ]) as trigger_name
)
SELECT 
    et.trigger_name,
    CASE WHEN t.tgname IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
FROM expected_triggers et
LEFT JOIN pg_trigger t ON t.tgname = et.trigger_name
ORDER BY et.trigger_name;

-- ============================================================================
-- SECTION 7: Check for Row Level Security (RLS) Status
-- ============================================================================
SELECT '========== ROW LEVEL SECURITY ==========' as section;

WITH expected_rls_tables AS (
    SELECT unnest(ARRAY[
        'projects',
        'lead_submissions',
        'proposals',
        'proposal_phases',
        'milestones',
        'agreements',
        'onboarding_forms',
        'dashboard_updates',
        'proposal_comments'
    ]) as table_name
)
SELECT 
    et.table_name,
    CASE WHEN c.relrowsecurity THEN '✅ RLS ENABLED' ELSE '❌ RLS DISABLED' END as rls_status
FROM expected_rls_tables et
LEFT JOIN pg_class c ON c.relname = et.table_name
LEFT JOIN pg_namespace n ON n.oid = c.relnamespace AND n.nspname = 'public'
ORDER BY et.table_name;

-- ============================================================================
-- SECTION 8: List All RLS Policies
-- ============================================================================
SELECT '========== RLS POLICIES ==========' as section;

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual IS NOT NULL as has_using_clause,
    with_check IS NOT NULL as has_with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================================
-- SECTION 9: Summary of Missing Items
-- ============================================================================
SELECT '========== SUMMARY: MISSING ITEMS ==========' as section;

-- Missing tables
SELECT 'MISSING TABLE: ' || table_name as missing_item
FROM (
    SELECT unnest(ARRAY[
        'projects', 'lead_submissions', 'proposals', 'proposal_phases',
        'milestones', 'agreements', 'onboarding_forms', 'dashboard_updates',
        'proposal_comments'
    ]) as table_name
) expected
WHERE NOT EXISTS (
    SELECT 1 FROM pg_tables t 
    WHERE t.tablename = expected.table_name 
    AND t.schemaname = 'public'
)

UNION ALL

-- Missing columns (only if table exists)
SELECT 'MISSING COLUMN: ' || table_name || '.' || column_name as missing_item
FROM (
    -- Projects columns
    SELECT 'projects' as table_name, unnest(ARRAY[
        'id', 'title', 'description', 'image_url', 'tags', 'case_study_url',
        'client_name', 'industry', 'featured', 'status', 'sort_order',
        'created_at', 'updated_at'
    ]) as column_name
    UNION ALL
    -- Lead submissions columns
    SELECT 'lead_submissions', unnest(ARRAY[
        'id', 'service', 'name', 'email', 'company', 'phone', 'intake_data',
        'status', 'notes', 'created_at', 'updated_at', 'website_url', 'tech_stack',
        'website_story', 'readiness_score', 'readiness_brief', 'capacity_gap_analysis',
        'full_readiness_report', 'system_demo_links', 'booking_calendly_link', 'booked_at',
        'business_intelligence', 'session_paid', 'session_paid_at', 'session_payment_id',
        'session_checkout_id', 'session_checkout_url', 'session_amount'
    ])
    UNION ALL
    -- Proposals columns
    SELECT 'proposals', unnest(ARRAY[
        'id', 'lead_submission_id', 'client_name', 'client_email', 'client_company',
        'client_phone', 'project_name', 'project_overview', 'project_scope',
        'total_timeline', 'start_date', 'estimated_completion_date', 'total_amount',
        'discount_percentage', 'final_amount', 'status', 'access_token',
        'portal_sections', 'portal_password', 'created_by', 'created_at',
        'updated_at', 'sent_at', 'viewed_at', 'agreement_signed_at'
    ])
    UNION ALL
    -- Proposal phases columns
    SELECT 'proposal_phases', unnest(ARRAY[
        'id', 'proposal_id', 'phase_number', 'phase_name', 'description',
        'timeline', 'start_date', 'end_date', 'deliverables', 'objectives',
        'goals', 'amount', 'sort_order', 'visible_in_portal', 'created_at', 'updated_at'
    ])
    UNION ALL
    -- Milestones columns
    SELECT 'milestones', unnest(ARRAY[
        'id', 'proposal_id', 'phase_id', 'milestone_name', 'description',
        'amount', 'due_date', 'payment_status', 'milestone_status',
        'invoice_number', 'paid_at', 'sort_order', 'stripe_checkout_session_id',
        'stripe_payment_intent_id', 'stripe_payment_url', 'payment_link',
        'created_at', 'updated_at'
    ])
    UNION ALL
    -- Agreements columns
    SELECT 'agreements', unnest(ARRAY[
        'id', 'proposal_id', 'agreement_text', 'terms', 'signed_by_name',
        'signed_by_email', 'signature_data', 'signed_at', 'ip_address',
        'user_agent', 'status', 'created_at', 'updated_at'
    ])
    UNION ALL
    -- Onboarding forms columns
    SELECT 'onboarding_forms', unnest(ARRAY[
        'id', 'proposal_id', 'form_config', 'form_data', 'status',
        'submitted_at', 'reviewed_at', 'created_at', 'updated_at'
    ])
    UNION ALL
    -- Dashboard updates columns
    SELECT 'dashboard_updates', unnest(ARRAY[
        'id', 'proposal_id', 'milestone_id', 'update_type', 'title',
        'content', 'attachments', 'created_by', 'created_at', 'updated_at'
    ])
    UNION ALL
    -- Proposal comments columns
    SELECT 'proposal_comments', unnest(ARRAY[
        'id', 'proposal_id', 'milestone_id', 'comment_text', 'created_by',
        'is_client_comment', 'created_at', 'updated_at'
    ])
) expected
WHERE EXISTS (
    SELECT 1 FROM pg_tables t 
    WHERE t.tablename = expected.table_name 
    AND t.schemaname = 'public'
)
AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns c 
    WHERE c.table_schema = 'public' 
    AND c.table_name = expected.table_name 
    AND c.column_name = expected.column_name
)
ORDER BY missing_item;

-- ============================================================================
-- SECTION 10: Data Summary
-- ============================================================================
SELECT '========== DATA COUNTS ==========' as section;

SELECT 
    'projects' as table_name,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'projects' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM projects)
         ELSE 'TABLE MISSING' END as row_count

UNION ALL SELECT 'lead_submissions',
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'lead_submissions' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM lead_submissions)
         ELSE 'TABLE MISSING' END

UNION ALL SELECT 'proposals',
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'proposals' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM proposals)
         ELSE 'TABLE MISSING' END

UNION ALL SELECT 'proposal_phases',
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'proposal_phases' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM proposal_phases)
         ELSE 'TABLE MISSING' END

UNION ALL SELECT 'milestones',
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'milestones' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM milestones)
         ELSE 'TABLE MISSING' END

UNION ALL SELECT 'agreements',
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'agreements' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM agreements)
         ELSE 'TABLE MISSING' END

UNION ALL SELECT 'onboarding_forms',
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'onboarding_forms' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM onboarding_forms)
         ELSE 'TABLE MISSING' END

UNION ALL SELECT 'dashboard_updates',
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'dashboard_updates' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM dashboard_updates)
         ELSE 'TABLE MISSING' END

UNION ALL SELECT 'proposal_comments',
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'proposal_comments' AND schemaname = 'public')
         THEN (SELECT COUNT(*)::text FROM proposal_comments)
         ELSE 'TABLE MISSING' END;
