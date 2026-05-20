import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
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
  title: "PearlGate — Your Sourcing Partner in Guangdong",
  description:
    "Former factory managers based in the Pearl River Delta. We help small businesses find reliable Chinese suppliers, ensure quality, and manage orders from Guangdong's best factories.",
  keywords: [
    "China sourcing agent",
    "Guangdong supplier",
    "CNC machining China",
    "Yangjiang knife supplier",
    "Foshan aluminum",
    "Pearl River Delta manufacturing",
  ],
  metadataBase: new URL("https://pearlgate.io"),
  openGraph: {
    title: "PearlGate — Your Sourcing Partner in Guangdong",
    description: "30+ verified factories across Guangdong. Hardware, industrial parts, and workwear. Browse the database or let us source for you.",
    url: "https://pearlgate.io",
    siteName: "PearlGate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PearlGate — Your Sourcing Partner in Guangdong",
    description: "30+ verified factories across Guangdong. Browse the database or let us source for you.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pearlgate.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${serif.variable}`}>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <PageTransition>{children}</PageTransition>
        </AuthProvider>
      </body>
    </html>
  );
}
