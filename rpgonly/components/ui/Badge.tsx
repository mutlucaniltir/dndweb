import { cn, getCategoryColor, getCategoryLabel } from "@/lib/utils";

interface BadgeProps {
  label: string;
  isCategory?: boolean;
  className?: string;
}

export function Badge({ label, isCategory = false, className }: BadgeProps) {
  const color = isCategory ? getCategoryColor(label) : undefined;
  return (
    <span
      className={cn("inline-block px-2 py-0.5 uppercase", className)}
      style={
        color
          ? {
              fontFamily: "var(--font-press-start)",
              fontSize: "0.38rem",
              letterSpacing: "0.15em",
              color: color,
              border: `1px solid ${color}`,
              backgroundColor: `${color}15`,
            }
          : {
              fontFamily: "var(--font-press-start)",
              fontSize: "0.38rem",
              letterSpacing: "0.15em",
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              backgroundColor: "transparent",
            }
      }
    >
      {isCategory ? getCategoryLabel(label) : label}
    </span>
  );
}
