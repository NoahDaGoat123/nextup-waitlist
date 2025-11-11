"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-8 mt-20 text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-xl">
          <Link href="https://www.instagram.com/nextup.athlete?igsh=ZjdkcHo1dnF4eGQ5&utm_source=qr" target="_blank" className="hover:text-white/60 transition">
            <FaInstagram />
          </Link>
          <Link href="https://www.tiktok.com/@nextup.athlete?_r=1&_t=ZT-91IheWom0ez" target="_blank" className="hover:text-white/60 transition">
            <FaTiktok />
          </Link>
          <Link href="https://x.com/teague_noa68027" target="_blank" className="hover:text-white/60 transition">
            <FaXTwitter />
          </Link>
        </div>

        {/* Legal */}
       <div className="text-center text-xs text-white/60">
  © {new Date().getFullYear()} NextUp Athlete. All rights reserved.
  <br />
  <span className="text-white/60">Made with ❤️ by Noah.</span>
</div>
        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-white/70">
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>

      </div>
    </footer>
  );
}
