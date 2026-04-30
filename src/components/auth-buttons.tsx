import { signInWithGoogle, signOutGoogle } from "@/lib/firebase";
import { usePersistedProfile } from "@/hooks/use-persisted-profile";

export function AuthButtons() {
  const { user } = usePersistedProfile();
  if (user) {
    return (
      <button className="secondary-button" onClick={signOutGoogle} style={{ padding: "4px 8px", fontSize: "0.8rem" }}>
        Sign out ({user.displayName || user.email})
      </button>
    );
  }

  return (
    <button className="primary-button" onClick={signInWithGoogle} style={{ padding: "4px 8px", fontSize: "0.8rem" }}>
      Sign in with Google
    </button>
  );
}
