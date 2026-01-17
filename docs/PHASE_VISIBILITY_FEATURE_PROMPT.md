# Phase Visibility Control Feature - Developer Prompt

## Overview
Add the ability for admins to control which proposal phases are visible to clients in the client portal. This allows admins to gradually reveal phases to clients as the project progresses, rather than showing all phases at once.

## Current System Analysis

### Database Schema
- **Table**: `proposal_phases`
- **Current Fields**: `id`, `proposal_id`, `phase_number`, `phase_name`, `description`, `timeline`, `start_date`, `end_date`, `deliverables`, `objectives`, `goals`, `amount`, `sort_order`, `created_at`, `updated_at`
- **Missing**: No visibility control field exists

### Current Behavior
- **Admin Interface** (`/admin/proposals/[id]`): Displays all phases in read-only view
- **Client Portal** (`/proposals/[token]`): Shows ALL phases without any filtering
- **API Endpoints**:
  - `/api/proposals/token/[accessToken]` - Fetches all phases for client portal (no filtering)
  - `/api/proposals/[id]` - Fetches all phases for admin view (no filtering)
  - No dedicated API endpoint exists for updating individual phases

### Type Definitions
- **File**: `src/types/proposals.ts`
- **Interface**: `ProposalPhase` (lines 172-188)
- **Update Interface**: `ProposalPhaseUpdate` (lines 205-217)
- **Missing**: `visible_in_portal` field in both interfaces

## Implementation Requirements

### 1. Database Schema Update

**File**: `supabase/proposals-schema.sql`

Add a new column to the `proposal_phases` table:

```sql
-- Add visibility control column to proposal_phases
ALTER TABLE proposal_phases 
ADD COLUMN IF NOT EXISTS visible_in_portal BOOLEAN DEFAULT true;

-- Add index for performance when filtering visible phases
CREATE INDEX IF NOT EXISTS idx_proposal_phases_visible 
ON proposal_phases(proposal_id, visible_in_portal) 
WHERE visible_in_portal = true;

-- Add comment for documentation
COMMENT ON COLUMN proposal_phases.visible_in_portal IS 
'Controls whether this phase is visible to clients in the portal. Admins can toggle this to gradually reveal phases.';
```

**Migration Considerations**:
- Default value `true` ensures existing phases remain visible (backward compatible)
- Existing proposals will show all phases until admin explicitly hides them

### 2. TypeScript Type Updates

**File**: `src/types/proposals.ts`

Update the `ProposalPhase` interface (around line 172):

```typescript
export interface ProposalPhase {
  id: string;
  proposal_id: string;
  phase_number: number;
  phase_name: string;
  description: string | null;
  timeline: string | null;
  start_date: string | null;
  end_date: string | null;
  deliverables: Deliverable[] | null;
  objectives: string[] | null;
  goals: string[] | null;
  amount: number;
  sort_order: number;
  visible_in_portal: boolean; // NEW FIELD
  created_at: string;
  updated_at: string;
}
```

Update the `ProposalPhaseInsert` interface (around line 190):

```typescript
export interface ProposalPhaseInsert {
  proposal_id: string;
  phase_number: number;
  phase_name: string;
  description?: string | null;
  timeline?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  deliverables?: Deliverable[] | null;
  objectives?: string[] | null;
  goals?: string[] | null;
  amount: number;
  sort_order?: number;
  visible_in_portal?: boolean; // NEW FIELD (optional, defaults to true)
}
```

Update the `ProposalPhaseUpdate` interface (around line 205):

```typescript
export interface ProposalPhaseUpdate {
  phase_number?: number;
  phase_name?: string;
  description?: string | null;
  timeline?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  deliverables?: Deliverable[] | null;
  objectives?: string[] | null;
  goals?: string[] | null;
  amount?: number;
  sort_order?: number;
  visible_in_portal?: boolean; // NEW FIELD
}
```

### 3. API Endpoint for Phase Updates

**Create New File**: `src/app/api/proposals/[id]/phases/[phaseId]/route.ts`

Create a new API endpoint to update individual phases:

```typescript
/**
 * PUT /api/proposals/[id]/phases/[phaseId]
 * Update a specific phase (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; phaseId: string }> }
) {
  // Implementation should:
  // 1. Check admin authentication
  // 2. Validate proposal exists and belongs to admin
  // 3. Update phase with provided fields (including visible_in_portal)
  // 4. Return updated phase
}
```

**Alternative Approach**: If you prefer a bulk update endpoint, create:
- `PUT /api/proposals/[id]/phases` - Update multiple phases at once

### 4. Client Portal Filtering

**File**: `src/app/api/proposals/token/[accessToken]/route.ts`

Update the phase fetching query (around line 384) to filter by visibility:

