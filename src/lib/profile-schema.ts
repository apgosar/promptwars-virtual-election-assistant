import { z } from "zod";

export const AGE_BANDS = ["18-21", "22-29", "30+"] as const;
export const VOTER_EXPERIENCES = ["first-time", "returning"] as const;
export const REGISTRATION_STATUSES = ["not-started", "in-progress", "completed"] as const;
export const USER_LANGUAGES = ["English", "Hindi", "Marathi"] as const;
export const ELECTION_STAGES = [
  "registration-open",
  "registration-closing",
  "campaign-period",
  "election-week",
  "polling-day",
  "results-and-followup"
] as const;

export const userProfileSchema = z.object({
  name: z.string().max(50),
  ageBand: z.enum(AGE_BANDS),
  experience: z.enum(VOTER_EXPERIENCES),
  registrationStatus: z.enum(REGISTRATION_STATUSES),
  language: z.enum(USER_LANGUAGES),
  stage: z.enum(ELECTION_STAGES)
});

export const assistantRequestSchema = z.object({
  question: z.string().trim().min(1).max(1000),
  profile: userProfileSchema
});

export type AgeBand = (typeof AGE_BANDS)[number];
export type VoterExperience = (typeof VOTER_EXPERIENCES)[number];
export type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number];
export type UserLanguage = (typeof USER_LANGUAGES)[number];
export type ElectionStage = (typeof ELECTION_STAGES)[number];
export type UserProfile = z.infer<typeof userProfileSchema>;
export type AssistantRequest = z.infer<typeof assistantRequestSchema>;
