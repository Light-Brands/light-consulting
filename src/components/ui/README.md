# UI Component Library

Production-ready React components built on the Light Brand Consulting design system tokens. All components are built with TypeScript, accessibility, and best practices in mind.

## 📦 Installation & Usage

### Importing Components

```typescript
// Import individual components
import { Button, Card, Input } from '@/components/ui';

// Import specific component types
import type { ButtonProps, CardProps } from '@/components/ui';

// Import design tokens
import { tokens } from '@/design-system';
```

### Using the cn() Utility

The `cn()` utility (powered by `clsx`) helps merge class names:

```typescript
import { cn } from '@/components/ui';

<div className={cn('base-class', isActive && 'active-class', className)} />
```

## 🎨 Components

### Typography

#### Heading

Semantic heading component with consistent styling.

```tsx
import { Heading } from '@/components/ui';

<Heading level="h1" gradient>
  Welcome to Light
</Heading>

<Heading level="h2">
  Section Title
</Heading>
```

**Props:**
- `level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` - Heading level (default: `h2`)
- `gradient?: boolean` - Apply gradient text effect
- `as?: React.ElementType` - Render as different element
- `className?: string` - Additional CSS classes

#### Text

Body text component with variants.

```tsx
import { Text } from '@/components/ui';

<Text variant="lead">
  Large introductory text
</Text>

<Text variant="body">
  Standard body text
</Text>

<Text variant="muted">
  Muted helper text
</Text>
```

**Props:**
- `variant?: 'body' | 'lead' | 'large' | 'small' | 'muted'` (default: `body`)
- `align?: 'left' | 'center' | 'right' | 'justify'`
- `as?: React.ElementType`

#### Label

Form label component.

```tsx
import { Label } from '@/components/ui';

<Label htmlFor="email" required>
  Email Address
</Label>
```

**Props:**
- `htmlFor?: string` - Associated input ID
- `required?: boolean` - Show required indicator

---

### Layout

#### Container

Responsive container with max-width.

```tsx
import { Container } from '@/components/ui';

<Container size="wide">
  Content
</Container>
```

**Props:**
- `size?: 'narrow' | 'default' | 'wide' | 'full'` (default: `default`)

#### Section

Page section with vertical spacing.

```tsx
import { Section } from '@/components/ui';

<Section spacing="lg" background="elevated">
  Section content
</Section>
```

**Props:**
- `spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'` (default: `md`)
- `background?: 'base' | 'elevated' | 'surface'`

#### Grid

Grid layout component.

```tsx
import { Grid } from '@/components/ui';

<Grid cols={3} gap={6} responsive>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

**Props:**
- `cols?: 1 | 2 | 3 | 4 | 6 | 12` (default: `1`)
- `gap?: 2 | 3 | 4 | 6 | 8 | 12` (default: `6`)
- `responsive?: boolean` (default: `true`)

#### Flex

Flexbox layout component.

```tsx
import { Flex } from '@/components/ui';

<Flex justify="between" align="center" gap={4}>
  <div>Left</div>
  <div>Right</div>
</Flex>
```

**Props:**
- `direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'`
- `align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'`
- `justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'`
- `gap?: 2 | 3 | 4 | 6 | 8 | 12`
- `wrap?: boolean`

---

### Form Components

#### Button

Flexible button component with multiple variants.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>

<Button variant="outline" leftIcon={<Icon />} isLoading>
  Submit
</Button>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'`
- `size?: 'sm' | 'md' | 'lg' | 'xl'`
- `isLoading?: boolean` - Show loading spinner
- `leftIcon?: ReactNode` - Icon before text
- `rightIcon?: ReactNode` - Icon after text
- `fullWidth?: boolean` - Full width button

#### IconButton

Icon-only button.

```tsx
import { IconButton } from '@/components/ui';

<IconButton
  icon={<CloseIcon />}
  aria-label="Close"
  variant="ghost"
/>
```

#### Input

Text input with label, error, and hint support.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  error="Invalid email"
  hint="We'll never share your email"
  required
/>

<Input
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>
```

**Props:**
- `label?: string`
- `error?: string` - Error message
- `hint?: string` - Helper text
- `leftIcon?: ReactNode`
- `rightIcon?: ReactNode`
- `inputSize?: 'sm' | 'md' | 'lg'`

#### Textarea

Multi-line text input.

```tsx
import { Textarea } from '@/components/ui';

<Textarea
  label="Message"
  placeholder="Enter your message..."
  rows={5}
  resize="vertical"
  required
/>
```

**Props:**
- `label?: string`
- `error?: string`
- `hint?: string`
- `textareaSize?: 'sm' | 'md' | 'lg'`
- `resize?: 'none' | 'vertical' | 'horizontal' | 'both'`

#### Select

Dropdown select input.

```tsx
import { Select } from '@/components/ui';

<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
  ]}
  required
/>
```

---

### Display Components

#### Card

Flexible card container with header, body, and footer.

```tsx
import { Card } from '@/components/ui';

