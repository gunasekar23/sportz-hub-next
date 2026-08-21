import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { leagues, matches, teamById, type MatchStatus } from "@/data/sports";
import { MatchCard } from "@/components/match-card";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matches/")({
  head: () => ({
    meta: [
      { title: "Fixtures & Live Matches — VelocitySports" },
      {
        name: "description",
        content:
          "Browse live matches, upcoming fixtures and recent results with league filters and search.",
      },
      { property: "og:title", content: "Fixtures & Live Matches — VelocitySports" },
      {
        property: "og:description",
        content: "Live matches, upcoming fixtures and results across football and basketball.",
      },
    ],
  }),
  component: MatchesPage,
});

const statusFilters: { value: MatchStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "upcoming", label: "Upcoming" },
  { value: "finished", label: "Results" },
];

function MatchesPage() {
  const [status, setStatus] = useState<MatchStatus | "all">("all");
  const [league, setLeague] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return matches.filter((m) => {
      if (status !== "all" && m.status !== status) return false;
      if (league !== "all" && m.league !== league) return false;
      if (!q) return true;
      const names = [teamById(m.homeId)!, teamById(m.awayId)!]
        .flatMap((t) => [t.name, t.abbr, t.city])
        .join(" ")
        .toLowerCase();
      return names.includes(q) || m.venue.toLowerCase().includes(q);
    });
  }, [status, league, query]);

  return (
    <PageShell
      eyebrow="Schedule"
      title="Matches & Fixtures"
      description="Filter by status or league, or search for a team, city or venue."
    >
      <div className="mb-8 space-y-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search team, city or venue..."
          aria-label="Search matches"
          className="w-full rounded-full border border-border bg-card px-5 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
        />

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((f) => (
            <FilterPill
              key={f.value}
              active={status === f.value}
              onClick={() => setStatus(f.value)}
              label={f.label}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterPill active={league === "all"} onClick={() => setLeague("all")} label="All leagues" />
          {leagues.map((l) => (
            <FilterPill key={l} active={league === l} onClick={() => setLeague(l)} label={l} />
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No matches found for these filters.
        </p>
      )}
    </PageShell>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
