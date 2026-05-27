import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article/ArticleCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — RPG Guides, Reviews & News",
  description:
    "Browse all RPGOnly articles covering tabletop RPGs, video game RPGs, in-depth reviews, beginner guides, and more.",
};

const CATEGORIES = [
  { slug: "all", label: "ALL" },
  { slug: "tabletop", label: "TABLETOP" },
  { slug: "video-games", label: "VIDEO GAMES" },
  { slug: "reviews", label: "REVIEWS" },
  { slug: "guides", label: "GUIDES" },
];

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "1280px" }}>
      <header className="mb-12 text-center">
        <div
          className="inline-block mb-4 px-3 py-1"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.38rem",
            color: "var(--color-accent)",
            border: "1px solid var(--color-border)",
            letterSpacing: "0.2em",
          }}
        >
          ▸ THE COMPENDIUM ◂
        </div>
        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "clamp(0.8rem, 3vw, 1.2rem)",
            color: "var(--color-text-primary)",
            lineHeight: 1.6,
          }}
        >
          ALL ARTICLES
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}
        >
          Guides, reviews, and deep dives for every type of RPG adventurer.
        </p>
      </header>

      {/* Category filter */}
      <nav className="flex flex-wrap gap-3 justify-center mb-10" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === "all" ? "/blog" : `/category/${cat.slug}`}
            className="btn-pixel"
            style={{ fontSize: "0.38rem", padding: "6px 14px" }}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      {/* Pixel divider */}
      <div
        className="mb-10"
        style={{
          height: "1px",
          background: "repeating-linear-gradient(90deg, var(--color-border) 0px, var(--color-border) 4px, transparent 4px, transparent 8px)",
        }}
      />

      {articles.length === 0 ? (
        <p
          className="text-center py-20"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-press-start)",
            fontSize: "0.5rem",
            letterSpacing: "0.1em",
          }}
        >
          NO ARTICLES YET. CHECK BACK SOON.
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
