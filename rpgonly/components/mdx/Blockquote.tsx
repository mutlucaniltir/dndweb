import type { ReactNode } from "react";

interface BlockquoteProps {
  children: ReactNode;
  attribution?: string;
}

export function Blockquote({ children, attribution }: BlockquoteProps) {
  return (
    <blockquote
      className="relative my-8 px-8 py-6 rounded-r-lg"
      style={{
        backgroundColor: "var(--color-surface)",
        borderLeft: "3px solid var(--color-accent)",
        fontStyle: "italic",
        color: "var(--color-text-secondary)",
        fontFamily: "var(--font-crimson)",
        fontSize: "1.1rem",
      }}
    >
      <span
        className="absolute top-0 left-4 text-5xl leading-none"
        style={{ color: "var(--color-accent)", opacity: 0.4, fontFamily: "Georgia, serif" }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <div className="relative z-10">{children}</div>
      {attribution && (
        <footer
          className="mt-3 text-sm not-italic"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)", fontSize: "0.8rem" }}
        >
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}
