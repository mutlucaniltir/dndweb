import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — RPG Guides, Reviews & News",
  description:
    "Browse all RPGOnly articles covering tabletop RPGs, video game RPGs, in-depth reviews, beginner guides, and more.",
};

const CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "tabletop", label: "Tabletop" },
  { slug: "video-games", label: "Video Games" },
  { slug: "reviews", label: "Reviews" },
  { slug: "guides", label: "Guides" },
];

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "1280px" }}>
      <header className="mb-12 text-center">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
        >
          The Compendium
        </p>
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          All Articles
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)" }}
        >
          Guides, reviews, and deep dives for every type of RPG adventurer.
        </p>
      </header>

      {/* Category filter */}
      <nav className="flex flex-wrap gap-2 justify-center mb-10" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === "all" ? "/blog" : `/category/${cat.slug}`}
            className="px-4 py-1.5 rounded-full text-sm transition-all nav-link"
            style={{
              fontFamily: "var(--font-jetbrains)",
              backgroundColor: "var(--color-muted)",
              border: "1px solid var(--color-border)",
            }}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <hr className="gold-divider" />

      {articles.length === 0 ? (
        <p
          className="text-center py-20"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
        >
          No articles yet. Check back soon!
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
