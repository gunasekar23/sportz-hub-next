import { Link } from "@tanstack/react-router";
import { matches, teamById } from "@/data/sports";
import { cn } from "@/lib/utils";

export function LiveTicker() {
  const ticker = matches.filter((m) => m.status !== "finished");

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto whitespace-nowrap px-4 py-3 no-scrollbar sm:px-6 lg:px-8">
        <span className="flex shrink-0 items-center gap-2 rounded bg-live/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-live">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
          Live
        </span>

        {ticker.map((m) => {
          const home = teamById(m.homeId)!;
          const away = teamById(m.awayId)!;
          const isLive = m.status === "live";
          return (
            <Link
              key={m.id}
              to="/matches/$matchId"
              params={{ matchId: m.id }}
              className={cn(
                "flex min-w-[210px] shrink-0 items-center justify-between gap-4 rounded-lg border px-4 py-2 transition-colors hover:border-primary/60",
                isLive
                  ? "border-border/60 bg-background/60"
                  : "border-border/30 bg-background/20 opacity-70",
              )}
            >
              <span className="text-xs font-bold">
                {home.abbr}{" "}
                {isLive ? <span className="text-primary">{m.homeScore}</span> : null}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {isLive ? m.clock : m.kickoff.replace("Today ", "")}
              </span>
              <span className="text-xs font-bold">
                {away.abbr}{" "}
                {isLive ? <span className="text-primary">{m.awayScore}</span> : null}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
