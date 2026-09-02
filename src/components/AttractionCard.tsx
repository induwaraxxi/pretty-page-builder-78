import { Link } from "@tanstack/react-router";
import type { Attraction } from "@/lib/attractions";
import { planActions, usePlan } from "@/lib/plan-store";

export function AttractionCard({ attraction, index = 0 }: { attraction: Attraction; index?: number }) {
  const plan = usePlan();
  const added = plan.includes(attraction.id);

  return (
    <article
      className="animate-rise group flex flex-col overflow-hidden rounded-3xl border border-border bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:bg-white/[0.08]"
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
    >
      <Link to="/attractions/$id" params={{ id: attraction.id }} className="block overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          loading="lazy"
          width={1024}
          height={640}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          <span className="text-neon">{attraction.distanceKm} km</span>
          <span>·</span>
          <span className="truncate">{attraction.category}</span>
        </div>
        <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          <Link to="/attractions/$id" params={{ id: attraction.id }} className="transition-colors hover:text-neon">
            {attraction.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{attraction.summary}</p>
        <p className="mt-3 text-xs text-muted-foreground/80">
          {attraction.hours} · ~{attraction.durationMin} min
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            to="/attractions/$id"
            params={{ id: attraction.id }}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-border bg-white/5 px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
          >
            View details
          </Link>
          <button
            onClick={() => planActions.toggle(attraction.id)}
            aria-pressed={added}
            className={
              added
                ? "inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-neon/40 bg-neon/15 px-4 text-sm font-semibold text-neon transition-all duration-200 active:scale-[0.97]"
                : "inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-brand to-accent px-4 text-sm font-semibold text-primary-foreground shadow-[0_0_24px] shadow-brand/40 transition-all duration-200 hover:shadow-[0_0_36px] hover:shadow-accent/50 active:scale-[0.97]"
            }
          >
            {added ? "In your day" : "Add to day"}
          </button>
        </div>
      </div>
    </article>
  );
}
