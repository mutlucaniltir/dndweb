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
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
        >
          Adventurer&apos;s Toolkit
        </p>
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Free RPG Tools
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)" }}
        >
          Everything you need at the table — or behind the screen. Roll dice,
          generate characters, and plan your encounters.
        </p>
      </header>

      <hr className="gold-divider" />

      <ToolsGrid />
    </div>
  );
}
