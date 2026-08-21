import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { players, teamById } from "@/data/sports";
import { PlayerRow } from "@/components/player-card";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/players/")({
  head: () => ({
    meta: [
      { title: "Player Profiles & Stats — VelocitySports" },
      {
        name: "description",
        content:
          "Search player profiles across football and basketball with season stats, positions and clubs.",
      },
      { property: "og:title", content: "Player Profiles & Stats — VelocitySports" },
      {
        property: "og:description",
        content: "Season stats, positions and clubs for tracked players.",
      },
    ],
  }),
  component: PlayersPage,
});

function PlayersPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return players;
    return players.filter((p) =>
      `${p.name} ${p.position} ${p.nationality} ${teamById(p.teamId)!.name}`
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  return (
    <PageShell
      eyebrow="Athletes"
      title="Player Profiles"
      description="Search by name, position, nationality or club."
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search players..."
        aria-label="Search players"
        className="mb-8 w-full rounded-full border border-border bg-card px-5 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PlayerRow key={p.id} player={p} />
        ))}
      </div>
      {!filtered.length ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No players match that search.
        </p>
      ) : null}
    </PageShell>
  );
}
