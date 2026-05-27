import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getCategoryLabel } from "@/lib/utils";

export const revalidate = 3600;

type Params = Promise<{ category: string }>;

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabel(category);
  return {
    title: `${label} — RPG Articles & Guides`,
    description: `Browse all ${label} articles on RPGOnly — guides, reviews, and resources for RPG fans.`,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const articles = getArticlesByCategory(category);
  if (articles.length === 0 && !getAllCategories().includes(category)) notFound();

  const label = getCategoryLabel(category);

  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "1280px" }}>
      <header className="mb-12 text-center">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
        >
          Category
        </p>
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {label}
        </h1>
        <p
          className="text-sm"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
        >
          {articles.length} article{articles.length !== 1 ? "s" : ""}
        </p>
      </header>

      <hr className="gold-divider" />

      {articles.length === 0 ? (
        <p
          className="text-center py-20"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
        >
          No articles in this category yet.
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
