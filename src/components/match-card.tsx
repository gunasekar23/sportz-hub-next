import { Link } from "@tanstack/react-router";
import type { Match } from "@/data/sports";
import { teamById } from "@/data/sports";
import { TeamCrest } from "@/components/team-crest";
import { cn } from "@/lib/utils";

export function MatchCard({ match }: { match: Match }) {
  const home = teamById(match.homeId)!;
  const away = teamById(match.awayId)!;
  const live = match.status === "live";
  const hasScore = match.homeScore !== undefined;

  return (
    <Link
      to="/matches/$matchId"
      params={{ matchId: match.id }}
      className="group block rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50"
    >
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <span className="truncate text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {match.league}
        </span>
        {live ? (
          <span className="flex shrink-0 items-center gap-1.5 rounded bg-live/10 px-2 py-0.5 text-[10px] font-bold uppercase text-live">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
            {match.clock}
          </span>
        ) : (
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {match.status === "finished" ? "Full time" : match.kickoff}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {[
          { team: home, score: match.homeScore },
          { team: away, score: match.awayScore },
        ].map(({ team, score }) => (
          <div key={team.id} className="flex items-center gap-3">
            <TeamCrest abbr={team.abbr} size="sm" />
            <span className="min-w-0 flex-1 truncate text-sm font-bold">{team.name}</span>
            <span
              className={cn(
                "font-display text-lg font-extrabold tabular-nums",
                live ? "animate-score-flip text-primary" : "text-foreground",
              )}
            >
              {hasScore ? score : "–"}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 truncate text-[10px] uppercase tracking-widest text-muted-foreground">
        {match.venue}
      </p>
    </Link>
  );
}
