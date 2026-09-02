export function GlowField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="glow-orb -top-40 -left-40 size-[320px] bg-glow/40 sm:size-[520px]" />
      <div className="glow-orb top-1/3 -right-32 size-[300px] bg-brand/40 sm:size-[460px] animate-float-glow" />
      <div className="glow-orb bottom-0 left-1/3 size-[280px] bg-accent/25 sm:size-[420px]" />
    </div>
  );
}
