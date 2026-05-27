import Link from "next/link";
import { ArticleCard } from "@/components/article/ArticleCard";
import type { ArticleMeta } from "@/lib/articles";

interface FeaturedArticlesProps {
  featured: ArticleMeta[];
  recent: ArticleMeta[];
}

export function FeaturedArticles({ featured, recent }: FeaturedArticlesProps) {
  const hero = featured[0] ?? recent[0];
  const secondary = [...(featured.slice(1)), ...recent]
    .filter((a) => a.frontmatter.slug !== hero?.frontmatter.slug)
    .slice(0, 4);

  return (
    <section
      className="mx-auto px-6 py-20"
      style={{ maxWidth: "1280px" }}
      aria-labelledby="featured-heading"
    >
      {/* Section header */}
      <div className="flex items-center gap-6 mb-10">
        <div>
          <div
            className="mb-1"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.38rem",
              color: "var(--color-accent)",
              letterSpacing: "0.2em",
            }}
          >
            ▸ FRESH LOOT ◂
          </div>
          <h2
            id="featured-heading"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "clamp(0.6rem, 1.8vw, 0.9rem)",
              color: "var(--color-text-primary)",
              lineHeight: 1.6,
            }}
          >
            LATEST &amp; FEATURED
          </h2>
        </div>

        <div
          className="flex-1"
          style={{
            height: "1px",
            background: "repeating-linear-gradient(90deg, var(--color-border) 0px, var(--color-border) 4px, transparent 4px, transparent 8px)",
          }}
        />

        <Link
          href="/blog"
          className="btn-pixel"
          style={{ fontSize: "0.38rem", padding: "6px 12px" }}
        >
          VIEW ALL ▸
        </Link>
      </div>

      {hero && (
        <div className="mb-8">
          <ArticleCard article={hero} variant="featured" />
        </div>
      )}

      {secondary.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondary.map((article) => (
            <ArticleCard key={article.frontmatter.slug} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
