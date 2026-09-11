"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { locale } = useLang();

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 bg-wine-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-wine-950/60 via-wine-900 to-wine-950" />
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-7">
          <span className="h-px w-10 bg-gold-400/50" />
          <span className="font-body text-[11px] uppercase tracking-[0.35em] text-gold-400">
            {locale === "fr" ? "Erreur 404" : "Error 404"}
          </span>
        </div>

        <h1 className="font-headline text-cream-100 leading-[0.95] tracking-[-0.015em] text-[clamp(2.75rem,7vw,5.75rem)]">
          {locale === "fr" ? "Cette page s'est évaporée" : "This page has evaporated"}
        </h1>

        <p className="font-display italic text-xl md:text-2xl text-cream-200/55 mt-6 max-w-2xl leading-relaxed">
          {locale === "fr"
            ? "Comme un grand vin oublié en cave, cette page reste introuvable."
            : "Like a fine wine forgotten in the cellar, this page cannot be found."}
        </p>

        <div className="h-px bg-cream-200/15 my-10" />

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cream-100 hover:text-gold-400 font-body text-xs uppercase tracking-[0.2em] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {locale === "fr" ? "Retour à l'accueil" : "Back home"}
        </Link>
      </div>
    </section>
  );
}
