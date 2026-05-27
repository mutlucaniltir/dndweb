"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Fuse from "fuse.js";
import type { SearchItem } from "@/lib/fuse";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/tools", label: "Tools" },
  { href: "/deals", label: "Deals" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setInterval(() => setCredits((c) => (c + 1) % 100), 3000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); setSearchOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(7,7,15,0.97)" : "rgba(7,7,15,0.85)",
          backdropFilter: "blur(8px)",
          borderBottom: scrolled ? "2px solid var(--color-border)" : "2px solid transparent",
        }}
      >
        {/* Pixel accent top stripe */}
        <div
          className="w-full"
          style={{
            height: "2px",
            background: "repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 4px, transparent 4px, transparent 8px)",
          }}
        />

        <nav
          className="mx-auto flex items-center justify-between px-6 py-3"
          style={{ maxWidth: "1280px" }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none gap-1">
            <span style={{ fontFamily: "var(--font-press-start)", fontSize: "0.75rem" }}>
              <span style={{ color: "var(--color-red)" }}>RPG</span>
              <span style={{ color: "var(--color-text-primary)" }}>ONLY</span>
            </span>
            <span style={{ fontFamily: "var(--font-press-start)", fontSize: "0.32rem", color: "var(--color-text-secondary)", letterSpacing: "0.15em" }}>
              INSERT COIN — CREDITS: {String(credits).padStart(2, "0")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">{link.label}</Link>
              </li>
            ))}
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="p-2 transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
                className="p-2 transition-colors"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-press-start)", fontSize: "0.55rem" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            )}

            <Link href="/newsletter" className="hidden md:flex btn-pixel-solid" style={{ fontSize: "0.5rem", padding: "8px 14px" }}>
              ▶ SUBSCRIBE
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden p-2"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-press-start)", fontSize: "0.65rem" }}
            >
              {menuOpen ? "✕" : "≡"}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden py-4 px-6 border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "rgba(7,7,15,0.99)" }}>
            <ul className="flex flex-col gap-5 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)} className="nav-link">▸ {link.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/newsletter" onClick={() => setMenuOpen(false)} className="nav-link" style={{ color: "var(--color-accent)" }}>
                  ▸ SUBSCRIBE FREE
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

/* ─── Search Modal ────────────────────────────────────────────────────── */
function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    fetch("/api/search-index")
      .then((r) => r.json())
      .then((d: SearchItem[]) => setAllItems(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setActiveIdx(0); return; }
    const fuse = new Fuse(allItems, { keys: ["title", "excerpt", "tags"], threshold: 0.35 });
    setResults(fuse.search(query).map((r) => r.item).slice(0, 8));
    setActiveIdx(0);
  }, [query, allItems]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && results[activeIdx]) { window.location.href = `/blog/${results[activeIdx].slug}`; }
    else if (e.key === "Escape") { onClose(); }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full pixel-card" style={{ maxWidth: "600px" }}>
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--color-border)" }}>
          <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-press-start)", fontSize: "0.55rem" }}>▸</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="SEARCH THE COMPENDIUM..."
            className="flex-1 bg-transparent outline-none"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)", fontSize: "1.2rem" }}
            aria-label="Search articles"
          />
          <button onClick={onClose} style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-press-start)", fontSize: "0.45rem" }}>
            [ESC]
          </button>
        </div>

        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto list-none">
            {results.map((item, i) => (
              <li key={item.slug}>
                <a
                  href={`/blog/${item.slug}`}
                  className="flex flex-col px-4 py-3 transition-colors"
                  style={{
                    backgroundColor: i === activeIdx ? "var(--color-surface-2)" : "transparent",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  onClick={onClose}
                >
                  <span style={{ fontFamily: "var(--font-press-start)", fontSize: "0.5rem", color: i === activeIdx ? "var(--color-accent)" : "var(--color-text-primary)" }}>
                    {item.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                    {item.category.toUpperCase()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {query && results.length === 0 && (
          <p className="px-4 py-8 text-center" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-press-start)", fontSize: "0.5rem" }}>
            NO RESULTS FOR &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
