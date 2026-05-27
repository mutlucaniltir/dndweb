"use client";

import { useState } from "react";

type Race = "Human" | "Elf" | "Half-Elf" | "Dwarf" | "Orc" | "Tiefling" | "Gnome" | "Dragonborn";
type Gender = "Masculine" | "Feminine" | "Neutral";
type Tone = "Heroic" | "Dark" | "Whimsical" | "Ancient";

interface GeneratedName {
  name: string;
  lore: string;
}

const RACES: Race[] = ["Human", "Elf", "Half-Elf", "Dwarf", "Orc", "Tiefling", "Gnome", "Dragonborn"];
const GENDERS: Gender[] = ["Masculine", "Feminine", "Neutral"];
const TONES: Tone[] = ["Heroic", "Dark", "Whimsical", "Ancient"];

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-xs uppercase tracking-wider"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="px-3 py-2.5 rounded text-sm outline-none appearance-none cursor-pointer"
        style={{
          backgroundColor: "var(--color-muted)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-jetbrains)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function NameCard({ name, lore }: GeneratedName) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div
      className="p-4 rounded-lg flex flex-col gap-2"
      style={{
        backgroundColor: "var(--color-muted)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-lg font-medium"
          style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-accent)" }}
        >
          {name}
        </span>
        <button
          onClick={copy}
          className="px-2.5 py-1 rounded text-xs transition-all"
          style={{
            fontFamily: "var(--font-jetbrains)",
            backgroundColor: copied ? "var(--color-accent)" : "var(--color-surface)",
            color: copied ? "var(--color-bg)" : "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
          }}
          aria-label={`Copy name ${name}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p
        className="text-sm italic"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)", lineHeight: 1.6 }}
      >
        {lore}
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <div
      className="p-4 rounded-lg animate-pulse"
      style={{ backgroundColor: "var(--color-muted)", height: "80px" }}
    />
  );
}

export function NameGenerator() {
  const [race, setRace] = useState<Race>("Elf");
  const [gender, setGender] = useState<Gender>("Neutral");
  const [tone, setTone] = useState<Tone>("Heroic");
  const [names, setNames] = useState<GeneratedName[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ race, gender, tone }),
      });
      const data = (await res.json()) as { names?: GeneratedName[]; error?: string };
      if (!res.ok || data.error) {
        setError(data.error ?? "Failed to generate names.");
      } else if (data.names) {
        setNames(data.names);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
        className="text-2xl mb-2"
        style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-accent)" }}
      >
        Character Name Generator
      </h2>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
      >
        AI-powered names with lore snippets — powered by Claude
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Select label="Race" value={race} options={RACES} onChange={setRace} />
        <Select label="Gender" value={gender} options={GENDERS} onChange={setGender} />
        <Select label="Tone" value={tone} options={TONES} onChange={setTone} />
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="w-full py-4 rounded-lg text-base font-medium transition-all mb-6"
        style={{
          fontFamily: "var(--font-cinzel)",
          backgroundColor: loading ? "var(--color-muted)" : "var(--color-accent)",
          color: loading ? "var(--color-text-secondary)" : "var(--color-bg)",
        }}
      >
        {loading ? "Consulting the ancient scrolls..." : "Generate Names"}
      </button>

      {error && (
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--color-red)", fontFamily: "var(--font-jetbrains)" }}
        >
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)}
        </div>
      ) : names.length > 0 ? (
        <div className="flex flex-col gap-3">
          {names.map((n) => (
            <NameCard key={n.name} {...n} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
