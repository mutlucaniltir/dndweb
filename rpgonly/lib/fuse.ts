import Fuse from "fuse.js";
import type { ArticleMeta } from "./articles";

export interface SearchItem {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
}

export function buildSearchIndex(articles: ArticleMeta[]): Fuse<SearchItem> {
  const items: SearchItem[] = articles.map((a) => ({
    title: a.frontmatter.title,
    slug: a.frontmatter.slug,
    excerpt: a.frontmatter.seoDescription,
    category: a.frontmatter.category,
    tags: a.frontmatter.tags,
  }));

  return new Fuse(items, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "excerpt", weight: 0.3 },
      { name: "tags", weight: 0.15 },
      { name: "category", weight: 0.05 },
    ],
    threshold: 0.35,
    includeScore: true,
  });
}
