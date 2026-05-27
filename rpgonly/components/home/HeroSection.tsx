"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Array<{
      x: number; y: number; r: number;
      vx: number; vy: number; alpha: number; phase: number;
    }> = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      if (!canvas) return;
      particles.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -Math.random() * 0.2 - 0.05,
          alpha: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(t: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.01;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));

        if (p.y < -p.r) p.y = canvas.height + p.r;
        if (p.x < -p.r) p.x = canvas.width + p.r;
        if (p.x > canvas.width + p.r) p.x = -p.r;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    init();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100svh",
        background:
          "radial-gradient(ellipse at center top, rgba(201,168,76,0.06) 0%, rgba(13,13,15,0) 60%), radial-gradient(ellipse at bottom, rgba(185,64,64,0.04) 0%, transparent 50%), var(--color-bg)",
      }}
      aria-labelledby="hero-heading"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative border */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--color-accent), transparent)", opacity: 0.4 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto px-6 text-center"
        style={{ maxWidth: "900px" }}
      >
        {/* Eyebrow */}
        <p
          className="mb-6 text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
        >
          Tabletop &amp; Video Game RPGs
        </p>

        {/* Main headline */}
        <h1
          id="hero-heading"
          className="mb-6 text-4xl md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "var(--font-cinzel)",
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
          }}
        >
          Your World.
          <br />
          <span style={{ color: "var(--color-accent)" }}>Your Quest.</span>
          <br />
          Your Rules.
        </h1>

        {/* Sub-headline */}
        <p
          className="mb-10 text-lg md:text-xl max-w-xl mx-auto"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-crimson)",
            lineHeight: 1.7,
          }}
        >
          The definitive resource hub for tabletop adventurers and digital dungeon
          crawlers. Reviews, guides, tools, and deals — all in one grimoire.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/blog"
            className="px-8 py-4 rounded text-base font-medium transition-all"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
              fontFamily: "var(--font-cinzel)",
              letterSpacing: "0.05em",
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "var(--color-accent-hover)")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "var(--color-accent)")
            }
          >
            Explore Articles
          </Link>
          <Link
            href="/deals"
            className="px-8 py-4 rounded text-base font-medium transition-all"
            style={{
              border: "1px solid var(--color-accent)",
              color: "var(--color-accent)",
              fontFamily: "var(--font-cinzel)",
              letterSpacing: "0.05em",
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = "rgba(201,168,76,0.1)";
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = "transparent";
            }}
          >
            Browse Deals
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="flex justify-center"
          style={{ animation: "bounce-slow 2s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            opacity="0.6"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </div>
    </section>
  );
}
