// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, role, email } = await req.json();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE;


    if (!url || !serviceKey) {
      console.error("Missing envs:", { hasUrl: !!url, hasKey: !!serviceKey });
      return NextResponse.json({ error: "Server misconfig" }, { status: 500 });
    }

    const supabase = createClient(url, serviceKey);

    const { error } = await supabase.from("waitlist").insert([{ name, role, email }]);
    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
