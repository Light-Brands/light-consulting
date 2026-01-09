# Light Brand Consulting Design System

A comprehensive design system foundation for the Light Brand Consulting Vite + React application. This design system codifies the visual language and provides a consistent, type-safe way to use design tokens throughout the application.

## 📁 Structure

```
src/design-system/
├── types.ts         # TypeScript type definitions for all design tokens
├── tokens.ts        # Core design tokens (colors, typography, spacing, etc.)
├── theme.ts         # Theme configuration and utilities
├── index.ts         # Central export point
└── README.md        # This file
```

## 🎨 Design Philosophy

The Light Brand Consulting design system is built around the concept of **"Light emerging from depth"** — a sophisticated dark theme with warm, illuminating accents.

### Core Principles

1. **Illumination** - Strategic use of gold/amber tones to draw attention and create warmth
2. **Depth** - Rich, professional dark backgrounds that create sophistication
3. **Clarity** - Cream tones for secondary accents and subtle highlights
4. **Wisdom** - Violet tones for AI-related features and intelligence markers

## 🚀 Quick Start

### Basic Usage

```typescript
import { tokens, getColor, getSpacing } from '@/design-system';

// Using color tokens
const primaryColor = tokens.colors.radiance.gold; // '#E8B84A'

// Using helper functions
const accentColor = getColor('radiance.amber'); // '#D4944C'
const spacing = getSpacing(4); // '1rem' (16px)
```

### In React Components

```typescript
import { tokens } from '@/design-system';

function MyComponent() {
  return (
    <div style={{
      backgroundColor: tokens.colors.depth.base,
      padding: tokens.spacing[6],
      borderRadius: tokens.borderRadius['brand-card'],
    }}>
      <h1 style={{ color: tokens.colors.radiance.gold }}>
        Hello World
      </h1>
    </div>
  );
}
```

### With Tailwind Classes (Current Approach)

The application currently uses Tailwind CDN with custom configuration. Design tokens align with Tailwind class names:

```tsx
// Color classes match token names
<div className="bg-depth-base text-text-primary border-depth-border">
  <h1 className="text-radiance-gold">Title</h1>
</div>

// Spacing uses Tailwind scale
<div className="p-6 mb-4 gap-3">
  Content
</div>
```

## 📐 Design Tokens

### Colors

#### Radiance Scale (Primary Accent)
Gold tones for primary actions, highlights, and brand moments.

- `radiance.gold` - `#E8B84A` - Primary brand gold
- `radiance.amber` - `#D4944C` - Warmer variation
- `radiance.warm` - `#C67D4E` - Warmest variation

```tsx
// Usage examples
<Button className="bg-radiance-gold" />
<div className="text-radiance-amber" />
<div className="border-radiance-gold/30" /> {/* with opacity */}
```

#### Clarity Scale (Secondary Accent)
Cream tones for subtle accents and secondary elements.

- `clarity.cream` - `#FDF6E3` - Lightest cream
- `clarity.soft` - `#F5E6C8` - Soft cream
- `clarity.muted` - `#D9C9A5` - Muted cream

#### Wisdom Scale (AI Features)
Violet tones for AI-related features and intelligence markers.

- `wisdom.violet` - `#8B7EC8` - Primary violet
- `wisdom.soft` - `#A599D4` - Lighter violet
- `wisdom.muted` - `#7A6BA8` - Deeper violet

#### Depth Scale (Backgrounds)
Dark, warm tones for backgrounds and surfaces.

- `depth.base` - `#0F0E0D` - Body background (deepest)
- `depth.elevated` - `#151413` - Elevated surfaces
- `depth.surface` - `#1C1A18` - Card surfaces
- `depth.border` - `#2A2724` - Border color

#### Text Scale
Warm, moonlight-inspired text colors.

- `text.primary` - `#F8F5F0` - Primary text (highest contrast)
- `text.secondary` - `#E5E0D8` - Secondary text
- `text.muted` - `#A8A299` - Muted text (lowest contrast)

#### Semantic Colors
Standard feedback colors for states.

- `semantic.success` - `#5CB85C` - Success states
- `semantic.warning` - `#F0A030` - Warning states
- `semantic.error` - `#E85A5A` - Error states
- `semantic.info` - `#5DADE2` - Info states

### Typography

#### Font Families

```typescript
tokens.typography.fontFamily.display   // Inter (display text)
tokens.typography.fontFamily.heading   // Inter (headings)
tokens.typography.fontFamily.body      // Inter (body text)
tokens.typography.fontFamily.mono      // Monospace fonts
```

