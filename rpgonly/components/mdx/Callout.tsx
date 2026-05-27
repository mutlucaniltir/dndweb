import type { ReactNode } from "react";

type CalloutType = "info" | "tip" | "warning" | "lore";

const configs: Record<CalloutType, { icon: string; label: string; accent: string }> = {
  info:    { icon: "ℹ", label: "INFO",    accent: "#4c8bc9" },
  tip:     { icon: "✦", label: "TIP",     accent: "#00c9a7" },
  warning: { icon: "⚠", label: "WARNING", accent: "#e63946" },
  lore:    { icon: "📜", label: "LORE",   accent: "#9b5de5" },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "tip", title, children }: CalloutProps) {
  const { icon, label, accent } = configs[type];
  return (
    <div
      className="my-6 p-5"
      style={{
        backgroundColor: `${accent}0d`,
        border: `1px solid ${accent}40`,
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <div
        className="flex items-center gap-2 mb-3"
        style={{ color: accent }}
      >
        <span
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.5rem",
            letterSpacing: "0.15em",
          }}
        >
          [{icon} {title ?? label}]
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </div>
  );
}
