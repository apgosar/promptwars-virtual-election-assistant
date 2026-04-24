import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildFallbackAssistantAnswer } from "@/lib/assistant-fallback";
import { UserProfile } from "@/lib/types";

const profile: UserProfile = {
  name: "Meera",
  ageBand: "22-29",
  experience: "first-time",
  registrationStatus: "in-progress",
  language: "Hindi",
  stage: "campaign-period"
};

describe("buildFallbackAssistantAnswer", () => {
  it("refuses political persuasion prompts", () => {
    const result = buildFallbackAssistantAnswer("Who should I vote for?", profile);

    assert.equal(result.sourceMode, "refusal");
  });

  it("returns a grounded fallback answer for supported process topics", () => {
    const result = buildFallbackAssistantAnswer("How do I handle voter ID documents?", profile);

    assert.equal(result.sourceMode, "fallback");
    assert.match(result.answer, /official|आधिकारिक|अधिकृत/);
  });

  it("localizes fallback answers for Hindi users", () => {
    const result = buildFallbackAssistantAnswer("What is the election timeline?", profile);

    assert.equal(result.sourceMode, "fallback");
    assert.match(result.answer, /आधिकारिक|भारत निर्वाचन आयोग|टाइमलाइन/);
  });
});