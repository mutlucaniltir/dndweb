export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  const matches = content.matchAll(/^(#{2,3})\s+(.+)$/gm);
  const headings: Heading[] = [];
  for (const match of matches) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    headings.push({ id, text, level });
  }
  return headings;
}
