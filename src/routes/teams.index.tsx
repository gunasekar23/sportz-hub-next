import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { leagues, teams } from "@/data/sports";
import { TeamCrest } from "@/components/team-crest";
import { FavoriteStar } from "@/components/favorite-star";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teams/")({
  head: () => ({
    meta: [
      { title: "Teams & Clubs — VelocitySports" },
      {
        name: "description",
        content:
          "Explore club profiles across the Premier League, La Liga and NBA with squads, venues and form.",
      },
      { property: "og:title", content: "Teams & Clubs — VelocitySports" },
      {
        property: "og:description",
        content: "Club profiles, squads, venues and current form.",
      },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  const [league, setLeague] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teams.filter((t) => {
      if (league !== "all" && t.league !== league) return false;
      if (!q) return true;
      return `${t.name} ${t.abbr} ${t.city} ${t.coach}`.toLowerCase().includes(q);
    });
  }, [league, query]);

  return (
    <PageShell
      eyebrow="Clubs"
      title="Teams"
      description="Search clubs by name, city or coach and star the ones you follow."
    >
      <div className="mb-8 space-y-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search teams..."
          aria-label="Search teams"
          className="w-full rounded-full border border-border bg-card px-5 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
        />
        <div className="flex flex-wrap gap-2">
          {["all", ...leagues].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLeague(l)}
              aria-pressed={league === l}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors",
                league === l
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {l === "all" ? "All leagues" : l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((team) => (
          <div
            key={team.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50"
          >
            <TeamCrest abbr={team.abbr} />
            <div className="min-w-0 flex-1">
              <Link
                to="/teams/$teamId"
                params={{ teamId: team.id }}
                className="block truncate font-bold hover:text-primary"
              >
                {team.name}
              </Link>
              <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
                {team.league} • {team.city}
              </p>
            </div>
            <FavoriteStar kind="team" id={team.id} label={team.name} />
          </div>
        ))}
      </div>
      {!filtered.length ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No teams match that search.
        </p>
      ) : null}
    </PageShell>
  );
}
