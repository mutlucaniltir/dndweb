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
          background: "radial-gradient(ellipse at center, rgba(0,201,167,0.04) 0%, transparent 70%)",
          borderTop: "1px solid var(--color-border)",
        }}
        aria-labelledby="newsletter-heading"
      >
        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          <NewsletterSignup variant="page" />
        </div>
      </section>
    </>
  );
}
