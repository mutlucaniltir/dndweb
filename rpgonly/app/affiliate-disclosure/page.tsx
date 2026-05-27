import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — RPGOnly",
  description:
    "RPGOnly's full affiliate disclosure policy, explaining how we use affiliate links and earn commissions.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "800px" }}>
      <header className="mb-10">
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Affiliate Disclosure
        </h1>
        <p
          className="text-sm"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
        >
          Last updated: January 1, 2025
        </p>
        <hr className="gold-divider" />
      </header>

      <div className="prose-rpg">
        <p>
          RPGOnly (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) participates in affiliate marketing programs. This page
          discloses our affiliate relationships in compliance with the Federal Trade Commission&apos;s
          (FTC) guidelines on endorsements and testimonials.
        </p>

        <h2>What Are Affiliate Links?</h2>
        <p>
          Some of the links on RPGOnly.com are &quot;affiliate links.&quot; This means that if you click on
          the link and purchase the item, we may receive a commission. The price you pay is the same
          whether or not you use our affiliate link. Your purchase through an affiliate link directly
          supports RPGOnly and helps us continue creating free content.
        </p>

        <h2>Affiliate Programs We Participate In</h2>
        <ul>
          <li>
            <strong>Amazon Associates Program</strong> — We are a participant in the Amazon Services
            LLC Associates Program, an affiliate advertising program designed to provide a means for
            sites to earn advertising fees by advertising and linking to Amazon.com.
          </li>
          <li>
            <strong>DriveThruRPG Affiliate Program</strong> — We may earn commissions on purchases
            made through DriveThruRPG, the leading marketplace for tabletop RPG PDFs and digital
            content.
          </li>
          <li>
            <strong>Humble Bundle Partner Program</strong> — We may earn commissions on purchases
            made through Humble Bundle.
          </li>
        </ul>

        <h2>Our Editorial Independence</h2>
        <p>
          Our participation in affiliate programs does NOT influence our editorial content. We only
          recommend products we genuinely believe are worth your money. Affiliate relationships are
          never a factor in our reviews or recommendations. If we think a product is bad, we say so.
        </p>

        <h2>How to Identify Affiliate Links</h2>
        <p>
          Affiliate links on RPGOnly are typically marked with an asterisk (*) or appear within
          product cards labeled &quot;Affiliate Link.&quot; The sitewide disclosure banner also identifies
          when you&apos;re on a page that contains affiliate content.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about our affiliate relationships,{" "}
          <a href="/contact">contact us</a>.
        </p>
      </div>
    </div>
  );
}
