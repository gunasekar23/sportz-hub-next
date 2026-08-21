import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { matches, players, teamById, teams } from "@/data/sports";
import { MatchCard } from "@/components/match-card";
import { PlayerRow } from "@/components/player-card";
import { TeamCrest } from "@/components/team-crest";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Search Teams, Players & Matches — VelocitySports" },
      {
        name: "description",
        content: "Search across clubs, player profiles and fixtures on VelocitySports.",
      },
      { property: "og:title", content: "Search — VelocitySports" },
      {
        property: "og:description",
        content: "Find clubs, players and fixtures instantly.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return { teams: [], players: [], matches: [] };
    return {
      teams: teams.filter((t) =>
        `${t.name} ${t.abbr} ${t.city} ${t.league} ${t.coach}`.toLowerCase().includes(term),
      ),
      players: players.filter((p) =>
        `${p.name} ${p.position} ${p.nationality} ${teamById(p.teamId)!.name}`
          .toLowerCase()
          .includes(term),
      ),
      matches: matches.filter((m) =>
        `${teamById(m.homeId)!.name} ${teamById(m.awayId)!.name} ${m.league} ${m.venue}`
          .toLowerCase()
          .includes(term),
      ),
    };
  }, [q]);

  const total = results.teams.length + results.players.length + results.matches.length;

  return (
    <PageShell
      eyebrow="Search"
      title={q ? `Results for "${q}"` : "Search"}
      description={q ? `${total} result${total === 1 ? "" : "s"} found.` : "Find clubs, players and fixtures."}
    >
      <input
        type="search"
        value={q}
        autoFocus
        onChange={(e) => navigate({ search: { q: e.target.value }, replace: true })}
        placeholder="Search teams, players, venues..."
        aria-label="Search everything"
        className="mb-8 w-full rounded-full border border-border bg-card px-5 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
      />

      {!q ? null : total === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Nothing found. Try a club name like "Arsenal" or a city like "London".
        </p>
      ) : (
        <div className="space-y-10">
          {results.teams.length ? (
            <section>
              <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
                Teams
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.teams.map((team) => (
                  <Link
                    key={team.id}
                    to="/teams/$teamId"
                    params={{ teamId: team.id }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary/50"
                  >
                    <TeamCrest abbr={team.abbr} />
                    <span className="min-w-0">
                      <span className="block truncate font-bold">{team.name}</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {team.league}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {results.players.length ? (
            <section>
              <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
                Players
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.players.map((p) => (
                  <PlayerRow key={p.id} player={p} />
                ))}
              </div>
            </section>
          ) : null}

          {results.matches.length ? (
            <section>
              <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
                Matches
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.matches.map((m) => (
                  <MatchCard key={m.id} match={m} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </PageShell>
  );
}
