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
        className="flex gap-4 group p-3 rounded-lg transition-all hover-gold-border"
      >
        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={frontmatter.featuredImage}
            alt={frontmatter.featuredImageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="80px"
          />
        </div>
        <div className="flex flex-col justify-between min-w-0">
          <h3
            className="text-sm font-medium leading-snug line-clamp-2 hover-gold-text group-hover:text-[var(--color-accent)] transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {frontmatter.title}
          </h3>
          <span
            className="text-xs mt-1"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
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
        className="group flex flex-col md:flex-row gap-0 rounded-xl overflow-hidden transition-all duration-300 hover-gold-border"
        style={{ backgroundColor: "var(--color-surface)" }}
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent 60%, var(--color-surface))",
            }}
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <Badge label={frontmatter.category} isCategory className="mb-3 self-start" />
          <h2
            className="text-2xl md:text-3xl mb-3 hover-gold-text group-hover:text-[var(--color-accent)] transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {frontmatter.title}
          </h2>
          <p
            className="mb-5 line-clamp-3"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-crimson)",
              fontSize: "1.05rem",
            }}
          >
            {frontmatter.seoDescription}
          </p>
          <div
            className="flex items-center gap-3 text-xs"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            <span>{formatDate(frontmatter.publishedAt)}</span>
            <span>·</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // default card
  return (
    <Link
      href={`/blog/${frontmatter.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover-gold-border"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={frontmatter.featuredImage}
          alt={frontmatter.featuredImageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <Badge label={frontmatter.category} isCategory className="mb-3 self-start" />
        <h2
          className="text-lg mb-2 hover-gold-text group-hover:text-[var(--color-accent)] transition-colors line-clamp-2"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {frontmatter.title}
        </h2>
        <p
          className="text-sm mb-4 flex-1 line-clamp-3"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-crimson)",
            fontSize: "1rem",
          }}
        >
          {frontmatter.seoDescription}
        </p>
        <div
          className="flex items-center gap-3 text-xs pt-3"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-jetbrains)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <span>{formatDate(frontmatter.publishedAt)}</span>
          <span>·</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
