import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import TawkToChat from "@/components/TawkToChat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PearlGate — Reliable EV Charging Supply Chain From China | EVSE & Connector Specialists",
  description:
    "Verified EVSE manufacturers and charging cable OEMs in Pearl River Delta. CCS1/CCS2/NACS connectors, DC fast charging cables, Level 2 EVSE. UL/IEC certified. Former BYD quality manager. Get matched with verified charging equipment suppliers in 48 hours.",
  keywords: [
    "EVSE manufacturer China",
    "EV charging cable supplier",
    "CCS1 cable OEM",
    "CCS2 connector supplier",
    "NACS cable manufacturer",
    "DC fast charging cable",
    "Type 2 charging cable",
    "UL 2594 certified EVSE",
    "IEC 62196 compliant",
    "charging infrastructure supplier",
    "Pearl River Delta EVSE",
    "Dongguan charging cable",
    "Shenzhen EVSE manufacturer",
  ],
  metadataBase: new URL("https://pearlgatesourcing.com"),
  openGraph: {
    title: "PearlGate — Reliable EV Charging Supply Chain From China",
    description: "Verified EVSE manufacturers in Pearl River Delta. CCS1/CCS2/NACS specialists. UL/IEC certified charging equipment. Get matched with 2-3 verified OEMs in 48 hours.",
    url: "https://pearlgatesourcing.com",
    siteName: "PearlGate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PearlGate — EV Charging Supply Chain Specialists",
    description: "Verified EVSE manufacturers & charging cable OEMs. CCS1/CCS2/NACS connectors. UL/IEC certified. Free OEM matching in 48 hours.",
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
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
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
        {children}
        <TawkToChat />
      </body>
    </html>
  );
}
