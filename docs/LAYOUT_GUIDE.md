# Layout Selection Guide

This guide helps you choose the correct layout component for your page based on authentication requirements, content type, and design needs.

## Layout Components Overview

### 1. `PublicPageLayout`
**Use for:** Public marketing and informational pages that don't require authentication

**Features:**
- Header with navigation
- Footer
- Customizable max-width and padding
- No authentication check
- Mobile bottom navigation padding

**Example Use Cases:**
- Landing pages
- Feature showcases
- Pricing page
- About/Mission pages
- Blog posts

**Example:**
```tsx
import { PublicPageLayout } from '@/components/layout/PublicPageLayout';

export default function MyPage() {
  return (
    <PublicPageLayout maxWidth="2xl" padding="standard">
      <PageHero title="..." description="..." />
      {/* Content */}
    </PublicPageLayout>
  );
}
```

---

### 2. `AuthenticatedPageLayout`
**Use for:** Pages that require user authentication

**Features:**
- Authentication check (redirects to /auth if not logged in)
- Header with navigation
- Breadcrumbs (automatically generated from route)
- Back button option
- Loading state during auth check
- Customizable max-width and padding
- Mobile bottom navigation padding

**Example Use Cases:**
- User profile
- Dashboard pages
- Settings pages
- Workspace management
- Analytics pages

**Example:**
```tsx
import { AuthenticatedPageLayout } from '@/components/layout/AuthenticatedPageLayout';

export default function MyAuthPage() {
  return (
    <AuthenticatedPageLayout 
      maxWidth="2xl" 
      padding="standard"
      showBreadcrumbs={true}
      showBackButton={false}
    >
      <PageHero title="..." description="..." compact />
      {/* Content */}
    </AuthenticatedPageLayout>
  );
}
```

---

### 3. `PageLayout`
**Use for:** Simple pages that need header and footer but no special features

**Features:**
- Header with navigation
- Footer
- Basic padding for header/footer
- No max-width container (content manages its own width)
- Mobile bottom navigation padding

**Example Use Cases:**
- Custom layouts with full-width sections
- Pages with mixed-width content
- Pages using `PageHero` component

**Example:**
```tsx
import { PageLayout } from '@/components/layout/PageLayout';

export default function CustomLayoutPage() {
  return (
    <PageLayout>
      <PageHero title="..." description="..." />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Content */}
      </div>
    </PageLayout>
  );
}
```

---

### 4. `DashboardLayout`
**Use for:** Complex dashboard interfaces with sidebar navigation

**Features:**
- Collapsible sidebar
- Dashboard top bar
- Feature headers
- Tab management
- Mobile-responsive
- No footer

**Example Use Cases:**
- Main dashboard
- Admin panels
- Feature management interfaces

**Example:**
```tsx
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <DashboardLayout
      activeTab={activeTab}
      isMobile={false}
      onTabChange={setActiveTab}
    >
      {/* Dashboard content */}
    </DashboardLayout>
  );
}
```

---

## Layout Configuration

All layouts use the centralized `LAYOUT_CONFIG` from `src/config/layout-config.ts`:

### Max Width Options
```tsx
maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
```

| Option | Width | Use Case |
|--------|-------|----------|
| `xs` | 672px (max-w-2xl) | Narrow content (articles, forms) |
| `sm` | 768px (max-w-3xl) | Small content areas |
| `md` | 896px (max-w-4xl) | Medium content |
| `lg` | 1024px (max-w-5xl) | Large content |
| `xl` | 1152px (max-w-6xl) | Extra large content |
| `2xl` | 1280px (max-w-7xl) | Dashboard, wide layouts (default) |
| `full` | No limit | Full-width layouts |

### Padding Options
```tsx
padding?: 'compact' | 'standard' | 'relaxed' | 'hero'
```

| Option | Spacing | Use Case |
|--------|---------|----------|
| `compact` | py-8 md:py-12 | Tight spacing for dense content |
| `standard` | py-12 md:py-16 | Default spacing (recommended) |
| `relaxed` | py-16 md:py-24 | Generous spacing for marketing |
| `hero` | py-20 md:py-32 | Hero sections only |

