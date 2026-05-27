import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RPGOnly — The RPG Resource Hub",
  description:
    "RPGOnly is built by RPG fans for RPG fans. We cover tabletop and video game RPGs with honest guides, reviews, and curated deals.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "800px" }}>
      <header className="mb-12 text-center">
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          About RPGOnly
        </h1>
        <hr className="gold-divider" />
      </header>

      <div className="prose-rpg">
        <p>
          RPGOnly was built by a group of RPG fans who got tired of scattered information, shallow
          reviews, and listicles written by people who had never rolled a d20 in their life.
        </p>

        <p>
          We cover both ends of the RPG spectrum — the physical world of polyhedral dice, rulebooks,
          and Saturday night sessions, and the digital realm of CRPGs, action RPGs, and everything
          in between.
        </p>

        <h2>Our Mission</h2>
        <p>
          To be the most useful RPG resource on the internet. Every guide we write is designed to
          actually help you play better, buy smarter, and enjoy RPGs more. No fluff, no keyword
          stuffing — just honest, well-researched content.
        </p>

        <h2>How We Make Money</h2>
        <p>
          RPGOnly participates in affiliate programs including Amazon Associates and DriveThruRPG.
          When you click a link to buy something we&apos;ve recommended, we may earn a small commission
          at no extra cost to you. This is what keeps the lights on and the dice rolling.
        </p>
        <p>
          We only recommend products we actually think are worth buying. Our opinions are never
          influenced by affiliate relationships.{" "}
          <a href="/affiliate-disclosure">Read our full affiliate disclosure.</a>
        </p>

        <h2>Contact</h2>
        <p>
          Have a question, a product recommendation, or a tip? Reach out via the{" "}
          <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}
