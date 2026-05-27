@AGENTS.md

# RPGOnly — Project Brief for Claude

## What this project is
A full-stack, SEO-optimized RPG content and affiliate website targeting tabletop RPG players (D&D, Pathfinder, CoC) and video game RPG fans (BG3, Elden Ring, FF). Primary monetization: affiliate marketing + display ads.

**Live URL:** https://dndweb-dtml.vercel.app  
**Repo:** `mutlucaniltir/dndweb` — app lives in the `rpgonly/` subfolder  
**Branch:** `main`

---

## Tech Stack
- **Next.js 16.2.6** (App Router) — params must be awaited: `const { slug } = await params`
- **React 19** — server components cannot have event handlers
- **Tailwind CSS v4** — config is CSS-based via `@theme` block in `globals.css`, no `tailwind.config.js`
- **next-mdx-remote/rsc** — MDX rendering (contentlayer was incompatible with Next 16)
- **gray-matter** + **reading-time** — frontmatter parsing
- **Fuse.js** — client-side search via `/api/search-index`
- **Anthropic claude-sonnet-4-6** — AI character name generator at `/api/generate-names`
- **Resend** — newsletter email at `/api/subscribe`
- **zod v4** — API validation
- **next-sitemap** — sitemap.xml + robots.txt post-build

---

## Design System (Retro Pixel / Arcade Aesthetic)

### Color Tokens (`globals.css`)
```css
--color-bg: #07070f          /* near-black background */
--color-surface: #0e0e1c     /* card background */
--color-border: #1e1e3f      /* subtle borders */
--color-text-primary: #e8e8f4
--color-text-secondary: #6060a0
--color-accent: #00c9a7      /* teal — primary accent */
--color-red: #e63946
--color-gold: #f4a261
--color-purple: #9b5de5
```

### Fonts
- `--font-press-start` — Press Start 2P (pixel font, headings & labels)
- `--font-body` / `--font-vt323` — VT323 (retro body text)
- `--font-mono` / `--font-jetbrains` — JetBrains Mono (code)

### Key CSS Classes
- `.pixel-card` — main card style with teal corner bracket decoration
- `.pixel-card-red`, `.pixel-card-purple`, `.pixel-card-gold` — color variants
- `.btn-pixel` — ghost button (teal border)
- `.btn-pixel-solid` — filled teal button
- `.btn-pixel-red` — red variant
- `.nav-link` — uppercase Press Start 2P nav links
- Body has scanline + pixel grid overlay for CRT effect

---

## File Structure
```
rpgonly/
├── app/
│   ├── globals.css          ← Design system (edit this for styling)
│   ├── layout.tsx           ← Root layout, fonts, metadata
│   ├── page.tsx             ← Homepage
│   ├── blog/page.tsx        ← Blog listing
│   ├── blog/[slug]/page.tsx ← Article page
│   ├── category/[category]/ ← Category pages
│   ├── tag/[tag]/           ← Tag pages
│   ├── tools/page.tsx       ← Free tools page
│   ├── deals/page.tsx       ← Affiliate deals
│   ├── newsletter/page.tsx
│   └── api/
│       ├── generate-names/  ← Anthropic AI name generator
│       ├── search-index/    ← Fuse.js search data
│       └── subscribe/       ← Newsletter signup (Resend)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       ← Fixed pixel navbar with search modal
│   │   └── Footer.tsx       ← Retro footer
│   ├── home/
│   │   ├── HeroSection.tsx  ← Canvas star animation + pixel frame
│   │   ├── FeaturedArticles.tsx
│   │   └── CategoryGrid.tsx ← "Choose Your Path" class selection cards
│   ├── article/
│   │   ├── ArticleCard.tsx  ← 3 variants: default, featured, compact
│   │   ├── ArticleHeader.tsx
│   │   ├── ArticleSidebar.tsx
│   │   └── TableOfContents.tsx
│   ├── tools/
│   │   ├── ToolsGrid.tsx    ← Client wrapper (ssr:false)
│   │   ├── DiceRoller.tsx
│   │   ├── NameGenerator.tsx
│   │   └── EncounterCalculator.tsx
│   ├── mdx/
│   │   ├── AffiliateProductCard.tsx
│   │   └── Callout.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── NewsletterSignup.tsx
│       ├── AffiliateBanner.tsx
│       └── ThemeProvider.tsx
├── content/articles/        ← MDX articles (5 sample articles)
├── lib/
│   ├── articles.ts          ← getAllArticles(), getArticleBySlug(), etc.
│   ├── affiliate.ts         ← Affiliate store config
│   ├── fuse.ts              ← Search index types
│   ├── headings.ts          ← extractHeadings() for TOC
│   └── utils.ts             ← formatDate(), cn(), getCategoryColor()
├── public/images/articles/  ← Article hero images (pixel art placeholders)
└── vercel.json              ← Vercel deploy config (root dir: rpgonly)
```

---

## MDX Article Frontmatter Format
```yaml
---
title: "Article Title"
slug: "url-slug"
publishedAt: "2025-06-10"
updatedAt: "2025-06-10"
author: "RPGOnly Team"
category: "tabletop"        # tabletop | video-games | reviews | guides | tools
tags: ["tag1", "tag2"]
featuredImage: "/images/articles/filename.jpg"
featuredImageAlt: "Description"
seoDescription: "Meta description, 150-160 chars"
featured: true
affiliateDisclosure: true
---
```

---

## Environment Variables (needed for full functionality)
```
ANTHROPIC_API_KEY=sk-ant-...     # AI name generator
RESEND_API_KEY=re_...            # Newsletter emails
NEXT_PUBLIC_SITE_URL=https://... # Sitemap base URL
```

---

## Known Issues / Things to Improve
- Article hero images are pixel art placeholders — replace with real photography
- No real email list connected (Resend key not set in prod)
- `--font-cinzel` / `--font-crimson` references may exist in older MDX content — these fonts are no longer loaded
- Light mode (`data-theme="light"`) exists but was not fully tested after pixel redesign
- No authentication / CMS — articles are MDX files in `content/`
- The `SUPABASE_ANON_KEY` env var is referenced but Supabase is not implemented

---

## Design Direction (for redesign tasks)
The current aesthetic is **retro pixel / arcade game** (inspired by EstimateQuest on Dribbble). Key characteristics:
- Press Start 2P font for all headings and labels
- Teal (#00c9a7) as primary accent on dark (#07070f) background
- Pixel corner bracket decorations on cards
- CRT scanline + pixel grid body overlay
- Uppercase labels, `▸` arrow prefix on interactive elements
- "INSERT COIN — CREDITS: XX" style micro-copy in navbar

If redesigning: preserve all functionality (search, tools, newsletter, affiliate cards, MDX rendering, SEO metadata, sitemap).
