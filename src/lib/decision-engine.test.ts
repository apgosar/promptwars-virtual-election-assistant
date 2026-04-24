import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildCalendarLink, getGuidance } from "@/lib/decision-engine";
import { UserProfile } from "@/lib/types";

const baseProfile: UserProfile = {
  name: "Aarav",
  ageBand: "18-21",
  experience: "first-time",
  registrationStatus: "not-started",
  language: "English",
  stage: "registration-closing"
};

describe("getGuidance", () => {
  it("marks urgent registration work as high urgency", () => {
    const result = getGuidance(baseProfile);

    assert.equal(result.urgency, "high");
    assert.match(result.nextSteps[0], /Verify your voter registration status/);
  });

  it("prioritizes preparation when registration is complete", () => {
    const result = getGuidance({
      ...baseProfile,
      registrationStatus: "completed",
      experience: "returning",
      stage: "polling-day"
    });

    assert.match(result.headline, /ready/);
    assert.equal(result.urgency, "medium");
  });

  it("localizes guidance for Hindi users", () => {
    const result = getGuidance({
      ...baseProfile,
      language: "Hindi"
    });

    assert.match(result.headline, /पंजीकरण|दस्तावेज़/);
    assert.match(result.summary, /आधिकारिक|पंजीकरण/);
  });
});

describe("buildCalendarLink", () => {
  it("creates a Google Calendar template URL", () => {
    const link = buildCalendarLink("Election preparation reminder");

    assert.match(link, /calendar.google.com/);
    assert.match(link, /Election\+preparation\+reminder/);
  });
});