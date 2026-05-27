import { TableOfContents } from "./TableOfContents";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import type { Heading } from "./TableOfContents";

interface ArticleSidebarProps {
  headings: Heading[];
}

export function ArticleSidebar({ headings }: ArticleSidebarProps) {
  return (
    <aside className="flex flex-col gap-6">
      {/* Table of contents */}
      <div className="pixel-card p-5">
        <TableOfContents headings={headings} />
      </div>

      {/* Newsletter */}
      <div
        className="p-5"
        style={{
          border: "1px solid var(--color-accent)",
          backgroundColor: "rgba(0,201,167,0.04)",
          position: "relative",
        }}
      >
        {/* Corner brackets */}
        <div style={{ position: "absolute", top: -1, left: -1, width: 10, height: 10, borderTop: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }} />
        <div style={{ position: "absolute", top: -1, right: -1, width: 10, height: 10, borderTop: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }} />
        <div style={{ position: "absolute", bottom: -1, left: -1, width: 10, height: 10, borderBottom: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }} />
        <div style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, borderBottom: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }} />
        <NewsletterSignup variant="inline" />
      </div>
    </aside>
  );
}
