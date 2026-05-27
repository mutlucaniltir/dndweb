import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({ email: z.string().email() });

// Simple in-memory rate limiter — resets on cold start.
// TODO: Replace with Upstash Redis for production.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT = 3;

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid email address." },
      { status: 400 }
    );
  }

  const { email } = parsed.data;

  // TODO: Store to Supabase `subscribers` table
  // const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  // const { error } = await supabase.from("subscribers").insert({ email, subscribed_at: new Date() });
  // if (error && error.code !== "23505") { // ignore duplicate key
  //   return NextResponse.json({ success: false, error: "Database error." }, { status: 500 });
  // }

  // TODO: Send welcome email via Resend
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: "hello@rpgonly.com", to: email, subject: "Welcome to The RPG Dispatch", ... });

  console.log("[subscribe] New subscriber:", email);

  return NextResponse.json({
    success: true,
    message: "You're on the list! Check your inbox for a welcome message.",
  });
}
