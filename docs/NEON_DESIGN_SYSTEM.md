# Neon Design System

Modern, futuristic design system with neon gradients, glassmorphism, and vibrant accents.

## Color Palette

### Neon Colors
```css
--neon-pink: 330 100% 60%     /* #F72585 */
--neon-cyan: 180 100% 60%     /* #00F5FF */
--neon-purple: 280 100% 65%   /* #A855F7 */
--neon-blue: 220 100% 65%     /* #3B82F6 */
```

### Gradients
```css
--gradient-neon-pink: linear-gradient(135deg, pink → purple)
--gradient-neon-cyan: linear-gradient(135deg, cyan → blue)
--gradient-neon-purple: linear-gradient(135deg, purple → pink)
--gradient-neon-blue: linear-gradient(135deg, blue → cyan)
--gradient-neon-mixed: linear-gradient(135deg, pink → cyan → purple)
```

## Components

### NeonCard
Card component with gradient borders and optional glow effects.

**Variants:**
- `pink` - Pink to purple gradient
- `cyan` - Cyan to blue gradient
- `purple` - Purple to pink gradient
- `blue` - Blue to cyan gradient
- `mixed` - Multi-color gradient
- `none` - No gradient border (default)

**Sizes:**
- `sm` - 120px min height
- `md` - 160px min height (default)
- `lg` - 220px min height
- `xl` - 280px min height

**Usage:**
```tsx
import { NeonCard } from "@/components/ui/neon-card";

<NeonCard 
  variant="cyan" 
  glass={true} 
  glow={true} 
  size="md"
>
  Content here
</NeonCard>
```

### BentoGrid
Responsive grid layout system with variable item sizes.

**Usage:**
```tsx
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";

<BentoGrid>
  <BentoItem span={{ mobile: 'col-span-1', tablet: 'md:col-span-2' }}>
    Large card
  </BentoItem>
  <BentoItem>
    Standard card
  </BentoItem>
</BentoGrid>
```

**Responsive Behavior:**
- Mobile: 1 column, 3px gap
- Tablet: 2 columns, 4px gap
- Desktop: 3 columns, auto-rows, 4px gap

### AccentDot
Small indicator dots with pulse animation.

**Colors:** `pink` | `cyan` | `purple` | `blue`

**Positions:** `top-right` | `top-left` | `bottom-right` | `bottom-left`

**Usage:**
```tsx
import { AccentDot } from "@/components/ui/accent-dot";

<div className="relative">
  <AccentDot color="cyan" position="top-right" animate={true} />
  Card content
</div>
```

### NeonSearch
Styled search input with glassmorphism and optional neon glow.

**Usage:**
```tsx
import { NeonSearch } from "@/components/ui/neon-search";

<NeonSearch 
  neon={true}
  placeholder="Search features..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

## Utility Classes

### Glassmorphism
```css
.glass-card     /* Light glassmorphism effect */
.glass-dark     /* Darker glassmorphism effect */
```

### Neon Glows
```css
.neon-glow-pink     /* Pink shadow glow */
.neon-glow-cyan     /* Cyan shadow glow */
.neon-glow-purple   /* Purple shadow glow */
.neon-glow-blue     /* Blue shadow glow */
.neon-glow-mixed    /* Multi-color glow */
```

## Feature Category Mapping

```typescript
const CATEGORY_NEON_MAP = {
  'advanced-ai': 'purple',   // Advanced AI → Purple neon
  'ai-tools': 'cyan',        // AI Tools → Cyan neon
  'enterprise': 'pink',      // Enterprise → Pink neon
  'utilities': 'blue',       // Utilities → Blue neon
};
```

## Accessibility

### Contrast Ratios
- All text maintains WCAG AA compliance (4.5:1)
- Neon borders are decorative only, not relied upon for information
- Focus states have visible outlines

### Motion
- Respects `prefers-reduced-motion`
- Animations can be disabled via system settings
- Glow effects are subtle and non-distracting

### Touch Targets
- All interactive elements maintain 44×44px minimum
- Touch zones are clearly defined
- Visual feedback on interaction (scale, glow)

## Performance

### Optimization Strategies
1. **CSS Variables** - Runtime theme switching without recompilation
2. **GPU Acceleration** - Transform animations use `will-change`
3. **Blur Optimization** - `backdrop-filter` only on visible cards
4. **Gradient Caching** - Defined once in CSS, referenced via classes

### Best Practices
- Use `glass` prop sparingly (blur is expensive)
- Enable `glow` only on active/focused elements
- Limit neon variants to important UI elements
- Prefer CSS over JavaScript animations

## Design Principles

### Visual Hierarchy
1. **Primary Actions** - Mixed gradient, high glow
2. **Active States** - Category-specific gradient, medium glow
3. **Hover States** - Border highlight, no glow
4. **Inactive** - No gradient, subtle border

### Spacing
- **Mobile**: 8px gaps (gap-2) for compact layout
- **Desktop**: 12-16px gaps (gap-3 to gap-4) for breathing room

### Color Psychology
- **Purple** - Innovation, AI, advanced features
- **Cyan** - Technology, tools, utilities
- **Pink** - Premium, enterprise, collaboration
- **Blue** - Reliability, productivity, utilities

## Examples

### Dashboard Card
```tsx
<NeonCard 
  variant={isActive ? getNeonVariant(category) : 'none'}
  glass={true}
  glow={isActive}
  size="sm"
>
  {isActive && <AccentDot color="cyan" />}
  <CardContent />
</NeonCard>
```

### Featured Hero Card
```tsx
<NeonCard 
  variant="mixed"
  glass={false}
  glow={true}
  size="xl"
  className="col-span-2"
>
  <HeroContent />
</NeonCard>
```

### Search Bar
```tsx
<div className="w-full max-w-md">
  <NeonSearch 
    neon={true}
    placeholder="Search..."
  />
</div>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+ (iOS/macOS)
- ⚠️ `backdrop-filter` requires `-webkit-` prefix on Safari
- ✅ Progressive enhancement for older browsers

## Migration Guide

### From Standard Cards
```tsx
// Before
<Card className="border-2 border-primary">
  Content
</Card>

// After
<NeonCard variant="purple" glass={true}>
  Content
</NeonCard>
```

### From Grid Layouts
```tsx
// Before
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</div>

// After
<BentoGrid>
  {items.map(item => (
    <BentoItem key={item.id}>
      <NeonCard variant="cyan">{item}</NeonCard>
    </BentoItem>
  ))}
</BentoGrid>
```
