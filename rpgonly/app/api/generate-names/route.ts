import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";

const bodySchema = z.object({
  race: z.enum(["Human", "Elf", "Half-Elf", "Dwarf", "Orc", "Tiefling", "Gnome", "Dragonborn"]),
  gender: z.enum(["Masculine", "Feminine", "Neutral"]),
  tone: z.enum(["Heroic", "Dark", "Whimsical", "Ancient"]),
});

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Name generation is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid parameters." }, { status: 400 });
  }

  const { race, gender, tone } = parsed.data;

  const prompt = `Generate exactly 5 fantasy RPG character names for a ${gender.toLowerCase()} ${race} character with a ${tone.toLowerCase()} tone.

For each name, provide:
1. The name itself (1-3 words, authentic to the race's naming conventions)
2. A one-sentence lore snippet (max 25 words) that hints at their background or legend

Format your response as a JSON array with objects containing "name" and "lore" fields. Example:
[{"name": "Aelindra Moonwhisper", "lore": "A former high priestess who abandoned the temple after witnessing the death of her goddess."}]

Return ONLY the JSON array, no other text.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";

    // Parse the JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse names." }, { status: 500 });
    }

    const names = JSON.parse(jsonMatch[0]) as { name: string; lore: string }[];

    return NextResponse.json({ names });
  } catch (err) {
    console.error("[generate-names] Error:", err);
    return NextResponse.json(
      { error: "Failed to generate names. Please try again." },
      { status: 500 }
    );
  }
}
