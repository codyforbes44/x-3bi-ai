# Project Architecture

## Overview
This project follows a feature-based architecture with clear separation of concerns using React, TypeScript, and Supabase.

## Directory Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (design system)
│   ├── layout/         # Layout components (PageLayout, CTASection, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   ├── home/           # Homepage components (mini versions)
│   ├── docs/           # Documentation components
│   ├── issues/         # Issue tracking components
│   ├── tutorials/      # Tutorial components
│   ├── workflows/      # Workflow builder components
│   ├── workspaces/     # Workspace management components
│   └── [features]/     # Feature-specific components (AI, Voice, etc.)
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   ├── WorkspaceContext.tsx
│   └── WorkflowContext.tsx
├── hooks/              # Custom React hooks
│   ├── use-toast.ts
│   ├── use-mobile.tsx
│   ├── useKeyboardShortcuts.ts
│   └── useAIRequest.ts
├── pages/              # Route pages
│   └── tutorials/      # Tutorial pages
├── config/             # Configuration files
│   ├── routes.ts       # Centralized route definitions
│   ├── design-tokens.ts # Design system tokens
│   └── constants.ts    # App-wide constants
├── utils/              # Utility functions
│   ├── avatarUpload.ts
│   ├── formatting.ts
│   └── validation.ts
├── types/              # TypeScript type definitions
│   ├── index.ts        # Shared types
│   └── issue.ts        # Domain-specific types
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
└── lib/                # Third-party library configurations
    └── utils.ts        # cn() utility for className merging

supabase/
└── functions/          # Edge Functions (serverless backend)
    ├── ai-chat/
    ├── ai-image/
    ├── ai-voice/
    └── [features]/
```

## Key Architectural Patterns

### 1. Component Organization

**Feature-Based Grouping**
- Group related components by feature domain
- Keep components focused and single-purpose
- Use composition over large monolithic components

**Component Hierarchy**
```
Pages (route handlers)
  ↓
Layout Components (structure)
  ↓
Feature Components (business logic)
  ↓
UI Components (presentation)
```

### 2. State Management

**Local State**
- Use `useState` for component-local state
- Use `useReducer` for complex state logic

**Global State**
- Use React Context for cross-cutting concerns:
  - `AuthContext`: User authentication state
  - `WorkspaceContext`: Workspace management
  - `WorkflowContext`: Workflow state and operations

**Server State**
- Use `@tanstack/react-query` for server data caching
- Supabase client for data fetching

### 3. Data Flow

```
User Action
  ↓
Component Event Handler
  ↓
Context Action / Hook
  ↓
Supabase Client / Edge Function
  ↓
Database / External API
  ↓
Update Local State
  ↓
Re-render UI
```

### 4. Routing Strategy

**Centralized Routes**
- All routes defined in `src/config/routes.ts`
- Use `ROUTES` constant for navigation
- Never hardcode route strings in components

**Route Protection**
- `ProtectedRoute` wrapper for authenticated routes
- Automatic redirect to auth page when not logged in

**Route Structure**
```
/ (public)
├── /auth (public)
├── /learn (public)
├── /community (public)
├── /tutorials (public)
│   ├── /tutorials/ai-chat
│   └── /tutorials/[topic]
└── /dashboard (protected)
    ├── /profile (protected)
    ├── /workspaces (protected)
    └── /api-access (protected)
```

### 5. Authentication Flow

```
App Load
  ↓
AuthProvider initializes
  ↓
Check for existing session
  ↓
Set user state
  ↓
Protected routes check auth
  ↓
Render appropriate content
```

### 6. API Integration

**Edge Functions**
- Use for server-side logic requiring API keys
- Handle external API calls (OpenAI, ElevenLabs, etc.)
- Implement business logic that shouldn't run client-side

**Client-Side API Calls**
```typescript
// Use custom hooks
const { execute, isLoading, error } = useAIRequest('function-name');

// Or direct Supabase calls
const { data, error } = await supabase.functions.invoke('function-name', {
  body: { ... }
});
```

### 7. Design System

**Semantic Tokens**
- All colors use HSL format
- Defined in `src/index.css` and `tailwind.config.ts`
- Reference via CSS variables: `var(--primary)`, `hsl(var(--accent))`

**Component Variants**
- Use `class-variance-authority` for component variants
- Define in UI components (e.g., `buttonVariants`)

**Theme Support**
- Light and dark mode support via `next-themes`
- CSS variables automatically swap based on theme

### 8. Error Handling

**Component Level**
- Use `ErrorBoundary` for React errors
- Show user-friendly error messages via toasts

**API Level**
- Centralized error handling in `useAIRequest` hook
- Consistent error messages and logging

**Form Validation**
- Use `react-hook-form` with `zod` schemas
- Client-side validation before API calls

## Best Practices

### Component Design
1. **Single Responsibility**: Each component should do one thing well
2. **Composition**: Build complex UIs from simple components
3. **Props Interface**: Always define TypeScript interfaces for props
4. **Avoid Prop Drilling**: Use Context for deeply nested state
5. **Memoization**: Use `useMemo` and `useCallback` for expensive operations

### Code Organization
1. **Import Order**: External → Internal → Relative → Styles
2. **File Naming**: PascalCase for components, camelCase for utilities
3. **Folder Structure**: Group by feature, not by file type
4. **Constants**: Extract magic numbers and strings to constants
5. **Types**: Define shared types in `src/types/index.ts`

### Performance
1. **Lazy Loading**: Use `React.lazy()` for code splitting
2. **Image Optimization**: Use WebP format, lazy load images
3. **Bundle Size**: Minimize dependencies, tree-shake unused code
4. **Memoization**: Prevent unnecessary re-renders

### Security
1. **Environment Variables**: Never expose secrets client-side
2. **RLS Policies**: Always enable Row Level Security in Supabase
3. **Input Validation**: Validate all user input
4. **Authentication**: Verify user identity server-side
5. **API Keys**: Store in Supabase secrets, access in Edge Functions only

### Accessibility
1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Add labels for screen readers
3. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
4. **Color Contrast**: Meet WCAG AA standards

## Common Patterns

### Creating a New Feature
1. Define routes in `src/config/routes.ts`
2. Create page component in `src/pages/`
3. Create feature components in `src/components/[feature]/`
4. Add Edge Function if needed in `supabase/functions/`
5. Update navigation in `src/components/Header.tsx`

### Adding a New API Integration
1. Add secret using Supabase dashboard or secret tool
2. Create Edge Function in `supabase/functions/[name]/`
3. Create custom hook in `src/hooks/use[Name].ts`
4. Create UI component in `src/components/[Name].tsx`
5. Add route and navigation

### Creating a New Context
1. Define context type interface
2. Create provider component
3. Export custom hook for consuming context
4. Wrap app in provider in `src/App.tsx`
5. Use context via custom hook in components

## Testing Strategy
- Unit tests for utilities and hooks
- Integration tests for complex workflows
- E2E tests for critical user flows
- Manual testing for UI/UX

## Deployment
- Automatic deployment via Lovable platform
- Edge Functions deployed automatically
- Database migrations run on deployment
- Environment variables managed in Supabase

## Future Improvements
1. Add comprehensive test coverage
2. Implement proper error logging service
3. Add performance monitoring
4. Improve code splitting
5. Add storybook for component documentation
