import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { buildFallbackAssistantAnswer, buildSystemPrompt } from "@/lib/assistant-fallback";
import { assistantRequestSchema } from "@/lib/profile-schema";

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ answer: "Invalid JSON payload.", sourceMode: "refusal" }, { status: 400 });
  }

  const payload = assistantRequestSchema.safeParse(requestBody);

  if (!payload.success) {
    return NextResponse.json({ answer: "Invalid request payload.", sourceMode: "refusal" }, { status: 400 });
  }

  const { question, profile } = payload.data;
  const fallback = buildFallbackAssistantAnswer(question, profile);

  if (fallback.sourceMode === "refusal") {
    return NextResponse.json(fallback, { status: 200 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(fallback, { status: 200 });
  }

  try {
    const client = new GoogleGenAI({ apiKey });
    const response = await client.models.generateContent({
      model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
      contents: `${buildSystemPrompt(profile)} User question: ${question}`
    });

    const answer = response.text?.trim();

    if (!answer) {
      return NextResponse.json(fallback, { status: 200 });
    }

    return NextResponse.json({ answer, sourceMode: "gemini" }, { status: 200 });
  } catch {
    return NextResponse.json(fallback, { status: 200 });
  }
}
