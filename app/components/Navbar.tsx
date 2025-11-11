"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { id: "info",        label: "Info" },
  { id: "Pricing",     label: "Pricing" },
  { id: "Dates",       label: "Important Dates" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // click handler: smooth scroll on same page, otherwise go home with hash
  const onNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (pathname === "/") {
      scrollToId(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-black/40 border-b border-white/10" : "bg-transparent"
      } ${scrolled ? "h-14" : "h-16"}`}
    >
      {/* gradient hairline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        {/* brand */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/favicon.png"
            alt="NextUp"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="text-sm font-semibold tracking-wide text-white/90">NextUp</span>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={`/#${l.id}`}
              onClick={onNavClick(l.id)}
              className="relative text-sm text-white/70 hover:text-white transition"
            >
              {l.label}
              {/* active underline when that hash is present OR if scrolled into that section you can wire later */}
              {/* simple: underline when on home route */}
              {pathname === "/" && (
                <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-white/70 transition-all group-hover:w-4" />
              )}
            </a>
          ))}

          <a
            href="/#waitlist"
            onClick={onNavClick("waitlist")}
            className="rounded-full border border-white/15 bg-white text-black px-4 py-1.5 text-sm font-medium shadow-sm hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition"
          >
            Join Waitlist
          </a>
        </div>

        {/* mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </nav>

      {/* mobile sheet */}
      <div
        className={`md:hidden absolute inset-x-0 top-full origin-top bg-black/90 backdrop-blur-md border-b border-white/10 transition-transform ${
          open ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onClick={onNavClick(l.id)}
                className="rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#waitlist"
              onClick={onNavClick("waitlist")}
              className="mt-1 rounded-lg bg-white px-3 py-2 text-center text-sm font-medium text-black"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
