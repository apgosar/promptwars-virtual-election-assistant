# Quality Model

## Automated gates

The repository uses one local quality command:

```bash
npm run validate
```

That command runs:

- Prettier formatting check
- ESLint with zero warnings
- TypeScript type checking
- Node test runner unit tests
- Next.js production build

GitHub Actions runs the same validation on pushes and pull requests to `main`.

## Test strategy

- Decision-engine tests cover urgency and guidance behavior.
- Fallback tests cover refusals, supported process questions, and localization.
- Schema tests prevent frontend/API profile drift.
- Storage tests verify local-storage recovery and invalid-data handling.
- Copy/content tests catch missing localized labels, timeline entries, and official resource cards.

## Maintainability practices

- Profile enums and request validation come from a shared Zod schema.
- The main assistant shell is decomposed into focused components and hooks.
- Static content is separated from deterministic logic.
- Gemini model selection is configurable with `GEMINI_MODEL`.
