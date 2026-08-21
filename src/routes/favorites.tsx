import { createFileRoute, Link } from "@tanstack/react-router";
import { matchesByTeam, playerById, teamById } from "@/data/sports";
import { MatchCard } from "@/components/match-card";
import { PlayerRow } from "@/components/player-card";
import { TeamCrest } from "@/components/team-crest";
import { FavoriteStar } from "@/components/favorite-star";
import { PageShell } from "@/components/page-shell";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "My Favorite Teams & Players — VelocitySports" },
      {
        name: "description",
        content:
          "Your starred teams and players in one place, with their next fixtures and live scores.",
      },
      { property: "og:title", content: "My Favorites — VelocitySports" },
      {
        property: "og:description",
        content: "Starred teams and players with their next fixtures.",
      },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { teams: favTeams, players: favPlayers } = useFavorites();
  const teamObjects = favTeams.map((id) => teamById(id)).filter(Boolean);
  const playerObjects = favPlayers.map((id) => playerById(id)).filter(Boolean);
  const fixtures = teamObjects.flatMap((t) => matchesByTeam(t!.id));
  const uniqueFixtures = fixtures.filter(
    (m, i) => fixtures.findIndex((x) => x.id === m.id) === i,
  );

  const empty = !teamObjects.length && !playerObjects.length;

  return (
    <PageShell
      eyebrow="Following"
      title="My Favorites"
      description="Star teams and players anywhere on the site and they show up here."
    >
      {empty ? (
        <div className="rounded-3xl border border-border bg-card p-10 text-center">
          <p className="mb-6 text-sm text-muted-foreground">
            You haven't followed anyone yet.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/teams"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              Browse teams
            </Link>
            <Link
              to="/players"
              className="rounded-lg border border-border px-4 py-2 text-sm font-bold hover:border-primary hover:text-primary"
            >
              Browse players
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {teamObjects.length ? (
            <section>
              <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
                Teams
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {teamObjects.map((team) => (
                  <div
                    key={team!.id}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                  >
                    <TeamCrest abbr={team!.abbr} />
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/teams/$teamId"
                        params={{ teamId: team!.id }}
                        className="block truncate font-bold hover:text-primary"
                      >
                        {team!.name}
                      </Link>
                      <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
                        {team!.league}
                      </p>
                    </div>
                    <FavoriteStar kind="team" id={team!.id} label={team!.name} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {playerObjects.length ? (
            <section>
              <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
                Players
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {playerObjects.map((p) => (
                  <PlayerRow key={p!.id} player={p!} />
                ))}
              </div>
            </section>
          ) : null}

          {uniqueFixtures.length ? (
            <section>
              <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em]">
                Their matches
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {uniqueFixtures.map((m) => (
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
