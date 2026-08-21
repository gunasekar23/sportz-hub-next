import { Star } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function FavoriteStar({
  kind,
  id,
  label,
  className,
}: {
  kind: "team" | "player";
  id: string;
  label: string;
  className?: string;
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(kind, id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${active ? "Remove" : "Add"} ${label} ${active ? "from" : "to"} favorites`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(kind, id);
      }}
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border transition-colors hover:border-primary hover:text-primary",
        active ? "border-primary/50 bg-primary/10 text-primary" : "text-muted-foreground",
        className,
      )}
    >
      <Star className="h-4 w-4" fill={active ? "currentColor" : "none"} />
    </button>
  );
}
