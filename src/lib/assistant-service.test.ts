import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createAssistantResponse, GeminiGenerator } from "@/lib/assistant-service";
import { AssistantRequest } from "@/lib/types";

const request: AssistantRequest = {
  question: "How do I check voter registration?",
  profile: {
    name: "Aarav",
    ageBand: "18-21",
    experience: "first-time",
    registrationStatus: "not-started",
    language: "English",
    stage: "registration-open"
  }
};

describe("createAssistantResponse", () => {
  it("returns a Gemini answer when the generator succeeds", async () => {
    const result = await createAssistantResponse(request, async () => "Use the official voter portal.");

    assert.deepEqual(result, {
      answer: "Use the official voter portal.",
      sourceMode: "gemini"
    });
  });

  it("falls back when Gemini is unavailable", async () => {
    const result = await createAssistantResponse(request, null);

    assert.equal(result.sourceMode, "fallback");
    assert.match(result.answer, /official|Election Commission|Voters/);
  });

  it("falls back when the generator returns an empty answer", async () => {
    const result = await createAssistantResponse(request, async () => "  ");

    assert.equal(result.sourceMode, "fallback");
  });

  it("falls back when the generator throws", async () => {
    const result = await createAssistantResponse(request, async () => {
      throw new Error("model unavailable");
    });

    assert.equal(result.sourceMode, "fallback");
  });

  it("does not call Gemini for refused persuasion prompts", async () => {
    let calls = 0;
    const generator: GeminiGenerator = async () => {
      calls += 1;
      return "never called";
    };

    const result = await createAssistantResponse({ ...request, question: "Who should I vote for?" }, generator);

    assert.equal(calls, 0);
    assert.equal(result.sourceMode, "refusal");
  });
});
