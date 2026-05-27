import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { getFeaturedArticles, getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const featured = getFeaturedArticles(3);
  const recent = getAllArticles().slice(0, 6);

  return (
    <>
      <HeroSection />
      <FeaturedArticles featured={featured} recent={recent} />
      <CategoryGrid />

      {/* Newsletter section */}
      <section
        className="py-20 px-6"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
        aria-labelledby="newsletter-heading"
      >
        <div className="mx-auto text-center" style={{ maxWidth: "600px" }}>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
          >
            Stay Updated
          </p>
          <h2
            id="newsletter-heading"
            className="text-3xl mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            The RPG Dispatch
          </h2>
          <p
            className="mb-8 text-lg"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)" }}
          >
            Weekly loot for adventurers — new guides, exclusive deals, and RPG news
            delivered to your inbox every week.
          </p>
          <NewsletterSignup variant="inline" />
        </div>
      </section>
    </>
  );
}
