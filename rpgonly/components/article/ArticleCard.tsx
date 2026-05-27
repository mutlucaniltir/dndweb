import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { ArticleMeta } from "@/lib/articles";

interface ArticleCardProps {
  article: ArticleMeta;
  variant?: "default" | "featured" | "compact";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const { frontmatter, readingTime } = article;

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${frontmatter.slug}`}
        className="flex gap-4 group p-3 transition-all"
        style={{
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
          textDecoration: "none",
        }}
      >
        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
          <Image
            src={frontmatter.featuredImage}
            alt={frontmatter.featuredImageAlt}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex flex-col justify-between min-w-0">
          <h3
            className="line-clamp-2"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.42rem",
              color: "var(--color-text-primary)",
              lineHeight: 1.9,
            }}
          >
            {frontmatter.title}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "var(--color-text-secondary)",
              marginTop: "4px",
            }}
          >
            {formatDate(frontmatter.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/blog/${frontmatter.slug}`}
        className="group pixel-card flex flex-col md:flex-row gap-0 overflow-hidden transition-all"
        style={{ textDecoration: "none" }}
      >
        <div className="relative w-full md:w-1/2 aspect-video overflow-hidden">
          <Image
            src={frontmatter.featuredImage}
            alt={frontmatter.featuredImageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Pixel scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            }}
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <Badge label={frontmatter.category} isCategory className="mb-3 self-start" />
          <h2
            className="mb-3"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
              color: "var(--color-text-primary)",
              lineHeight: 2,
            }}
          >
            {frontmatter.title}
          </h2>
          <p
            className="mb-5 line-clamp-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            {frontmatter.seoDescription}
          </p>
          <div
            className="flex items-center gap-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "var(--color-text-secondary)",
            }}
          >
            <span>{formatDate(frontmatter.publishedAt)}</span>
            <span style={{ color: "var(--color-accent)" }}>▸</span>
            <span>{readingTime}</span>
          </div>
          <div
            className="mt-4"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.4rem",
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
            }}
          >
            ▸ READ ARTICLE
          </div>
        </div>
      </Link>
    );
  }

  // default card
  return (
    <Link
      href={`/blog/${frontmatter.slug}`}
      className="pixel-card group flex flex-col overflow-hidden transition-all"
      style={{ textDecoration: "none" }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={frontmatter.featuredImage}
          alt={frontmatter.featuredImageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
          }}
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <Badge label={frontmatter.category} isCategory className="mb-3 self-start" />
        <h2
          className="mb-3 line-clamp-2"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.48rem",
            color: "var(--color-text-primary)",
            lineHeight: 2,
          }}
        >
          {frontmatter.title}
        </h2>
        <p
          className="mb-4 flex-1 line-clamp-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          {frontmatter.seoDescription}
        </p>
        <div
          className="flex items-center gap-3 pt-3"
          style={{
            borderTop: "1px solid var(--color-border)",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--color-text-secondary)",
          }}
        >
          <span>{formatDate(frontmatter.publishedAt)}</span>
          <span style={{ color: "var(--color-accent)" }}>▸</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
