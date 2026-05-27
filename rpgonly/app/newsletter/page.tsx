import type { Metadata } from "next";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

export const metadata: Metadata = {
  title: "The RPG Dispatch — Weekly Newsletter for Adventurers",
  description:
    "Subscribe to The RPG Dispatch — weekly RPG guides, exclusive deals, new releases, and tips delivered to your inbox every week.",
};

export default function NewsletterPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center pt-20 pb-20 px-6"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%), var(--color-bg)",
      }}
    >
      <div className="w-full text-center" style={{ maxWidth: "560px" }}>
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8 text-2xl"
          style={{
            backgroundColor: "rgba(201,168,76,0.1)",
            border: "1px solid var(--color-accent)",
          }}
          aria-hidden="true"
        >
          📜
        </div>

        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
        >
          Stay Informed, Adventurer
        </p>

        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          The RPG Dispatch
        </h1>

        <p
          className="text-lg mb-3"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)", lineHeight: 1.7 }}
        >
          Every week, we send a curated digest of the best RPG content — new
          guides, honest reviews, exclusive deals, and community picks. No filler,
          no spam. Just loot.
        </p>

        <div className="flex flex-col gap-2 mb-8 text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}>
          {["✦ New guides & tutorials", "✦ Best current deals & discounts", "✦ New release radar", "✦ Community spotlight"].map((item) => (
            <p key={item} style={{ color: "var(--color-accent)" }}>{item}</p>
          ))}
        </div>

        <hr className="gold-divider" />

        <div className="mt-8">
          <NewsletterSignup variant="page" />
        </div>

        <p
          className="mt-6 text-xs"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
        >
          No spam. Unsubscribe any time. We never sell your data.
        </p>
      </div>
    </div>
  );
}
