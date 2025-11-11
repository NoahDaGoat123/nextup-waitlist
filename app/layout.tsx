import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";  // ✅ Import the Navbar component
import Footer from "./components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextUp Athlete",
  description: "AI highlight platform",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
<body className="bg-black text-white antialiased">
  <Navbar />            {/* sticky, not fixed full-screen */}
  <main id="top" className="min-h-screen">
    {children}
  </main>
  <Footer />
</body>
    </html>
  );
}