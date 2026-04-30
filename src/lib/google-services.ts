import { UserLanguage, UserProfile } from "@/lib/types";

export type GoogleServiceMode = "live" | "demo" | "planned";

export type GoogleServiceIntegration = {
  name: string;
  product: string;
  mode: GoogleServiceMode;
  summary: string;
  implementation: string;
};

export type GooglePollingLocation = {
  name: string;
  area: string;
  distance: string;
  mapsUrl: string;
};

export type OfficialSearchResult = {
  title: string;
  domain: string;
  summary: string;
  url: string;
};

export const googleServiceIntegrations: GoogleServiceIntegration[] = [
  {
    name: "Process explainer assistant",
    product: "Gemini API",
    mode: "live",
    summary: "Generates guarded election-process explanations for valid user questions.",
    implementation: "Server-side Gemini call with deterministic refusal and fallback before/after the model boundary."
  },
  {
    name: "Deployment runtime",
    product: "Cloud Run + Cloud Build",
    mode: "live",
    summary: "Runs the submitted Next.js app on Google Cloud with source deploys.",
    implementation: "Cloud Run service deployed from source through Cloud Build and Artifact Registry."
  },
  {
    name: "Timeline reminders",
    product: "Google Calendar",
    mode: "live",
    summary: "Creates calendar-ready reminders for registration, document checks, polling day, and follow-up.",
    implementation: "OAuth-free Google Calendar template links generated from the selected election context."
  },
  {
    name: "Nearby help finder",
    product: "Google Maps Platform",
    mode: "live",
    summary: "Interactive map showing nearby polling/help centers.",
    implementation: "Live interactive map using @react-google-maps/api and Google Maps JavaScript API."
  },
  {
    name: "Official resource search",
    product: "Programmable Search Engine",
    mode: "demo",
    summary: "Surfaces official election resources from ECI and voter-service domains.",
    implementation: "Curated results now; Programmable Search JSON API can power live restricted-domain search."
  },
  {
    name: "Language assist",
    product: "Cloud Translation",
    mode: "demo",
    summary: "Demonstrates how explainers can be translated beyond the handcrafted MVP languages.",
    implementation: "Provider boundary is represented in UI; Cloud Translation can be attached for dynamic content."
  },
  {
    name: "Saved checklist",
    product: "Firebase Auth + Firestore",
    mode: "live",
    summary: "Live Firebase integration for Google sign-in and profile synchronization.",
    implementation:
      "Uses Firebase Authentication to sign in with Google, and Firestore to persist and sync user preferences."
  }
];

export const demoPollingLocations: GooglePollingLocation[] = [
  {
    name: "District voter facilitation desk",
    area: "Civic services complex",
    distance: "2.4 km",
    mapsUrl: "https://www.google.com/maps/search/voter+facilitation+center+near+me"
  },
  {
    name: "Polling information help desk",
    area: "Municipal ward office",
    distance: "3.8 km",
    mapsUrl: "https://www.google.com/maps/search/election+help+desk+near+me"
  },
  {
    name: "Document assistance counter",
    area: "Public service center",
    distance: "5.1 km",
    mapsUrl: "https://www.google.com/maps/search/public+service+center+voter+registration"
  }
];

export const officialSearchResults: OfficialSearchResult[] = [
  {
    title: "Election Commission of India",
    domain: "eci.gov.in",
    summary: "Official election process guidance, schedules, releases, and voter education resources.",
    url: "https://www.eci.gov.in/"
  },
  {
    title: "Voters' Service Portal",
    domain: "voters.eci.gov.in",
    summary: "Registration, correction, status checks, and official voter-service workflows.",
    url: "https://voters.eci.gov.in/"
  },
  {
    title: "National Voters' Service Portal",
    domain: "nvsp.in",
    summary: "Additional official voter services and information for citizen-facing election tasks.",
    url: "https://www.nvsp.in/"
  }
];

export function buildGoogleCalendarReminders(profile: UserProfile) {
  const stageLabel = profile.stage.replaceAll("-", " ");

  return [
    buildCalendarLink(
      "Verify voter registration",
      "Check your registration status on the official voter portal.",
      "20260410"
    ),
    buildCalendarLink(
      "Prepare polling-day documents",
      "Review the documents and plan needed before polling day.",
      "20260420"
    ),
    buildCalendarLink(
      `Election process follow-up: ${stageLabel}`,
      "Review official guidance for your current election stage.",
      "20260430"
    )
  ];
}

export function getTranslationPreview(language: UserLanguage): string {
  const previews: Record<UserLanguage, string> = {
    English: "Cloud Translation-ready layer for expanding beyond handcrafted MVP copy.",
    Hindi: "Cloud Translation-ready layer: सहायक सामग्री को और भाषाओं में बढ़ाने के लिए तैयार।",
    Marathi: "Cloud Translation-ready layer: सहाय्यक माहिती अधिक भाषांमध्ये वाढवण्यासाठी तयार."
  };

  return previews[language];
}

function buildCalendarLink(title: string, details: string, date: string) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${date}T090000Z/${date}T093000Z`,
    details,
    location: "https://voters.eci.gov.in/"
  });

  return {
    title,
    url: `https://calendar.google.com/calendar/render?${params.toString()}`
  };
}
