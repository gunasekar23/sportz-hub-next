import type { Match } from "@/data/sports";
import { teamById } from "@/data/sports";

export function StatBars({ match }: { match: Match }) {
  const home = teamById(match.homeId)!;
  const away = teamById(match.awayId)!;

  return (
    <div className="space-y-5">
      {match.stats.map((s) => {
        const total = s.home + s.away || 1;
        const homePct = (s.home / total) * 100;
        return (
          <div key={s.label} className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="tabular-nums text-primary">
                {s.home}
                {s.unit}
              </span>
              <span className="text-muted-foreground">{s.label}</span>
              <span className="tabular-nums">
                {s.away}
                {s.unit}
              </span>
            </div>
            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <span
                className="h-full bg-primary transition-all duration-700"
                style={{ width: `${homePct}%` }}
                aria-label={`${home.abbr} ${s.home}${s.unit ?? ""}`}
              />
              <span
                className="h-full bg-muted-foreground/40"
                style={{ width: `${100 - homePct}%` }}
                aria-label={`${away.abbr} ${s.away}${s.unit ?? ""}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
