import { Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Home, ListOrdered, Moon, Search, Star, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";

const navLinks = [
  { to: "/", label: "Scores" },
  { to: "/matches", label: "Fixtures" },
  { to: "/standings", label: "Standings" },
  { to: "/teams", label: "Teams" },
  { to: "/news", label: "News" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState("");

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-8">
            <Link to="/" className="shrink-0 font-display text-xl font-extrabold italic tracking-tighter sm:text-2xl">
              VELOCITY<span className="text-primary">SPORTS</span>
            </Link>
            <div className="hidden gap-6 text-sm font-medium uppercase tracking-wider text-muted-foreground lg:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/search", search: { q: query } });
              }}
              className="relative hidden sm:block"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teams, players..."
                aria-label="Search teams and players"
                className="w-44 rounded-full border border-border bg-card py-1.5 pl-10 pr-4 text-sm transition-all placeholder:text-muted-foreground focus:w-64 focus:border-primary focus:outline-hidden"
              />
            </form>

            <Link
              to="/search"
              search={{ q: "" }}
              aria-label="Search"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary sm:hidden"
            >
              <Search className="h-4 w-4" />
            </Link>

            <Link
              to="/favorites"
              aria-label="Favorites"
              className="hidden h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary sm:grid"
            >
              <Star className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const mobileLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/matches", label: "Matches", icon: CalendarDays },
  { to: "/standings", label: "Table", icon: ListOrdered },
  { to: "/favorites", label: "Saved", icon: Star },
] as const;

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-border bg-card/90 px-6 py-3 backdrop-blur-xl lg:hidden">
      {mobileLinks.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === "/" }}
          activeProps={{ className: "text-primary" }}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <Icon className="h-5 w-5" />
          <span className="text-[10px] font-semibold">{label}</span>
        </Link>
      ))}
    </div>
  );
}
