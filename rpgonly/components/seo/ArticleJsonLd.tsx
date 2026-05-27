import type { ArticleFrontmatter } from "@/lib/articles";

interface ArticleJsonLdProps {
  frontmatter: ArticleFrontmatter;
  url: string;
}

export function ArticleJsonLd({ frontmatter, url }: ArticleJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rpgonly.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.seoDescription,
    image: `${siteUrl}${frontmatter.featuredImage}`,
    author: { "@type": "Person", name: frontmatter.author },
    publisher: {
      "@type": "Organization",
      name: "RPGOnly",
      url: siteUrl,
    },
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    url,
    keywords: frontmatter.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
