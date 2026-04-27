import { useEffect, useState } from "react";
import { readProfileFromStorage, writeProfileToStorage } from "@/lib/profile-storage";
import { UserProfile } from "@/lib/types";

export function usePersistedProfile() {
  const [profile, setProfile] = useState<UserProfile>(() => readProfileFromStorage());

  useEffect(() => {
    writeProfileToStorage(profile);
  }, [profile]);

  function updateProfile<Key extends keyof UserProfile>(key: Key, value: UserProfile[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  return { profile, updateProfile };
}
