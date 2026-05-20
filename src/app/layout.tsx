import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import AuthProvider from "@/components/AuthProvider";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

// [FONT-EXPERIMENT] Serif for hero titles & stats — revert if not working
const serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "PearlGate — Verified China Factory Database | Hardware & Mold Sourcing",
  description:
    "20+ personally-vetted factories in hardware tools and molds. Browse the database or submit your sourcing request — we'll match you with verified options in 48 hours.",
  keywords: [
    "China factory database",
    "verified Chinese suppliers",
    "hardware tools supplier China",
    "mold manufacturer China",
    "Guangdong factory",
    "Yangjiang knife supplier",
    "Dongguan mold maker",
  ],
  metadataBase: new URL("https://pearlgatesourcing.com"),
  openGraph: {
    title: "PearlGate — Verified China Factory Database | Hardware & Mold Sourcing",
    description: "20+ verified factories in Guangdong. Hardware tools and molds. Browse the database or get matched with 2-3 options in 48 hours.",
    url: "https://pearlgatesourcing.com",
    siteName: "PearlGate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PearlGate — Verified China Factory Database",
    description: "20+ verified factories in Guangdong. Hardware tools and molds. Free factory matching in 48 hours.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pearlgatesourcing.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${serif.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EZ49XXCGPG"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EZ49XXCGPG');
          `}
        </Script>
      </head>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <PageTransition>{children}</PageTransition>
        </AuthProvider>
      </body>
    </html>
  );
}
