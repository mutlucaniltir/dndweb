import type { Metadata } from "next";
import { Press_Start_2P, VT323, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AffiliateBanner } from "@/components/ui/AffiliateBanner";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
  weight: "400",
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rpgonly.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RPGOnly — Your World. Your Quest. Your Rules.",
    template: "%s | RPGOnly",
  },
  description:
    "The definitive resource hub for tabletop and video game RPG fans. Guides, reviews, tools, and deals for D&D, Pathfinder, Baldur's Gate 3, Elden Ring, and more.",
  keywords: ["RPG", "tabletop RPG", "D&D", "Dungeons and Dragons", "Pathfinder", "Baldur's Gate 3", "video game RPG"],
  authors: [{ name: "RPGOnly" }],
  creator: "RPGOnly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "RPGOnly",
    title: "RPGOnly — Your World. Your Quest. Your Rules.",
    description: "The definitive resource hub for tabletop and video game RPG fans.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "RPGOnly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RPGOnly — Your World. Your Quest. Your Rules.",
    description: "The definitive resource hub for tabletop and video game RPG fans.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pressStart2P.variable} ${vt323.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* TODO: Google Analytics 4 */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" /> */}
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <AffiliateBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
