export type AffiliateStore = "amazon" | "drivethru" | "humble" | "other";

export function buildAffiliateUrl(
  baseUrl: string,
  store: AffiliateStore
): string {
  try {
    const url = new URL(baseUrl);
    switch (store) {
      case "amazon":
        url.searchParams.set("tag", "rpgonly-20");
        break;
      case "drivethru":
        url.searchParams.set("affiliate_id", "rpgonly");
        break;
      case "humble":
        url.searchParams.set("partner", "rpgonly");
        break;
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export const STORE_LABELS: Record<AffiliateStore, string> = {
  amazon: "Amazon",
  drivethru: "DriveThruRPG",
  humble: "Humble Bundle",
  other: "View Deal",
};

export const DISCLOSURE_TEXT =
  "rpgonly.com participates in affiliate programs including Amazon Associates and DriveThruRPG. We may earn a commission on purchases made through our links at no extra cost to you.";