```typescript
// Current code:
supabaseAdmin
  .from('proposal_phases')
  .select('*')
  .eq('proposal_id', proposal.id)
  .order('sort_order'),

// Updated code:
supabaseAdmin
  .from('proposal_phases')
  .select('*')
  .eq('proposal_id', proposal.id)
  .eq('visible_in_portal', true) // NEW: Only show visible phases
  .order('sort_order'),
```

**Note**: Admin views should still show ALL phases regardless of visibility flag.

### 5. Admin Interface - Phase Visibility Toggle

**File**: `src/app/admin/proposals/[id]/page.tsx`

Add a toggle control for each phase in the phases section (around line 230-280):

**UI Requirements**:
- Add a toggle switch/checkbox next to each phase name
- Label: "Visible in Portal" or "Show to Client"
- Visual indicator (e.g., eye icon) when visible, crossed-out eye when hidden
- Show count: "X of Y phases visible"
- Save button or auto-save on toggle

**Implementation Details**:
- Add state to track phase visibility changes
- Add handler function to call the API endpoint
- Show loading state during update
- Display success/error feedback
- Optionally: Add bulk actions (e.g., "Show All", "Hide All")

**Example UI Pattern**:
```tsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="text-radiance-gold text-sm font-mono">
      Phase {phase.phase_number}
    </span>
    <h3 className="text-lg font-semibold text-text-primary">
      {phase.phase_name}
    </h3>
  </div>
  <div className="flex items-center gap-3">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={phase.visible_in_portal}
        onChange={(e) => handlePhaseVisibilityToggle(phase.id, e.target.checked)}
        className="w-4 h-4"
      />
      <span className="text-sm text-text-secondary">
        Visible in Portal
      </span>
    </label>
  </div>
</div>
```

### 6. Admin Interface - Visual Indicators

**Enhancement**: Add visual indicators in the admin view to show which phases are visible:

- **Visible phases**: Normal styling with checkmark icon
- **Hidden phases**: Dimmed/muted styling with eye-slash icon
- **Summary badge**: "3 of 5 phases visible" at the top of phases section

### 7. Proposal Creation Form Update

**File**: `src/app/admin/proposals/new/page.tsx`

When creating new proposals, ensure the phase form includes the visibility toggle:

- Add checkbox/toggle in the phase form (around line 724-891)
- Default to `visible_in_portal: true` for new phases
- Include in the phase data when submitting

### 8. Testing Checklist

- [ ] Database migration runs successfully
- [ ] Existing phases default to visible (backward compatibility)
- [ ] Admin can toggle phase visibility
- [ ] Client portal only shows visible phases
- [ ] Admin view shows all phases regardless of visibility
- [ ] API endpoints properly filter/handle visibility flag
- [ ] TypeScript types are updated correctly
- [ ] No TypeScript errors after changes
- [ ] UI provides clear feedback on visibility state
- [ ] Bulk operations work correctly (if implemented)

## Design Considerations

### User Experience
- **Admin**: Should be able to quickly see which phases are visible vs hidden
- **Client**: Should not see any indication that phases are hidden (seamless experience)
- **Feedback**: Clear visual feedback when toggling visibility

### Performance
- Index on `(proposal_id, visible_in_portal)` for efficient filtering
- Consider caching if proposal views are frequent

### Security
- Ensure only admins can update phase visibility
- Validate proposal ownership before allowing updates
- Client portal should never expose hidden phases

## Edge Cases to Handle

1. **All phases hidden**: Client portal should show a message like "No phases available at this time" rather than an empty state
2. **Phase deletion**: If a visible phase is deleted, ensure no orphaned references
3. **Bulk operations**: Consider allowing admins to show/hide multiple phases at once
4. **Phase reordering**: Ensure visibility state persists when phases are reordered

## Implementation Priority

1. **Phase 1 (Critical)**:
   - Database schema update
   - TypeScript type updates
   - Client portal filtering
   - Basic admin toggle UI

2. **Phase 2 (Enhancement)**:
   - Visual indicators in admin view
   - Bulk operations
   - Enhanced UI/UX improvements

## Questions to Consider

- Should there be a confirmation dialog when hiding a phase?
- Should we log when phases are made visible/hidden (audit trail)?
- Should we send notifications to clients when new phases become visible?
- Should visibility be tied to proposal status (e.g., only show phases when proposal is "active")?

## Reference Files

- Database schema: `supabase/proposals-schema.sql`
- Types: `src/types/proposals.ts`
- Client portal: `src/app/proposals/[token]/page.tsx`
- Admin detail page: `src/app/admin/proposals/[id]/page.tsx`
- Admin create page: `src/app/admin/proposals/new/page.tsx`
- Client portal API: `src/app/api/proposals/token/[accessToken]/route.ts`
- Admin API: `src/app/api/proposals/[id]/route.ts`

---

**Note**: This feature should be implemented with backward compatibility in mind. All existing phases should default to visible, and the system should gracefully handle proposals created before this feature was added.
