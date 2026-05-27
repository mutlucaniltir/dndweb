import type { Metadata } from "next";
import { ToolsGrid } from "@/components/tools/ToolsGrid";

export const metadata: Metadata = {
  title: "Free RPG Tools — Dice Roller, Name Generator & More",
  description:
    "Free online RPG tools: roll any dice, generate fantasy character names with AI lore snippets, and calculate encounter difficulty for D&D 5e.",
};

export default function ToolsPage() {
  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "1280px" }}>
      <header className="mb-12 text-center">
        <div
          className="inline-block mb-4 px-3 py-1"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.38rem",
            color: "var(--color-accent)",
            border: "1px solid var(--color-border)",
            letterSpacing: "0.2em",
          }}
        >
          ▸ ADVENTURER&apos;S TOOLKIT ◂
        </div>
        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "clamp(0.8rem, 3vw, 1.2rem)",
            color: "var(--color-text-primary)",
            lineHeight: 1.6,
          }}
        >
          FREE RPG TOOLS
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}
        >
          Everything you need at the table — roll dice, generate characters, and plan encounters.
        </p>
      </header>

      {/* Pixel divider */}
      <div
        className="mb-10"
        style={{
          height: "1px",
          background: "repeating-linear-gradient(90deg, var(--color-border) 0px, var(--color-border) 4px, transparent 4px, transparent 8px)",
        }}
      />

      <ToolsGrid />
    </div>
  );
}
