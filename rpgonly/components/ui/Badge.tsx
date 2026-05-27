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
      className={cn(
        "inline-block px-2.5 py-0.5 rounded-sm text-xs font-[family-name:var(--font-jetbrains)] tracking-wider uppercase",
        className
      )}
      style={
        color
          ? {
              backgroundColor: `${color}20`,
              color: color,
              border: `1px solid ${color}40`,
            }
          : {
              backgroundColor: "var(--color-muted)",
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
            }
      }
    >
      {isCategory ? getCategoryLabel(label) : label}
    </span>
  );
}
