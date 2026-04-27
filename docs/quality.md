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
CI also installs Playwright Chromium and runs the browser smoke/accessibility suite:

```bash
npm run test:e2e
```

## Test strategy

- Decision-engine tests cover urgency and guidance behavior.
- Fallback tests cover refusals, supported process questions, and localization.
- Schema tests prevent frontend/API profile drift.
- Storage tests verify local-storage recovery and invalid-data handling.
- Copy/content tests catch missing localized labels, timeline entries, and official resource cards.
- Assistant service tests exercise Gemini success, empty response, thrown error, no-key fallback, and refusal behavior without calling a live model.
- API route tests cover malformed JSON, invalid payloads, and deterministic no-key fallback behavior.
- Playwright tests cover the localized profile/assistant flow and an axe-core accessibility scan of the initial page.

## Maintainability practices

- Profile enums and request validation come from a shared Zod schema.
- The main assistant shell is decomposed into focused components and hooks.
- Static content is separated from deterministic logic.
- API handlers stay thin and delegate AI/fallback behavior to a mockable assistant service boundary.
- Gemini model selection is configurable with `GEMINI_MODEL`.
