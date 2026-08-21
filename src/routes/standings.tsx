import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { leagues, type League } from "@/data/sports";
import { StandingsTable } from "@/components/standings-table";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "League Standings & Tables — VelocitySports" },
      {
        name: "description",
        content:
          "Up-to-date league tables with points, goal difference and recent form for the Premier League, La Liga and NBA.",
      },
      { property: "og:title", content: "League Standings & Tables — VelocitySports" },
      {
        property: "og:description",
        content: "Points, goal difference and form guides across three major leagues.",
      },
    ],
  }),
  component: StandingsPage,
});

function StandingsPage() {
  const [league, setLeague] = useState<League>("Premier League");

  return (
    <PageShell
      eyebrow="Tables"
      title="League Standings"
      description="Points, goal difference and five-match form for every tracked competition."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {leagues.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLeague(l)}
            aria-pressed={league === l}
            className={cn(
              "rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors",
              league === l
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <StandingsTable league={league} />
    </PageShell>
  );
}
