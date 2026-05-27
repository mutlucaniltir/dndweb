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
    <div
      className="my-6 rounded-xl overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
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
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-5 flex-1">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3
                className="text-base font-medium"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  color: "var(--color-text-primary)",
                }}
              >
                {name}
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                style={{
                  backgroundColor: "var(--color-muted)",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-jetbrains)",
                }}
              >
                {STORE_LABELS[store]}
              </span>
            </div>

            {rating && (
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        i < Math.round(rating)
                          ? "var(--color-accent)"
                          : "var(--color-muted)",
                    }}
                  >
                    ★
                  </span>
                ))}
                <span
                  className="text-xs ml-1"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-jetbrains)",
                  }}
                >
                  {rating.toFixed(1)}
                </span>
              </div>
            )}

            <p
              className="text-sm mb-4"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-crimson)",
                fontSize: "0.95rem",
              }}
            >
              {description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {price && (
              <span
                className="text-xl font-semibold"
                style={{ color: "var(--color-accent)", fontFamily: "var(--font-cinzel)" }}
              >
                {price}
              </span>
            )}
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-5 py-2 rounded text-sm font-medium btn-primary"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              View on {STORE_LABELS[store]} ↗
            </a>
            {/* Affiliate disclosure tooltip */}
            <span
              className="relative group text-xs cursor-help"
              style={{ color: "var(--color-text-secondary)" }}
              title="Affiliate link — we may earn a commission at no extra cost to you"
            >
              *
              <span
                className="absolute bottom-5 left-0 w-52 p-2 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-jetbrains)",
                }}
              >
                Affiliate link — we may earn a commission at no extra cost to you
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
