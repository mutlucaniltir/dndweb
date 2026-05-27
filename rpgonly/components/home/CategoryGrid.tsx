import Link from "next/link";

const CATEGORIES = [
  {
    slug: "tabletop",
    label: "Tabletop RPGs",
    description: "D&D, Pathfinder, CoC",
    icon: "⚔",
    color: "var(--color-accent)",
  },
  {
    slug: "video-games",
    label: "Video Game RPGs",
    description: "BG3, Elden Ring, FF",
    icon: "▶",
    color: "var(--color-purple)",
  },
  {
    slug: "reviews",
    label: "Reviews",
    description: "Veteran adventurer picks",
    icon: "★",
    color: "var(--color-gold)",
  },
  {
    slug: "guides",
    label: "Guides & Tips",
    description: "Level up your game",
    icon: "📖",
    color: "var(--color-red)",
  },
  {
    slug: "tools",
    label: "Tools",
    description: "Dice, names & more",
    icon: "🎲",
    color: "var(--color-accent)",
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
        {/* Section header */}
        <div className="text-center mb-10">
          <div
            className="inline-block mb-3 px-3 py-1"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.4rem",
              color: "var(--color-accent)",
              border: "1px solid var(--color-border)",
              letterSpacing: "0.2em",
            }}
          >
            ▸ SELECT QUEST TYPE ◂
          </div>
          <h2
            id="categories-heading"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "clamp(0.7rem, 2vw, 1rem)",
              color: "var(--color-text-primary)",
              lineHeight: 1.6,
            }}
          >
            CHOOSE YOUR PATH
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="pixel-card flex flex-col items-center text-center p-5 transition-all"
              style={{ textDecoration: "none" }}
            >
              <span
                className="block mb-4"
                style={{
                  fontSize: "1.8rem",
                  filter: `drop-shadow(0 0 6px ${cat.color}60)`,
                }}
                aria-hidden="true"
              >
                {cat.icon}
              </span>
              <h3
                className="mb-2"
                style={{
                  fontFamily: "var(--font-press-start)",
                  fontSize: "0.42rem",
                  color: cat.color,
                  lineHeight: 1.8,
                  letterSpacing: "0.05em",
                }}
              >
                {cat.label}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.4,
                }}
              >
                {cat.description}
              </p>
              <div
                className="mt-3"
                style={{
                  fontFamily: "var(--font-press-start)",
                  fontSize: "0.35rem",
                  color: cat.color,
                  letterSpacing: "0.1em",
                }}
              >
                ▸ ENTER
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
