import type { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/articles";
import { ArticleCard } from "@/components/article/ArticleCard";

export const metadata: Metadata = {
  title: "RPG Reviews — Honest Reviews from the Table",
  description:
    "In-depth RPG reviews covering tabletop systems, video games, sourcebooks, accessories, and more — written by veteran adventurers.",
};

export default function ReviewsPage() {
  const articles = getArticlesByCategory("reviews");

  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "1280px" }}>
      <header className="mb-12 text-center">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
        >
          Critiques & Ratings
        </p>
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Reviews
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)" }}
        >
          Honest, in-depth reviews from adventurers who&apos;ve actually sat at the table — or
          logged the hours in-game.
        </p>
      </header>

      <hr className="gold-divider" />

      {articles.length === 0 ? (
        <p
          className="text-center py-20"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
        >
          Reviews coming soon. Check back after our next dungeon crawl.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.frontmatter.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