---

## PageHero Component

Use `PageHero` for consistent page headers across all layouts.

```tsx
import { PageHero } from '@/components/layout/PageHero';

<PageHero
  title="Page Title"
  description="Page description"
  badge={{ icon: IconComponent, text: "Badge Text" }}
  actions={<Button>Primary Action</Button>}
  compact={true} // Use true for authenticated pages with breadcrumbs
/>
```

**When to use `compact` prop:**
- ✅ Authenticated pages with breadcrumbs
- ✅ Dashboard pages
- ❌ Public marketing pages
- ❌ Landing pages

---

## Decision Tree

```
Do you need authentication?
├─ YES → Use AuthenticatedPageLayout
│         - Shows breadcrumbs by default
│         - Use compact={true} on PageHero
│         - Redirects to /auth if not logged in
│
└─ NO → Is it a dashboard with sidebar?
    ├─ YES → Use DashboardLayout
    │         - Complex interface with navigation
    │         - Tab management
    │
    └─ NO → Do you need custom width control?
        ├─ YES → Use PageLayout
        │         - Full control over content width
        │         - Use container classes manually
        │
        └─ NO → Use PublicPageLayout
                  - Standard marketing/info pages
                  - Automatic width management
```

---

## Common Patterns

### Marketing Page
```tsx
import { PublicPageLayout } from '@/components/layout/PublicPageLayout';
import { PageHero } from '@/components/layout/PageHero';

export default function Features() {
  return (
    <PublicPageLayout maxWidth="2xl" padding="standard">
      <PageHero 
        title="Features"
        description="Discover our amazing features"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature cards */}
      </div>
    </PublicPageLayout>
  );
}
```

### Authenticated Page with Breadcrumbs
```tsx
import { AuthenticatedPageLayout } from '@/components/layout/AuthenticatedPageLayout';
import { PageHero } from '@/components/layout/PageHero';

export default function UserSettings() {
  return (
    <AuthenticatedPageLayout 
      maxWidth="xl" 
      showBreadcrumbs={true}
    >
      <PageHero 
        title="Settings"
        description="Manage your account"
        compact // Important for pages with breadcrumbs
      />
      {/* Settings content */}
    </AuthenticatedPageLayout>
  );
}
```

### Mixed-Width Content Page
```tsx
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';

export default function CustomPage() {
  return (
    <PageLayout>
      <PageHero title="Full Width Hero" description="..." />
      
      {/* Full width section */}
      <section className="w-full bg-muted py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Content */}
        </div>
      </section>
      
      {/* Narrow section */}
      <section className="container mx-auto px-4 max-w-2xl py-12">
        {/* Content */}
      </section>
    </PageLayout>
  );
}
```

---

## Mobile Considerations

All layouts automatically handle mobile padding:
- `pt-14 md:pt-16` - Accounts for fixed header
- `pb-16 md:pb-0` - Accounts for mobile bottom navigation

**Do not override these values** unless you have a specific reason.

---

## Accessibility

All layouts include:
- ✅ `<SkipLinks />` component for keyboard navigation
- ✅ `tabIndex={-1}` on main content for skip link target
- ✅ Semantic HTML (`<main>`, `<header>`, `<footer>`)
- ✅ Proper heading hierarchy

---

## Migration Checklist

When refactoring an existing page:

- [ ] Identify if page requires authentication
- [ ] Choose appropriate layout component
- [ ] Set correct `maxWidth` and `padding`
- [ ] Use `PageHero` for page header
- [ ] Set `compact={true}` on PageHero if using breadcrumbs
- [ ] Enable breadcrumbs on authenticated pages (`showBreadcrumbs={true}`)
- [ ] Remove custom header/footer implementations
- [ ] Test mobile responsiveness
- [ ] Test with keyboard navigation
- [ ] Verify SEO component is included
