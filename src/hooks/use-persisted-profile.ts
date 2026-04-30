import { useEffect, useState } from "react";
import { INITIAL_PROFILE, readProfileFromStorage, writeProfileToStorage } from "@/lib/profile-storage";
import { UserProfile } from "@/lib/types";
import { auth, getUserProfileFromFirestore, saveUserProfileToFirestore } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export function usePersistedProfile() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setProfile(readProfileFromStorage());
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      writeProfileToStorage(profile);
      if (user) {
        saveUserProfileToFirestore(user.uid, profile);
      }
    }
  }, [profile, user, isMounted]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const storedProfile = await getUserProfileFromFirestore(currentUser.uid);
        if (storedProfile) {
          setProfile({
            ...storedProfile,
            name: storedProfile.name || currentUser.displayName || "",
          });
        } else {
          setProfile((prev) => ({
            ...prev,
            name: currentUser.displayName || prev.name,
          }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  function updateProfile<Key extends keyof UserProfile>(key: Key, value: UserProfile[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  return { profile, updateProfile, user };
}
