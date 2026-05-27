"use client";

import { useState } from "react";

type DieType = 4 | 6 | 8 | 10 | 12 | 20 | 100;
const DICE: DieType[] = [4, 6, 8, 10, 12, 20, 100];

interface RollResult {
  die: DieType;
  count: number;
  rolls: number[];
  total: number;
  timestamp: number;
}

function rollDie(sides: DieType): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function DiceRoller() {
  const [selectedDie, setSelectedDie] = useState<DieType>(20);
  const [count, setCount] = useState(1);
  const [history, setHistory] = useState<RollResult[]>([]);
  const [rolling, setRolling] = useState(false);

  function roll() {
    setRolling(true);
    setTimeout(() => {
      const rolls = Array.from({ length: count }, () => rollDie(selectedDie));
      const total = rolls.reduce((a, b) => a + b, 0);
      setHistory((h) => [
        { die: selectedDie, count, rolls, total, timestamp: Date.now() },
        ...h.slice(0, 9),
      ]);
      setRolling(false);
    }, 300);
  }

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h2
        className="text-2xl mb-6"
        style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-accent)" }}
      >
        Dice Roller
      </h2>

      {/* Die selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {DICE.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDie(d)}
            className="relative w-14 h-14 rounded-lg text-sm font-medium transition-all"
            style={{
              fontFamily: "var(--font-cinzel)",
              backgroundColor: selectedDie === d ? "var(--color-accent)" : "var(--color-muted)",
              color: selectedDie === d ? "var(--color-bg)" : "var(--color-text-primary)",
              border: selectedDie === d ? "none" : "1px solid var(--color-border)",
            }}
            aria-pressed={selectedDie === d}
            aria-label={`Select d${d}`}
          >
            d{d}
          </button>
        ))}
      </div>

      {/* Count control */}
      <div className="flex items-center gap-4 mb-6">
        <label
          className="text-sm"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          htmlFor="dice-count"
        >
          Number of dice:
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount((c) => Math.max(1, c - 1))}
            className="w-8 h-8 rounded flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "var(--color-muted)",
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-border)",
            }}
            aria-label="Decrease dice count"
          >
            −
          </button>
          <span
            id="dice-count"
            className="w-8 text-center font-medium"
            style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text-primary)" }}
          >
            {count}
          </span>
          <button
            onClick={() => setCount((c) => Math.min(20, c + 1))}
            className="w-8 h-8 rounded flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "var(--color-muted)",
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-border)",
            }}
            aria-label="Increase dice count"
          >
            +
          </button>
        </div>
      </div>

      {/* Roll button */}
      <button
        onClick={roll}
        disabled={rolling}
        className="w-full py-4 rounded-lg text-lg font-medium transition-all mb-8"
        style={{
          fontFamily: "var(--font-cinzel)",
          backgroundColor: rolling ? "var(--color-muted)" : "var(--color-accent)",
          color: rolling ? "var(--color-text-secondary)" : "var(--color-bg)",
          animation: rolling ? "pulse-glow 0.3s ease" : "none",
        }}
        aria-live="polite"
      >
        {rolling ? "Rolling..." : `Roll ${count}d${selectedDie}`}
      </button>

      {/* Result + history */}
      {history.length > 0 && (
        <div>
          {/* Latest result */}
          <div
            className="mb-4 p-5 rounded-lg text-center"
            style={{
              backgroundColor: "var(--color-muted)",
              border: "1px solid var(--color-accent)",
            }}
          >
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-accent)" }}
            >
              {history[0].total}
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
            >
              {history[0].count}d{history[0].die}: [{history[0].rolls.join(", ")}]
            </p>
          </div>

          {/* Roll history */}
          {history.length > 1 && (
            <div>
              <h3
                className="text-xs uppercase tracking-wider mb-3"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
              >
                Roll History
              </h3>
              <ol className="flex flex-col gap-1 list-none">
                {history.slice(1).map((r) => (
                  <li
                    key={r.timestamp}
                    className="flex items-center justify-between px-3 py-2 rounded text-sm"
                    style={{
                      backgroundColor: "var(--color-muted)",
                      fontFamily: "var(--font-jetbrains)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span>{r.count}d{r.die}: [{r.rolls.join(", ")}]</span>
                    <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>
                      = {r.total}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
