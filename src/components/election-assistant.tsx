"use client";

import { useEffect, useState, useTransition } from "react";
import { buildFallbackAssistantAnswer } from "@/lib/assistant-fallback";
import { getUiCopy } from "@/lib/copy";
import { buildCalendarLink, getGuidance } from "@/lib/decision-engine";
import { getElectionTimeline, getExplainerCards } from "@/lib/election-data";
import { AssistantResponse, UserProfile } from "@/lib/types";

const STORAGE_KEY = "india-election-assistant-profile";

const initialProfile: UserProfile = {
  name: "",
  ageBand: "18-21",
  experience: "first-time",
  registrationStatus: "not-started",
  language: "English",
  stage: "registration-open"
};

export function ElectionAssistant() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window === "undefined") {
      return initialProfile;
    }

    try {
      const storedProfile = window.localStorage.getItem(STORAGE_KEY);

      if (!storedProfile) {
        return initialProfile;
      }

      return { ...initialProfile, ...(JSON.parse(storedProfile) as Partial<UserProfile>) };
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return initialProfile;
    }
  });
  const [question, setQuestion] = useState("");
  const [assistantResponse, setAssistantResponse] = useState<AssistantResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const ui = getUiCopy(profile.language);
  const guidance = getGuidance(profile);
  const electionTimeline = getElectionTimeline(profile.language);
  const explainerCards = getExplainerCards(profile.language);

  function updateProfile<Key extends keyof UserProfile>(key: Key, value: UserProfile[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  async function askAssistant() {
    if (!question.trim()) {
      setAssistantResponse(buildFallbackAssistantAnswer("", profile));
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ profile, question })
        });

        if (!response.ok) {
          throw new Error("Assistant request failed");
        }

        const payload = (await response.json()) as AssistantResponse;
        setAssistantResponse(payload);
      } catch {
        setAssistantResponse(buildFallbackAssistantAnswer(question, profile));
      }
    });
  }

  return (
    <main className="page-shell">
      <section className="topbar" aria-label="Language selector">
        <div className="topbar-inner">
          <span className="topbar-label">{ui.labels.language}</span>
          <div className="topbar-select-wrap">
            <select id="page-language" value={profile.language} onChange={(event) => updateProfile("language", event.target.value as UserProfile["language"])}>
              <option value="English">{ui.options.language.English}</option>
              <option value="Hindi">{ui.options.language.Hindi}</option>
              <option value="Marathi">{ui.options.language.Marathi}</option>
            </select>
          </div>
        </div>
      </section>

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
          <article className="panel" aria-labelledby="profile-title">
            <div className="status-row">
              <h2 className="card-title" id="profile-title">
                {ui.profileTitle}
              </h2>
              <span className={`urgency-badge urgency-${guidance.urgency}`}>{guidance.urgency} {ui.urgencySuffix}</span>
            </div>
            <p className="supporting-text">{ui.profileDescription}</p>
            <div className="fields">
              <div className="field">
                <label htmlFor="name">{ui.labels.name}</label>
                <input id="name" value={profile.name} onChange={(event) => updateProfile("name", event.target.value)} placeholder={ui.placeholders.name} />
              </div>
              <div className="field">
                <label htmlFor="ageBand">{ui.labels.ageBand}</label>
                <select id="ageBand" value={profile.ageBand} onChange={(event) => updateProfile("ageBand", event.target.value as UserProfile["ageBand"])}>
                  <option value="18-21">18-21</option>
                  <option value="22-29">22-29</option>
                  <option value="30+">30+</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="experience">{ui.labels.experience}</label>
                <select id="experience" value={profile.experience} onChange={(event) => updateProfile("experience", event.target.value as UserProfile["experience"])}>
                  <option value="first-time">{ui.options.experience["first-time"]}</option>
                  <option value="returning">{ui.options.experience.returning}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="registrationStatus">{ui.labels.registrationStatus}</label>
                <select
                  id="registrationStatus"
                  value={profile.registrationStatus}
                  onChange={(event) => updateProfile("registrationStatus", event.target.value as UserProfile["registrationStatus"])}
                >
                  <option value="not-started">{ui.options.registrationStatus["not-started"]}</option>
                  <option value="in-progress">{ui.options.registrationStatus["in-progress"]}</option>
                  <option value="completed">{ui.options.registrationStatus.completed}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="stage">{ui.labels.stage}</label>
                <select id="stage" value={profile.stage} onChange={(event) => updateProfile("stage", event.target.value as UserProfile["stage"])}>
                  <option value="registration-open">{ui.options.stage["registration-open"]}</option>
                  <option value="registration-closing">{ui.options.stage["registration-closing"]}</option>
                  <option value="campaign-period">{ui.options.stage["campaign-period"]}</option>
                  <option value="election-week">{ui.options.stage["election-week"]}</option>
                  <option value="polling-day">{ui.options.stage["polling-day"]}</option>
                  <option value="results-and-followup">{ui.options.stage["results-and-followup"]}</option>
                </select>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section content-grid" aria-label="Guided actions and assistant">
        <article className="action-card">
          <span className={`urgency-badge urgency-${guidance.urgency}`}>{ui.sections.nextSteps}</span>
          <h2 className="section-title">{guidance.headline}</h2>
          <p>{guidance.summary}</p>
          <ol className="action-list">
            {guidance.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="cta-row">
            <a className="primary-button" href={buildCalendarLink(guidance.reminderTitle)} target="_blank" rel="noreferrer">
              {ui.buttons.addCalendar}
            </a>
            <a className="secondary-button" href="https://voters.eci.gov.in/" target="_blank" rel="noreferrer">
              {ui.buttons.openPortal}
            </a>
          </div>
        </article>

        <article className="chat-panel" aria-labelledby="assistant-title">
          <div className="status-row">
            <h2 className="section-title" id="assistant-title">
              {ui.sections.askAssistant}
            </h2>
            <span className="tiny">{ui.sections.processOnly}</span>
          </div>
          <p className="supporting-text">{ui.sections.assistantPrompt}</p>
          <div className="field">
            <label htmlFor="question">{ui.labels.question}</label>
            <textarea
              id="question"
              rows={5}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={ui.placeholders.question}
            />
          </div>
          <div className="cta-row">
            <button className="primary-button" type="button" onClick={askAssistant} disabled={isPending}>
              {isPending ? ui.sections.thinking : ui.sections.askButton}
            </button>
          </div>
          {assistantResponse ? (
            <div className="assistant-answer" aria-live="polite">
              <strong>
                {assistantResponse.sourceMode === "gemini"
                  ? ui.sections.geminiAnswer
                  : assistantResponse.sourceMode === "refusal"
                    ? ui.sections.refusalAnswer
                    : ui.sections.fallbackAnswer}
              </strong>
              <p>{assistantResponse.answer}</p>
            </div>
          ) : null}
        </article>
      </section>

      <section className="section" aria-labelledby="timeline-title">
        <h2 className="section-title" id="timeline-title">
          {ui.sections.timelineTitle}
        </h2>
        <p className="supporting-text">{ui.sections.timelineDescription}</p>
        <div className="timeline-grid" role="list">
          {electionTimeline.map((entry) => (
            <div key={entry.id} className={`timeline-item ${entry.id === profile.stage ? "active" : ""}`} role="listitem">
              <div className="timeline-node" aria-hidden="true" />
              <article className={`timeline-card ${entry.id === profile.stage ? "active" : ""}`}>
                <div className="timeline-meta">
                  <span className="eyebrow">{entry.window}</span>
                </div>
                <h3 className="card-title">{entry.title}</h3>
                <p>{entry.description}</p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="resources-title">
        <h2 className="section-title" id="resources-title">
          {ui.sections.resourcesTitle}
        </h2>
        <p className="supporting-text">{ui.sections.resourcesDescription}</p>
        <div className="resource-grid">
          {explainerCards.map((card) => (
            <article key={card.id} className="resource-card">
              <h3 className="card-title">{card.title}</h3>
              <p>{card.description}</p>
              <div className="resource-footer">
                <a className="resource-link" href={card.href} target="_blank" rel="noreferrer">
                  {card.actionLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}