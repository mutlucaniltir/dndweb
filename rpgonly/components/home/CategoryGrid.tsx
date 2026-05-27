import Link from "next/link";

const CATEGORIES = [
  {
    slug: "tabletop",
    label: "Tabletop RPGs",
    description: "D&D, Pathfinder, Call of Cthulhu & more",
    icon: "⚔",
  },
  {
    slug: "video-games",
    label: "Video Game RPGs",
    description: "BG3, Elden Ring, Final Fantasy & more",
    icon: "🎮",
  },
  {
    slug: "reviews",
    label: "Reviews",
    description: "In-depth reviews from veteran adventurers",
    icon: "★",
  },
  {
    slug: "guides",
    label: "Guides & Tips",
    description: "Level up your game with expert guides",
    icon: "📖",
  },
  {
    slug: "tools",
    label: "Tools",
    description: "Dice rollers, name generators & more",
    icon: "🎲",
  },
];

export function CategoryGrid() {
  return (
    <section
      className="px-6 py-16"
      style={{
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto" style={{ maxWidth: "1280px" }}>
        <h2
          id="categories-heading"
          className="text-2xl mb-8 text-center"
          style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text-primary)" }}
        >
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center text-center p-5 rounded-xl transition-all duration-300 hover-gold-border"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <span
                className="text-2xl mb-3 block"
                style={{ filter: "drop-shadow(0 0 8px rgba(201,168,76,0.3))" }}
                aria-hidden="true"
              >
                {cat.icon}
              </span>
              <h3
                className="text-sm font-medium mb-1 group-hover:text-[var(--color-accent)] transition-colors"
                style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text-primary)" }}
              >
                {cat.label}
              </h3>
              <p
                className="text-xs"
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-jetbrains)",
                }}
              >
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
