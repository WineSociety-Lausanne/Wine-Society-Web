"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import { Calendar, Clock, MapPin, Wine, ChevronRight, ImageIcon, ArrowRight } from "lucide-react";

const upcomingEvents = [
  {
    slug: "Blanchard",
    date: "2025-11-11",
    titleFr: "A venir",
    titleEn: "Comming Soon",
    descFr: "Dégustation",
    descEn: "Tasting",
  },/*
  {
    slug: "octobre-2025",
    date: "2025-10-01",
    titleFr: "Domaine à confirmer",
    titleEn: "Estate TBC",
    descFr: "Soirée dégustation bimensuelle",
    descEn: "Bimonthly tasting evening",
  },*/
];

const pastHighlights = [
  { titleFr: "Branaire-Ducru — Saint-Julien", titleEn: "Branaire-Ducru — Saint-Julien", descFr: "4ème Grand Cru Classé présenté par le domaine", descEn: "4th Grand Cru Classé presented by the estate", photoCount: 0 },
  { titleFr: "Cave de la Côte", titleEn: "Cave de la Côte", descFr: "À la découverte des pépites et cépages emblématiques du vignoble vaudois", descEn: "Discovering the hidden gems and iconic grape varieties of the Vaud region", photoCount: 0 },
  { titleFr: "Château Minuty — Côtes de Provence", titleEn: "Château Minuty — Côtes de Provence", descFr: "L'excellence des grands rosés de Provence et de la French Riviera", descEn: "The excellence of great Provence rosés and the French Riviera", photoCount: 0 },
  { titleFr: "Champagne Lanson", titleEn: "Champagne Lanson", descFr: "Découverte de la gamme Lanson, du Brut au Rosé", descEn: "Discovering the Lanson range, from Brut to Rosé", photoCount: 0 },
  { titleFr: "Mauler", titleEn: "Mauler", descFr: "Tradition et excellence des grands vins mousseux suisses depuis 1829", descEn: "Tradition and excellence of great Swiss sparkling wines since 1829", photoCount: 0 },
  { titleFr: "Les Frères Dutruy", titleEn: "Les Frères Dutruy", descFr: "Des vins de terroir d'exception récompensés au cœur de La Côte", descEn: "Exceptional award-winning terroir wines from the heart of La Côte", photoCount: 0 },
  { titleFr: "Famille Perrin — Vallée du Rhône", titleEn: "Famille Perrin — Rhône Valley", descFr: "Les grands vins du Rhône sud, de Gigondas à Châteauneuf-du-Pape", descEn: "Great wines of the Southern Rhône, from Gigondas to Châteauneuf-du-Pape", photoCount: 0 },
  { titleFr: "Joseph Drouhin — Bourgogne", titleEn: "Joseph Drouhin — Burgundy", descFr: "Exploration des terroirs bourguignons avec la Maison Drouhin", descEn: "Exploring Burgundian terroirs with Maison Drouhin", photoCount: 0 },
  { titleFr: "Château Chasse-Spleen", titleEn: "Château Chasse-Spleen", descFr: "L'élégance et la poésie d'un grand nom de Moulis-en-Médoc", descEn: "The elegance and poetry of a great name from Moulis-en-Médoc", photoCount: 0 },
  { titleFr: "Château Lafite Rothschild", titleEn: "Château Lafite Rothschild", descFr: "Une soirée exceptionnelle autour des grands crus légendaires du Médoc", descEn: "An exceptional evening featuring the legendary grand crus of Médoc", photoCount: 0 },
  { titleFr: "Bouvet-Jabloir", titleEn: "Bouvet-Jabloir", descFr: "La haute couture du vignoble neuchâtelois et ses grands Pinots Noirs", descEn: "The haute couture of Neuchâtel vineyards and its great Pinot Noirs", photoCount: 0 },
  { titleFr: "Bouchard Père & Fils", titleEn: "Bouchard Père & Fils", descFr: "Un voyage historique à travers les plus prestigieux climats de Bourgogne", descEn: "A historical journey through the most prestigious climates of Burgundy", photoCount: 0 },
  { titleFr: "Château Pichon", titleEn: "Château Pichon", descFr: "Immersion dans l'excellence des Grands Crus Classés de Pauillac", descEn: "Immersion into the excellence of Pauillac's Grand Crus Classés", photoCount: 0 },
  { titleFr: "Louis Latour", titleEn: "Louis Latour", descFr: "Deux siècles de tradition et de grands vins blancs et rouges de Bourgogne", descEn: "Two centuries of tradition and great Burgundy white and red wines", photoCount: 0 },
  { titleFr: "Sélection Terroir & Charcuterie", titleEn: "Local Terroir & Pairings", descFr: "Sélection de produits artisanaux pour accompagner nos plus belles cuvées", descEn: "Selection of local artisanal products to complement our finest cuvées", photoCount: 0 },
  { titleFr: "Champagne Gosset", titleEn: "Champagne Gosset", descFr: "Dégustation historique de la plus ancienne Maison de Vins de la Champagne", descEn: "Historical tasting session with the oldest Wine House in Champagne", photoCount: 0 },
  { titleFr: "Marie-Thérèse Chappaz", titleEn: "Marie-Thérèse Chappaz", descFr: "Les icônes biodynamiques du Valais par une vigneronne d'exception", descEn: "The iconic biodynamic wines of Valais by an exceptional winemaker", photoCount: 0 },
  { titleFr: "Château Lagrange", titleEn: "Château Lagrange", descFr: "Splendeur, rigueur et précision d'un Grand Cru Classé de Saint-Julien", descEn: "Splendor, rigor and precision of a Saint-Julien Grand Cru Classé", photoCount: 0 },
];

