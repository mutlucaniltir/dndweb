import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
} from "@/lib/articles";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleSidebar } from "@/components/article/ArticleSidebar";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Callout } from "@/components/mdx/Callout";
import { AffiliateProductCard } from "@/components/mdx/AffiliateProductCard";
import { Blockquote } from "@/components/mdx/Blockquote";
import { ImageGallery } from "@/components/mdx/ImageGallery";
import { extractHeadings } from "@/lib/headings";
import readingTime from "reading-time";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rpgonly.com";
  const { frontmatter } = article;

  return {
    title: frontmatter.seoTitle,
    description: frontmatter.seoDescription,
    keywords: [frontmatter.focusKeyword, ...frontmatter.tags],
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
    openGraph: {
      title: frontmatter.seoTitle,
      description: frontmatter.seoDescription,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      images: [
        {
          url: `${siteUrl}${frontmatter.featuredImage}`,
          alt: frontmatter.featuredImageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.seoTitle,
      description: frontmatter.seoDescription,
      images: [`${siteUrl}${frontmatter.featuredImage}`],
    },
  };
}

const MDX_COMPONENTS = {
  Callout,
  AffiliateProductCard,
  Blockquote,
  ImageGallery,
};

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, content } = article;
  const rt = readingTime(content).text;
  const headings = extractHeadings(content);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rpgonly.com";
  const articleUrl = `${siteUrl}/blog/${slug}`;

  const related = getRelatedArticles(slug, frontmatter.category, frontmatter.tags);

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd frontmatter={frontmatter} url={articleUrl} />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
          { name: frontmatter.title, url: articleUrl },
        ]}
      />

      <div className="pt-20">
        <ArticleHeader frontmatter={frontmatter} readingTime={rt} />

        {/* Two-column layout */}
        <div className="mx-auto px-6 py-12" style={{ maxWidth: "1200px" }}>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Article body */}
            <article className="min-w-0" style={{ maxWidth: "720px", flex: "1 1 auto" }}>
              {/* TODO: Ezoic/Mediavine in-content ad slot */}
              {/* <div id="ezoic-pub-ad-placeholder-incontent" /> */}

              <div className="prose-rpg">
                <MDXRemote
                  source={content}
                  components={MDX_COMPONENTS}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [
                          rehypeAutolinkHeadings,
                          { behavior: "wrap", properties: { className: ["anchor"] } },
                        ],
                      ],
                    },
                  }}
                />
              </div>

              {/* Share buttons */}
              <div
                className="mt-10 pt-8 flex items-center gap-4"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
                >
                  Share:
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-sm transition-colors hover:text-[var(--color-accent)]"
                  style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
                >
                  X / Twitter
                </a>
                <a
                  href={`https://www.reddit.com/submit?url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(frontmatter.title)}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-sm transition-colors hover:text-[var(--color-accent)]"
                  style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
                >
                  Reddit
                </a>
              </div>

              {/* TODO: Comments placeholder */}
              {/* <div id="comments" className="mt-12"> */}
              {/*   Disqus / Giscus / custom comment system */}
              {/* </div> */}

              <RelatedArticles articles={related} />
            </article>

            {/* Sticky sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
              <ArticleSidebar headings={headings} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
