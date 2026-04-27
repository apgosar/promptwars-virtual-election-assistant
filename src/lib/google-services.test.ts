import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildGoogleCalendarReminders,
  demoPollingLocations,
  getTranslationPreview,
  googleServiceIntegrations,
  officialSearchResults
} from "@/lib/google-services";
import { UserProfile } from "@/lib/types";

const profile: UserProfile = {
  name: "Meera",
  ageBand: "22-29",
  experience: "returning",
  registrationStatus: "completed",
  language: "English",
  stage: "polling-day"
};

describe("google services integration data", () => {
  it("shows live, demo, and planned Google integrations", () => {
    const modes = new Set(googleServiceIntegrations.map((service) => service.mode));
    const products = googleServiceIntegrations.map((service) => service.product).join(" ");

    assert.deepEqual(modes, new Set(["live", "demo", "planned"]));
    assert.match(products, /Gemini API/);
    assert.match(products, /Google Maps Platform/);
    assert.match(products, /Cloud Translation/);
    assert.match(products, /Firebase/);
  });

  it("keeps demo map links on Google Maps", () => {
    assert.ok(demoPollingLocations.length >= 3);

    for (const location of demoPollingLocations) {
      assert.match(location.mapsUrl, /^https:\/\/www\.google\.com\/maps\/search\//);
    }
  });

  it("restricts search results to official election resources", () => {
    assert.deepEqual(
      officialSearchResults.map((result) => result.domain),
      ["eci.gov.in", "voters.eci.gov.in", "nvsp.in"]
    );
  });

  it("builds Google Calendar reminder links", () => {
    const reminders = buildGoogleCalendarReminders(profile);

    assert.equal(reminders.length, 3);
    assert.ok(reminders.every((reminder) => reminder.url.startsWith("https://calendar.google.com/calendar/render?")));
    assert.ok(reminders.some((reminder) => reminder.title.includes("polling day")));
  });

  it("provides language-specific translation previews", () => {
    assert.match(getTranslationPreview("Hindi"), /Cloud Translation-ready/);
    assert.match(getTranslationPreview("Marathi"), /Cloud Translation-ready/);
  });
});
