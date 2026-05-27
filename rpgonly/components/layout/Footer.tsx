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
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {/* Newsletter strip */}
      <div className="border-b px-6 py-8" style={{ borderColor: "var(--color-border)" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <NewsletterSignup variant="inline" />
        </div>
      </div>

      <hr className="gold-divider" style={{ margin: "0" }} />

      {/* Main columns */}
      <div
        className="mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10"
        style={{ maxWidth: "1280px" }}
      >
        {/* Brand */}
        <div className="md:col-span-1">
          <Link
            href="/"
            className="text-2xl tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span style={{ color: "var(--color-text-primary)" }}>RPG</span>
            <span style={{ color: "var(--color-accent)" }}> ONLY</span>
          </Link>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          >
            Your world. Your quest. Your rules.
          </p>
          <p
            className="text-xs mt-3"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          >
            The definitive RPG resource hub for tabletop adventurers and digital dungeon crawlers.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
          >
            Navigation
          </h3>
          <ul className="flex flex-col gap-2 list-none">
            {NAV_COL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm nav-link transition-colors"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
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
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
          >
            Categories
          </h3>
          <ul className="flex flex-col gap-2 mb-8 list-none">
            {CATEGORY_COL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm nav-link transition-colors"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
          >
            Legal
          </h3>
          <ul className="flex flex-col gap-2 list-none">
            {LEGAL_COL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm nav-link transition-colors"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-6 py-5" style={{ borderColor: "var(--color-border)" }}>
        <div
          className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ maxWidth: "1280px" }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
          >
            © {new Date().getFullYear()} RPGOnly.com — All affiliate links support the site.{" "}
            <Link
              href="/affiliate-disclosure"
              className="underline hover-gold-text transition-colors"
            >
              Disclosure
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
