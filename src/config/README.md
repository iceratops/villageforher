# /config

This directory contains environment variable access, app configuration, and client keys.

## Conventions
- Each config file should export constants for use throughout the app (e.g., `airtable.ts`, `google.ts`).
- Do not put business logic or UI code here.
- Never hardcode secrets; use environment variables and document them in `.env.example` if needed.

## Usage
Import config constants into `/lib`, hooks, or components as needed. Do not import UI or business logic into `/config`. 