export default function EventsPage() {
  const { t, locale } = useLang();
  const [selectedPast, setSelectedPast] = useState<number | null>(null);

  return (
    <>
      {/* Hero bordeaux */}
      <section className="relative section-padding pt-32 pb-16 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader title={t.events.title} subtitle={t.events.subtitle} light />
        </div>
      </section>

      {/* Format */}
      <section className="section-padding bg-bg">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="relative bg-wine-900 p-12 md:p-16 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-bg border border-wine-800/20 flex items-center justify-center">
                <Wine className="w-5 h-5 text-wine-800" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-cream-100 mb-6">
                {t.events.format.title}
              </h3>
              <p className="font-body text-cream-200/60 text-sm leading-[1.9] max-w-2xl mx-auto">
                {t.events.format.description}
              </p>
              <div className="flex flex-wrap justify-center gap-10 mt-10">
                {[
                  { icon: Calendar, text: locale === "fr" ? "Mercredi soir" : "Wednesday evening" },
                  { icon: Clock, text: locale === "fr" ? "4-6 cuvées" : "4-6 wines" },
                  { icon: MapPin, text: "Lausanne" },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-cream-200/40 font-body text-xs uppercase tracking-wider">
                    <item.icon className="w-3.5 h-3.5 text-gold-400/50" />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Upcoming */}
      <section className="section-padding bg-bg-alt">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h3 className="font-headline text-3xl text-wine-900 mb-12">{t.events.upcoming}</h3>
          </FadeUp>
          <StaggerContainer className="space-y-4">
            {upcomingEvents.map((event, i) => (
              <StaggerItem key={i}>
                <Link
                  href={`/events/${event.slug}`}
                  className="flex gap-8 items-start bg-white border border-wine-800/10 p-8 hover:border-wine-800/30 transition-all duration-500 group block"
                >
                  <div className="bg-wine-800 px-5 py-4 text-center flex-shrink-0 min-w-[80px]">
                    <p className="font-headline text-2xl text-cream-100">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="font-body text-[10px] text-cream-200/60 uppercase tracking-wider">
                      {new Date(event.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { month: "short" })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-lg text-wine-900 group-hover:text-wine-700 transition-colors duration-300">
                      {locale === "fr" ? event.titleFr : event.titleEn}
                    </h4>
                    <p className="font-body text-sm text-dark-500 mt-2">
                      {locale === "fr" ? event.descFr : event.descEn}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-wine-800/30 group-hover:text-wine-800 mt-2 flex-shrink-0 transition-colors" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Past */}
      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h3 className="font-headline text-3xl text-wine-900 mb-12">{t.events.past}</h3>
          </FadeUp>
          <div className="space-y-3">
            {pastHighlights.map((event, i) => {
              const isOpen = selectedPast === i;
              return (
                <div key={i} className="bg-white border border-wine-800/10 hover:border-wine-800/25 transition-colors duration-300">
                  <button
                    onClick={() => setSelectedPast(isOpen ? null : i)}
                    className="w-full text-left group"
                  >
                    <div className="p-6 md:p-8 flex items-center justify-between gap-6">
                      <div className="flex-1">
                        <h4 className="font-display text-lg md:text-xl text-wine-800 group-hover:text-wine-600 transition-colors duration-500">
                          {locale === "fr" ? event.titleFr : event.titleEn}
                        </h4>
                        <p className="font-body text-sm text-dark-500 mt-1">
                          {locale === "fr" ? event.descFr : event.descEn}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-wine-800/30 flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`}
                      />
                    </div>
                  </button>
                
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-8 pt-4 border-t border-wine-800/10">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {Array.from({ length: event.photoCount }).map((_, j) => (
                            <div key={j} className="aspect-[4/3] bg-bg-alt border border-wine-800/10 flex flex-col items-center justify-center gap-2 hover:border-wine-800/20 transition-colors duration-300">
                              <ImageIcon className="w-5 h-5 text-dark-300" />
                              <span className="font-body text-[10px] text-dark-400 uppercase tracking-wider">Photo {j + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}