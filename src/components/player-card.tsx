import { Link } from "@tanstack/react-router";
import type { Player } from "@/data/sports";
import { teamById } from "@/data/sports";
import { FavoriteStar } from "@/components/favorite-star";

export function PlayerSpotlight({ player }: { player: Player }) {
  const team = teamById(player.teamId)!;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <div className="relative mx-auto mb-4 h-24 w-24">
        {player.image ? (
          <img
            src={player.image}
            alt={player.name}
            loading="lazy"
            width={512}
            height={512}
            className="h-full w-full rounded-full border-2 border-primary object-cover"
          />
        ) : (
          <span className="grid h-full w-full place-items-center rounded-full border-2 border-primary bg-background font-display text-2xl font-extrabold text-primary">
            {player.name.charAt(0)}
          </span>
        )}
        <span className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border-4 border-card bg-primary font-display text-[10px] font-bold text-primary-foreground">
          {player.number}
        </span>
      </div>
      <Link
        to="/players/$playerId"
        params={{ playerId: player.id }}
        className="font-display text-lg font-extrabold hover:text-primary"
      >
        {player.name}
      </Link>
      <p className="mb-4 text-xs text-muted-foreground">
        {player.position} • {team.name}
      </p>
      <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
        {player.stats.map((s) => (
          <div key={s.label}>
            <div className="font-display text-lg font-extrabold text-primary">{s.value}</div>
            <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlayerRow({ player }: { player: Player }) {
  const team = teamById(player.teamId)!;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-background font-display text-xs font-extrabold text-primary">
        {player.number}
      </span>
      <div className="min-w-0 flex-1">
        <Link
          to="/players/$playerId"
          params={{ playerId: player.id }}
          className="block truncate text-sm font-bold hover:text-primary"
        >
          {player.name}
        </Link>
        <p className="truncate text-[10px] text-muted-foreground">
          {player.position} • {team.name}
        </p>
      </div>
      <FavoriteStar kind="player" id={player.id} label={player.name} />
    </div>
  );
}
