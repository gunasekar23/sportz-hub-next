import { Link } from "@tanstack/react-router";
import type { League } from "@/data/sports";
import { standings, teamById } from "@/data/sports";
import { cn } from "@/lib/utils";

export function StandingsTable({
  league,
  compact = false,
}: {
  league: League;
  compact?: boolean;
}) {
  const rows = standings[league];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-background/50 text-muted-foreground">
            <tr>
              <th scope="col" className="p-3 font-medium">
                #
              </th>
              <th scope="col" className="p-3 font-medium">
                Team
              </th>
              {!compact && (
                <>
                  <th scope="col" className="p-3 text-center font-medium">
                    P
                  </th>
                  <th scope="col" className="p-3 text-center font-medium">
                    W
                  </th>
                  <th scope="col" className="p-3 text-center font-medium">
                    L
                  </th>
                  <th scope="col" className="p-3 text-center font-medium">
                    GD
                  </th>
                  <th scope="col" className="p-3 text-center font-medium">
                    Form
                  </th>
                </>
              )}
              <th scope="col" className="p-3 text-right font-medium">
                Pts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => {
              const team = teamById(row.teamId)!;
              return (
                <tr key={row.teamId} className="transition-colors hover:bg-background/40">
                  <td className="p-3 tabular-nums text-muted-foreground">{i + 1}</td>
                  <td className="p-3 font-semibold">
                    <Link
                      to="/teams/$teamId"
                      params={{ teamId: team.id }}
                      className="hover:text-primary"
                    >
                      {team.name}
                    </Link>
                  </td>
                  {!compact && (
                    <>
                      <td className="p-3 text-center tabular-nums">{row.played}</td>
                      <td className="p-3 text-center tabular-nums">{row.won}</td>
                      <td className="p-3 text-center tabular-nums">{row.lost}</td>
                      <td className="p-3 text-center tabular-nums">
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                      </td>
                      <td className="p-3">
                        <span className="flex justify-center gap-1">
                          {team.form.map((f, idx) => (
                            <span
                              key={idx}
                              className={cn(
                                "grid h-4 w-4 place-items-center rounded-sm text-[8px] font-bold",
                                f === "W" && "bg-primary/20 text-primary",
                                f === "D" && "bg-muted text-muted-foreground",
                                f === "L" && "bg-live/15 text-live",
                              )}
                            >
                              {f}
                            </span>
                          ))}
                        </span>
                      </td>
                    </>
                  )}
                  <td
                    className={cn(
                      "p-3 text-right font-bold tabular-nums",
                      i === 0 && "text-primary",
                    )}
                  >
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
