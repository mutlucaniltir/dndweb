"use client";

import { useState, useEffect } from "react";
import { DISCLOSURE_TEXT } from "@/lib/affiliate";

export function AffiliateBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("affiliate-banner-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem("affiliate-banner-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="banner"
      className="relative z-50 w-full py-1.5 px-4 text-center"
      style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-press-start)",
          fontSize: "0.32rem",
          color: "var(--color-text-secondary)",
          letterSpacing: "0.08em",
        }}
      >
        ▸ {DISCLOSURE_TEXT}
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss affiliate disclosure banner"
        className="ml-4"
        style={{
          fontFamily: "var(--font-press-start)",
          fontSize: "0.32rem",
          color: "var(--color-accent)",
          letterSpacing: "0.08em",
        }}
      >
        [DISMISS]
      </button>
    </div>
  );
}
