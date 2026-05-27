import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact RPGOnly",
  description: "Get in touch with the RPGOnly team — questions, tips, and partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "640px" }}>
      <header className="mb-10 text-center">
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Contact
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)" }}>
          Questions, tips, or partnership inquiries — we&apos;d love to hear from you.
        </p>
      </header>

      <hr className="gold-divider" />

      <p
        className="mt-8 text-center"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)", fontSize: "1.1rem" }}
      >
        Reach us at{" "}
        <a
          href="mailto:hello@rpgonly.com"
          className="hover-gold-text transition-colors"
          style={{ color: "var(--color-accent)", textDecoration: "underline" }}
        >
          hello@rpgonly.com
        </a>
      </p>

      <p
        className="mt-4 text-center text-sm"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
      >
        We typically respond within 2–3 business days.
      </p>
    </div>
  );
}
