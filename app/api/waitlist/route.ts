import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ---- server-only supabase (uses service role) ----
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!;
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

type Body = { email: string };

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as Body;

    if (!email || !/\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      console.error("DB insert error:", error);
      return NextResponse.json({ ok: false, error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Server error:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

// optional: GET /api/waitlist -> { count }
export async function GET() {
  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });
  if (error) return NextResponse.json({ count: 0 });
  return NextResponse.json({ count: count ?? 0 });
}
