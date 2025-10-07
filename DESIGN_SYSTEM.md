# Design System Documentation

## Overview
This design system ensures consistency across all components using semantic color tokens, typography scales, and spacing utilities. **NEVER use hardcoded colors** - always use the design system tokens.

## Color Tokens

### Semantic Colors
All colors MUST be referenced using HSL format with CSS variables:

#### Primary Colors
- `text-primary` / `bg-primary` - Main brand color
- `text-primary-foreground` / `bg-primary-foreground` - Contrast text on primary
- `text-primary-glow` - Lighter variant for emphasis
- `text-primary-variant` - Darker variant for depth

#### Secondary Colors
- `text-secondary` / `bg-secondary` - Secondary brand color
- `text-secondary-foreground` - Contrast text on secondary

#### State Colors
- `text-success` / `bg-success` - Success states (green)
- `text-warning` / `bg-warning` - Warning states (amber)
- `text-destructive` / `bg-destructive` - Error/danger states (red)
- `text-info` / `bg-info` - Informational states (blue)

#### UI Colors
- `text-muted` / `bg-muted` - Subdued backgrounds
- `text-muted-foreground` - Secondary text
- `text-accent` / `bg-accent` - Accent highlights
- `text-foreground` / `bg-foreground` - Main text color
- `text-background` / `bg-background` - Main background

### ❌ NEVER Do This
```tsx
// WRONG - Hardcoded colors
<div className="text-white bg-blue-500">
<Brain className="text-purple-500" />
<Badge className="bg-green-100 text-green-800">
```

### ✅ ALWAYS Do This
```tsx
// CORRECT - Semantic tokens
<div className="text-primary-foreground bg-primary">
<Brain className="text-primary" />
<Badge variant="secondary" className="bg-success/10 text-success">
```

## Typography

### Font Sizes
- `text-xs` - 12px
- `text-sm` - 14px
- `text-base` - 16px (default)
- `text-lg` - 18px
- `text-xl` - 20px
- `text-2xl` - 24px
- `text-3xl` - 30px
- `text-4xl` - 36px
- `text-5xl` - 48px

### Font Weights
- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

### Responsive Typography
```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl">
```

## Spacing

### Padding & Margin
Use Tailwind's spacing scale:
- `p-1` to `p-12` (4px to 48px)
- `px-4` `py-2` for directional spacing
- `gap-4` for flex/grid gaps

### Mobile-First Spacing
```tsx
<div className="p-3 md:p-6 lg:p-8">
```

## Components

### Buttons
Use the button component with variants:
```tsx
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="hero">Hero CTA</Button>
```

### Cards
```tsx
<Card className="hover:shadow-lg transition-smooth">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Badges
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

## Gradients

### Available Gradients
- `bg-gradient-hero` - Main hero gradient
- `bg-gradient-card` - Card gradient
- `bg-gradient-subtle` - Subtle background
- `bg-gradient-ai` - AI feature highlight

### Usage
```tsx
<div className="bg-gradient-hero">Hero Section</div>
```

## Shadows

### Shadow Utilities
- `shadow-sm` - Subtle shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow
- `shadow-elegant` - Elegant drop shadow
- `shadow-glow` - Glowing effect

### Usage
```tsx
<Card className="shadow-elegant hover:shadow-glow transition-smooth">
```

## Animations & Transitions

### Utility Classes
- `transition-smooth` - Standard smooth transition
- `hover-scale` - Scale on hover
- `touch-target` - Minimum 44x44px touch target for mobile
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation

### Usage
```tsx
<Button className="transition-smooth hover-scale touch-target">
```

## Mobile Responsiveness

### Breakpoints
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

### Mobile-First Pattern
```tsx
<div className="p-3 md:p-6">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
  <Button size="mobile" className="w-full sm:w-auto">
</div>
```

## Dark/Light Mode

All colors automatically adapt to dark/light mode using CSS variables. Never hardcode colors for specific themes.

### Testing
Test components in both dark and light modes to ensure proper contrast and readability.

## Icon Colors

### Pattern
```tsx
// Feature-specific icons
<Brain className="w-5 h-5 text-primary" />
<Code className="w-5 h-5 text-accent" />
<CheckCircle2 className="w-5 h-5 text-success" />
<AlertCircle className="w-5 h-5 text-warning" />
<XCircle className="w-5 h-5 text-destructive" />
```

## Best Practices

1. **Always use semantic tokens** - Never hardcode colors
2. **Mobile-first responsive** - Start with mobile, scale up
3. **Consistent spacing** - Use the spacing scale
4. **Accessible touch targets** - Use `touch-target` class
5. **Smooth transitions** - Use `transition-smooth` for interactions
6. **Test both themes** - Ensure dark/light mode compatibility
7. **Use component variants** - Leverage existing button/badge/card variants
8. **Maintain consistency** - Follow established patterns across the app
