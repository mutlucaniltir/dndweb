"use client";

import { useState, useEffect } from "react";
import type { Heading } from "@/lib/headings";

export type { Heading };

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents">
      <h3
        className="text-xs uppercase tracking-widest mb-4"
        style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
      >
        Contents
      </h3>
      <ol className="list-none flex flex-col gap-1">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: level === 3 ? "1rem" : "0" }}>
            <a
              href={`#${id}`}
              className="block py-1 text-sm transition-colors"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: active === id ? "var(--color-accent)" : "var(--color-text-secondary)",
                borderLeft: active === id
                  ? "2px solid var(--color-accent)"
                  : "2px solid transparent",
                paddingLeft: "0.75rem",
                fontSize: "0.8rem",
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
