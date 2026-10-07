import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE, SITE_JSON_LD } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";

const cranio = localFont({
  src: "./fonts/Cranio/CranioRegular-WpD9n.otf",
  variable: "--font-display",
  display: "swap",
});

const betha = localFont({
  src: "../../public/fonts/Betha/Betha-KVj87.otf",
  variable: "--font-betha",
  display: "swap",
});

const mifetro = localFont({
  src: "./fonts/Mifetro/MifetroRegular-rvOly.ttf",
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  openGraph: { type: "website", siteName: SITE.name, locale: SITE.locale, url: "/", title: SITE.title, description: SITE.description },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#090706",
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
      className={`${cranio.variable} ${betha.variable} ${mifetro.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-void text-fg">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-white focus-visible:outline-none"
        >
          Skip to main content
        </a>
        <JsonLd data={SITE_JSON_LD} />
        {children}
      </body>
    </html>
  );
}
