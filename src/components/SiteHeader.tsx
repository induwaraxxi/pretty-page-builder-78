import { Link } from "@tanstack/react-router";
import { usePlan } from "@/lib/plan-store";

const navLinks = [
  { to: "/", label: "Explore" },
  { to: "/plan", label: "My day" },
];

export function SiteHeader() {
  const plan = usePlan();

  return (
    <header className="relative z-20">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-brand font-display text-sm font-bold text-primary-foreground shadow-[0_0_24px] shadow-accent/50">
            E
          </span>
          <span className="truncate font-display text-lg font-semibold tracking-tight text-foreground">
            ExploreDay
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="transition-colors hover:text-neon"
                activeProps={{ className: "text-neon" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/plan"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 text-sm font-medium text-neon backdrop-blur-sm transition-all duration-200 hover:bg-neon/20 active:scale-[0.97] sm:px-5"
          >
            <span className="hidden sm:inline">My day</span>
            <span className="sm:hidden">Day</span>
            <span className="grid size-5 place-items-center rounded-full bg-accent/25 text-xs">
              {plan.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
