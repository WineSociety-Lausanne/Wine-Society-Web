import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Wine Society | UNIL · EPFL · Lausanne",
  description: "Association d'œnologie de l'UNIL et de l'EPFL à Lausanne. Dégustations, concours internationaux et découverte du vin. Initier. Partager. Découvrir.",
  keywords: ["wine society", "oenologie", "UNIL", "EPFL", "Lausanne", "dégustation", "vin", "concours", "Left Bank Bordeaux Cup"],
  authors: [{ name: "Wine Society Lausanne" }],
  openGraph: {
    title: "Wine Society | UNIL · EPFL · Lausanne",
    description: "Association d'œnologie de l'UNIL et de l'EPFL. Dégustations bimensuelles, concours internationaux et visites de domaines.",
    url: "https://www.wine-society.ch",
    siteName: "Wine Society Lausanne",
    locale: "fr_CH",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wine Society — UNIL · EPFL · Lausanne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wine Society | UNIL · EPFL · Lausanne",
    description: "Association d'œnologie de l'UNIL et de l'EPFL. Initier. Partager. Découvrir.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        <LangProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieBanner />
        </LangProvider>
      </body>
    </html>
  );
}