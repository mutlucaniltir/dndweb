import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/articles";

// Cache the response for 1 hour since articles only update at build time with ISR
export const revalidate = 3600;

export async function GET() {
  const articles = getAllArticles();
  const index = articles.map((a) => ({
    title: a.frontmatter.title,
    slug: a.frontmatter.slug,
    excerpt: a.frontmatter.seoDescription,
    category: a.frontmatter.category,
    tags: a.frontmatter.tags,
  }));

  return NextResponse.json(index);
}