#### Font Sizes

Complete scale from `xs` to `9xl`, each with corresponding line heights:

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `xs` | 12px | 16px | Small labels, captions |
| `sm` | 14px | 20px | Body text, form inputs |
| `base` | 16px | 24px | Default body text |
| `lg` | 18px | 28px | Large body text |
| `xl` | 20px | 28px | Small headings |
| `2xl` | 24px | 32px | H4 headings |
| `3xl` | 30px | 36px | H3 headings |
| `4xl` | 36px | 40px | H2 headings |
| `5xl` | 48px | 48px | H1 headings |
| `6xl` | 60px | 60px | Display headings |
| `7xl` | 72px | 72px | Hero text |
| `8xl` | 96px | 96px | Large hero text |
| `9xl` | 128px | 128px | Extra large display |

```typescript
// Usage
tokens.typography.fontSize.lg.value        // '1.125rem'
tokens.typography.fontSize.lg.lineHeight   // '1.75rem'
```

#### Font Weights

- `thin` (100), `extralight` (200), `light` (300)
- `normal` (400), `medium` (500), `semibold` (600)
- `bold` (700), `extrabold` (800), `black` (900)

### Spacing

Based on a 4px (0.25rem) base unit. Available from `0` to `96` (384px).

**Common Spacing:**
- `2` = 8px - Tight spacing
- `4` = 16px - Base spacing
- `6` = 24px - Card padding
- `8` = 32px - Section spacing (small)
- `12` = 48px - Section spacing (medium)
- `16` = 64px - Section spacing (large)
- `24` = 96px - Hero spacing

```typescript
// Usage
tokens.spacing[4]   // '1rem' (16px)
tokens.spacing[6]   // '1.5rem' (24px)
```

### Border Radius

- Standard: `none`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`
- Brand-specific:
  - `brand-btn` - `12px` - Buttons
  - `brand-card` - `16px` - Cards
  - `brand-modal` - `20px` - Modals

### Shadows

**Standard shadows:** `none`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `inner`

**Brand-specific shadows:**
- `subtle` - Subtle depth
- `elevated` - Medium elevation
- `floating` - High elevation

**Colored glow shadows:**
- `illumination` - Gold glow
- `illumination-intense` - Intense gold glow
- `wisdom` - Violet glow
- `clarity` - Cream glow

```tsx
// Usage
<div className="shadow-illumination">Glowing card</div>
```

### Breakpoints

- `xs` - 475px - Extra small devices
- `sm` - 640px - Small devices
- `md` - 768px - Tablets
- `lg` - 1024px - Laptops
- `xl` - 1280px - Desktops
- `2xl` - 1536px - Large desktops

```tsx
// Usage with Tailwind
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

## 🧩 Component Tokens

Pre-configured tokens for common components:

```typescript
import { componentTokens } from '@/design-system';

// Button tokens
componentTokens.button.borderRadius        // '0.75rem'
componentTokens.button.fontSize.md         // '0.875rem'
componentTokens.button.padding.md          // { x: '1.5rem', y: '0.75rem' }

// Input tokens
componentTokens.input.borderRadius         // '0.75rem'
componentTokens.input.padding              // { x: '1rem', y: '0.875rem' }

// Card tokens
componentTokens.card.borderRadius          // '1rem'
componentTokens.card.padding               // '1.5rem'
```

## 🛠️ Utility Functions

### Color Utilities

```typescript
import { getColor, hexToRgba } from '@/design-system';

// Get color by path
const gold = getColor('radiance.gold'); // '#E8B84A'

// Convert hex to rgba
const goldWithAlpha = hexToRgba('#E8B84A', 0.5); // 'rgba(232, 184, 74, 0.5)'
```

### Spacing Utilities

```typescript
import { getSpacing } from '@/design-system';

const padding = getSpacing(6); // '1.5rem'
```

### Shadow Utilities

```typescript
import { getShadow } from '@/design-system';

const glow = getShadow('illumination'); // '0 0 30px rgba(232, 184, 74, 0.25)'
```

### Theme Utilities

```typescript
import { brandGradients, createGradient } from '@/design-system';

// Use pre-defined gradients
const gradient = brandGradients.illumination;

// Create custom gradient
const customGradient = createGradient('linear', '90deg', [
  { color: '#E8B84A', position: '0%' },
  { color: '#D4944C', position: '100%' },
]);
```

