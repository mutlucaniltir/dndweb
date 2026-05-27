import type { Metadata } from "next";
import { AffiliateProductCard } from "@/components/mdx/AffiliateProductCard";

export const metadata: Metadata = {
  title: "RPG Deals — Best Prices on Dice, Books & Games",
  description:
    "The best deals on tabletop RPG books, dice, accessories, and video games. Curated affiliate picks from Amazon, DriveThruRPG, and Humble Bundle.",
};

const DEALS = [
  {
    name: "D&D 5e Player's Handbook (2024)",
    image: "/images/articles/dice-sets.jpg",
    price: "$49.95",
    affiliateUrl: "https://www.amazon.com/dp/0786969512?tag=rpgonly-20",
    store: "amazon" as const,
    rating: 4.9,
    description:
      "The essential rulebook for Dungeons & Dragons 5th edition. Updated 2024 edition with revised rules, expanded class options, and gorgeous new art.",
    category: "tabletop",
  },
  {
    name: "Baldur's Gate 3 (PC)",
    image: "/images/articles/bg3-classes.jpg",
    price: "$59.99",
    affiliateUrl: "https://www.humblebundle.com/store/baldurs-gate-3?partner=rpgonly",
    store: "humble" as const,
    rating: 4.8,
    description:
      "The CRPG of the decade. Over 100 hours of content, true D&D 5e rules, and choices that actually matter. GOTY winner.",
    category: "video-games",
  },
  {
    name: "Pathfinder 2e Core Rulebook",
    image: "/images/articles/tabletop-rpgs.jpg",
    price: "$59.99",
    affiliateUrl: "https://www.drivethrurpg.com/product/333950?affiliate_id=rpgonly",
    store: "drivethru" as const,
    rating: 4.7,
    description:
      "The definitive alternative to D&D. Pathfinder 2e offers unmatched character customization, tactical combat, and 3 action economy.",
    category: "tabletop",
  },
  {
    name: "Chessex Pound-O-Dice",
    image: "/images/articles/dice-sets.jpg",
    price: "$28.99",
    affiliateUrl: "https://www.amazon.com/dp/B00128WCVA?tag=rpgonly-20",
    store: "amazon" as const,
    rating: 4.6,
    description:
      "Over 100 random dice in a huge variety of colors and styles. Perfect for building your collection or running a game shop.",
    category: "accessories",
  },
  {
    name: "Call of Cthulhu 7th Ed. Keeper Rulebook",
    image: "/images/articles/tabletop-rpgs.jpg",
    price: "$44.99",
    affiliateUrl: "https://www.drivethrurpg.com/product/150997?affiliate_id=rpgonly",
    store: "drivethru" as const,
    rating: 4.8,
    description:
      "Descend into cosmic horror. The Keeper Rulebook is your gateway to Lovecraftian mysteries, investigations, and inevitable madness.",
    category: "tabletop",
  },
  {
    name: "Humble RPG Bundle — Pathfinder Mega Pack",
    image: "/images/articles/tabletop-rpgs.jpg",
    price: "From $1",
    affiliateUrl: "https://www.humblebundle.com/books?partner=rpgonly",
    store: "humble" as const,
    rating: 4.7,
    description:
      "Pay what you want for a massive bundle of Pathfinder PDFs including adventure paths, bestiaries, and sourcebooks.",
    category: "tabletop",
  },
];

const CATEGORY_FILTERS = ["All", "Tabletop", "Video Games", "Accessories"];

export default function DealsPage() {
  return (
    <div className="pt-24 pb-20 px-6 mx-auto" style={{ maxWidth: "1280px" }}>
      <header className="mb-12 text-center">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-red)", fontFamily: "var(--font-jetbrains)" }}
        >
          🔥 Hot Deals
        </p>
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          RPG Deals
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-crimson)" }}
        >
          Curated picks across Amazon, DriveThruRPG, and Humble Bundle. Every link
          supports the site at no extra cost to you.
        </p>
      </header>

      {/* TODO: Filter bar (client component with state) */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORY_FILTERS.map((cat) => (
          <span
            key={cat}
            className="px-4 py-1.5 rounded-full text-sm cursor-pointer transition-all"
            style={{
              fontFamily: "var(--font-jetbrains)",
              backgroundColor: cat === "All" ? "var(--color-accent)" : "var(--color-muted)",
              color:
                cat === "All" ? "var(--color-bg)" : "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      <hr className="gold-divider" />

      <div className="flex flex-col gap-4 mt-6">
        {DEALS.map((deal) => (
          <AffiliateProductCard key={deal.name} {...deal} />
        ))}
      </div>

      <div
        className="mt-10 p-5 rounded-lg text-sm text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-jetbrains)",
        }}
      >
        ✦ All links on this page are affiliate links.{" "}
        <a
          href="/affiliate-disclosure"
          className="underline hover:text-[var(--color-accent)] transition-colors"
        >
          Learn more about our disclosure policy.
        </a>
      </div>
    </div>
  );
}
