"use client";

import { useState, useEffect } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const article = document.querySelector("article");
      if (!article) return;
      const { top, height } = article.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrolled = Math.max(0, -top);
      const total = height - viewportH;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[9998] h-0.5 transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(to right, var(--color-accent), var(--color-accent-hover))",
      }}
      aria-hidden="true"
    />
  );
}
