/**
 * Deliverables Migration API Route
 * Light Brand Consulting
 *
 * POST /api/admin/deliverables/migrate - Convert JSON phase deliverables to database records
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface JsonDeliverable {
  id: string;
  name: string;
  description?: string;
}

/**
 * POST /api/admin/deliverables/migrate
 * Migrate JSON deliverables from phases to database records
 */
export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body: { proposal_id: string } = await request.json();

    if (!body.proposal_id) {
      return NextResponse.json(
        { data: null, error: 'proposal_id is required' },
        { status: 400 }
      );
    }

    // Get all phases for this proposal with their JSON deliverables
    const { data: phases, error: phasesError } = await supabaseAdmin
      .from('proposal_phases')
      .select('id, phase_number, phase_name, deliverables')
      .eq('proposal_id', body.proposal_id)
      .order('phase_number', { ascending: true });

    if (phasesError) {
      console.error('Error fetching phases:', phasesError);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch phases' },
        { status: 500 }
      );
    }

    if (!phases || phases.length === 0) {
      return NextResponse.json(
        { data: null, error: 'No phases found for this proposal' },
        { status: 404 }
      );
    }

    // Get existing database deliverables to check for duplicates
    const { data: existingDeliverables } = await supabaseAdmin
      .from('deliverables')
      .select('id, name, phase_id')
      .eq('proposal_id', body.proposal_id);

    const existingIds = new Set(existingDeliverables?.map(d => d.id) || []);
    const existingNamePhase = new Set(
      existingDeliverables?.map(d => `${d.name}|${d.phase_id}`) || []
    );

    // Collect all JSON deliverables to migrate
    const toMigrate: {
      proposal_id: string;
      phase_id: string;
      name: string;
      description: string | null;
      status: string;
      priority: string;
      sort_order: number;
    }[] = [];

    let sortOrder = 0;
    let skippedCount = 0;

    for (const phase of phases) {
      const jsonDeliverables = phase.deliverables as JsonDeliverable[] | null;

      if (!jsonDeliverables || !Array.isArray(jsonDeliverables)) {
        continue;
      }

      for (const jd of jsonDeliverables) {
        // Skip if already migrated (by id or by name+phase combo)
        if (existingIds.has(jd.id) || existingNamePhase.has(`${jd.name}|${phase.id}`)) {
          skippedCount++;
          continue;
        }

        toMigrate.push({
          proposal_id: body.proposal_id,
          phase_id: phase.id,
          name: jd.name,
          description: jd.description || null,
          status: 'pending',
          priority: 'medium',
          sort_order: sortOrder++,
        });
      }
    }

    if (toMigrate.length === 0) {
      return NextResponse.json({
        data: [],
        error: null,
        message: skippedCount > 0
          ? `All ${skippedCount} deliverables already migrated`
          : 'No JSON deliverables found to migrate',
        migrated: 0,
        skipped: skippedCount,
      });
    }

    // Insert the new deliverables
    const { data: migrated, error: insertError } = await supabaseAdmin
      .from('deliverables')
      .insert(toMigrate)
      .select();

    if (insertError) {
      console.error('Error migrating deliverables:', insertError);
      return NextResponse.json(
        { data: null, error: 'Failed to migrate deliverables' },
        { status: 500 }
      );
    }

    // Log the migration activity
    await supabaseAdmin.from('activity_logs').insert({
      proposal_id: body.proposal_id,
      activity_type: 'deliverable_update',
      description: `Migrated ${migrated?.length || 0} deliverables from phase definitions to database`,
      metadata: {
        migrated_count: migrated?.length || 0,
        skipped_count: skippedCount,
      },
      is_client_visible: false,
    });

    return NextResponse.json({
      data: migrated,
      error: null,
      message: `Successfully migrated ${migrated?.length || 0} deliverables`,
      migrated: migrated?.length || 0,
      skipped: skippedCount,
    });
  } catch (error) {
    console.error('Error in POST /api/admin/deliverables/migrate:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/deliverables/migrate
 * Check migration status for a proposal
 */
export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const proposal_id = searchParams.get('proposal_id');

    if (!proposal_id) {
      return NextResponse.json(
        { data: null, error: 'proposal_id is required' },
        { status: 400 }
      );
    }

    // Count JSON deliverables in phases
    const { data: phases } = await supabaseAdmin
      .from('proposal_phases')
      .select('deliverables')
      .eq('proposal_id', proposal_id);

    let jsonCount = 0;
    if (phases) {
      for (const phase of phases) {
        const deliverables = phase.deliverables as unknown[] | null;
        if (Array.isArray(deliverables)) {
          jsonCount += deliverables.length;
        }
      }
    }

    // Count database deliverables
    const { count: dbCount } = await supabaseAdmin
      .from('deliverables')
      .select('*', { count: 'exact', head: true })
      .eq('proposal_id', proposal_id);

    return NextResponse.json({
      data: {
        json_deliverables_count: jsonCount,
        database_deliverables_count: dbCount || 0,
        needs_migration: jsonCount > 0 && (dbCount || 0) < jsonCount,
      },
      error: null,
    });
  } catch (error) {
    console.error('Error in GET /api/admin/deliverables/migrate:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
