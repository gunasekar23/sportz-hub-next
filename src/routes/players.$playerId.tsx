import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { matchesByTeam, playerById, teamById } from "@/data/sports";
import { MatchCard } from "@/components/match-card";
import { PlayerSpotlight } from "@/components/player-card";
import { FavoriteStar } from "@/components/favorite-star";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/players/$playerId")({
  loader: ({ params }) => {
    const player = playerById(params.playerId);
    if (!player) throw notFound();
    return { player };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Player not found — VelocitySports" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { player } = loaderData;
    const team = teamById(player.teamId)!;
    const title = `${player.name} — ${player.position} stats | VelocitySports`;
    const description = `Season statistics, club and profile details for ${player.name}, ${player.position} at ${team.name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PlayerDetail,
  notFoundComponent: PlayerNotFound,
});

function PlayerDetail() {
  const { player } = Route.useLoaderData();
  const team = teamById(player.teamId)!;
  const fixtures = matchesByTeam(team.id).slice(0, 2);

  return (
    <PageShell eyebrow={`${team.league} • #${player.number}`} title={player.name}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4">
          <PlayerSpotlight player={player} />
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Follow player
            </span>
            <FavoriteStar kind="player" id={player.id} label={player.name} />
          </div>
        </div>

        <div className="space-y-8 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
              Profile
            </h2>
            <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              {[
                { label: "Club", value: team.name },
                { label: "Position", value: player.position },
                { label: "Age", value: String(player.age) },
                { label: "Nationality", value: player.nationality },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="mt-1 font-bold">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
              Club matches
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {fixtures.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

function PlayerNotFound() {
  return (
    <PageShell title="Player not found" description="We couldn't find that profile.">
      <Link
        to="/players"
        className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
      >
        Back to players
      </Link>
    </PageShell>
  );
}
