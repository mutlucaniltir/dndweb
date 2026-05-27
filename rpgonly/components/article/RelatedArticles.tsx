import { ArticleCard } from "./ArticleCard";
import type { ArticleMeta } from "@/lib/articles";

interface RelatedArticlesProps {
  articles: ArticleMeta[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12" style={{ borderTop: "1px solid var(--color-border)" }}>
      <h2
        className="text-2xl mb-8"
        style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-accent)" }}
      >
        Related Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.frontmatter.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
