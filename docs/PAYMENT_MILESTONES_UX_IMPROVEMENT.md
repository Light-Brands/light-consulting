# Payment Milestones UX Improvement

## What Changed

### Problem
The old system was confusing:
- Forced users to create one milestone per phase
- Unclear terminology ("Milestones" could mean project milestones OR payment milestones)
- No sensible defaults
- Phases and milestones were artificially linked 1:1

### Solution
Simplified the payment system:
- **Phases** = Project work breakdown (what you'll deliver)
- **Payment Milestones** = Billing schedule (when client pays)
- These are now **independent** - no forced 1:1 mapping

## Key Improvements

### 1. Better Default (50/50 Payment Split)
New proposals and edits now start with:
- **Upfront Payment**: 50% deposit to begin work
- **Final Payment**: 50% upon project completion and launch

The amounts **auto-calculate** based on your phase totals and discount.

### 2. Clearer UI Labels
- Tab renamed: "Milestones" → **"Payment Schedule"**
- Section header: **"Payment #1", "Payment #2"** instead of "Milestone 1"
- Field label: **"Payment Name"** instead of "Milestone Name"
- Button: **"+ Add Payment Milestone"** instead of "+ Add Milestone"

### 3. Helpful Context
Added an info box explaining:
> "Define when clients pay throughout the project. Default is 50% upfront and 50% on completion. 
> Add more payment milestones if needed (e.g., quarterly payments, per-phase payments)."

### 4. Auto-Calculation
When you change phase amounts or discount:
- The two default payment milestones automatically update to 50/50 split
- If you customize the payment names, they won't auto-update (you control them)
- You can add more payments manually if needed

### 5. Optional Phase Linking
- Payments can still be linked to phases (optional)
- Useful for "Pay when Phase 1 completes" scenarios
- But NOT required - you can have 2 payments for 5 phases

## User Flow Examples

### Example 1: Simple Project (Default)
**Phases:**
- Discovery: $10,000
- Development: $30,000
- Launch: $10,000
- **Total: $50,000**

**Payment Schedule (Auto-calculated):**
- Upfront Payment: $25,000 (50%)
- Final Payment: $25,000 (50%)

### Example 2: Quarterly Payments
User can customize to:
- Q1 Payment: $12,500
- Q2 Payment: $12,500
- Q3 Payment: $12,500
- Q4 Payment: $12,500

### Example 3: Per-Phase Payments
User can set:
- Phase 1 Complete: $10,000 (linked to Discovery phase)
- Phase 2 Complete: $30,000 (linked to Development phase)
- Phase 3 Complete: $10,000 (linked to Launch phase)

## Technical Details

### Files Modified
1. `/src/app/admin/proposals/[id]/edit/page.tsx`
   - Changed default milestone state to 2 payments (50/50)
   - Added auto-calculation useEffect
   - Updated UI labels and help text
   - Renamed tab to "Payment Schedule"

2. `/src/app/admin/proposals/new/page.tsx`
   - Same changes as edit page

### Auto-Calculation Logic
```typescript
useEffect(() => {
  const finalAmount = calculateFinalAmount();
  // Only auto-update if using default payment names
  if (milestones.length === 2 && 
      milestones[0].milestone_name === 'Upfront Payment' && 
      milestones[1].milestone_name === 'Final Payment') {
    const half = (finalAmount / 2).toFixed(2);
    setMilestones((prev) => [
      { ...prev[0], amount: half },
      { ...prev[1], amount: half },
    ]);
  }
}, [phases, formData.discount_percentage]);
```

This means:
- If you keep the default names, amounts auto-update
- If you rename them, you're in control (manual mode)

### Minimum Payments
- Edit page: Minimum 2 payments (can't delete default ones)
- Can add more unlimited

## Benefits

### For Admins
- ✅ Faster proposal creation (good defaults)
- ✅ Less confusion about phases vs payments
- ✅ Flexible - can still customize as needed
- ✅ Auto-calculation saves time

### For Clients
- ✅ Clearer billing tab (shows "Payment #1", "Payment #2")
- ✅ Easy to understand 50/50 split
- ✅ Or custom payment schedule if needed

## Testing

1. **Create a new proposal**
   - Add some phases with amounts
   - Go to "Payment Schedule" tab
   - Should see 2 payments auto-calculated at 50% each
   - Change phase amounts → payments should update

2. **Edit existing proposal**
   - Will load with existing milestones
   - If you want to reset to 50/50, just:
     - Delete extra milestones
     - Rename to "Upfront Payment" and "Final Payment"
     - Amounts will auto-calculate

3. **Custom payment schedule**
   - Rename payments
   - Amounts become manual (won't auto-update)
   - Can add more payments as needed

## Future Enhancements (Optional)

1. **Payment Templates**
   - "50/50 Split" (default)
   - "33/33/33 Split"
   - "Per Phase"
   - "Monthly"

2. **Smart Suggestions**
   - "You have 4 phases. Would you like 4 payments (one per phase)?"

3. **Validation**
   - Warn if payment total doesn't match final amount
   - Suggest adjustments

4. **Client Portal**
   - Could show payment schedule more prominently
   - Add payment due date reminders
