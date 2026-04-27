import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  AGE_BANDS,
  ELECTION_STAGES,
  REGISTRATION_STATUSES,
  USER_LANGUAGES,
  VOTER_EXPERIENCES,
  assistantRequestSchema,
  userProfileSchema
} from "@/lib/profile-schema";

describe("profile schema", () => {
  it("keeps domain option sets populated", () => {
    assert.deepEqual(AGE_BANDS, ["18-21", "22-29", "30+"]);
    assert.deepEqual(VOTER_EXPERIENCES, ["first-time", "returning"]);
    assert.deepEqual(REGISTRATION_STATUSES, ["not-started", "in-progress", "completed"]);
    assert.deepEqual(USER_LANGUAGES, ["English", "Hindi", "Marathi"]);
    assert.equal(ELECTION_STAGES.length, 6);
  });

  it("accepts a complete valid profile", () => {
    const profile = userProfileSchema.parse({
      name: "Aarav",
      ageBand: "18-21",
      experience: "first-time",
      registrationStatus: "not-started",
      language: "English",
      stage: "registration-open"
    });

    assert.equal(profile.name, "Aarav");
  });

  it("rejects unsupported profile values", () => {
    const result = userProfileSchema.safeParse({
      name: "Aarav",
      ageBand: "17",
      experience: "first-time",
      registrationStatus: "not-started",
      language: "English",
      stage: "registration-open"
    });

    assert.equal(result.success, false);
  });

  it("trims and validates assistant questions", () => {
    const result = assistantRequestSchema.parse({
      question: "  How do I check registration?  ",
      profile: {
        name: "",
        ageBand: "22-29",
        experience: "returning",
        registrationStatus: "completed",
        language: "Marathi",
        stage: "polling-day"
      }
    });

    assert.equal(result.question, "How do I check registration?");
  });
});
