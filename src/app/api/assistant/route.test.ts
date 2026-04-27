import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { POST } from "@/app/api/assistant/route";

function createRequest(body: unknown): Request {
  return new Request("http://localhost/api/assistant", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

describe("assistant route", () => {
  it("rejects malformed JSON", async () => {
    const response = await POST(createRequest("{bad-json"));
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.sourceMode, "refusal");
  });

  it("rejects invalid payloads", async () => {
    const response = await POST(createRequest({ question: "How do I register?" }));
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.answer, "Invalid request payload.");
  });

  it("returns deterministic fallback when no API key is configured", async () => {
    const originalApiKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const response = await POST(
      createRequest({
        question: "How do I check registration?",
        profile: {
          name: "Aarav",
          ageBand: "18-21",
          experience: "first-time",
          registrationStatus: "not-started",
          language: "English",
          stage: "registration-open"
        }
      })
    );
    const body = await response.json();

    if (originalApiKey) {
      process.env.GEMINI_API_KEY = originalApiKey;
    }

    assert.equal(response.status, 200);
    assert.equal(body.sourceMode, "fallback");
  });
});
