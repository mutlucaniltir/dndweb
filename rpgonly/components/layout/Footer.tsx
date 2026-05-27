import Link from "next/link";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

const NAV_COL = [
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/tools", label: "Tools" },
  { href: "/deals", label: "Deals" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const CATEGORY_COL = [
  { href: "/category/tabletop", label: "Tabletop RPGs" },
  { href: "/category/video-games", label: "Video Game RPGs" },
  { href: "/category/reviews", label: "Reviews" },
  { href: "/category/guides", label: "Guides & Tips" },
  { href: "/category/tools", label: "Tools & Resources" },
];

const LEGAL_COL = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "2px solid var(--color-border)",
      }}
    >
      {/* Top pixel stripe */}
      <div
        style={{
          height: "2px",
          background: "repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 4px, transparent 4px, transparent 8px)",
          opacity: 0.4,
        }}
      />

      {/* Newsletter strip */}
      <div
        className="px-6 py-10"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <NewsletterSignup variant="inline" />
        </div>
      </div>

      {/* Pixel divider */}
      <div
        style={{
          height: "1px",
          background: "repeating-linear-gradient(90deg, var(--color-border) 0px, var(--color-border) 4px, transparent 4px, transparent 8px)",
        }}
      />

      {/* Main columns */}
      <div
        className="mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10"
        style={{ maxWidth: "1280px" }}
      >
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex flex-col leading-none gap-1 mb-5">
            <span style={{ fontFamily: "var(--font-press-start)", fontSize: "0.75rem" }}>
              <span style={{ color: "var(--color-red)" }}>RPG</span>
              <span style={{ color: "var(--color-text-primary)" }}>ONLY</span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-press-start)",
                fontSize: "0.32rem",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.12em",
              }}
            >
              © {new Date().getFullYear()} — GAME OVER? NEVER.
            </span>
          </Link>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "260px",
            }}
          >
            The definitive RPG resource hub for tabletop adventurers and digital dungeon crawlers.
          </p>
          {/* Social pixel icons placeholder */}
          <div className="flex gap-3 mt-5">
            {["▶ TWITTER", "▶ DISCORD"].map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "var(--font-press-start)",
                  fontSize: "0.3rem",
                  color: "var(--color-text-secondary)",
                  padding: "4px 8px",
                  border: "1px solid var(--color-border)",
                  letterSpacing: "0.1em",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3
            className="mb-5"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.42rem",
              color: "var(--color-accent)",
              letterSpacing: "0.15em",
            }}
          >
            ▸ NAVIGATION
          </h3>
          <ul className="flex flex-col gap-3 list-none">
            {NAV_COL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-link"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories + Legal */}
        <div>
          <h3
            className="mb-5"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.42rem",
              color: "var(--color-accent)",
              letterSpacing: "0.15em",
            }}
          >
            ▸ CATEGORIES
          </h3>
          <ul className="flex flex-col gap-3 mb-8 list-none">
            {CATEGORY_COL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-link"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3
            className="mb-5"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.42rem",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.15em",
            }}
          >
            ▸ LEGAL
          </h3>
          <ul className="flex flex-col gap-3 list-none">
            {LEGAL_COL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-link"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "repeating-linear-gradient(90deg, var(--color-border) 0px, var(--color-border) 2px, transparent 2px, transparent 6px)",
          backgroundSize: "8px 1px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top",
        }}
      >
        <div
          className="mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ maxWidth: "1280px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.3rem",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.1em",
            }}
          >
            AFFILIATE LINKS SUPPORT THIS SITE —{" "}
            <Link
              href="/affiliate-disclosure"
              style={{ color: "var(--color-accent)", textDecoration: "underline" }}
            >
              DISCLOSURE
            </Link>
          </p>
          <p
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.3rem",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.1em",
            }}
          >
            INSERT COIN TO CONTINUE ▸
          </p>
        </div>
      </div>
    </footer>
  );
}
