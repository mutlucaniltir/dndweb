import { ArticleCard } from "@/components/article/ArticleCard";
import type { ArticleMeta } from "@/lib/articles";

interface FeaturedArticlesProps {
  featured: ArticleMeta[];
  recent: ArticleMeta[];
}

export function FeaturedArticles({ featured, recent }: FeaturedArticlesProps) {
  const hero = featured[0] ?? recent[0];
  const secondary = [...(featured.slice(1)), ...recent].filter(
    (a) => a.frontmatter.slug !== hero?.frontmatter.slug
  ).slice(0, 4);

  return (
    <section
      className="mx-auto px-6 py-20"
      style={{ maxWidth: "1280px" }}
      aria-labelledby="featured-heading"
    >
      <div className="flex items-center gap-4 mb-10">
        <h2
          id="featured-heading"
          className="text-2xl"
          style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text-primary)" }}
        >
          Latest &amp; Featured
        </h2>
        <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
        <a
          href="/blog"
          className="text-sm transition-colors hover:text-[var(--color-accent)]"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
        >
          View all →
        </a>
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
