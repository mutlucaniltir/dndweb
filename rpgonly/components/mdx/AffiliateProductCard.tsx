import Image from "next/image";
import type { AffiliateStore } from "@/lib/affiliate";
import { STORE_LABELS } from "@/lib/affiliate";

interface AffiliateProductCardProps {
  name: string;
  image: string;
  price?: string;
  affiliateUrl: string;
  store: AffiliateStore;
  rating?: number;
  description: string;
}

export function AffiliateProductCard({
  name,
  image,
  price,
  affiliateUrl,
  store,
  rating,
  description,
}: AffiliateProductCardProps) {
  return (
    <div className="pixel-card my-6 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name,
            description,
            ...(rating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: rating,
                bestRating: 5,
              },
            }),
          }).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex flex-col sm:flex-row gap-0">
        {/* Image */}
        <div className="relative w-full sm:w-36 h-36 flex-shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={`Product image: ${name}`}
            fill
            className="object-cover"
            sizes="144px"
          />
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-5 flex-1">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3
                style={{
                  fontFamily: "var(--font-press-start)",
                  fontSize: "0.5rem",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.9,
                }}
              >
                {name}
              </h3>
              <span
                className="flex-shrink-0 px-2 py-0.5"
                style={{
                  fontFamily: "var(--font-press-start)",
                  fontSize: "0.35rem",
                  color: "var(--color-accent)",
                  border: "1px solid var(--color-accent)",
                  letterSpacing: "0.1em",
                }}
              >
                {STORE_LABELS[store]}
              </span>
            </div>

            {rating && (
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < Math.round(rating) ? "var(--color-gold)" : "var(--color-border)",
                      fontSize: "0.85rem",
                    }}
                  >
                    ★
                  </span>
                ))}
                <span
                  className="ml-1"
                  style={{
                    fontFamily: "var(--font-press-start)",
                    fontSize: "0.35rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {rating.toFixed(1)}
                </span>
              </div>
            )}

            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {price && (
              <span
                style={{
                  fontFamily: "var(--font-press-start)",
                  fontSize: "0.65rem",
                  color: "var(--color-accent)",
                }}
              >
                {price}
              </span>
            )}
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn-pixel-solid"
              style={{ fontSize: "0.38rem" }}
            >
              ▶ VIEW ON {STORE_LABELS[store].toUpperCase()}
            </a>
            <span
              className="relative group text-xs cursor-help"
              style={{ color: "var(--color-text-secondary)" }}
              title="Affiliate link — we may earn a commission at no extra cost to you"
            >
              *
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
