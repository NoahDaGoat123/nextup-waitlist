export default function GlowCard({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl ${className}`}>
      {/* gradient ring */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl
                      bg-gradient-to-br from-fuchsia-500/30 via-white/15 to-indigo-400/30
                      opacity-70 blur-sm"
      />
      {/* inner surface */}
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
        {children}
      </div>
    </div>
  );
}
