import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByTag, getAllTags } from "@/lib/articles";
import { ArticleCard } from "@/components/article/ArticleCard";

export const revalidate = 3600;

type Params = Promise<{ tag: string }>;

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} — RPGOnly`,
    description: `Browse all RPGOnly articles tagged with "${tag}".`,
  };
}

export default async function TagPage({ params }: { params: Params }) {
  const { tag } = await params;
  const articles = getArticlesByTag(tag);
  if (articles.length === 0) notFound();

  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "1280px" }}>
      <header className="mb-12 text-center">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)" }}
        >
          Tag
        </p>
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          #{tag}
        </h1>
        <p
          className="text-sm"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
        >
          {articles.length} article{articles.length !== 1 ? "s" : ""}
        </p>
      </header>

      <hr className="gold-divider" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.frontmatter.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
