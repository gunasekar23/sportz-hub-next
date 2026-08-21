import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { matchById, teamById } from "@/data/sports";
import { StatBars } from "@/components/stat-bars";
import { TeamCrest } from "@/components/team-crest";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matches/$matchId")({
  loader: ({ params }) => {
    const match = matchById(params.matchId);
    if (!match) throw notFound();
    return { match };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Match not found — VelocitySports" }, { name: "robots", content: "noindex" }],
      };
    }
    const { match } = loaderData;
    const home = teamById(match.homeId)!.name;
    const away = teamById(match.awayId)!.name;
    const title = `${home} vs ${away} — Live stats | VelocitySports`;
    const description = `${match.league} at ${match.venue}. Live score, key events and full match statistics for ${home} against ${away}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: MatchDetail,
  notFoundComponent: MatchNotFound,
});

function MatchDetail() {
  const { match } = Route.useLoaderData();
  const home = teamById(match.homeId)!;
  const away = teamById(match.awayId)!;
  const live = match.status === "live";

  return (
    <PageShell eyebrow={match.league} title={`${home.name} vs ${away.name}`}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="space-y-8 lg:col-span-2">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              {live ? (
                <span className="flex w-fit items-center gap-2 rounded bg-live/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-live">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
                  Live {match.clock}
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {match.status === "finished" ? "Full time" : match.kickoff}
                </span>
              )}
              <span className="truncate text-right text-[10px] uppercase tracking-widest text-muted-foreground">
                {match.venue}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <TeamLink team={home} />
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-3 font-display text-4xl font-extrabold tabular-nums sm:text-6xl">
                  <span className={cn(live && "animate-score-flip text-primary")}>
                    {match.homeScore ?? "–"}
                  </span>
                  <span className="text-muted-foreground/40">:</span>
                  <span className={cn(live && "animate-score-flip text-primary")}>
                    {match.awayScore ?? "–"}
                  </span>
                </div>
                <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {live ? match.clock : match.kickoff}
                </span>
              </div>
              <TeamLink team={away} />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-6 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
              Match statistics
            </h2>
            <StatBars match={match} />
          </div>
        </section>

        <aside>
          <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
            Key events
          </h2>
          {match.events.length ? (
            <ol className="space-y-3">
              {match.events.map((ev, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <span className="w-10 shrink-0 font-display text-xs font-extrabold text-primary">
                    {ev.minute}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{ev.player}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {ev.type} • {teamById(ev.teamId)!.abbr}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              No events yet — this match hasn't kicked off.
            </p>
          )}
        </aside>
      </div>
    </PageShell>
  );
}

function TeamLink({ team }: { team: { id: string; abbr: string; name: string } }) {
  return (
    <Link
      to="/teams/$teamId"
      params={{ teamId: team.id }}
      className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center hover:text-primary"
    >
      <TeamCrest abbr={team.abbr} size="lg" />
      <span className="truncate font-display text-sm font-extrabold uppercase sm:text-xl">
        {team.name}
      </span>
    </Link>
  );
}

function MatchNotFound() {
  return (
    <PageShell title="Match not found" description="This fixture is no longer available.">
      <Link
        to="/matches"
        className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
      >
        Back to fixtures
      </Link>
    </PageShell>
  );
}
