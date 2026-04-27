import { NextResponse } from "next/server";
import { createAssistantResponse } from "@/lib/assistant-service";
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

  return NextResponse.json(await createAssistantResponse(payload.data), { status: 200 });
}
