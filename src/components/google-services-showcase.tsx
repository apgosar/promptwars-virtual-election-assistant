import {
  buildGoogleCalendarReminders,
  demoPollingLocations,
  getTranslationPreview,
  googleServiceIntegrations,
  officialSearchResults
} from "@/lib/google-services";
import { UserProfile } from "@/lib/types";
import { InteractiveMap } from "./interactive-map";

type GoogleServicesShowcaseProps = {
  profile: UserProfile;
};

const modeLabels = {
  live: "Live",
  demo: "Demo",
  planned: "Planned"
};

export function GoogleServicesShowcase({ profile }: GoogleServicesShowcaseProps) {
  const calendarReminders = buildGoogleCalendarReminders(profile);

  return (
    <section className="section google-services" aria-labelledby="google-services-title">
      <div className="section-header">
        <span className="eyebrow">Google services</span>
        <h2 className="section-title" id="google-services-title">
          Integrated Google platform touchpoints
        </h2>
        <p className="supporting-text">
          Gemini, Cloud Run, Google Maps, and Firebase Auth are live, while Programmable Search and Translation are
          shown as production-ready integration surfaces with safe mock data for the hackathon demo.
        </p>
      </div>

      <div className="service-matrix" aria-label="Google service integration matrix">
        {googleServiceIntegrations.map((service) => (
          <article className="service-card" key={service.name}>
            <div className="status-row">
              <span className={`service-status service-status-${service.mode}`}>{modeLabels[service.mode]}</span>
              <span className="tiny">{service.product}</span>
            </div>
            <h3>{service.name}</h3>
            <p>{service.summary}</p>
            <p className="tiny">{service.implementation}</p>
          </article>
        ))}
      </div>

      <div className="google-demo-grid">
        <article className="service-card map-card" aria-labelledby="maps-demo-title">
          <div className="status-row">
            <span className="service-status service-status-live">Google Maps live</span>
            <span className="tiny">Places-ready</span>
          </div>
          <h3 id="maps-demo-title">Nearby election help finder</h3>
          <InteractiveMap />
          <ul className="location-list">
            {demoPollingLocations.map((location) => (
              <li key={location.name}>
                <div>
                  <strong>{location.name}</strong>
                  <span>{location.area}</span>
                </div>
                <a className="resource-link" href={location.mapsUrl} target="_blank" rel="noreferrer">
                  {location.distance}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="service-card" aria-labelledby="search-demo-title">
          <div className="status-row">
            <span className="service-status service-status-demo">Programmable Search mock</span>
            <span className="tiny">Official domains</span>
          </div>
          <h3 id="search-demo-title">Restricted official-resource search</h3>
          <div className="search-box" role="search">
            <span>election process documents</span>
            <button className="secondary-button" type="button">
              Search
            </button>
          </div>
          <ul className="search-results">
            {officialSearchResults.map((result) => (
              <li key={result.url}>
                <a href={result.url} target="_blank" rel="noreferrer">
                  {result.title}
                </a>
                <span>{result.domain}</span>
                <p>{result.summary}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="service-card" aria-labelledby="calendar-demo-title">
          <div className="status-row">
            <span className="service-status service-status-live">Google Calendar live</span>
            <span className="tiny">No OAuth needed</span>
          </div>
          <h3 id="calendar-demo-title">Multi-step reminder set</h3>
          <ul className="calendar-list">
            {calendarReminders.map((reminder) => (
              <li key={reminder.title}>
                <a href={reminder.url} target="_blank" rel="noreferrer">
                  {reminder.title}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="service-card" aria-labelledby="translation-demo-title">
          <div className="status-row">
            <span className="service-status service-status-demo">Cloud Translation mock</span>
            <span className="tiny">{profile.language}</span>
          </div>
          <h3 id="translation-demo-title">Translation provider boundary</h3>
          <p>{getTranslationPreview(profile.language)}</p>
          <p className="tiny">
            The MVP keeps critical copy reviewed by humans; dynamic explainer text can use Cloud Translation behind this
            boundary when production keys are configured.
          </p>
        </article>
      </div>
    </section>
  );
}
