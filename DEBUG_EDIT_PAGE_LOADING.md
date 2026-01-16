# Debug Guide - Edit Page Loading Issue

## The Problem

When you save a proposal with phases and milestones, the data saves correctly. But when you navigate back to the edit page, the form shows different/wrong values.

## What We're Testing

I've added comprehensive logging to track exactly what's happening when the edit page loads. This will help us see:

1. What data the API returns
2. What data gets loaded into the form
3. How phases are mapped
4. How milestone `phase_id` → `phase_index` mapping works

## Testing Steps

### 1. Open Browser Console
- Press F12 to open DevTools
- Go to the "Console" tab
- **Important**: Clear the console before starting

### 2. Navigate to Edit Page
1. Go to Admin → Proposals
2. Click on a proposal that has phases and milestones
3. Click "Edit Proposal"

### 3. Watch the Console Output

You should see logs like this:

```
🔄 Fetching proposal data...
✅ Proposal data received: { id: '...', phases_count: 3, milestones_count: 2 }
📦 Loading phases from API: [...]
📦 Setting phases in form: [...]
🎯 Loading milestones from API: [...]
🗺️ Phase ID to Index mapping: { 'abc-123': 0, 'def-456': 1, 'ghi-789': 2 }
  Milestone "Kickoff": phase_id=abc-123 → phase_index=0
  Milestone "Completion": phase_id=def-456 → phase_index=1
🎯 Setting milestones in form: [...]
```

### 4. Check for Issues

Look for these potential problems:

#### Problem A: Wrong Phase/Milestone Count
```
✅ Proposal data received: { phases_count: 3, milestones_count: 2 }
```
- Does this match what you see on the detail page?
- If the counts are wrong, the API is returning incorrect data

#### Problem B: Missing or Wrong Values
```
📦 Setting phases in form: [
  { phase_name: 'Phase 1', amount: '5000', ... },
  { phase_name: 'Phase 2', amount: '10000', ... }
]
```
- Check if the `phase_name` and `amount` values are correct
- If they're wrong here, the issue is in how the API returns data
- If they're correct here but wrong in the UI, the issue is in how React renders the form

#### Problem C: Phase Mapping Issues
```
🗺️ Phase ID to Index mapping: { 'abc-123': 0, 'def-456': 1 }
  Milestone "Kickoff": phase_id=abc-123 → phase_index=0
  Milestone "Completion": phase_id=xyz-999 → phase_index=0  ← WRONG!
```
- Each milestone should map to the correct phase index
- If `phase_id=xyz-999` but that ID isn't in the mapping, it defaults to 0 (wrong!)
- This means the milestone's `phase_id` doesn't match any existing phase ID

#### Problem D: Empty Data
```
⚠️ No phases in proposal - resetting to single empty phase
```
- If you see this but know you have phases saved, the API isn't returning them

### 5. Compare Form Values

After the page loads:
1. Go to the **Phases** tab
2. Check if the phase names and amounts match what the console logged
3. Go to the **Milestones** tab  
4. Check if the milestone names and amounts match what the console logged
5. Check if each milestone is linked to the correct phase

### 6. Report Your Findings

Please share:
1. A screenshot or copy of the console output
2. What values you see in the form vs. what you expected
3. What values you see on the detail page (for comparison)

## Common Issues and Solutions

### Issue 1: Form Shows Old Data

**Symptom**: The form shows data from a previous save, not the most recent.

**Possible Causes**:
- Browser cache
- React state not updating
- API returning stale data

**Test**: 
- Hard refresh the page (Cmd/Ctrl + Shift + R)
- Check the console logs - does it show the correct data being loaded?

### Issue 2: Phase/Milestone Amounts Reset to 0

**Symptom**: Values save correctly but show as empty or 0 in the edit form.

**Possible Causes**:
- `amount` field is null in database but form expects a string
- Type conversion issue (number → string)

**What to Look For**:
```javascript
// In console:
amount: null  // or amount: 0

// Should be:
amount: '5000'  // string version of the number
```

### Issue 3: Milestones Linked to Wrong Phases

**Symptom**: Milestone shows under a different phase than expected.

**Possible Causes**:
- Phase IDs changed (because of delete/recreate on save)
- Milestone `phase_id` is null or invalid
- Phase order changed

**What to Look For**:
```javascript
// Check the mapping:
🗺️ Phase ID to Index mapping: { 
  'current-phase-id': 0,
  'another-phase-id': 1 
}

// Then check if milestone phase_id matches:
Milestone "Name": phase_id=OLD-PHASE-ID → phase_index=0
```

If `OLD-PHASE-ID` isn't in the mapping, that's the problem!

### Issue 4: Extra Empty Phase/Milestone

**Symptom**: There's always an extra empty item at the end.

**This is normal!** The form keeps one empty item so you can add more. Just ignore it - it won't be saved if it's empty.

## Next Steps Based on Console Output

### If data loads correctly but form shows wrong values:
- Issue is in the React form rendering
- Check if input fields are bound to the correct state

### If data loads incorrectly:
- Issue is in the API or database
- Check what's actually stored in Supabase

### If phase mapping is wrong:
- Issue is that phase IDs changed but milestones still reference old IDs
- This is a known limitation of the "delete and recreate" approach
- Possible fix: need to link milestones to phases by phase_number instead of phase_id

Let me know what you find! 🔍
