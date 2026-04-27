# Architecture

The application is a Next.js app-router project with a small domain-driven structure.

## Runtime flow

1. `src/app/page.tsx` renders the election assistant shell.
2. `src/components/election-assistant.tsx` coordinates profile state, guidance, timeline data, resources, and assistant state.
3. `src/hooks/use-persisted-profile.ts` restores and persists profile context in local storage.
4. `src/lib/decision-engine.ts` computes urgency, summaries, reminders, and next steps from deterministic rules.
5. `src/app/api/assistant/route.ts` validates assistant requests, blocks unsupported political persuasion prompts, and calls Gemini when configured.
6. `src/lib/assistant-fallback.ts` provides safe localized fallback and refusal responses.

## Boundaries

- UI components render data and raise typed callbacks.
- Hooks own browser state and network state.
- Domain modules own deterministic election-process behavior.
- Content modules own localized timeline and official resource data.
- `src/lib/profile-schema.ts` is the source of truth for user-profile validation and option sets.

## AI safety boundary

Gemini is used only for process explanations. The deterministic fallback and refusal logic runs before any Gemini request, so unsupported political persuasion prompts are rejected without involving the model.
