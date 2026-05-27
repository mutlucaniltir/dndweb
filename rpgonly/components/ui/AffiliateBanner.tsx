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
      className="relative z-50 w-full py-2 px-4 text-center text-sm"
      style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        color: "var(--color-text-secondary)",
        fontFamily: "var(--font-jetbrains)",
      }}
    >
      <span>{DISCLOSURE_TEXT}</span>
      <button
        onClick={dismiss}
        aria-label="Dismiss affiliate disclosure banner"
        className="ml-3 text-xs underline hover:text-[var(--color-accent)] transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
}
