"use client";

import dynamic from "next/dynamic";

const DiceRoller = dynamic(
  () => import("./DiceRoller").then((m) => m.DiceRoller),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const NameGenerator = dynamic(
  () => import("./NameGenerator").then((m) => m.NameGenerator),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const EncounterCalculator = dynamic(
  () => import("./EncounterCalculator").then((m) => m.EncounterCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

function ToolSkeleton() {
  return (
    <div
      className="rounded-xl p-6 animate-pulse"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        minHeight: "300px",
      }}
    />
  );
}

export function ToolsGrid() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <DiceRoller />
        <NameGenerator />
      </div>
      <div className="mt-8">
        <EncounterCalculator />
      </div>
    </>
  );
}
