import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { AttractionCard } from "@/components/AttractionCard";
import { ATTRACTIONS, CATEGORIES } from "@/lib/attractions";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ExploreDay — One-day trips around Pasyala, Sri Lanka" },
      {
        name: "description",
        content:
          "Browse verified attractions within 25 km of Pasyala, filter by category and build a one-day tour plan in minutes.",
      },
      { property: "og:title", content: "ExploreDay — One-day trips around Pasyala" },
      {
        property: "og:description",
        content:
          "Tea estates, waterfalls, temples and viewpoints within 25 km of Pasyala — planned into a single day.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const plan = usePlan();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ATTRACTIONS.filter((a) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-6 pb-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-14">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon/20 bg-neon/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-neon sm:text-xs">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent" />
            Pasyala · 25 km radius
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Plan a day that glows after{" "}
            <span className="bg-gradient-to-r from-accent via-neon to-brand bg-clip-text text-transparent">
              dark
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            ExploreDay gathers the tea estates, waterfalls, temples and night markets around Pasyala
            into one verified catalogue — then stacks your favourites into a single day you can
            actually travel.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-full border border-border bg-white/5 px-5 backdrop-blur-sm transition-colors focus-within:border-neon/40">
              <span className="sr-only">Search attractions</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 text-muted-foreground"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search waterfalls, temples, tea…"
                className="w-full min-w-0 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
              />
            </label>
            <a
              href="#catalogue"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-brand to-accent px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_30px] shadow-brand/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px] hover:shadow-accent/60 active:scale-[0.97]"
            >
              Find stops
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-10">
            <div>
              <dt className="order-2 mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                Verified places
              </dt>
              <dd className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {ATTRACTIONS.length}
              </dd>
            </div>
            <div>
              <dt className="order-2 mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                Categories
              </dt>
              <dd className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {CATEGORIES.length}
              </dd>
            </div>
            <div>
              <dt className="order-2 mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                In your day
              </dt>
              <dd className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {plan.length}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative animate-rise" style={{ animationDelay: "120ms" }}>
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand/30 to-accent/20 blur-2xl sm:-inset-6" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border">
            <img
              src={heroImg}
              alt="Dusk over the hills and winding roads around Pasyala"
              width={1280}
              height={1536}
              className="size-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border bg-white/5 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Dombathuduwa Viewpoint
                  </p>
                  <p className="truncate text-xs text-muted-foreground">First light over the valley</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-neon">
                  9.2 km
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" className="mx-auto max-w-7xl scroll-mt-8 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Attractions near Pasyala
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "place" : "places"} within 25 km.
            </p>
          </div>
          <Link to="/plan" className="shrink-0 text-sm font-medium text-neon transition hover:text-foreground">
            My day →
          </Link>
        </div>

        <div className="-mx-4 mb-6 flex snap-x gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {["All", ...CATEGORIES].map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={
                  active
                    ? "min-h-10 shrink-0 snap-start rounded-full bg-gradient-to-r from-brand to-accent px-4 text-sm font-semibold text-primary-foreground shadow-[0_0_24px] shadow-brand/40 transition-all duration-200 active:scale-[0.97]"
                    : "min-h-10 shrink-0 snap-start rounded-full border border-border bg-white/5 px-4 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neon/40 hover:text-neon active:scale-[0.97]"
                }
              >
                {c}
              </button>
            );
          })}
        </div>

        {results.length === 0 ? (
          <p className="rounded-3xl border border-border bg-white/5 p-10 text-center text-sm text-muted-foreground backdrop-blur-sm">
            No attractions match that search yet. Try clearing the filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((a, i) => (
              <AttractionCard key={a.id} attraction={a} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
