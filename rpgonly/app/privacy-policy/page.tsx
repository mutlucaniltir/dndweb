import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — RPGOnly",
  description: "RPGOnly's privacy policy explaining how we collect and use your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "800px" }}>
      <header className="mb-10">
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Privacy Policy
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
          RPGOnly (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and safeguard information when you visit RPGOnly.com.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Email addresses</strong> — if you subscribe to our newsletter, we store your
            email to send you the newsletter.
          </li>
          <li>
            <strong>Usage data</strong> — we use Vercel Analytics, which collects anonymized
            pageview data. No personal identifiers are stored.
          </li>
          <li>
            <strong>Cookies</strong> — we use local storage to remember your theme preference and
            affiliate banner dismissal. No tracking cookies are set by us directly.
          </li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>
          We use the following third-party services, which have their own privacy policies:
        </p>
        <ul>
          <li>Vercel (hosting and analytics)</li>
          <li>Amazon Associates (affiliate program)</li>
          <li>DriveThruRPG (affiliate program)</li>
          <li>Humble Bundle (affiliate program)</li>
          <li>Google Fonts (loaded via next/font — no external requests at runtime)</li>
        </ul>

        <h2>Newsletter</h2>
        <p>
          If you subscribe to our newsletter, we store your email address to send you the RPG
          Dispatch. You can unsubscribe at any time using the link in any newsletter email. We do
          not sell or share your email address with third parties.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to request deletion of your personal data. To do so,{" "}
          <a href="/contact">contact us</a> with your request.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related inquiries, use our <a href="/contact">contact form</a>.
        </p>
      </div>
    </div>
  );
}
