import { getUiCopy } from "@/lib/copy";
import { ElectionStage, TimelineEntry } from "@/lib/types";

type ElectionTimelineProps = {
  activeStage: ElectionStage;
  entries: TimelineEntry[];
  ui: ReturnType<typeof getUiCopy>;
};

export function ElectionTimeline({ activeStage, entries, ui }: ElectionTimelineProps) {
  return (
    <section className="section" aria-labelledby="timeline-title">
      <h2 className="section-title" id="timeline-title">
        {ui.sections.timelineTitle}
      </h2>
      <p className="supporting-text">{ui.sections.timelineDescription}</p>
      <div className="timeline-grid" role="list">
        {entries.map((entry) => {
          const isActive = entry.id === activeStage;

          return (
            <div key={entry.id} className={`timeline-item ${isActive ? "active" : ""}`} role="listitem">
              <div className="timeline-node" aria-hidden="true" />
              <article className={`timeline-card ${isActive ? "active" : ""}`}>
                <div className="timeline-meta">
                  <span className="eyebrow">{entry.window}</span>
                </div>
                <h3 className="card-title">{entry.title}</h3>
                <p>{entry.description}</p>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
