"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

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

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? "rgba(13, 13, 15, 0.85)"
            : "rgba(13, 13, 15, 0.6)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
        }}
      >
        <nav
          className="mx-auto flex items-center justify-between px-6 py-4"
          style={{ maxWidth: "1280px" }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-xl tracking-widest uppercase"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span style={{ color: "var(--color-text-primary)" }}>RPG</span>
            <span style={{ color: "var(--color-accent)" }}> ONLY</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-widest transition-colors hover:text-[var(--color-accent)]"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="p-2 rounded transition-colors hover:text-[var(--color-accent)]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={
                  theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
                }
                className="p-2 rounded transition-colors hover:text-[var(--color-accent)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            {/* Newsletter CTA */}
            <Link
              href="/newsletter"
              className="hidden md:flex items-center px-4 py-2 rounded text-sm uppercase tracking-wider transition-all"
              style={{
                fontFamily: "var(--font-cinzel)",
                border: "1px solid var(--color-accent)",
                color: "var(--color-accent)",
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "var(--color-accent)";
                el.style.color = "var(--color-bg)";
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "transparent";
                el.style.color = "var(--color-accent)";
              }}
            >
              Newsletter
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
              className="md:hidden p-2 rounded"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden py-4 px-6 border-t"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "rgba(13, 13, 15, 0.97)",
            }}
          >
            <ul className="flex flex-col gap-4 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm uppercase tracking-widest transition-colors hover:text-[var(--color-accent)]"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/newsletter"
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm"
                  style={{ color: "var(--color-accent)", fontFamily: "var(--font-cinzel)" }}
                >
                  Newsletter →
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Search modal rendered at layout level */}
      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}

/* ─── Inline Search Modal ─────────────────────────────────────────────── */
import { useEffect as useEff, useRef, useState as useSt } from "react";
import type { SearchItem } from "@/lib/fuse";

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, usQ] = useSt("");
  const [results, setResults] = useSt<SearchItem[]>([]);
  const [allItems, setAllItems] = useSt<SearchItem[]>([]);
  const [activeIdx, setActiveIdx] = useSt(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEff(() => {
    inputRef.current?.focus();
    fetch("/api/search-index")
      .then((r) => r.json())
      .then((d: SearchItem[]) => setAllItems(d))
      .catch(() => {});
  }, []);

  useEff(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIdx(0);
      return;
    }
    import("fuse.js").then(({ default: Fuse }) => {
      const fuse = new Fuse(allItems, {
        keys: ["title", "excerpt", "tags", "category"],
        threshold: 0.35,
      });
      setResults(fuse.search(query).map((r) => r.item).slice(0, 8));
      setActiveIdx(0);
    });
  }, [query, allItems]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIdx]) {
      window.location.href = `/blog/${results[activeIdx].slug}`;
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full rounded-lg overflow-hidden"
        style={{
          maxWidth: "640px",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => usQ(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search articles, guides, reviews..."
            className="flex-1 bg-transparent outline-none text-base"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-crimson)",
            }}
            aria-label="Search articles"
          />
          <kbd
            className="px-2 py-0.5 rounded text-xs"
            style={{
              backgroundColor: "var(--color-muted)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <ul className="max-h-96 overflow-y-auto list-none" role="listbox">
            {results.map((item, i) => (
              <li key={item.slug} role="option" aria-selected={i === activeIdx}>
                <a
                  href={`/blog/${item.slug}`}
                  className="flex flex-col px-5 py-3 transition-colors"
                  style={{
                    backgroundColor:
                      i === activeIdx ? "var(--color-muted)" : "transparent",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  onClick={onClose}
                >
                  <span
                    className="font-medium text-sm"
                    style={{
                      fontFamily: "var(--font-cinzel)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="text-xs mt-0.5"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {item.category}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <p
            className="px-5 py-8 text-center text-sm"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          >
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
