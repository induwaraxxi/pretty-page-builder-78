import { createFileRoute, Link } from "@tanstack/react-router";
import { getAttraction } from "@/lib/attractions";
import { planActions, usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "My one-day plan — ExploreDay Pasyala" },
      {
        name: "description",
        content:
          "Your selected attractions around Pasyala, ordered into a single day with travel distance and total time.",
      },
      { property: "og:title", content: "My one-day plan — ExploreDay" },
      {
        property: "og:description",
        content: "Order your stops, check the total time and travel a single well-planned day around Pasyala.",
      },
    ],
  }),
  component: PlanPage,
});

const START_HOUR = 9;

function formatTime(minutesFromStart: number) {
  const total = START_HOUR * 60 + minutesFromStart;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function PlanPage() {
  const ids = usePlan();
  const stops = ids.map(getAttraction).filter(Boolean) as NonNullable<ReturnType<typeof getAttraction>>[];

  const totalMinutes = stops.reduce((sum, s) => sum + s.durationMin + 20, 0);
  const totalKm = stops.reduce((sum, s) => sum + s.distanceKm, 0);

  let elapsed = 0;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="animate-rise">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          My day in{" "}
          <span className="bg-gradient-to-r from-accent via-neon to-brand bg-clip-text text-transparent">
            Pasyala
          </span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Stops run in the order below, starting at {formatTime(0)} with 20 minutes of travel allowed
          between each.
        </p>
      </div>

      {stops.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-border bg-white/5 p-8 text-center backdrop-blur-sm sm:p-12">
          <p className="text-sm text-muted-foreground">Your day is empty. Add a few places to begin.</p>
          <Link
            to="/"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-brand to-accent px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_30px] shadow-brand/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px] hover:shadow-accent/60 active:scale-[0.97]"
          >
            Browse attractions
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
            {[
              { label: "Stops", value: String(stops.length) },
              { label: "Total time", value: `${(totalMinutes / 60).toFixed(1)} hrs` },
              { label: "Distance", value: `${totalKm.toFixed(1)} km` },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {s.label}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground sm:text-2xl">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <ol className="mt-8 space-y-3">
            {stops.map((stop, i) => {
              const arrival = formatTime(elapsed);
              elapsed += stop.durationMin + 20;
              return (
                <li
                  key={stop.id}
                  className="animate-rise rounded-3xl border border-border bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-neon/30 sm:p-5"
                  style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 sm:gap-4">
                    <img
                      src={stop.image}
                      alt={stop.name}
                      loading="lazy"
                      width={1024}
                      height={640}
                      className="size-16 shrink-0 rounded-2xl object-cover sm:size-20"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        <span className="text-neon">{arrival}</span>
                        <span>·</span>
                        <span className="truncate">{stop.category}</span>
                      </div>
                      <Link
                        to="/attractions/$id"
                        params={{ id: stop.id }}
                        className="mt-0.5 block truncate font-display text-base font-semibold text-foreground transition-colors hover:text-neon sm:text-lg"
                      >
                        {i + 1}. {stop.name}
                      </Link>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {stop.distanceKm} km · ~{stop.durationMin} min · {stop.hours}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => planActions.move(stop.id, -1)}
                          disabled={i === 0}
                          aria-label={`Move ${stop.name} earlier`}
                          className="grid size-10 place-items-center rounded-full border border-border bg-white/5 text-foreground transition-all duration-200 hover:bg-white/10 active:scale-[0.94] disabled:pointer-events-none disabled:opacity-40"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => planActions.move(stop.id, 1)}
                          disabled={i === stops.length - 1}
                          aria-label={`Move ${stop.name} later`}
                          className="grid size-10 place-items-center rounded-full border border-border bg-white/5 text-foreground transition-all duration-200 hover:bg-white/10 active:scale-[0.94] disabled:pointer-events-none disabled:opacity-40"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => planActions.remove(stop.id)}
                          className="min-h-10 rounded-full border border-border bg-white/5 px-4 text-sm text-muted-foreground transition-all duration-200 hover:border-destructive/40 hover:text-foreground active:scale-[0.97]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-brand to-accent px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_30px] shadow-brand/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px] hover:shadow-accent/60 active:scale-[0.97]"
            >
              Add another stop
            </Link>
            <button
              onClick={() => planActions.clear()}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-border bg-white/5 px-6 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/10 hover:text-foreground active:scale-[0.97]"
            >
              Clear my day
            </button>
          </div>
        </>
      )}
    </div>
  );
}
