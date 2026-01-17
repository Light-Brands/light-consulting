# Quick Fix Guide - Missing Database Columns

## Problem

Your Supabase database is missing columns that the application code expects:

1. ✅ **FIXED**: `proposal_phases.visible_in_portal` - Line 102 shows phases now saving successfully
2. ❌ **NEEDS FIX**: `milestones.payment_link` - Line 103-109 shows this error:
   ```
   Could not find the 'payment_link' column of 'milestones' in the schema cache
   ```

## Solution

Run the updated migration SQL in your Supabase dashboard.

### Steps:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Select your project
   - Click "SQL Editor" in the left sidebar

2. **Run the Migration**
   - Copy ALL the SQL from `/supabase/migration-add-missing-columns.sql`
   - Paste it into a new query
   - Click "Run"

3. **Verify Success**
   - The query will return 2 rows showing both columns were added
   - You should see:
     - `proposal_phases.visible_in_portal` (already exists from your previous run)
     - `milestones.payment_link` (newly added)

4. **Test Again**
   - Go back to your proposal edit page
   - Try saving the proposal again
   - Check the terminal - you should see:
     ```
     PUT /api/proposals/[id]/milestones 200
     ```
     (status 200 = success, not 500 = error)

## Progress So Far

Looking at your terminal output:

- Line 88: ✅ Proposal created successfully (201)
- Line 101: ✅ Proposal basic info saved (200)
- Line 102: ✅ Phases saved successfully (200)
- Line 109: ❌ Milestones failed (500) - needs the payment_link column

**You're almost there!** Just need to add the `payment_link` column and everything will work.

## What These Columns Do

### `visible_in_portal` (proposal_phases)
- Controls whether clients can see each phase in their portal
- Lets you progressively reveal project phases as work progresses
- Default: `true` (all phases visible)

### `payment_link` (milestones)  
- Stores generated payment URLs (e.g., Stripe checkout links)
- Used for client self-service payments
- Can be null if payment handled manually

## After Running the Migration

Your proposals should:
- ✅ Save all proposal data
- ✅ Save all phases with amounts
- ✅ Save all milestones with amounts
- ✅ Properly link milestones to phases
- ✅ Display correctly on the detail page

The error handling I added earlier will help catch any other issues!
