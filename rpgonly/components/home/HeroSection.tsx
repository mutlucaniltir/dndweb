"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TAGLINES = [
  "YOUR WORLD. YOUR QUEST.",
  "ROLL FOR INITIATIVE.",
  "THE DUNGEON AWAITS.",
  "CHOOSE YOUR CHARACTER.",
];

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tagline, setTagline] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTagline((i) => (i + 1) % TAGLINES.length), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const stars: Array<{ x: number; y: number; size: number; speed: number; alpha: number }> = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      if (!canvas) return;
      stars.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() < 0.9 ? 1 : 2, // pixel stars
          speed: Math.random() * 0.3 + 0.05,
          alpha: Math.random() * 0.7 + 0.3,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        ctx.fillStyle = `rgba(0, 201, 167, ${s.alpha})`;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
        s.y -= s.speed;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    init();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--color-bg)",
        background: "radial-gradient(ellipse at 50% 30%, rgba(0,201,167,0.04) 0%, rgba(7,7,15,0) 60%), var(--color-bg)",
      }}
      aria-labelledby="hero-heading"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Pixel border frame */}
      <div className="absolute inset-8 pointer-events-none" aria-hidden="true"
        style={{ border: "1px solid rgba(0,201,167,0.1)" }}>
        <div style={{ position: "absolute", top: -1, left: -1, width: 12, height: 12, borderTop: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }} />
        <div style={{ position: "absolute", top: -1, right: -1, width: 12, height: 12, borderTop: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }} />
        <div style={{ position: "absolute", bottom: -1, left: -1, width: 12, height: 12, borderBottom: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }} />
        <div style={{ position: "absolute", bottom: -1, right: -1, width: 12, height: 12, borderBottom: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto px-6 text-center" style={{ maxWidth: "900px" }}>
        {/* Eyebrow label */}
        <div
          className="inline-block mb-6 px-4 py-2"
          style={{
            border: "1px solid var(--color-border)",
            fontFamily: "var(--font-press-start)",
            fontSize: "0.45rem",
            color: "var(--color-accent)",
            letterSpacing: "0.2em",
          }}
        >
          ▸ TABLETOP &amp; VIDEO GAME RPGs ◂
        </div>

        {/* Main headline */}
        <h1
          id="hero-heading"
          className="mb-4"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "clamp(1.1rem, 4vw, 2.2rem)",
            lineHeight: 1.5,
            color: "var(--color-text-primary)",
          }}
        >
          YOUR WORLD.<br />
          <span style={{ color: "var(--color-accent)" }}>YOUR QUEST.</span><br />
          YOUR RULES.
        </h1>

        {/* Rotating tagline */}
        <div
          className="mb-3"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.5rem",
            color: "var(--color-red)",
            letterSpacing: "0.15em",
            minHeight: "1.5em",
          }}
        >
          — {TAGLINES[tagline]}
        </div>

        {/* Sub */}
        <p
          className="mb-10 mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.4rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            maxWidth: "560px",
          }}
        >
          The definitive RPG resource hub. Guides, reviews, tools, and deals for every type of adventurer.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/blog" className="btn-pixel-solid">
            ▶ ENTER THE DUNGEON
          </Link>
          <Link href="/deals" className="btn-pixel">
            ⚔ BROWSE LOOT
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.4rem",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.15em",
            animation: "bounce-pixel 1.5s ease-in-out infinite",
          }}
          aria-hidden="true"
        >
          ▼ SCROLL DOWN ▼
        </div>
      </div>

      {/* Bottom pixel stripe */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "2px",
          background: "repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 4px, transparent 4px, transparent 8px)",
          opacity: 0.3,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