## 📝 Naming Conventions

### General Rules

1. **Semantic naming** - Use purpose-based names, not value-based
   - ✅ `text-primary`, `bg-depth-base`
   - ❌ `text-gray-900`, `bg-black`

2. **Scale consistency** - Use consistent scale naming
   - Colors: `base`, `elevated`, `surface`, `border`
   - Sizes: `xs`, `sm`, `md`, `lg`, `xl`
   - Numbers: `2`, `4`, `6`, `8`, `12`, `16`, etc.

3. **Hierarchy** - Organize from general to specific
   - `colors.radiance.gold`
   - `typography.fontSize.lg`
   - `spacing[6]`

### Component Variants

Standard variants across components:
- `primary` - Main action (gold gradient)
- `secondary` - Secondary action (outlined)
- `ghost` - Subtle action (transparent)
- `outline` - Outlined style

Standard sizes:
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `xl` - Extra large

## 🎯 Best Practices

### 1. Use Design Tokens, Not Hard-coded Values

```tsx
// ❌ Bad
<div style={{ color: '#E8B84A', padding: '24px' }}>

// ✅ Good
<div style={{ 
  color: tokens.colors.radiance.gold,
  padding: tokens.spacing[6]
}}>
```

### 2. Prefer Tailwind Classes for Consistency

```tsx
// ✅ Good - Uses established Tailwind pattern
<div className="bg-depth-base p-6 rounded-brand-card">

// ⚠️ Less ideal - Inline styles (use when necessary)
<div style={{ backgroundColor: tokens.colors.depth.base }}>
```

### 3. Use Semantic Color Names

```tsx
// ❌ Bad - Uses implementation detail
<p className="text-[#F8F5F0]">

// ✅ Good - Uses semantic name
<p className="text-text-primary">
```

### 4. Consistent Spacing Scale

```tsx
// ❌ Bad - Arbitrary spacing
<div className="mb-[18px] mt-[22px]">

// ✅ Good - Uses spacing scale
<div className="mb-4 mt-6">  {/* 16px and 24px */}
```

### 5. Type Safety

```typescript
// ✅ Use TypeScript imports for type safety
import { tokens, ColorTokens, TypographyTokens } from '@/design-system';

// Full autocomplete and type checking
const color: string = tokens.colors.radiance.gold;
```

## 🔄 Migration Guide

See `MIGRATION.md` (in the same directory) for a detailed migration plan to convert existing styles to use design tokens.

## 📚 Examples

### Creating a Card Component

```tsx
import { tokens } from '@/design-system';

function ProductCard() {
  return (
    <div
      className="bg-depth-elevated border border-depth-border rounded-brand-card p-6 shadow-subtle hover:shadow-illumination transition-all"
    >
      <h3 className="text-xl font-bold text-text-primary mb-2">
        Product Title
      </h3>
      <p className="text-text-secondary text-sm mb-4">
        Product description goes here
      </p>
      <button className="bg-gradient-to-br from-radiance-gold to-radiance-amber text-depth-base font-semibold px-6 py-3 rounded-brand-btn">
        Learn More
      </button>
    </div>
  );
}
```

### Creating a Form Input

```tsx
import { tokens } from '@/design-system';

function CustomInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold text-radiance-gold uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        className="block w-full bg-depth-base border border-depth-border rounded-brand-btn text-text-primary px-4 py-3.5 focus:ring-2 focus:ring-radiance-gold/20 focus:border-radiance-gold"
        {...props}
      />
    </div>
  );
}
```

### Using Gradients

```tsx
import { brandGradients } from '@/design-system';

function HeroSection() {
  return (
    <div
      style={{
        background: brandGradients.illumination,
        padding: tokens.spacing[12],
      }}
    >
      <h1 className="text-6xl font-black">Hero Title</h1>
    </div>
  );
}
```

## 🔍 Token Reference

For a complete list of all available tokens, see:
- `tokens.ts` - Full token definitions
- `types.ts` - TypeScript type definitions

## 🤝 Contributing

When adding new design tokens:

1. Add the type definition to `types.ts`
2. Add the token value to `tokens.ts`
3. Update this README with examples
4. Ensure backward compatibility
5. Update components to use new tokens

## 📖 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)
- [Inter Font](https://rsms.me/inter/)

---

**Version:** 1.0.0  
**Last Updated:** January 2026  
**Maintained by:** Light Brand Consulting Team
