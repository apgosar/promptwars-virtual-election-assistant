import { getUiCopy } from "@/lib/copy";
import { buildCalendarLink } from "@/lib/decision-engine";
import { GuidanceResult } from "@/lib/types";

type GuidanceCardProps = {
  guidance: GuidanceResult;
  ui: ReturnType<typeof getUiCopy>;
};

export function GuidanceCard({ guidance, ui }: GuidanceCardProps) {
  return (
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
  );
}
