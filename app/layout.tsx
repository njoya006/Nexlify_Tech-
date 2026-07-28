import type { Metadata } from "next";
import {
  Space_Grotesk,
  Inter,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import MeshBackground    from "@/components/MeshBackground";
import ScrollProgress   from "@/components/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexlify Tech — We build the future. You lead it.",
  description:
    "Nexlify Tech is a world-class digital studio crafting cutting-edge software, immersive experiences, and next-generation products.",
  keywords: ["Nexlify", "Nexlify Tech", "digital studio", "software", "3D", "web"],
  openGraph: {
    title: "Nexlify Tech",
    description: "We build the future. You lead it.",
    url: "https://nexlifytech.site",
    siteName: "Nexlify Tech",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ScrollProgress />
        <MeshBackground />
        {/* Atmospheric overlays */}
        <div className="noise-overlay" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        {/* Custom cursor */}
        <div id="nexlify-cursor" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
