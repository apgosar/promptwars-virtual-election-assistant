import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildFallbackAssistantAnswer, buildSystemPrompt } from "@/lib/assistant-fallback";

const requestSchema = z.object({
  question: z.string().trim().min(1).max(1000),
  profile: z.object({
    name: z.string().max(50),
    ageBand: z.enum(["18-21", "22-29", "30+"]),
    experience: z.enum(["first-time", "returning"]),
    registrationStatus: z.enum(["not-started", "in-progress", "completed"]),
    language: z.enum(["English", "Hindi", "Marathi"]),
    stage: z.enum(["registration-open", "registration-closing", "campaign-period", "election-week", "polling-day", "results-and-followup"])
  })
});

export async function POST(request: Request) {
  const payload = requestSchema.safeParse(await request.json());

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
      model: "gemini-2.5-flash",
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