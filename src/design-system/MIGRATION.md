# Design System Migration Plan

This document outlines the migration strategy for converting the existing Light Brand Consulting codebase to fully utilize the new design system tokens.

## 📊 Audit Summary

### Current State

The application currently uses:
- **Tailwind CDN** - Loaded via script tag in `index.html`
- **CSS Custom Properties** - Defined in `/public/styles/index.css`
- **Inline Tailwind classes** - Throughout React components
- **Hardcoded values** - Some spacing and sizing values

### Styling Approach

✅ **Strengths:**
- Consistent color palette already defined
- Good component abstraction (Button, Card, Input, etc.)
- Semantic naming conventions
- Type-safe component props

⚠️ **Areas for Improvement:**
- Dual definition of tokens (HTML config + CSS variables)
- No centralized JavaScript/TypeScript token access
- Some hardcoded spacing values
- Inconsistent shadow usage

## 🎯 Migration Goals

1. **Centralize design tokens** - Single source of truth in TypeScript
2. **Type safety** - Full TypeScript support for all tokens
3. **Eliminate duplication** - Remove redundant token definitions
4. **Maintain compatibility** - Preserve existing visual design
5. **Improve DX** - Better autocomplete and documentation

## 📋 Identified Inconsistencies

### 1. **Duplicate Token Definitions**

**Issue:** Tokens defined in two places:
- `index.html` (lines 21-81) - Tailwind config
- `/public/styles/index.css` (lines 10-47) - CSS variables

**Impact:** Medium - Could lead to drift over time

**Resolution:**
- Keep Tailwind config in HTML for now (CDN requirement)
- Use `/src/design-system/tokens.ts` as canonical source
- Consider migrating to installed Tailwind in future

### 2. **Spacing Inconsistencies**

**Found instances:**
```tsx
// Various spacing values used:
gap-1, gap-2, gap-3, gap-4, gap-6, gap-8, gap-12
mb-1, mb-2, mb-3, mb-4, mb-6, mb-8, mb-12
p-2, p-3, p-4, p-6
```

**Analysis:** Actually consistent! Using Tailwind's 4px-based scale.

**Status:** ✅ No action needed

### 3. **Shadow Usage**

**Current shadows in use:**
- `shadow-illumination` - Gold glow (buttons, cards)
- `shadow-illumination-intense` - Stronger glow (hover states)
- `shadow-subtle` - Basic card shadow
- `shadow-elevated` - Medium elevation
- `shadow-floating` - High elevation

**Status:** ✅ Well-defined and consistent

### 4. **Typography Scale**

**Font sizes in use:**
- `text-xs` (12px) - Labels, small text
- `text-sm` (14px) - Body text, inputs
- `text-base` (16px) - Default body
- `text-lg` (18px) - Large body
- `text-xl` (20px) - Small headings
- `text-2xl` (24px) - H4
- `text-3xl` (30px) - H3
- `text-4xl` (36px) - H2
- `text-5xl` (48px) - H1
- `text-6xl` (60px) - Hero text

**Status:** ✅ Consistent usage throughout

### 5. **Border Radius**

**Current usage:**
- `rounded-brand-btn` (12px) - Buttons, inputs
- `rounded-brand-card` (16px) - Cards
- `rounded-brand-modal` (20px) - Modals
- `rounded-lg` (8px) - Small elements
- `rounded-xl` (12px) - Medium elements
- `rounded-full` - Circular elements (avatars, tags)

**Inconsistency:** Some overlap between `rounded-xl` and `rounded-brand-btn`

**Resolution:** 
- Standardize on `rounded-brand-btn` for buttons/inputs
- Use `rounded-brand-card` for cards
- Use standard Tailwind values (`rounded-lg`, `rounded-xl`) for utility cases

### 6. **Animation Durations**

**Current usage:**
```css
transition-all duration-300
transition-colors duration-300
transition-transform duration-300
animation: fade-in 0.6s ease-out
animation: slide-up 0.8s ease-out
animation: float 6s infinite
```

**Analysis:** 
- Interactive transitions: 300ms (good)
- Entry animations: 600-800ms (good)
- Ambient animations: 4-6s (good)

**Status:** ✅ Consistent and well-considered

## 🚀 Migration Phases

