import { Link } from "@tanstack/react-router";

export function SectionHeading({
  title,
  actionLabel,
  actionTo,
}: {
  title: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
      <h2 className="truncate font-display text-sm font-extrabold uppercase tracking-[0.18em]">
        {title}
      </h2>
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
