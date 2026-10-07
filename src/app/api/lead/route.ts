import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";

/**
 * Receives every form on the site (demo, contact, newsletter, CV, partner).
 * For now it only logs to the server console. Wire an email or CRM provider here later.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { _hp, ...lead } = parsed.data;
  if (_hp) {
    // Bot filled the honeypot: pretend success, store nothing.
    return NextResponse.json({ ok: true });
  }

  console.log(`[lead:${lead.type}] ${new Date().toISOString()}`, JSON.stringify(lead));
  return NextResponse.json({ ok: true });
}
