import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getStageName, getUiCopy } from "@/lib/copy";
import { ELECTION_STAGES, USER_LANGUAGES } from "@/lib/profile-schema";

describe("localized copy", () => {
  it("defines complete option labels for every supported language", () => {
    for (const language of USER_LANGUAGES) {
      const ui = getUiCopy(language);

      assert.equal(Object.keys(ui.options.language).length, USER_LANGUAGES.length);
      assert.equal(Object.keys(ui.options.stage).length, ELECTION_STAGES.length);
      assert.ok(ui.heroTitle.length > 0);
      assert.ok(ui.buttons.addCalendar.length > 0);
    }
  });

  it("defines stage names for every supported stage", () => {
    for (const language of USER_LANGUAGES) {
      for (const stage of ELECTION_STAGES) {
        assert.ok(getStageName(language, stage).length > 0);
      }
    }
  });
});
