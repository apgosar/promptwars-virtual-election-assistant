import { GoogleGenAI } from "@google/genai";
import { buildFallbackAssistantAnswer, buildSystemPrompt } from "@/lib/assistant-fallback";
import { AssistantRequest, AssistantResponse } from "@/lib/types";

export type GeminiGenerator = (request: AssistantRequest) => Promise<string | null>;

export async function createAssistantResponse(
  request: AssistantRequest,
  generateGeminiAnswer: GeminiGenerator | null = buildGeminiAnswer
): Promise<AssistantResponse> {
  const fallback = buildFallbackAssistantAnswer(request.question, request.profile);

  if (fallback.sourceMode === "refusal" || !generateGeminiAnswer) {
    return fallback;
  }

  try {
    const answer = (await generateGeminiAnswer(request))?.trim();

    if (!answer) {
      return fallback;
    }

    return { answer, sourceMode: "gemini" };
  } catch {
    return fallback;
  }
}

async function buildGeminiAnswer(request: AssistantRequest): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const client = new GoogleGenAI({ apiKey });
  const response = await client.models.generateContent({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    contents: `${buildSystemPrompt(request.profile)} User question: ${request.question}`
  });

  return response.text ?? null;
}
