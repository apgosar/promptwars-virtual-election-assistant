export type RegistrationStatus = "not-started" | "in-progress" | "completed";

export type ElectionStage =
  | "registration-open"
  | "registration-closing"
  | "campaign-period"
  | "election-week"
  | "polling-day"
  | "results-and-followup";

export type UserLanguage = "English" | "Hindi" | "Marathi";

export type VoterExperience = "first-time" | "returning";

export interface UserProfile {
  name: string;
  ageBand: "18-21" | "22-29" | "30+";
  experience: VoterExperience;
  registrationStatus: RegistrationStatus;
  language: UserLanguage;
  stage: ElectionStage;
}

export interface TimelineEntry {
  id: string;
  title: string;
  window: string;
  description: string;
}

export interface ExplainerCard {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}

export interface GuidanceResult {
  urgency: "low" | "medium" | "high";
  headline: string;
  summary: string;
  nextSteps: string[];
  reminderTitle: string;
  explainerTopics: string[];
}

export interface AssistantResponse {
  answer: string;
  sourceMode: "gemini" | "fallback" | "refusal";
}