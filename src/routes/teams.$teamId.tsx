import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { matchesByTeam, playersByTeam, standings, teamById } from "@/data/sports";
import { MatchCard } from "@/components/match-card";
import { PlayerRow } from "@/components/player-card";
import { TeamCrest } from "@/components/team-crest";
import { FavoriteStar } from "@/components/favorite-star";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teams/$teamId")({
  loader: ({ params }) => {
    const team = teamById(params.teamId);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Team not found — VelocitySports" }, { name: "robots", content: "noindex" }],
      };
    }
    const { team } = loaderData;
    const title = `${team.name} — Squad, fixtures & form | VelocitySports`;
    const description = `${team.name} of the ${team.league}: squad list, upcoming fixtures, recent form and home venue ${team.stadium}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: TeamDetail,
  notFoundComponent: TeamNotFound,
});

function TeamDetail() {
  const { team } = Route.useLoaderData();
  const squad = playersByTeam(team.id);
  const fixtures = matchesByTeam(team.id);
  const row = standings[team.league].find((r) => r.teamId === team.id);

  return (
    <PageShell eyebrow={team.league} title={team.name}>
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-3xl border border-border bg-card p-6 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <TeamCrest abbr={team.abbr} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{team.stadium}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {team.city} • Founded {team.founded} • {team.coach}
            </p>
            <div className="mt-3 flex gap-1">
              {team.form.map((f, i) => (
                <span
                  key={i}
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-sm text-[9px] font-bold",
                    f === "W" && "bg-primary/20 text-primary",
                    f === "D" && "bg-muted text-muted-foreground",
                    f === "L" && "bg-live/15 text-live",
                  )}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
        <FavoriteStar kind="team" id={team.id} label={team.name} className="h-10 w-10" />
      </div>

      {row ? (
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Played", value: row.played },
            { label: "Won", value: row.won },
            { label: "Goal diff", value: row.gd > 0 ? `+${row.gd}` : row.gd },
            { label: "Points", value: row.points },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="font-display text-2xl font-extrabold text-primary">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
            Matches
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {fixtures.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
            Squad
          </h2>
          {squad.length ? (
            <div className="space-y-3">
              {squad.map((p) => (
                <PlayerRow key={p.id} player={p} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              Squad list coming soon.
            </p>
          )}
        </section>
      </div>
    </PageShell>
  );
}

function TeamNotFound() {
  return (
    <PageShell title="Team not found" description="We couldn't find that club.">
      <Link
        to="/teams"
        className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
      >
        Back to teams
      </Link>
    </PageShell>
  );
}
