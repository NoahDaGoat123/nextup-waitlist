"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [count, setCount] = useState<number | null>(null);

  // fetch live count
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/waitlist");
        if (r.ok) {
          const j = (await r.json()) as { count: number };
          setCount(j.count);
        }
      } catch {
        // noop
      }
    })();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus("error");
    setStatus("loading");
    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error("bad");
      setStatus("success");
      setCount((c) => (typeof c === "number" ? c + 1 : c));
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#0b0f1e] relative text-white">
      {/* subtle luxury bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_20%,#000_20%,transparent_70%)]"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[800px] w-[900px] rounded-full bg-gradient-to-b from-[#1b285a] via-[#0f1f5a] to-transparent opacity-50 blur-3xl" />
        <div className="absolute top-40 right-[12%] h-64 w-64 rounded-full bg-[#122559] opacity-30 blur-[80px]" />
        <div className="absolute bottom-10 left-[10%] h-56 w-56 rounded-full bg-[#0b5] opacity-10 blur-[90px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        {/* Hero */}
        <div className="mx-auto w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Join the NextUp waitlist
            </h1>
            <p className="mt-3 text-white/70">
              AI-made highlights. Faster recruiting. Be first when we drop.
            </p>
            <p className="mt-3 text-white/70">Built for parents who want to help their kids get seen.</p>
            <p className="mt-3 text-white/70">And athletes who have a dream</p>
            {typeof count === "number" && (
              <p className="mt-2 text-sm text-white/50">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 align-middle mr-2" />
                <strong>{count}</strong> already joined
              </p>
            )}
          </div>

          {/* Form / Success swap */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="mx-auto flex max-w-xl gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base outline-none placeholder-white/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                    required
                    aria-label="Email"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-2xl bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-400 disabled:opacity-60"
                    aria-label="Join the waitlist"
                  >
                    {status === "loading" ? "…" : "Join"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28 }}
                  className="mx-auto max-w-xl"
                >
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-5 text-center">
                    <Checkmark />
                    <h2 className="mt-2 text-xl font-semibold">You’re on the waitlist</h2>
                    <p className="mt-1 text-white/70">
                      We’ll email you when access opens. Thanks for being early. 🙌
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* tiny helper/error text space */}
            <div className="min-h-[22px] text-center">
              {status === "error" && (
                <p className="mt-3 text-sm text-red-400">Invalid email or server issue. Try again.</p>
              )}
            </div>
          </div>
        </div>

        {/* below-hero “tiny words” / credibility strip */}
        <section className="mx-auto mt-10 max-w-3xl text-center text-xs text-white/45 leading-relaxed">
          By joining, you agree to receive product updates from NextUp Athlete. You can unsubscribe
          anytime. This site is protected by industry-standard security practices.
        </section>

        {/* Footer */}
        <footer className="mt-16 flex flex-col items-center gap-2 text-xs text-white/40">
          <nav className="flex items-center gap-4">
            <a className="hover:text-white/70" href="#">Privacy</a>
            <span>•</span>
            <a className="hover:text-white/70" href="#">Terms</a>
            <span>•</span>
            <a className="hover:text-white/70" href="#">Contact</a>
          </nav>
          <p>© {new Date().getFullYear()} NextUp Athlete. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

/** animated checkmark */
function Checkmark() {
  return (
    <motion.svg
      width="52"
      height="52"
      viewBox="0 0 24 24"
      className="mx-auto"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="rgb(74, 222, 128)"
        strokeWidth="2"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0.4 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6 } },
        }}
      />
      <motion.path
        d="M7 12l3 3 7-7"
        stroke="rgb(74, 222, 128)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { delay: 0.2, duration: 0.5 } },
        }}
      />
    </motion.svg>
  );
}
