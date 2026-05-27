import { format, parseISO } from "date-fns";

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "MMMM d, yyyy");
  } catch {
    return dateStr;
  }
}

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    tabletop: "#c9a84c",
    "video-games": "#4c8bc9",
    reviews: "#b94040",
    guides: "#4cb97a",
    tools: "#9b4cc9",
  };
  return map[category.toLowerCase()] ?? "#8a8a9a";
}

export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    tabletop: "Tabletop",
    "video-games": "Video Games",
    reviews: "Reviews",
    guides: "Guides",
    tools: "Tools",
  };
  return map[category.toLowerCase()] ?? category;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
