import { getUiCopy } from "@/lib/copy";
import { ExplainerCard } from "@/lib/types";

type ResourceGridProps = {
  cards: ExplainerCard[];
  ui: ReturnType<typeof getUiCopy>;
};

export function ResourceGrid({ cards, ui }: ResourceGridProps) {
  return (
    <section className="section" aria-labelledby="resources-title">
      <h2 className="section-title" id="resources-title">
        {ui.sections.resourcesTitle}
      </h2>
      <p className="supporting-text">{ui.sections.resourcesDescription}</p>
      <div className="resource-grid">
        {cards.map((card) => (
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
  );
}
