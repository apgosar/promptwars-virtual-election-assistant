export type {
  AgeBand,
  AssistantRequest,
  ElectionStage,
  RegistrationStatus,
  UserLanguage,
  UserProfile,
  VoterExperience
} from "@/lib/profile-schema";

import type { ElectionStage } from "@/lib/profile-schema";

export interface TimelineEntry {
  id: ElectionStage;
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
