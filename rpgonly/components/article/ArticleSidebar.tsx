import { TableOfContents } from "./TableOfContents";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import type { Heading } from "./TableOfContents";

interface ArticleSidebarProps {
  headings: Heading[];
}

export function ArticleSidebar({ headings }: ArticleSidebarProps) {
  return (
    <aside className="flex flex-col gap-8">
      {/* Table of contents */}
      <div
        className="p-5 rounded-lg"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <TableOfContents headings={headings} />
      </div>

      {/* Newsletter */}
      <div
        className="p-5 rounded-lg"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-accent)",
        }}
      >
        <NewsletterSignup variant="inline" />
      </div>

      {/* TODO: Ezoic/Mediavine sidebar ad slot */}
      {/* <div id="ezoic-pub-ad-placeholder-sidebar" /> */}
    </aside>
  );
}
