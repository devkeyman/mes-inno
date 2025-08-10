# Smart Factory MES - FSD Architecture

## Overview

이 프로젝트는 Smart Factory MES 시스템을 위한 **Feature-Sliced Design (FSD)** 아키텍처 패턴을 따릅니다. FSD는 확장 가능하고 유지보수하기 쉬운 프론트엔드 애플리케이션을 구축하기 위한 방법론입니다.

## Directory Structure

```
src/
├── app/                    # Application layer
│   ├── index.tsx          # App entry point with providers
│   ├── layout.tsx         # Main layout component
│   ├── router.tsx         # Application routing
│   └── styles/            # Global styles (index.css)
├── pages/                 # Pages layer
│   ├── auth/
│   │   └── login.tsx      # Login page
│   ├── dashboard/
│   │   └── index.tsx      # Dashboard page
│   ├── production/
│   │   └── index.tsx      # Production management page
│   └── issues/
│       └── index.tsx      # Issue management page
├── widgets/               # Widgets layer
│   ├── charts/            # Chart components
│   ├── dashboard/         # Dashboard widgets
│   │   ├── index.ts       # Dashboard exports
│   │   ├── production-status.tsx
│   │   ├── recent-activities.tsx
│   │   ├── stats-card.tsx
│   │   └── stats-cards.tsx
│   ├── issues/            # Issue management widgets
│   │   ├── index.ts       # Issues exports
│   │   ├── issue-detail.tsx
│   │   ├── issue-form.tsx
│   │   └── issues-grid.tsx
│   ├── navigation/        # Navigation widget
│   │   └── index.tsx      # Main navigation
│   └── production/        # Production widgets
│       ├── index.ts       # Production exports
│       ├── work-order-detail.tsx
│       ├── work-order-form.tsx
│       └── work-orders-table.tsx
├── features/              # Features layer
│   ├── alarm-management/      # Alarm management features
│   ├── auth/                  # Authentication features
│   │   ├── components/
│   │   │   └── protected-route.tsx
│   │   └── hooks/
│   │       └── use-auth.ts
│   ├── dashboard/             # Dashboard features
│   │   └── hooks/
│   │       └── use-dashboard.ts
│   ├── issues/                # Issue management features
│   │   └── hooks/
│   │       └── use-issues.ts
│   ├── production/            # Production features
│   │   └── hooks/
│   │       └── use-work-orders.ts
│   ├── production-schedule/   # Production scheduling
│   ├── real-time-monitoring/  # Real-time monitoring
│   └── user-authentication/   # Legacy auth (deprecated)
├── entities/              # Entities layer
│   ├── issues/            # Issue entity
│   │   ├── index.ts       # Issue exports
│   │   └── types.ts       # Issue type definitions
│   ├── production/        # Production entity
│   │   ├── index.ts       # Production exports
│   │   └── types.ts       # Production type definitions
│   └── user/              # User entity
│       ├── index.ts       # User exports
│       └── types.ts       # User type definitions
├── shared/                # Shared layer
│   ├── api/               # API clients
│   │   ├── auth.ts        # Authentication API
│   │   ├── client.ts      # Axios client configuration
│   │   ├── dashboard.ts   # Dashboard API
│   │   ├── index.ts       # API exports
│   │   ├── issues.ts      # Issues API
│   │   ├── users.ts       # Users API
│   │   └── workOrders.ts  # Work orders API
│   ├── components/        # Shared UI components
│   │   ├── error-boundary.tsx
│   │   ├── index.ts       # Components exports
│   │   └── loading.tsx
│   ├── config/            # Configuration
│   │   └── query-client.ts # TanStack Query client
│   ├── stores/            # State management
│   │   ├── auth-store.ts  # Authentication store (Zustand)
│   │   └── index.ts       # Stores exports
│   ├── types/             # Shared types
│   │   └── index.ts       # Common type definitions
│   └── index.ts           # Shared layer exports
├── types/                 # Legacy types (deprecated)
│   └── index.ts
└── main.tsx               # Application entry point
```

## Layer Dependencies

```
app → pages → widgets → features → entities → shared
```

### Layer Responsibilities

- **app**: 애플리케이션 설정, 라우팅, 프로바이더 (React Router, Query Client, Error Boundary)
- **pages**: 위젯을 조합하는 페이지 컴포넌트 (Dashboard, Production, Issues, Auth)
- **widgets**: 기능을 조합하는 복잡한 UI 블록 (Tables, Forms, Charts, Navigation)
- **features**: 비즈니스 로직 및 사용자 상호작용 (Hooks, Components)
- **entities**: 도메인 엔티티 및 로직 (Types, Business Logic)
- **shared**: 재사용 가능한 유틸리티, UI 컴포넌트, 타입 (API, Components, Config, Stores)

## Import Rules

1. **Higher layers can import from lower layers**

   - `pages` can import from `widgets`, `features`, `entities`, `shared`
   - `widgets` can import from `features`, `entities`, `shared`
   - `features` can import from `entities`, `shared`
   - `entities` can import from `shared`

