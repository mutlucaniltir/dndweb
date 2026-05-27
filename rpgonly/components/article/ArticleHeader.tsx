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
      {/* Hero image with scanline overlay */}
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
            background: "linear-gradient(to bottom, rgba(7,7,15,0.2) 0%, rgba(7,7,15,0) 40%, rgba(7,7,15,0.97) 100%)",
          }}
        />
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          }}
        />
      </div>

      <div className="mx-auto px-6" style={{ maxWidth: "1200px" }}>
        <div style={{ maxWidth: "720px" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-4 mt-8">
            <Link
              href="/blog"
              className="nav-link"
              style={{ fontFamily: "var(--font-press-start)", fontSize: "0.38rem" }}
            >
              BLOG
            </Link>
            <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-press-start)", fontSize: "0.38rem" }}>▸</span>
            <Badge label={frontmatter.category} isCategory />
          </div>

          <h1
            className="mb-5"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "clamp(0.75rem, 2.5vw, 1.1rem)",
              lineHeight: 2,
              color: "var(--color-text-primary)",
            }}
          >
            {frontmatter.title}
          </h1>

          <p
            className="text-lg mb-6"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.6,
            }}
          >
            {frontmatter.seoDescription}
          </p>

          <div
            className="flex flex-wrap items-center gap-4 pb-6"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.38rem",
              color: "var(--color-text-secondary)",
              borderBottom: "1px solid var(--color-border)",
              letterSpacing: "0.05em",
              lineHeight: 2,
            }}
          >
            <span>BY {frontmatter.author.toUpperCase()}</span>
            <span style={{ color: "var(--color-accent)" }}>▸</span>
            <span>{formatDate(frontmatter.publishedAt).toUpperCase()}</span>
            {frontmatter.updatedAt !== frontmatter.publishedAt && (
              <>
                <span style={{ color: "var(--color-accent)" }}>▸</span>
                <span>UPDATED {formatDate(frontmatter.updatedAt).toUpperCase()}</span>
              </>
            )}
            <span style={{ color: "var(--color-accent)" }}>▸</span>
            <span>{readingTime.toUpperCase()}</span>
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
              className="mt-6 px-4 py-3"
              style={{
                backgroundColor: "rgba(0,201,167,0.05)",
                border: "1px solid var(--color-accent)",
                borderLeft: "3px solid var(--color-accent)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-press-start)",
                  fontSize: "0.38rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                }}
              >
                ✦ AFFILIATE DISCLOSURE:
              </span>{" "}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Some links in this article are affiliate links. We may earn a commission at no extra
                cost to you.{" "}
                <Link
                  href="/affiliate-disclosure"
                  style={{ color: "var(--color-accent)", textDecoration: "underline" }}
                >
                  Learn more
                </Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