### Phase 1: Foundation (Completed ✅)

**Tasks:**
- [x] Create `/src/design-system/` directory structure
- [x] Define TypeScript types in `types.ts`
- [x] Extract and organize tokens in `tokens.ts`
- [x] Create theme configuration in `theme.ts`
- [x] Create comprehensive documentation

**Status:** Complete

### Phase 2: Component Updates (Recommended)

**Objective:** Update existing components to use design system exports

**Priority Components:**
1. `Button.tsx` - High usage, visible impact
2. `Card.tsx` - High usage
3. `Input.tsx` - High usage
4. `Tag.tsx` - Medium usage
5. Other components as needed

**Example Migration:**

**Before:**
```tsx
// Button.tsx
const baseStyles = `
  inline-flex items-center justify-center font-semibold
  transition-all duration-300 ease-out
  rounded-brand-btn
`;
```

**After:**
```tsx
// Button.tsx
import { tokens } from '@/design-system';

const baseStyles = `
  inline-flex items-center justify-center font-semibold
  transition-all duration-300 ease-out
  rounded-brand-btn
`;
// Keep Tailwind classes, but import tokens for programmatic access
```

**Estimated Effort:** 2-4 hours

### Phase 3: Tailwind Configuration Migration (Optional)

**Objective:** Move from CDN to installed Tailwind CSS

**Benefits:**
- Smaller bundle size (unused utilities purged)
- Faster builds (no runtime CDN dependency)
- Better IDE support
- Type-safe config

**Steps:**

1. **Install Tailwind CSS**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Create `tailwind.config.ts`**
```typescript
import type { Config } from 'tailwindcss';
import { tokens } from './src/design-system';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Map design tokens to Tailwind
        'radiance-gold': tokens.colors.radiance.gold,
        'radiance-amber': tokens.colors.radiance.amber,
        // ... (all other colors)
      },
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      // ... (other extensions)
    },
  },
} satisfies Config;
```

3. **Update `src/index.tsx`**
```tsx
import './index.css';  // Import Tailwind styles
```

4. **Create `src/index.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import existing custom CSS */
@import '../public/styles/index.css';
```

5. **Remove CDN from `index.html`**
```html
<!-- Remove these lines: -->
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = { ... }</script>
```

**Estimated Effort:** 4-6 hours

**Risk:** Medium - Requires testing all components

### Phase 4: CSS Variables Consolidation (Optional)

**Objective:** Generate CSS variables from TypeScript tokens

**Implementation:**

1. **Create a script to generate CSS variables**
```typescript
// scripts/generate-css-vars.ts
import { tokens } from '../src/design-system';
import fs from 'fs';

function generateCSSVariables() {
  let css = ':root {\n';
  
  // Generate color variables
  css += `  --color-radiance-gold: ${tokens.colors.radiance.gold};\n`;
  // ... (all other tokens)
  
  css += '}\n';
  
  fs.writeFileSync('public/styles/generated-vars.css', css);
}

generateCSSVariables();
```

2. **Add to build process**
```json
// package.json
{
  "scripts": {
    "prebuild": "tsx scripts/generate-css-vars.ts",
    "build": "vite build"
  }
}
```

**Estimated Effort:** 2-3 hours

## 📝 Component-by-Component Checklist

### High Priority

- [ ] `Button.tsx` - Import and use design tokens
- [ ] `Card.tsx` - Import and use design tokens
- [ ] `Input.tsx` - Import and use design tokens
- [ ] `Textarea.tsx` - Import and use design tokens
- [ ] `Tag.tsx` - Import and use design tokens

### Medium Priority

- [ ] `Navigation.tsx` - Import and use design tokens
- [ ] `Footer.tsx` - Import and use design tokens
- [ ] `ServiceCard.tsx` - Import and use design tokens
- [ ] `Testimonial.tsx` - Import and use design tokens
- [ ] `Accordion.tsx` - Import and use design tokens

### Low Priority

- [ ] `MaturityLadder.tsx` - Import and use design tokens
- [ ] `CapacityGapVisual.tsx` - Import and use design tokens
- [ ] `LaborArbitrageHighlight.tsx` - Import and use design tokens
- [ ] `NewsletterCapture.tsx` - Import and use design tokens
- [ ] Page components - Import and use design tokens

