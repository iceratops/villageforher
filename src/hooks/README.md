# /hooks

This directory contains all custom React hooks for stateful or effectful logic shared across the application.

## Conventions
- Each hook should be in its own file and start with `use` (e.g., `useProducts.ts`).
- Hooks should compose logic from `/lib` and provide state, effects, or handlers for components.
- Avoid putting business logic directly in hooks; delegate to `/lib` where possible.

## Usage
Import hooks into components or pages to encapsulate reusable stateful logic. 