<Card elevation="elevated" hoverable>
  <Card.Header divider>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content</p>
  </Card.Body>
  <Card.Footer divider align="right">
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Props:**
- `elevation?: 'none' | 'subtle' | 'elevated' | 'floating'`
- `padding?: 'none' | 'sm' | 'md' | 'lg'`
- `hoverable?: boolean` - Add hover effect

#### Badge

Small label component.

```tsx
import { Badge, DotBadge, NumberBadge } from '@/components/ui';

<Badge variant="premium">Featured</Badge>
<Badge variant="success" size="sm">Active</Badge>

<DotBadge variant="success">Online</DotBadge>

<NumberBadge count={5} variant="error" />
<NumberBadge count={150} max={99} variant="premium" />
```

**Variants:**
- `default`, `premium`, `wisdom`, `success`, `warning`, `error`, `info`

**Sizes:**
- `sm`, `md`, `lg`

#### Alert

Alert and notification component.

```tsx
import { Alert, Toast } from '@/components/ui';

<Alert variant="success" title="Success!" dismissible>
  Your changes have been saved.
</Alert>

<Alert variant="error" title="Error" showIcon>
  An error occurred.
</Alert>

<Toast
  variant="info"
  duration={3000}
  position="top-right"
  onDismiss={() => {}}
>
  Notification message
</Toast>
```

**Variants:**
- `info`, `success`, `warning`, `error`, `default`

#### Modal

Accessible modal dialog.

```tsx
import { Modal, ConfirmDialog } from '@/components/ui';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content</p>
</Modal>

<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="Confirm Action"
  message="Are you sure?"
  confirmText="Yes, proceed"
  confirmVariant="danger"
/>
```

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'`
- `showCloseButton?: boolean` (default: `true`)
- `closeOnBackdropClick?: boolean` (default: `true`)
- `closeOnEscape?: boolean` (default: `true`)

---

## ♿ Accessibility

All components follow WAI-ARIA guidelines:

- **Keyboard Navigation** - Full keyboard support
- **Focus Management** - Proper focus indicators and trapping
- **ARIA Attributes** - Semantic HTML and ARIA labels
- **Screen Reader Support** - Meaningful labels and descriptions

### Example: Modal Accessibility

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="User Profile"
  initialFocusRef={firstInputRef}
>
  <Input ref={firstInputRef} label="Name" />
</Modal>
```

- Traps focus within modal
- Restores focus on close
- Supports Escape key
- Uses `role="dialog"` and `aria-modal`

## 🎨 Design Tokens

All components use design tokens exclusively - no hardcoded values!

```tsx
import { tokens } from '@/design-system';

// Colors
const color = tokens.colors.radiance.gold;

// Spacing
const spacing = tokens.spacing[6];

// Typography
const fontSize = tokens.typography.fontSize.lg;

// Shadows
const shadow = tokens.shadows.illumination;
```

## 🔧 Customization

### Using className

All components accept a `className` prop for customization:

```tsx
<Button className="custom-class">
  Custom Button
</Button>
```

### Polymorphic Components

Some components support the `as` prop to render as different elements:

```tsx
<Text as="span">Rendered as span</Text>
<Heading as="div" level="h2">Div with h2 styling</Heading>
```

## 📚 Examples

### Form Example

```tsx
import { Stack, Input, Textarea, Select, Button } from '@/components/ui';

<Stack spacing={6}>
  <Input
    label="Name"
    placeholder="John Doe"
    required
  />
  <Input
    label="Email"
    type="email"
    placeholder="john@example.com"
    required
  />
  <Select
    label="Country"
    options={countries}
    required
  />
  <Textarea
    label="Message"
    rows={5}
    placeholder="Your message..."
  />
  <Button fullWidth>
    Submit
  </Button>
</Stack>
```

### Card Grid Example

```tsx
import { Grid, Card, Heading, Text, Button } from '@/components/ui';

<Grid cols={3} gap={6}>
  {items.map(item => (
    <Card key={item.id} elevation="elevated" hoverable>
      <Heading level="h3">{item.title}</Heading>
      <Text className="mt-2">{item.description}</Text>
      <Button className="mt-4" variant="outline" size="sm">
        Learn More
      </Button>
    </Card>
  ))}
</Grid>
```

## 🧪 Testing

All components are built for testability:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
});
```

## 📖 Best Practices

1. **Use semantic components** - `<Heading>` instead of `<h1>` with inline styles
2. **Leverage design tokens** - Never hardcode colors, spacing, etc.
3. **Provide aria-labels** - Especially for icon-only buttons
4. **Use proper sizes** - Consistent sizing across the app
5. **Handle loading states** - Use `isLoading` prop on buttons
6. **Validate inputs** - Use `error` prop for validation messages

## 🔗 Related Documentation

- [Design System Tokens](/src/design-system/README.md)
- [Migration Guide](/src/design-system/MIGRATION.md)
- [Component Showcase](/src/pages/DesignSystem.tsx)

---

**Version:** 1.0.0  
**Last Updated:** January 2026  
**Built with:** React 19, TypeScript, Tailwind CSS, class-variance-authority
