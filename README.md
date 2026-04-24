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

## Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add `GEMINI_API_KEY` if you want live AI responses.
3. Run the app with `npm run dev`.
4. Run validation with `npm run lint` and `npm run test`.

## Architecture

- `src/app` contains the Next.js App Router entrypoints and API route.
- `src/components` contains the interactive election assistant shell.
- `src/lib` contains deterministic decision logic, content, and AI fallback logic.

## Judging criteria coverage

- Code quality: split by UI, domain logic, and integration boundaries
- Security: secrets remain server-side and unsupported political persuasion requests are rejected
- Efficiency: rule-based guidance answers most needs without an LLM round trip
- Testing: decision logic and assistant fallback paths are covered with Node test runner (`node --test` + `tsx`)
- Accessibility: semantic sections, explicit labels, keyboard-friendly controls, and strong contrast
- Google services: Gemini API integration and Google Calendar reminder generation
