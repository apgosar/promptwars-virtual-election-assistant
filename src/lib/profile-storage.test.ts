import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { INITIAL_PROFILE, parseStoredProfile } from "@/lib/profile-storage";

describe("parseStoredProfile", () => {
  it("returns the initial profile when nothing is stored", () => {
    assert.deepEqual(parseStoredProfile(null), INITIAL_PROFILE);
  });

  it("merges valid partial stored profiles with defaults", () => {
    const profile = parseStoredProfile(JSON.stringify({ language: "Hindi", registrationStatus: "completed" }));

    assert.equal(profile.language, "Hindi");
    assert.equal(profile.registrationStatus, "completed");
    assert.equal(profile.stage, INITIAL_PROFILE.stage);
  });

  it("falls back to the initial profile for malformed JSON", () => {
    assert.deepEqual(parseStoredProfile("{bad-json"), INITIAL_PROFILE);
  });

  it("falls back to the initial profile for invalid stored values", () => {
    const profile = parseStoredProfile(JSON.stringify({ language: "Spanish" }));

    assert.deepEqual(profile, INITIAL_PROFILE);
  });
});

describe("writeProfileToStorage", () => {
  it("writes the profile to localStorage", () => {
    const { writeProfileToStorage, PROFILE_STORAGE_KEY } = require("./profile-storage");
    // Mock window and localStorage
    global.window = {
      localStorage: {
        setItem: (key: string, value: string) => {
          assert.equal(key, PROFILE_STORAGE_KEY);
          assert.match(value, /Hindi/);
        }
      }
    } as any;

    writeProfileToStorage({ ...INITIAL_PROFILE, language: "Hindi" });

    // Cleanup
    delete (global as any).window;
  });
});
