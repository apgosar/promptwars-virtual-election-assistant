import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getElectionTimeline, getExplainerCards } from "@/lib/election-data";
import { ELECTION_STAGES, USER_LANGUAGES } from "@/lib/profile-schema";

describe("election data", () => {
  it("provides a timeline entry for every election stage in every language", () => {
    for (const language of USER_LANGUAGES) {
      const timeline = getElectionTimeline(language);

      assert.deepEqual(
        timeline.map((entry) => entry.id),
        [...ELECTION_STAGES]
      );
    }
  });

  it("provides official resource cards for every language", () => {
    for (const language of USER_LANGUAGES) {
      const cards = getExplainerCards(language);

      assert.equal(cards.length, 3);
      assert.ok(cards.every((card) => card.href.startsWith("https://")));
    }
  });
});
