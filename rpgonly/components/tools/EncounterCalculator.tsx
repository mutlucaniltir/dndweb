"use client";

import { useState, useMemo } from "react";

// XP thresholds per character per level (Easy, Medium, Hard, Deadly)
const XP_THRESHOLDS: Record<number, [number, number, number, number]> = {
  1: [25, 50, 75, 100],
  2: [50, 100, 150, 200],
  3: [75, 150, 225, 400],
  4: [125, 250, 375, 500],
  5: [250, 500, 750, 1100],
  6: [300, 600, 900, 1400],
  7: [350, 750, 1100, 1700],
  8: [450, 900, 1400, 2100],
  9: [550, 1100, 1600, 2400],
  10: [600, 1200, 1900, 2800],
  11: [800, 1600, 2400, 3600],
  12: [1000, 2000, 3000, 4500],
  13: [1100, 2200, 3400, 5100],
  14: [1250, 2500, 3800, 5700],
  15: [1400, 2800, 4300, 6400],
  16: [1600, 3200, 4800, 7200],
  17: [2000, 3900, 5900, 8800],
  18: [2100, 4200, 6300, 9500],
  19: [2400, 4900, 7300, 10900],
  20: [2800, 5700, 8500, 12700],
};

const DIFFICULTY_LABELS = ["Easy", "Medium", "Hard", "Deadly"] as const;
const DIFFICULTY_COLORS = ["#4cb97a", "#c9a84c", "#b97a4c", "#b94040"];

export function EncounterCalculator() {
  const [partySize, setPartySize] = useState(4);
  const [partyLevel, setPartyLevel] = useState(5);
  const [monsterXP, setMonsterXP] = useState("");

  const thresholds = useMemo(() => {
    const base = XP_THRESHOLDS[partyLevel] ?? XP_THRESHOLDS[5];
    return base.map((xp) => xp * partySize) as [number, number, number, number];
  }, [partyLevel, partySize]);

  const xp = parseInt(monsterXP) || 0;

  const difficulty = useMemo(() => {
    if (xp === 0) return null;
    if (xp < thresholds[0]) return 0; // trivial
    if (xp < thresholds[1]) return 0; // easy
    if (xp < thresholds[2]) return 1; // medium
    if (xp < thresholds[3]) return 2; // hard
    return 3; // deadly
  }, [xp, thresholds]);

  const difficultyActual = useMemo(() => {
    if (xp === 0) return null;
    if (xp < thresholds[0]) return -1;
    if (xp < thresholds[1]) return 0;
    if (xp < thresholds[2]) return 1;
    if (xp < thresholds[3]) return 2;
    return 3;
  }, [xp, thresholds]);

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h2
        className="text-2xl mb-2"
        style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-accent)" }}
      >
        Encounter Difficulty Calculator
      </h2>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
      >
        D&D 5e XP thresholds by party size and level
      </p>

      {/* Party controls */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Party size */}
        <div>
          <label
            className="block text-xs uppercase tracking-wider mb-2"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          >
            Party Size: {partySize}
          </label>
          <input
            type="range"
            min="1"
            max="8"
            value={partySize}
            onChange={(e) => setPartySize(+e.target.value)}
            className="w-full"
            style={{ accentColor: "var(--color-accent)" }}
            aria-label="Party size"
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          >
            <span>1</span><span>8</span>
          </div>
        </div>

        {/* Party level */}
        <div>
          <label
            className="block text-xs uppercase tracking-wider mb-2"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          >
            Average Level: {partyLevel}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={partyLevel}
            onChange={(e) => setPartyLevel(+e.target.value)}
            className="w-full"
            style={{ accentColor: "var(--color-accent)" }}
            aria-label="Party level"
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          >
            <span>1</span><span>20</span>
          </div>
        </div>
      </div>

      {/* XP thresholds */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {DIFFICULTY_LABELS.map((label, i) => (
          <div
            key={label}
            className="p-3 rounded-lg text-center"
            style={{
              backgroundColor: "var(--color-muted)",
              border: `1px solid ${DIFFICULTY_COLORS[i]}40`,
            }}
          >
            <p
              className="text-xs mb-1"
              style={{ color: DIFFICULTY_COLORS[i], fontFamily: "var(--font-jetbrains)" }}
            >
              {label}
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-cinzel)" }}
            >
              {thresholds[i].toLocaleString()}
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
            >
              XP
            </p>
          </div>
        ))}
      </div>

      {/* Monster XP input */}
      <div className="mb-6">
        <label
          className="block text-xs uppercase tracking-wider mb-2"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          htmlFor="monster-xp"
        >
          Total Monster XP
        </label>
        <input
          id="monster-xp"
          type="number"
          min="0"
          value={monsterXP}
          onChange={(e) => setMonsterXP(e.target.value)}
          placeholder="e.g. 1800"
          className="w-full px-4 py-3 rounded-lg outline-none text-base"
          style={{
            backgroundColor: "var(--color-muted)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-cinzel)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
      </div>

      {/* Result */}
      {xp > 0 && difficultyActual !== null && (
        <div
          className="p-5 rounded-lg text-center"
          style={{
            backgroundColor: "var(--color-muted)",
            border: `2px solid ${difficultyActual === -1 ? "var(--color-border)" : DIFFICULTY_COLORS[difficultyActual]}`,
          }}
        >
          {difficultyActual === -1 ? (
            <>
              <p
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text-secondary)" }}
              >
                Trivial
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
              >
                Below Easy threshold — the party will barely break a sweat.
              </p>
            </>
          ) : (
            <>
              <p
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "var(--font-cinzel)", color: DIFFICULTY_COLORS[difficultyActual] }}
              >
                {DIFFICULTY_LABELS[difficultyActual]}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
              >
                {xp.toLocaleString()} XP for {partySize} level-{partyLevel} adventurers
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
