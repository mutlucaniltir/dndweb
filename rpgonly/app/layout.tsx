import type { Metadata } from "next";
import { Cinzel, Crimson_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AffiliateBanner } from "@/components/ui/AffiliateBanner";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
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
  keywords: [
    "RPG",
    "tabletop RPG",
    "D&D",
    "Dungeons and Dragons",
    "Pathfinder",
    "Baldur's Gate 3",
    "video game RPG",
    "RPG reviews",
    "RPG guides",
  ],
  authors: [{ name: "RPGOnly" }],
  creator: "RPGOnly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "RPGOnly",
    title: "RPGOnly — Your World. Your Quest. Your Rules.",
    description:
      "The definitive resource hub for tabletop and video game RPG fans.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "RPGOnly — The RPG Resource Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RPGOnly — Your World. Your Quest. Your Rules.",
    description:
      "The definitive resource hub for tabletop and video game RPG fans.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${crimsonPro.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* TODO: Google Analytics 4 — replace GA_MEASUREMENT_ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" /> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=...` }} /> */}
      </head>
      <body className="min-h-screen flex flex-col antialiased">
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
