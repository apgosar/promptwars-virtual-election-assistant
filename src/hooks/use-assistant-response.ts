import { useState } from "react";
import { buildFallbackAssistantAnswer } from "@/lib/assistant-fallback";
import { AssistantResponse, UserProfile } from "@/lib/types";

export function useAssistantResponse(profile: UserProfile) {
  const [question, setQuestion] = useState("");
  const [assistantResponse, setAssistantResponse] = useState<AssistantResponse | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function askAssistant() {
    if (!question.trim()) {
      setAssistantResponse(buildFallbackAssistantAnswer("", profile));
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ profile, question })
      });

      if (!response.ok) {
        throw new Error("Assistant request failed");
      }

      setAssistantResponse((await response.json()) as AssistantResponse);
    } catch {
      setAssistantResponse(buildFallbackAssistantAnswer(question, profile));
    } finally {
      setIsPending(false);
    }
  }

  return { assistantResponse, askAssistant, isPending, question, setQuestion };
}
