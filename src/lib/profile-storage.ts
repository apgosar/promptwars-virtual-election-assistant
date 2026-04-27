import { userProfileSchema } from "@/lib/profile-schema";
import { UserProfile } from "@/lib/types";

export const PROFILE_STORAGE_KEY = "india-election-assistant-profile";

export const INITIAL_PROFILE: UserProfile = {
  name: "",
  ageBand: "18-21",
  experience: "first-time",
  registrationStatus: "not-started",
  language: "English",
  stage: "registration-open"
};

export function parseStoredProfile(storedProfile: string | null): UserProfile {
  if (!storedProfile) {
    return INITIAL_PROFILE;
  }

  try {
    const parsedProfile = userProfileSchema.partial().parse(JSON.parse(storedProfile));
    return userProfileSchema.parse({ ...INITIAL_PROFILE, ...parsedProfile });
  } catch {
    return INITIAL_PROFILE;
  }
}

export function readProfileFromStorage(): UserProfile {
  if (typeof window === "undefined") {
    return INITIAL_PROFILE;
  }

  return parseStoredProfile(window.localStorage.getItem(PROFILE_STORAGE_KEY));
}

export function writeProfileToStorage(profile: UserProfile): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