## 🧪 Testing Strategy

### 1. Visual Regression Testing

**Before migration:**
- Take screenshots of all pages
- Document current component states

**After migration:**
- Compare screenshots
- Verify no visual changes

**Tools:** Manual comparison or automated tools like Percy, Chromatic

### 2. Component Testing

**For each updated component:**
```tsx
// Test that design tokens are accessible
import { tokens } from '@/design-system';

test('uses correct brand color', () => {
  expect(tokens.colors.radiance.gold).toBe('#E8B84A');
});
```

### 3. Manual QA

**Checklist per page:**
- [ ] Colors match original
- [ ] Spacing is consistent
- [ ] Typography is correct
- [ ] Shadows render properly
- [ ] Hover states work
- [ ] Responsive behavior intact

## 🎨 Design Decisions Needed

### 1. Light Mode Support

**Question:** Should we implement a full light theme?

**Current State:** Dark mode only

**Recommendation:** 
- Defer light mode for now
- Design system is ready for it (see `theme.ts`)
- Can be added in future without breaking changes

### 2. Tailwind CDN vs. Installed

**Question:** Migrate to installed Tailwind CSS?

**Pros:**
- Better performance
- Smaller bundle size
- Better IDE support

**Cons:**
- Migration effort
- Requires testing

**Recommendation:** 
- Migrate in Phase 3 (optional but recommended)
- Low risk, high benefit

### 3. CSS-in-JS Consideration

**Question:** Should we use CSS-in-JS (styled-components, emotion)?

**Current State:** Tailwind classes + CSS modules approach

**Recommendation:**
- **No** - Current approach works well
- Tailwind + design tokens provides good DX
- Adding CSS-in-JS would increase bundle size
- Current approach is type-safe with design tokens

## 📈 Success Metrics

### Developer Experience
- [ ] Autocomplete works for all design tokens
- [ ] Type errors caught at compile time
- [ ] Documentation is clear and accessible
- [ ] New developers can use design system easily

### Consistency
- [ ] All colors sourced from design tokens
- [ ] All spacing uses consistent scale
- [ ] All shadows use defined tokens
- [ ] Typography follows scale

### Maintainability
- [ ] Single source of truth for tokens
- [ ] Easy to update colors globally
- [ ] Component variants are standardized
- [ ] Theme switching is possible (dark/light)

## 🔄 Rollback Plan

If migration causes issues:

1. **Immediate:** Design tokens are additive only - existing code still works
2. **Component level:** Can revert individual components
3. **Full rollback:** Remove `/src/design-system/` directory

**Risk:** Low - Migration is non-breaking

## 📚 Training & Documentation

### For Developers

**Onboarding checklist:**
- [ ] Read `README.md` in `/src/design-system/`
- [ ] Review token structure in `tokens.ts`
- [ ] Try creating a component using design tokens
- [ ] Understand Tailwind class → token mapping

**Quick reference:**
- Color tokens: `tokens.colors.[scale].[shade]`
- Spacing: `tokens.spacing[number]`
- Typography: `tokens.typography.fontSize[size]`
- Shadows: `tokens.shadows[type]`

### For Designers

**Design handoff process:**
- Use exact color values from `tokens.ts`
- Reference spacing scale (4px increments)
- Use defined typography scale
- Specify shadows by token name

## 🎯 Next Steps

### Immediate Actions (Week 1)

1. ✅ Review this migration plan
2. ✅ Get approval from team
3. [ ] Begin Phase 2 (Component Updates)
   - Start with Button.tsx
   - Test thoroughly
   - Iterate on remaining components

### Short Term (Weeks 2-4)

4. [ ] Update all high-priority components
5. [ ] Update medium-priority components
6. [ ] Add usage examples to documentation
7. [ ] Create component showcase page (optional)

### Long Term (Month 2+)

8. [ ] Consider Phase 3 (Tailwind migration)
9. [ ] Monitor design token usage
10. [ ] Gather developer feedback
11. [ ] Iterate on design system

## 📞 Support & Questions

For questions about the design system:
- Review `/src/design-system/README.md`
- Check examples in this migration guide
- Consult with design system maintainers

---

**Document Version:** 1.0.0  
**Last Updated:** January 2026  
**Status:** Ready for implementation