2. **Lower layers cannot import from higher layers**

   - `entities` cannot import from `features`, `widgets`, `pages`, `app`
   - `shared` cannot import from any other layer

3. **Same layer can import from same layer**

   - Components within the same layer can import each other

4. **All layers can import from shared layer**
   - Any layer can import utilities, components, and types from `shared`

## Entity Types

### Work Order (Production)

- **Status**: `PENDING` | `IN_PROGRESS` | `COMPLETED` | `CANCELLED`
- **Priority**: `LOW` | `NORMAL` | `MEDIUM` | `HIGH` | `URGENT`
- **Features**:
  - Work order management and scheduling
  - Progress tracking and completion
  - Assignment and due date management
  - Work logs and history tracking

### Issue

- **Status**: `OPEN` | `IN_PROGRESS` | `RESOLVED` | `CLOSED`
- **Priority**: `LOW` | `MEDIUM` | `HIGH` | `CRITICAL`
- **Types**: `EQUIPMENT` | `QUALITY` | `SAFETY` | `PROCESS` | `OTHER`
- **Features**:
  - Issue management and tracking
  - Resolution workflow
  - Assignment and escalation
  - Work order association

### User

- **Roles**: `ADMIN` | `MANAGER` | `WORKER`
- **Features**:
  - User management and authentication
  - Role-based access control
  - Password management
  - Session management

## Technology Stack

### Core Technologies

- **React 19.1.1** - UI Library
- **TypeScript 5.9.2** - Type Safety
- **Vite 7.1.0** - Build Tool & Dev Server

### State Management

- **TanStack React Query 5.84.2** - Server State Management
- **Zustand 5.0.7** - Client State Management

### Routing & HTTP

- **React Router DOM 7.8.0** - Client-side Routing
- **Axios 1.11.0** - HTTP Client

### UI & Icons

- **Lucide React 0.539.0** - Icon Library
- **Custom CSS** - Styling (no UI framework)

### Development Tools

- **ESLint 9.32.0** - Code Linting
- **TypeScript** - Type Checking

## Development Guidelines

### 1. **Keep entities independent**

- Each entity should be self-contained
- Entities should not depend on other entities
- Use shared layer for common functionality

### 2. **Use shared layer for common functionality**

- Avoid code duplication across layers
- Place reusable utilities in shared layer
- Use shared components for consistent UI

### 3. **Follow naming conventions**

- **Folders**: kebab-case (e.g., `work-orders-table`)
- **Files**: kebab-case for components, camelCase for utilities
- **Components**: PascalCase (e.g., `WorkOrdersTable`)
- **Functions**: camelCase (e.g., `useWorkOrders`)

### 4. **Export through index files**

- Each layer should have `index.ts` for clean imports
- Use barrel exports for better import experience
- Example: `import { WorkOrdersTable } from '@/widgets/production'`

### 5. **Type everything**

- Use TypeScript for all components and functions
- Define proper interfaces and types
- Avoid `any` type usage

### 6. **Error handling**

- Use Error Boundary for component error handling
- Implement proper loading states
- Provide user-friendly error messages

### 7. **Performance optimization**

- Use React.memo for expensive components
- Implement proper dependency arrays in hooks
- Use TanStack Query for efficient data fetching

## Path Aliases

```typescript
{
  "@/*": ["./src/*"],
  "@/app/*": ["./src/app/*"],
  "@/pages/*": ["./src/pages/*"],
  "@/widgets/*": ["./src/widgets/*"],
  "@/features/*": ["./src/features/*"],
  "@/entities/*": ["./src/entities/*"],
  "@/shared/*": ["./src/shared/*"]
}
```

## File Organization Patterns

### Component Structure

```typescript
// Component file structure
interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX
  );
};
```

### Hook Structure

```typescript
// Custom hook structure
export const useCustomHook = (params) => {
  // Hook logic
  return {
    data,
    isLoading,
    error,
    actions,
  };
};
```

### API Structure

```typescript
// API client structure
export const apiClient = {
  getAll: async (params) => {
    /* implementation */
  },
  getById: async (id) => {
    /* implementation */
  },
  create: async (data) => {
    /* implementation */
  },
  update: async (id, data) => {
    /* implementation */
  },
  delete: async (id) => {
    /* implementation */
  },
};
```

## Best Practices

1. **Separation of Concerns**: Keep business logic in features, UI in widgets
2. **Single Responsibility**: Each component should have one clear purpose
3. **Composition over Inheritance**: Use component composition for reusability
4. **Immutable State**: Never mutate state directly, always use proper state setters
5. **Error Boundaries**: Wrap components with error boundaries for graceful error handling
6. **Loading States**: Always provide loading indicators for async operations
7. **Type Safety**: Leverage TypeScript for compile-time error detection
8. **Testing**: Write unit tests for business logic and integration tests for components
