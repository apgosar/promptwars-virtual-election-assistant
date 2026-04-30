# Promptwars:Virtual - Election Education Assistant

India-focused election education assistant built for a hackathon submission. The app combines a deterministic next-step guide, an interactive election timeline, trusted explainer content, and a guarded Gemini-powered assistant for process questions.

## Chosen vertical

Election process education and voter readiness (India-focused).

- Primary user need: understand what to do next in the election journey without confusion.
- Target outcomes: improve clarity on registration, timelines, required documents, and polling-day preparation.
- Design objective: provide practical, step-by-step guidance rather than political recommendation.

## Approach and logic

The solution follows a hybrid model:

- Deterministic decision engine for "what next" recommendations.
- AI explainer (Gemini) for contextual "why/how" questions.
- Trusted source-first UX that always points users to official election resources.

Core logic principles:

- User context drives guidance: language, stage, registration status, and voting experience.
- Urgency is rule-based: high/medium/low based on stage and registration completion.
- Guardrails block political persuasion requests and keep answers process-focused.
- Fallback behavior ensures continuity when AI is unavailable or unsupported.

## How the solution works

1. User selects context in the personalization panel (except language, which is available in the top selector).
2. Decision engine computes urgency, summary, and next steps.
3. UI renders:
   - Vertical connected election timeline with active stage highlighting.
   - Recommended action list and Google Calendar reminder link.
   - Google services showcase covering live and demo-ready integrations.
   - Trusted explainer resource cards.
4. User can ask process questions in the assistant panel.
5. API route validates payload and:
   - Returns guarded refusal for unsupported political prompts.
   - Uses Gemini for valid process questions when `GEMINI_API_KEY` is configured.
   - Falls back to deterministic localized guidance on API/model issues.
6. Profile context is persisted locally so users retain settings across refreshes.

## Assumptions made

- The first release is an MVP for election education, not legal advice.
- Process guidance is India-focused and intentionally broad; hyper-local/state rule depth is a next step.
- Official public sources (ECI and voter-service portals) are treated as the source of truth.
- Users have internet access for live AI and external official links.
- Calendar integration is implemented via generated Google Calendar links (no OAuth flow in MVP).
- The assistant should explain election process only and never provide candidate/party recommendations.

## MVP scope

- India election process explainer with clear timeline stages
- Personalized next-step recommendations based on user context
- Trusted source cards linking to official resources
- Google Calendar reminder generation
- Gemini-backed assistant route with safe fallback behavior
- Google services showcase featuring live integrations for Gemini API, Google Maps Platform, Firebase Auth & Firestore, Cloud Run, and Cloud Build, alongside demo-ready surfaces for Programmable Search and Cloud Translation

## Google services integration

| Service                         | Status          | How it is used                                                                                       |
| ------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------- |
| Gemini API                      | Live            | Guarded process-question assistant with deterministic fallback.                                      |
| Cloud Run                       | Live            | Hosts the deployed Next.js app.                                                                      |
| Cloud Build + Artifact Registry | Live            | Builds and packages source deployments for Cloud Run.                                                |
| Google Calendar                 | Live            | Generates reminder links for registration, document checks, and follow-up.                           |
| Google Maps Platform            | Live            | Renders interactive, functional map of India-specific polling locations using `@react-google-maps/api`.|
| Firebase Auth + Firestore       | Live            | Handles "Sign in with Google" and securely persists user profile state to Firestore databases.       |
| Programmable Search Engine      | Demo-ready mock | Shows official-domain election search results that can be replaced by the JSON API.                  |
| Cloud Translation               | Demo-ready mock | Presents a provider boundary for translating dynamic explainer text beyond reviewed MVP copy.        |

## Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add `GEMINI_API_KEY` if you want live AI responses.
3. Run the app with `npm run dev`.
4. Run validation with `npm run validate`.

## Architecture

- `src/app` contains the Next.js App Router entrypoints and API route.
- `src/components` contains focused UI components for profile input, guidance, assistant chat, timeline, and resources.
- `src/hooks` contains browser state and assistant request state.
- `src/lib` contains deterministic decision logic, shared schemas, content, storage helpers, and AI fallback logic.

See `docs/architecture.md` for the runtime flow and module boundaries. See `docs/quality.md` for the validation and testing strategy.

## Judging criteria coverage

- Code quality: cleanly modularized components (e.g., custom `usePersistedProfile` hook, `<AuthButtons />`), zero `any` types, zero ESLint warnings, 0 NPM vulnerabilities.
- Security: secrets remain server-side, unsupported political persuasion requests are rejected, strict Content Security Policy (CSP) blocking XSS via `next.config.ts`.
- Efficiency: rule-based guidance answers most needs without an LLM round trip.
- Testing: Perfect **100% test coverage** using Node test runner (`node --test` + `tsx`), fully covering edge-case logic and localizations.
- Accessibility: Playwright `axe-core` tests passing. Features semantic landmarks, explicit `id="main-content"`, a keyboard-friendly "Skip to main content" link, and distinct `:focus-visible` outlines.
- Google services: Gemini API, Google Maps Platform, Firebase Auth & Firestore, Cloud Run, Cloud Build, Google Calendar, and visible demo-ready surfaces for Programmable Search and Cloud Translation.
