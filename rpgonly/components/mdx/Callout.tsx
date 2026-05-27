import type { ReactNode } from "react";

type CalloutType = "info" | "tip" | "warning" | "lore";

const configs: Record<
  CalloutType,
  { icon: string; accent: string; bg: string }
> = {
  info: { icon: "ℹ", accent: "#4c8bc9", bg: "rgba(76,139,201,0.08)" },
  tip: { icon: "✦", accent: "#c9a84c", bg: "rgba(201,168,76,0.08)" },
  warning: { icon: "⚠", accent: "#b94040", bg: "rgba(185,64,64,0.08)" },
  lore: { icon: "📜", accent: "#9b4cc9", bg: "rgba(155,76,201,0.08)" },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "tip", title, children }: CalloutProps) {
  const { icon, accent, bg } = configs[type];
  return (
    <div
      className="my-6 p-5 rounded-lg"
      style={{
        backgroundColor: bg,
        border: `1px solid ${accent}40`,
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <div
        className="flex items-center gap-2 mb-2"
        style={{ color: accent, fontFamily: "var(--font-cinzel)", fontSize: "0.875rem" }}
      >
        <span aria-hidden="true">{icon}</span>
        {title && <span className="font-semibold">{title}</span>}
      </div>
      <div
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-crimson)",
          fontSize: "1rem",
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </div>
  );
}
