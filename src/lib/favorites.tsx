import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type FavKind = "team" | "player";

type FavoritesValue = {
  teams: string[];
  players: string[];
  isFavorite: (kind: FavKind, id: string) => boolean;
  toggle: (kind: FavKind, id: string) => void;
};

const FavoritesContext = createContext<FavoritesValue | null>(null);

const STORAGE_KEY = "velocity-favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [teams, setTeams] = useState<string[]>([]);
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { teams?: string[]; players?: string[] };
      setTeams(parsed.teams ?? []);
      setPlayers(parsed.players ?? []);
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  const persist = useCallback((next: { teams: string[]; players: string[] }) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggle = useCallback(
    (kind: FavKind, id: string) => {
      if (kind === "team") {
        setTeams((prev) => {
          const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
          persist({ teams: next, players });
          return next;
        });
      } else {
        setPlayers((prev) => {
          const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
          persist({ teams, players: next });
          return next;
        });
      }
    },
    [persist, players, teams],
  );

  const value = useMemo<FavoritesValue>(
    () => ({
      teams,
      players,
      isFavorite: (kind, id) => (kind === "team" ? teams.includes(id) : players.includes(id)),
      toggle,
    }),
    [teams, players, toggle],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
