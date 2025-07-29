# /lib

This directory contains all reusable business logic, data access, and non-UI utilities for the application.

## Conventions
- Each file should export pure functions, classes, or constants that are not tied to React rendering.
- No UI or React hooks should be defined here.
- Use clear, descriptive names for files and exports (e.g., `airtable.ts`, `products.ts`, `chat.ts`).
- Keep all data fetching, transformation, and business rules here for maximum reusability.

## Usage
Import logic from `/lib` into hooks, components, or pages as needed. Do not import UI or React-specific code into `/lib`. 