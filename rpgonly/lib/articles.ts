import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export interface ArticleFrontmatter {
  title: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  featuredImageAlt: string;
  focusKeyword: string;
  readTime: number;
  affiliateDisclosure: boolean;
  featured: boolean;
  excerpt?: string;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: string;
}

export interface ArticleMeta {
  frontmatter: ArticleFrontmatter;
  readingTime: string;
}

function parseArticleFile(filePath: string): Article {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    frontmatter: data as ArticleFrontmatter,
    content,
    readingTime: rt.text,
  };
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseArticleFile(filePath);
}

export function getAllArticles(): ArticleMeta[] {
  const slugs = getAllArticleSlugs();
  return slugs
    .map((slug) => {
      const article = getArticleBySlug(slug);
      if (!article) return null;
      return {
        frontmatter: article.frontmatter,
        readingTime: article.readingTime,
      };
    })
    .filter((a): a is ArticleMeta => a !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

export function getFeaturedArticles(limit = 3): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.frontmatter.featured)
    .slice(0, limit);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter(
    (a) => a.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticles().filter((a) =>
    a.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRelatedArticles(
  currentSlug: string,
  category: string,
  tags: string[],
  limit = 3
): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.frontmatter.slug !== currentSlug)
    .map((a) => {
      let score = 0;
      if (a.frontmatter.category === category) score += 2;
      tags.forEach((tag) => {
        if (a.frontmatter.tags.includes(tag)) score += 1;
      });
      return { ...a, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const articles = getAllArticles();
  const cats = new Set(articles.map((a) => a.frontmatter.category));
  return Array.from(cats);
}

export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tags = new Set(articles.flatMap((a) => a.frontmatter.tags));
  return Array.from(tags);
}
