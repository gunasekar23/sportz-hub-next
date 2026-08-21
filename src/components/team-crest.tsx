import { cn } from "@/lib/utils";

export function TeamCrest({
  abbr,
  size = "md",
  className,
}: {
  abbr: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-[10px] rounded-md",
    md: "h-10 w-10 text-xs rounded-lg",
    lg: "h-20 w-20 text-xl rounded-2xl",
  };
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center border border-border bg-background font-display font-extrabold tracking-tight text-primary",
        sizes[size],
        className,
      )}
    >
      {abbr}
    </span>
  );
}
