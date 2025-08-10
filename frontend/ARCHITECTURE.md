# Smart Factory MES - FSD Architecture

## Overview

This project follows the Feature-Sliced Design (FSD) architecture pattern for the Smart Factory MES system.

## Directory Structure

```
src/
├── app/                    # Application layer
│   ├── index.tsx          # App entry point
│   └── styles/            # Global styles
├── pages/                 # Pages layer
│   ├── dashboard/         # Dashboard page
│   ├── production/        # Production management page
│   └── issues/            # Issue management page
├── widgets/               # Widgets layer
│   ├── dashboard/         # Dashboard widgets
│   ├── production/        # Production widgets
│   └── charts/            # Chart widgets
├── features/              # Features layer
│   ├── alarm-management/      # Issue management features
│   ├── production-schedule/   # Production scheduling
│   ├── real-time-monitoring/  # Real-time monitoring
│   └── user-authentication/   # User authentication
├── entities/              # Entities layer
│   ├── production/        # Work Order entity
│   ├── issues/            # Issue entity
│   └── user/              # User entity
└── shared/                # Shared layer
    ├── api/               # API clients
    ├── config/            # Configuration
    ├── lib/               # Utilities
    ├── ui/                # UI components
    └── types/             # Shared types
```

## Layer Dependencies

```
app → pages → widgets → features → entities → shared
```

- **app**: Application configuration, routing, providers
- **pages**: Page components that compose widgets
- **widgets**: Complex UI blocks that compose features
- **features**: Business logic and user interactions
- **entities**: Domain entities and their logic
- **shared**: Reusable utilities, UI components, and types

## Import Rules

1. **Higher layers can import from lower layers**
2. **Lower layers cannot import from higher layers**
3. **Same layer can import from same layer**
4. **All layers can import from shared layer**

## Entity Types

### Work Order (Production)

- Work order management and scheduling
- Status tracking (pending, in-progress, completed, cancelled)
- Priority management (low, medium, high, urgent)
- Progress tracking and completion

### Issue

- Issue management and tracking
- Issue types (quality, equipment, material, process, safety, other)
- Priority levels (low, medium, high, critical)
- Status tracking (open, in-progress, resolved, closed)

### User

- User management and authentication
- Role-based access control (admin, manager, worker)
- Password management

## Development Guidelines

1. **Keep entities independent** - Each entity should be self-contained
2. **Use shared layer for common functionality** - Avoid duplication
3. **Follow naming conventions** - Use kebab-case for folders, camelCase for files
4. **Export through index files** - Each layer should have index.ts for clean imports
5. **Type everything** - Use TypeScript for all components and functions
