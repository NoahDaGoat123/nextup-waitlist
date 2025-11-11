"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "./components/GlowCard";
import ScrollTo from "./components/ScrollTo";




export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [already, setAlready] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem("nu_waitlisted") === "true";
    if (flag) setAlready(true);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    if (!name || !role || !email) {
  alert("All fields are required!");
  return;
}

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, email }),
    });

    setLoading(false);

    if (res.ok) {
      localStorage.setItem("nu_waitlisted", "true");
      setAlready(true);
      setSuccess(true);
    } else {
      alert("Something went wrong. Try again.");
    }
  }

  const confetti = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}vw`,
            background: ["#A78BFA", "#60A5FA", "#34D399", "#F472B6"][i % 4],
            animationDuration: `${1 + Math.random()}s`,
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        />
      )),
    []
  );

  return (
<main className="min-h-screen flex flex-col items-center justify-center">
    <section id="waitlist" className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-3">
        {already ? (
          <span className="px-3 py-1 text-xs text-emerald-300 bg-emerald-500/15 rounded-full">
            ✅ You’re on the waitlist
          </span>
        ) : (
          <span className="px-3 py-1 text-xs text-white/70 bg-white/10 rounded-full">
            🔒 Private Beta — limited invites weekly
          </span>
        )}
      </div>

      <h1 className="text-6xl font-semibold text-center">NextUp Waitlist</h1>
      <p className="mt-2 text-center text-white/70 max-w-md">
        Join early access. No spam. Lifetime perks.
      </p>

      <form onSubmit={onSubmit} className="mt-8 w-83 max-w-md space-y-4 flex flex-col items-center">
        <input
          placeholder="Full name"
          required
          className="input h-12 bg-gradient-to-br from-fuchsia-500/30 via-white/15 to-indigo-400/30"
          onChange={(e) => setName(e.target.value)}
        />
        <select
  className="input h-12 bg-gradient-to-br from-fuchsia-500/30 via-white/15 to-indigo-400/30"
  value={role}
  onChange={(e) => setRole(e.target.value)}
  required
>
  <option value="" disabled hidden>
    Select role
  </option>
  <option value="Athlete">Athlete</option>
  <option value="Parent">Parent</option>
  <option value="Coach">Coach</option>
  <option value="Creator">Creator</option>
</select>

        <input
          type="email"
          required
          placeholder="Email"
          className="input h-12 bg-gradient-to-br from-fuchsia-500/30 via-white/15 to-indigo-400/30"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading || already}
          className={`w-35 rounded-full mt-8 py-7 text-sm transition ${
            already ? "bg-emerald-400/20 text-emerald-300" : "bg-white text-black hover:-translate-y-[2px]"
          }`}
        >
          {already ? "You're already on the waitlist" : loading ? "Joining..." : "Join"}
        </button>
      </form>
        <button
  onClick={() =>
    document.getElementById("info")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  className="mt-8 text-center text-white/80 hover:text-white"
>
 Learn More ↓
</button>

      {/* CONFETTI / CONGRATS SCREEN */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSuccess(false)}
          >
            {confetti}
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
              className="relative bg-white/10 border border-white/20 rounded-2xl p-6 text-center max-w-sm"
            >
              <h2 className="text-2xl font-semibold">🎉 You’re in!</h2>
              <p className="mt-2 text-white/70">We’ll notify you as soon as your access opens.</p>

              <button
                onClick={() => setSuccess(false)}
                className="mt-5 w-full rounded-full bg-white text-black font-semibold py-2"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    {/* ===== Info Section ===== */}
<section id="info" className="min-h-screen w-full flex flex-col items-center justify-center py-28 md:py-36 border-t border-white/10 px-6 scroll-mt-32">
<header className="text-center text-6xl font-semibold">What is NextUp?</header>
  <p className="mt-4 text-center text-white/70 max-w-2xl">
    NextUp is an AI-powered platform that helps athletes create highlight reels, build profiles, and get discovered by coaches and recruiters. We handle the struggle of getting seen so you can focus on playing your best game.
  </p>
 <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl">
  <GlowCard>
    <h3 className="text-lg font-semibold">Auto Highlights</h3>
    <p className="mt-2 text-sm text-white/70">
      We detect plays, trim dead time, and format for socials.
    </p>
  </GlowCard>

  <GlowCard>
    <h3 className="text-lg font-semibold">Athlete Profiles</h3>
    <p className="mt-2 text-sm text-white/70">
      Clean profile with clips, stats, and contact links.
    </p>
  </GlowCard>

  <GlowCard>
    <h3 className="text-lg font-semibold">Coach Outreach</h3>
    <p className="mt-2 text-sm text-white/70">
      Get seen by coaches and programs. Track interest.
    </p>
  </GlowCard>
</div>

    {/* How it works */}
    <div className="mt-16 max-w-7xl">
      <h3 className="text-2xl font-semibold text-center">How it works</h3>
      <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm uppercase tracking-wide text-white/60">Step 1</div>
          <div className="mt-1 font-semibold">Upload your game</div>
          <p className="mt-2 text-sm text-white/70">
            Drop raw footage or links. We handle the heavy lifting.
          </p>
        </li>
        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm uppercase tracking-wide text-white/60">Step 2</div>
          <div className="mt-1 font-semibold">AI cuts the highlights</div>
          <p className="mt-2 text-sm text-white/70">
            We detect plays, trim dead time, and format for socials.
          </p>
        </li>
        <li className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm uppercase tracking-wide text-white/60">Step 3</div>
          <div className="mt-1 font-semibold">Get discovered</div>
          <p className="mt-2 text-sm text-white/70">
            Post to your profile, share with coaches, and track interest.
          </p>
        </li>
      </ol>
    </div>
    <div className="mt-16 max-w-7xl">
      <h3 className="text-2xl font-semibold text-center">Why it works</h3>
      <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mt-1 font-semibold">You have the talent</div>
          <p className="mt-2 text-sm text-white/70">
           Most athletes never get discovered — not because they aren’t good, but because nobody ever sees their footage. Nowadays short form content is the way but everybody doesnt know how to edit or have the time to.
          </p>
        </li>
        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mt-1 font-semibold">Getting seen is hard</div>
          <p className="mt-2 text-sm text-white/70">
           NextUp gets your game in front of coaches, scouts, and programs that actually matter. There are no apps for athletes to be seen like this. We make it so easy.
          </p>
        </li>
        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mt-1 font-semibold">Exposure = Opportunity</div>
          <p className="mt-2 text-sm text-white/70">
            When the right people see your game, everything changes — invites, tryouts, and offers start happening. Visibility creates opportunity.
          </p>
        </li>
      </ol>
    </div>
  <button
  onClick={() =>
    document.getElementById("Pricing")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  className="mt-8 text-center text-white/80 hover:text-white"
>
 Pricing  ↓
</button>

</section>
<section id="Pricing" className="min-h-screen w-full flex flex-col items-center justify-center py-28 md:py-36 border-t border-white/10 px-6 scroll-mt-32">
  <h2 className="text-6xl font-semibold text-white text-center">Early Access Pricing</h2>
  <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">
    Prices will increase when we launch publicly. Early users get the best pricing and
    first access to all features.
  </p>

  {/* ---- Pricing Cards ---- */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl w-full">

    {/* Free */}
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur shadow-lg">
      <p className="text-white font-semibold text-lg">Free</p>
      <p className="text-5xl font-bold text-white mt-2">$0</p>
      <p className="text-white/60 text-sm m-3">Basic access with essential features.</p>
      <button
  onClick={() =>
    document.getElementById("waitlist")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="w-full rounded-full bg-white text-black py-4 font-medium hover:bg-white/80 transition"
>
  Get Started
</button>

      <ul className="mt-6 space-y-3 text-sm text-white/70">
        <li>✅ Create & customize profile</li>
        <li>✅ Connect with other users</li>
        <li>❌ Send & receive messages</li>
        <li>💲 $12/edit — AI highlight edits</li>
        <li>❌ Coach outreach tools / visibility</li>
      </ul>
    </div>

    {/* Pro Monthly */}
    <div className="rounded-2xl border border-white/20 ring-1 ring-white/10 bg-black/60 p-6 backdrop-blur-xl shadow-2xl">
      <p className="text-green-500 font-semibold text-lg">Pro — Monthly</p>
      <p className="text-5xl font-bold text-white mt-2">$8</p>
      <p className="text-white/60 text-sm m-3">Everything you need to grow.</p>
      <button
  onClick={() =>
    document.getElementById("waitlist")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="w-full rounded-full bg-white text-black py-4 font-medium hover:bg-white/80 transition"
>
  Get Started
</button>
      <ul className="mt-6 space-y-3 text-sm text-white/90">
        <li>✅ Create & customize profile</li>
        <li>✅ Connect with users</li>
        <li>✅ Send & receive messages</li>
        <li>✅ Unlimited AI highlight edits</li>
        <li>✅ Coach / recruiter visibility</li>
      </ul>
    </div>

    {/* Pro Yearly */}
    <div className="rounded-2xl border border-white/10  bg-gradient-to-br from-fuchsia-500/30 via-white/15 to-indigo-400/30 p-6 backdrop-blur shadow-lg relative">
      <span className="absolute top-3 right-3 text-xs bg-green-600 text-white py-1 px-2 rounded-lg">
        Save 20%
      </span>

      <p className="text-green-500 font-semibold text-lg">Pro — Yearly</p>
      <p className="text-5xl font-bold text-white mt-2">$77</p>
      <p className="text-white/60 text-sm m-3">Pay once, get full access all year.</p>
      <button
  onClick={() =>
    document.getElementById("waitlist")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="w-full rounded-full bg-white text-black py-4 font-medium hover:bg-white/80 transition"
>
  Get Started
</button>

      <ul className="mt-6 space-y-3 text-sm text-white/90">
        <li>✅ Create & customize profile</li>
        <li>✅ Connect with users</li>
        <li>✅ Send & receive messages</li>
        <li>✅ Unlimited AI highlight edits</li>
        <li>✅ Coach / recruiter visibility</li>
      </ul>
    </div>
  </div>
  <button
  onClick={() =>
    document.getElementById("Dates")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  className="mt-8 text-center text-white/80 hover:text-white"
>
  Important Dates ↓
</button>

</section>
<section
  id="Dates"
  className="flex flex-col items-center mt-10 px-6 py-90 border-t border-white/10 scroll-mt-32"
>
  <h2 className="text-6xl font-semibold mb-3 text-white text-center">
    Important Dates
  </h2>
  <p className="mt-2 text-center text-white/60 max-w-xl">
    Here’s what’s coming up for NextUp Athlete. 
  </p>

  <ul className="mt-10 space-y-6 text-white/80 text-sm w-full max-w-md">
    <li className="flex flex-col bg-white/5 rounded-xl px-6 py-4 border border-white/10 backdrop-blur">
      <span className="text-green-500 font-semibold text-xs uppercase">Now Open</span>
      <span className="text-lg font-medium">Waitlist Registration</span>
      <p className="text-white/60 text-sm">Join early. Prices are locked forever for early access users.</p>
    </li>

    <li className="flex flex-col bg-white/5 rounded-xl px-6 py-4 border border-white/10 backdrop-blur">
      <span className="text-blue-500 font-semibold text-xs uppercase">December 2025</span>
      <span className="text-lg font-medium">Private Beta (Early Access)</span>
      <p className="text-white/60 text-sm">First group gets access to editing inside the mobile app.</p>
    </li>

    <li className="flex flex-col bg-white/5 rounded-xl px-6 py-4 border border-white/10 backdrop-blur">
      <span className="text-yellow-500 font-semibold text-xs uppercase">January 2026</span>
      <span className="text-lg font-medium">Plan Launch</span>
      <p className="text-white/60 text-sm">AI highlight editing + export features go live in the mobile app.</p>
    </li>

    <li className="flex flex-col bg-white/5 rounded-xl px-6 py-4 border border-white/10 backdrop-blur bg-gradient-to-br from-fuchsia-500/30 via-white/15 to-indigo-400/30">
      <span className="text-red-500 font-semibold text-xs uppercase">Spring 2026</span>
      <span className="text-lg font-medium">Mobile App Release (iOS + Android)</span>
      <p className="text-white/60 text-sm">App store launch with athlete feed + coach outreach tools.</p>
    </li>
  </ul>
</section>
</main>
  );
}
