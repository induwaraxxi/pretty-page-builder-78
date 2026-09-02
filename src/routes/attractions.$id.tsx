import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ATTRACTIONS, getAttraction } from "@/lib/attractions";
import { planActions, usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/attractions/$id")({
  loader: ({ params }) => {
    const attraction = getAttraction(params.id);
    if (!attraction) throw notFound();
    return attraction;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Attraction";
    const summary = loaderData?.summary ?? "A day-visit stop near Pasyala.";
    return {
      meta: [
        { title: `${name} — ExploreDay Pasyala` },
        { name: "description", content: summary },
        { property: "og:title", content: `${name} — ExploreDay` },
        { property: "og:description", content: summary },
      ],
    };
  },
  component: AttractionDetail,
});

function AttractionDetail() {
  const a = Route.useLoaderData();
  const plan = usePlan();
  const added = plan.includes(a.id);
  const related = ATTRACTIONS.filter((x) => x.category === a.category && x.id !== a.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <Link to="/" className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition hover:text-neon">
        ← All attractions
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
        <div className="animate-rise">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img
              src={a.image}
              alt={a.name}
              width={1024}
              height={640}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          <h1 className="mt-7 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {a.name}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{a.description}</p>

          <h2 className="mt-9 font-display text-xl font-semibold text-foreground">Travel tips</h2>
          <ul className="mt-3 space-y-2.5">
            {a.tips.map((tip) => (
              <li
                key={tip}
                className="flex gap-3 rounded-2xl border border-border bg-white/5 p-4 text-sm text-muted-foreground backdrop-blur-sm"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px] shadow-accent" />
                {tip}
              </li>
            ))}
          </ul>

          <h2 className="mt-9 font-display text-xl font-semibold text-foreground">Location</h2>
          <div className="mt-3 overflow-hidden rounded-3xl border border-border">
            <iframe
              title={`Map of ${a.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(a.mapQuery)}&output=embed`}
              loading="lazy"
              className="h-64 w-full border-0 sm:h-80"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="animate-rise rounded-3xl border border-border bg-white/5 p-5 backdrop-blur-xl sm:p-6" style={{ animationDelay: "100ms" }}>
            <span className="inline-flex rounded-full border border-neon/20 bg-neon/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-neon">
              {a.category}
            </span>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Distance</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-foreground">{a.distanceKm} km</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Stay</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-foreground">~{a.durationMin} min</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Opening hours</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-foreground">{a.hours}</dd>
              </div>
            </dl>

            <button
              onClick={() => planActions.toggle(a.id)}
              aria-pressed={added}
              className={
                added
                  ? "mt-6 min-h-12 w-full rounded-full border border-neon/40 bg-neon/15 px-6 text-sm font-semibold text-neon transition-all duration-200 active:scale-[0.97]"
                  : "mt-6 min-h-12 w-full rounded-full bg-gradient-to-r from-brand to-accent px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_30px] shadow-brand/50 transition-all duration-200 hover:shadow-[0_0_44px] hover:shadow-accent/60 active:scale-[0.97]"
              }
            >
              {added ? "Remove from my day" : "Add to my day"}
            </button>

            <Link
              to="/plan"
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-border bg-white/5 px-6 text-sm font-medium text-foreground transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
            >
              View my day ({plan.length})
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold text-foreground">More {a.category.toLowerCase()}</h2>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to="/attractions/$id"
                      params={{ id: r.id }}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-white/5 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-neon/30"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-foreground">{r.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{r.hours}</span>
                      </span>
                      <span className="shrink-0 text-xs text-neon">{r.distanceKm} km</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
