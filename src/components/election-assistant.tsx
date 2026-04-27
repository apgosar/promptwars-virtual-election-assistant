"use client";

import { AssistantPanel } from "@/components/assistant-panel";
import { ElectionTimeline } from "@/components/election-timeline";
import { GuidanceCard } from "@/components/guidance-card";
import { LanguageSelector } from "@/components/language-selector";
import { ProfileForm } from "@/components/profile-form";
import { ResourceGrid } from "@/components/resource-grid";
import { useAssistantResponse } from "@/hooks/use-assistant-response";
import { usePersistedProfile } from "@/hooks/use-persisted-profile";
import { getUiCopy } from "@/lib/copy";
import { getGuidance } from "@/lib/decision-engine";
import { getElectionTimeline, getExplainerCards } from "@/lib/election-data";

export function ElectionAssistant() {
  const { profile, updateProfile } = usePersistedProfile();
  const ui = getUiCopy(profile.language);
  const guidance = getGuidance(profile);
  const electionTimeline = getElectionTimeline(profile.language);
  const explainerCards = getExplainerCards(profile.language);
  const { assistantResponse, askAssistant, isPending, question, setQuestion } = useAssistantResponse(profile);

  return (
    <main className="page-shell">
      <LanguageSelector
        label={ui.labels.language}
        language={profile.language}
        options={ui.options.language}
        onLanguageChange={(language) => updateProfile("language", language)}
      />

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{ui.heroEyebrow}</span>
            <h1>{ui.heroTitle}</h1>
            <p>{ui.heroDescription}</p>
            <div className="chips" aria-label="Feature highlights">
              {ui.featureHighlights.map((item) => (
                <span className="secondary-button" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <ProfileForm guidance={guidance} profile={profile} ui={ui} onProfileChange={updateProfile} />
        </div>
      </section>

      <section className="section content-grid" aria-label="Guided actions and assistant">
        <GuidanceCard guidance={guidance} ui={ui} />
        <AssistantPanel
          assistantResponse={assistantResponse}
          isPending={isPending}
          onAskAssistant={askAssistant}
          question={question}
          setQuestion={setQuestion}
          ui={ui}
        />
      </section>
      <ElectionTimeline activeStage={profile.stage} entries={electionTimeline} ui={ui} />
      <ResourceGrid cards={explainerCards} ui={ui} />
    </main>
  );
}
