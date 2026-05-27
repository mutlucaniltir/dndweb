import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { ArticleFrontmatter } from "@/lib/articles";

interface ArticleHeaderProps {
  frontmatter: ArticleFrontmatter;
  readingTime: string;
}

export function ArticleHeader({ frontmatter, readingTime }: ArticleHeaderProps) {
  return (
    <header>
      {/* Hero image */}
      <div className="relative w-full overflow-hidden" style={{ height: "480px" }}>
        <Image
          src={frontmatter.featuredImage}
          alt={frontmatter.featuredImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,15,0.3) 0%, rgba(13,13,15,0) 40%, rgba(13,13,15,0.95) 100%)",
          }}
        />
      </div>

      <div className="mx-auto px-6" style={{ maxWidth: "1200px" }}>
        <div style={{ maxWidth: "720px" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-4 mt-8">
            <Link
              href="/blog"
              className="text-xs uppercase tracking-wider nav-link transition-colors"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Blog
            </Link>
            <span style={{ color: "var(--color-border)" }}>/</span>
            <Badge label={frontmatter.category} isCategory />
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl mb-5"
            style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.15 }}
          >
            {frontmatter.title}
          </h1>

          <p
            className="text-lg mb-6"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-crimson)",
              lineHeight: 1.6,
            }}
          >
            {frontmatter.seoDescription}
          </p>

          <div
            className="flex flex-wrap items-center gap-4 pb-6"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.8rem",
              color: "var(--color-text-secondary)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span>By {frontmatter.author}</span>
            <span>·</span>
            <span>{formatDate(frontmatter.publishedAt)}</span>
            {frontmatter.updatedAt !== frontmatter.publishedAt && (
              <>
                <span>·</span>
                <span>Updated {formatDate(frontmatter.updatedAt)}</span>
              </>
            )}
            <span>·</span>
            <span>{readingTime}</span>
          </div>

          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {frontmatter.tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                  <Badge label={tag} />
                </Link>
              ))}
            </div>
          )}

          {frontmatter.affiliateDisclosure && (
            <div
              className="mt-6 px-4 py-3 rounded text-sm"
              style={{
                backgroundColor: "var(--color-muted)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-jetbrains)",
              }}
            >
              ✦{" "}
              <strong style={{ color: "var(--color-accent)" }}>Affiliate Disclosure:</strong>{" "}
              Some links in this article are affiliate links. We may earn a commission at no extra
              cost to you.{" "}
              <Link
                href="/affiliate-disclosure"
                className="underline hover-gold-text transition-colors"
              >
                Learn more
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
