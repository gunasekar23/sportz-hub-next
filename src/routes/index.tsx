import { createFileRoute, Link } from "@tanstack/react-router";
import { matches, news, players, teamById, teams } from "@/data/sports";
import { MatchCard } from "@/components/match-card";
import { StandingsTable } from "@/components/standings-table";
import { FeaturedNews, NewsCard } from "@/components/news-card";
import { PlayerSpotlight } from "@/components/player-card";
import { SectionHeading } from "@/components/section-heading";
import { FavoriteStar } from "@/components/favorite-star";
import { TeamCrest } from "@/components/team-crest";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VelocitySports — Live Scores, Fixtures & Standings" },
      {
        name: "description",
        content:
          "Follow live football and basketball scores, upcoming fixtures, league tables, player stats and the latest sports headlines.",
      },
      { property: "og:title", content: "VelocitySports — Live Scores & Fixtures" },
      {
        property: "og:description",
        content: "Live scores, fixtures, standings and stats across football and basketball.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = news.find((n) => n.featured)!;
  const secondary = news.filter((n) => !n.featured);
  const live = matches.filter((m) => m.status === "live");
  const upcoming = matches.filter((m) => m.status === "upcoming").slice(0, 3);
  const spotlight = players[0]!;
  const favoriteCandidates = teams.filter((t) => ["lal", "mci"].includes(t.id));

  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-28 pt-8 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-12">
      <aside className="space-y-8 lg:col-span-3 lg:order-1">
        <section>
          <SectionHeading title="Standings" actionLabel="View All" actionTo="/standings" />
          <StandingsTable league="Premier League" compact />
        </section>

        <section className="rounded-2xl bg-primary p-6 text-primary-foreground">
          <h3 className="mb-2 font-display text-lg font-extrabold leading-tight">
            VELOCITY+ PREMIUM
          </h3>
          <p className="mb-4 text-xs font-medium opacity-80">
            Ad-free stats and exclusive locker room footage.
          </p>
          <Link
            to="/news"
            className="block w-full rounded-lg bg-background py-2 text-center text-xs font-bold uppercase tracking-wider text-primary"
          >
            Upgrade Now
          </Link>
        </section>
      </aside>

      <div className="space-y-8 lg:col-span-6 lg:order-2">
        <Link to="/news" className="block animate-rise-in">
          <FeaturedNews item={featured} />
        </Link>

        <section>
          <SectionHeading title="Live Now" actionLabel="All Matches" actionTo="/matches" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {live.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="Upcoming Fixtures" actionLabel="Full Schedule" actionTo="/matches" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {upcoming.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {secondary.map((item) => (
            <Link key={item.id} to="/news">
              <NewsCard item={item} />
            </Link>
          ))}
        </div>
      </div>

      <aside className="space-y-8 lg:col-span-3 lg:order-3">
        <section>
          <SectionHeading title="Player Spotlight" actionLabel="All Players" actionTo="/players" />
          <PlayerSpotlight player={spotlight} />
        </section>

        <section>
          <SectionHeading title="Fan Favorites" actionLabel="My Saved" actionTo="/favorites" />
          <div className="space-y-3">
            {favoriteCandidates.map((team) => {
              const next = matches.find(
                (m) => m.status !== "finished" && (m.homeId === team.id || m.awayId === team.id),
              );
              const opponent = next
                ? teamById(next.homeId === team.id ? next.awayId : next.homeId)
                : undefined;
              return (
                <div
                  key={team.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3"
                >
                  <TeamCrest abbr={team.abbr} />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/teams/$teamId"
                      params={{ teamId: team.id }}
                      className="block truncate text-sm font-bold hover:text-primary"
                    >
                      {team.name}
                    </Link>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {opponent ? `Next: vs ${opponent.abbr} (${next!.kickoff})` : "No fixture"}
                    </p>
                  </div>
                  <FavoriteStar kind="team" id={team.id} label={team.name} />
                </div>
              );
            })}
          </div>
        </section>
      </aside>
    </main>
  );
}
