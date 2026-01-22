# Light Brand Consulting Design System

A comprehensive design system for building consistent, accessible, and beautiful interfaces.

## Table of Contents

- [Quick Start](#quick-start)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing](#spacing)
- [Components](#components)
- [Theme System](#theme-system)
- [Token Reference](#token-reference)
- [Migration Guide](#migration-guide)

---

## Quick Start

### Installation

The design system is already integrated into the project. Import what you need:

```tsx
// Import tokens
import { tokens, getColor, getSpacing } from '@/design-system';

// Import theme utilities
import { useTheme, ThemeProvider } from '@/design-system';

// Import components
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
```

### Basic Usage

```tsx
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function MyComponent() {
  return (
    <div className="p-6 bg-depth-surface rounded-brand-card">
      <h1 className="text-2xl font-bold text-text-primary mb-4">
        Welcome
      </h1>
      <p className="text-text-secondary mb-6">
        Get started with our design system.
      </p>
      <div className="flex gap-4">
        <Button variant="primary">Get Started</Button>
        <Button variant="secondary">Learn More</Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
```

---

## Color Palette

### Brand Colors

Our palette is built around the concept of "light emerging from depth" - warm, sophisticated tones that create premium experiences.

#### Radiance Scale (Primary Accent)
Gold tones for illumination moments, CTAs, and emphasis.

| Token | Hex | Usage |
|-------|-----|-------|
| `radiance-gold` | `#E8B84A` | Primary brand color, buttons, links |
| `radiance-amber` | `#D4944C` | Gradients, hover states |
| `radiance-warm` | `#C67D4E` | Warmest variation, accents |

```tsx
// Tailwind classes
<div className="bg-radiance-gold text-radiance-amber border-radiance-warm" />

// Token access
import { tokens } from '@/design-system';
const gold = tokens.colors.radiance.gold; // '#E8B84A'
```

#### Clarity Scale (Secondary Accent)
Cream tones for soft highlights and secondary elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `clarity-cream` | `#FDF6E3` | Light backgrounds, highlights |
| `clarity-soft` | `#F5E6C8` | Soft accents |
| `clarity-muted` | `#D9C9A5` | Borders, subtle elements |

#### Wisdom Scale (AI Features)
Purple/violet tones for AI-related features and intelligence.

| Token | Hex | Usage |
|-------|-----|-------|
| `wisdom-violet` | `#8B7EC8` | AI indicators, special features |
| `wisdom-soft` | `#A599D4` | Lighter AI elements |
| `wisdom-muted` | `#7A6BA8` | Deeper AI accents |

#### Depth Scale (Backgrounds)
Warm blacks for professional depth.

| Token | Hex (Dark) | Hex (Light) | Usage |
|-------|------------|-------------|-------|
| `depth-base` | `#0F0E0D` | `#FFFFFF` | Body background |
| `depth-elevated` | `#151413` | `#F8F5F0` | Elevated surfaces |
| `depth-surface` | `#1C1A18` | `#FDF6E3` | Cards, panels |
| `depth-border` | `#2A2724` | `#D9C9A5` | Borders |

#### Text Scale

| Token | Hex (Dark) | Hex (Light) | Usage |
|-------|------------|-------------|-------|
| `text-primary` | `#F8F5F0` | `#0F0E0D` | Main text |
| `text-secondary` | `#E5E0D8` | `#1C1A18` | Secondary text |
| `text-muted` | `#A8A299` | `#4A4843` | Muted text |

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#5CB85C` | Success states |
| `warning` | `#F0A030` | Warning states |
| `error` | `#E85A5A` | Error states |
| `info` | `#5DADE2` | Informational |

---

## Typography

### Font Family

We use Inter as our primary typeface across all contexts.

```tsx
// Tailwind classes
<h1 className="font-display">Display Text</h1>
<h2 className="font-heading">Heading Text</h2>
<p className="font-body">Body Text</p>
<code className="font-mono">Code</code>
```

### Font Sizes

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Captions, labels |
| `text-sm` | 14px | 20px | Small text, buttons |
| `text-base` | 16px | 24px | Body text |
| `text-lg` | 18px | 28px | Large body |
| `text-xl` | 20px | 28px | Small headings |
| `text-2xl` | 24px | 32px | Section headings |
| `text-3xl` | 30px | 36px | Page headings |
| `text-4xl` | 36px | 40px | Hero text |
| `text-5xl` | 48px | 48px | Display text |

### Font Weights

```tsx
<span className="font-light">Light (300)</span>
<span className="font-normal">Normal (400)</span>
<span className="font-medium">Medium (500)</span>
<span className="font-semibold">Semibold (600)</span>
<span className="font-bold">Bold (700)</span>
```

---

## Spacing

Based on a 4px base unit (0.25rem).

| Token | Value | Pixels |
|-------|-------|--------|
| `0` | 0 | 0px |
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |
| `20` | 5rem | 80px |
| `24` | 6rem | 96px |

```tsx
// Usage examples
<div className="p-4">16px padding</div>
<div className="mt-6 mb-8">24px top, 32px bottom margin</div>
<div className="gap-4">16px gap in flex/grid</div>
```

---

## Components

### Button

6 variants with 4 sizes available.

```tsx
import { Button } from '@/components/ui/Button';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// States
<Button isLoading>Loading...</Button>
<Button disabled>Disabled</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>
<Button rightIcon={<ArrowIcon />}>Next</Button>
```

### Card

```tsx
import { Card } from '@/components/ui/Card';

<Card elevation="subtle" padding="md">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Content>
    Card content goes here.
  </Card.Content>
</Card>
```

### Input

```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Invalid email address"
/>
```

### Badge

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="default">Default</Badge>
<Badge variant="premium">Premium</Badge>
<Badge variant="wisdom">AI</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Alert

```tsx
import { Alert } from '@/components/ui/Alert';

<Alert variant="info" title="Information">
  This is an informational alert.
</Alert>

<Alert variant="success" title="Success">
  Operation completed successfully.
</Alert>

<Alert variant="warning" title="Warning">
  Please review before continuing.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong.
</Alert>
```

### ThemeToggle

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Icon only (default)
<ThemeToggle />

// With text label
<ThemeToggle showLabel />

// Different sizes
<ThemeToggle size="sm" />
<ThemeToggle size="md" />
<ThemeToggle size="lg" />
```

---

## Theme System

### Using ThemeProvider

The app is already wrapped with `ThemeProvider` in `layout.tsx`. Access theme context anywhere:

```tsx
import { useTheme } from '@/design-system';

function MyComponent() {
  const { mode, setMode, toggleMode, theme } = useTheme();

  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={toggleMode}>Toggle Theme</button>
      <button onClick={() => setMode('light')}>Light</button>
      <button onClick={() => setMode('dark')}>Dark</button>
    </div>
  );
}
```

### Theme Persistence

Theme preference is automatically persisted to localStorage and restored on page load. The system also detects the user's OS preference if no stored preference exists.

### CSS Variables

Both themes use CSS custom properties, allowing seamless switching:

```css
/* These update automatically based on theme */
.my-element {
  background: var(--color-depth-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-depth-border);
}
```

---

## Token Reference

### Accessing Tokens in JavaScript

```tsx
import { tokens, getColor, getSpacing, getShadow } from '@/design-system';

// Direct access
const gold = tokens.colors.radiance.gold;
const spacing4 = tokens.spacing[4];

// Helper functions
const gold2 = getColor('radiance.gold');
const spacing = getSpacing(4);
const shadow = getShadow('elevated');
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 2px | Subtle rounding |
| `rounded-md` | 6px | Default rounding |
| `rounded-lg` | 8px | Cards, panels |
| `rounded-xl` | 12px | Larger elements |
| `rounded-brand-btn` | 12px | Buttons |
| `rounded-brand-card` | 16px | Cards |
| `rounded-brand-modal` | 20px | Modals |
| `rounded-full` | 9999px | Pills, avatars |

### Shadows

```tsx
// Standard shadows
<div className="shadow-sm">Subtle shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>

// Brand shadows
<div className="shadow-subtle">Subtle depth</div>
<div className="shadow-elevated">Elevated</div>
<div className="shadow-floating">Floating</div>

// Glow effects
<div className="shadow-illumination">Gold glow</div>
<div className="shadow-wisdom">Purple glow</div>
```

### Z-Index Layers

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default |
| `z-dropdown` | 1000 | Dropdowns |
| `z-sticky` | 1100 | Sticky elements |
| `z-fixed` | 1200 | Fixed elements |
| `z-modal-backdrop` | 1300 | Modal overlays |
| `z-modal` | 1400 | Modal content |
| `z-popover` | 1500 | Popovers |
| `z-tooltip` | 1600 | Tooltips |

---

## Migration Guide

### Before (Hardcoded Values)

```tsx
// Old approach
<div style={{ backgroundColor: '#1C1A18', color: '#F8F5F0' }}>
  <button style={{ backgroundColor: '#E8B84A' }}>
    Click me
  </button>
</div>
```

### After (Design System)

```tsx
// New approach with Tailwind classes
<div className="bg-depth-surface text-text-primary">
  <Button variant="primary">
    Click me
  </Button>
</div>
```

### Before (Custom Button)

```tsx
// Old button
<button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
  Submit
</button>
```

### After (Button Component)

```tsx
// Design system button
<Button variant="primary" size="md">
  Submit
</Button>
```

---

## Best Practices

1. **Use Tailwind classes** with design tokens instead of hardcoded values
2. **Use components** from `/components/ui/` for consistency
3. **Use semantic colors** for feedback states (success, warning, error)
4. **Test in both themes** when building new components
5. **Follow the spacing scale** - avoid arbitrary values
6. **Use focus rings** for keyboard accessibility (built into components)

---

## File Structure

```
src/
├── design-system/
│   ├── tokens.ts          # Design tokens
│   ├── types.ts           # TypeScript types
│   ├── theme.ts           # Theme configuration
│   ├── ThemeProvider.tsx  # React context provider
│   ├── index.ts           # Main exports
│   └── DESIGN_SYSTEM.md   # This documentation
├── components/
│   └── ui/
│       ├── Button.tsx     # Button component
│       ├── Card.tsx       # Card component
│       ├── Input.tsx      # Input component
│       ├── Badge.tsx      # Badge component
│       ├── Alert.tsx      # Alert component
│       ├── ThemeToggle.tsx # Theme toggle
│       ├── variants.ts    # Shared CVA variants
│       └── utils.ts       # UI utilities
└── app/
    └── globals.css        # Global styles & theme CSS
```
