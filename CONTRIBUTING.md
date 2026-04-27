# Contributing

## Local setup

1. Use Node.js 24.
2. Install dependencies with `npm ci`.
3. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` for live Gemini responses.

## Quality checks

Run the complete local gate before pushing:

```bash
npm run validate
```

The validation script checks formatting, linting, TypeScript, unit tests, and the production build.
Run the browser and accessibility suite before major UI or flow changes:

```bash
npm run test:e2e
```

For focused checks:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run test:coverage
npm run test:e2e
npm run build
```

## Code organization

- Keep domain rules in `src/lib`.
- Keep reusable UI in `src/components`.
- Keep React stateful behavior in `src/hooks`.
- Keep API handlers thin and delegate validation/business behavior to shared modules.
- Use shared constants and schemas from `src/lib/profile-schema.ts` instead of repeating string unions.
