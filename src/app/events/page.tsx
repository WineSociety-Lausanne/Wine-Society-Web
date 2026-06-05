"use client";

import { useState, useEffect, useRef } from "react";
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
    titleEn: "Coming Soon",
    descFr: "Dégustation",
    descEn: "Tasting",
  },
];

type PastEvent = {
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  photoCount: number;
  region: string;
  instagram: string;
  noEmbed?: boolean;
};

const pastHighlights: PastEvent[] = [
  { titleFr: "Branaire-Ducru — Saint-Julien", titleEn: "Branaire-Ducru — Saint-Julien", descFr: "4ème Grand Cru Classé présenté par le domaine", descEn: "4th Grand Cru Classé presented by the estate", photoCount: 0, region: "bordeaux", instagram: "https://www.instagram.com/p/DY2Ripslu1E/" },
  { titleFr: "Cave de la Côte", titleEn: "Cave de la Côte", descFr: "À la découverte des pépites et cépages emblématiques du vignoble vaudois", descEn: "Discovering the hidden gems and iconic grape varieties of the Vaud region", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/DYpcrgMkVLm/" },
  { titleFr: "Château Minuty — Côtes de Provence", titleEn: "Château Minuty — Côtes de Provence", descFr: "L'excellence des grands rosés de Provence et de la French Riviera", descEn: "The excellence of great Provence rosés and the French Riviera", photoCount: 0, region: "provence", instagram: "https://www.instagram.com/p/DYXYn1ElETW/" },
  { titleFr: "Champagne Lanson", titleEn: "Champagne Lanson", descFr: "Découverte de la gamme Lanson, du Brut au Rosé", descEn: "Discovering the Lanson range, from Brut to Rosé", photoCount: 0, region: "champagne", instagram: "https://www.instagram.com/p/DXmaeWmlle4/" },
  { titleFr: "Mauler", titleEn: "Mauler", descFr: "Tradition et excellence des grands vins mousseux suisses depuis 1829", descEn: "Tradition and excellence of great Swiss sparkling wines since 1829", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/DW3jAxGCEUg/" },
  { titleFr: "Les Frères Dutruy", titleEn: "Les Frères Dutruy", descFr: "Des vins de terroir d'exception récompensés au cœur de La Côte", descEn: "Exceptional award-winning terroir wines from the heart of La Côte", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/DWRlk8XlOqI/" },
  { titleFr: "Famille Perrin", titleEn: "Famille Perrin — Rhône Valley", descFr: "Les grands vins du Rhône sud, de Gigondas à Châteauneuf-du-Pape", descEn: "Great wines of the Southern Rhône, from Gigondas to Châteauneuf-du-Pape", photoCount: 0, region: "rhone", instagram: "https://www.instagram.com/p/DSM7EaADiry/" },
  { titleFr: "Joseph Drouhin", titleEn: "Joseph Drouhin — Burgundy", descFr: "Exploration des terroirs bourguignons avec la Maison Drouhin", descEn: "Exploring Burgundian terroirs with Maison Drouhin", photoCount: 0, region: "bourgogne", instagram: "https://www.instagram.com/p/DRci_bvjAwr/" },
  { titleFr: "Château Chasse-Spleen", titleEn: "Château Chasse-Spleen", descFr: "L'élégance et la poésie d'un grand nom de Moulis-en-Médoc", descEn: "The elegance and poetry of a great name from Moulis-en-Médoc", photoCount: 0, region: "bordeaux", instagram: "https://www.instagram.com/p/DJrnuDmo84e/", noEmbed: true },
  { titleFr: "Château Lafite Rothschild", titleEn: "Château Lafite Rothschild", descFr: "Une soirée exceptionnelle autour des grands crus légendaires du Médoc", descEn: "An exceptional evening featuring the legendary grand crus of Médoc", photoCount: 0, region: "bordeaux", instagram: "https://www.instagram.com/p/C74Z6bLIW1P/" },
  { titleFr: "Bouvet-Jabloir", titleEn: "Bouvet-Jabloir", descFr: "La haute couture du vignoble neuchâtelois et ses grands Pinots Noirs", descEn: "The haute couture of Neuchâtel vineyards and its great Pinot Noirs", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/DHIu23yo0P2", noEmbed: true },
  { titleFr: "Bouchard Père & Fils", titleEn: "Bouchard Père & Fils", descFr: "Un voyage historique à travers les plus prestigieux climats de Bourgogne", descEn: "A historical journey through the most prestigious climates of Burgundy", photoCount: 0, region: "bourgogne", instagram: "https://www.instagram.com/p/DGoDAkMoTxo/", noEmbed: true },
  { titleFr: "Château Pichon Baron", titleEn: "Château Pichon Baron", descFr: "Immersion dans l'excellence des Grands Crus Classés de Pauillac", descEn: "Immersion into the excellence of Pauillac's Grand Crus Classés", photoCount: 0, region: "bordeaux", instagram: "https://www.instagram.com/p/DDY-6k5u-7z/", noEmbed: true },
  { titleFr: "Louis Latour", titleEn: "Louis Latour", descFr: "Deux siècles de tradition et de grands vins blancs et rouges de Bourgogne", descEn: "Two centuries of tradition and great Burgundy white and red wines", photoCount: 0, region: "bourgogne", instagram: "https://www.instagram.com/p/DBgfkgeoKrs/" },
  { titleFr: "Sélection Terroir & Charcuterie", titleEn: "Local Terroir & Pairings", descFr: "Sélection de produits artisanaux pour accompagner nos plus belles cuvées", descEn: "Selection of local artisanal products to complement our finest cuvées", photoCount: 0, region: "autre", instagram: "" },
  { titleFr: "Champagne Gosset", titleEn: "Champagne Gosset", descFr: "Dégustation historique de la plus ancienne Maison de Vins de la Champagne", descEn: "Historical tasting session with the oldest Wine House in Champagne", photoCount: 0, region: "champagne", instagram: "https://www.instagram.com/p/C5G_UFOo5qK/" },
  { titleFr: "Marie-Thérèse Chappaz", titleEn: "Marie-Thérèse Chappaz", descFr: "Les icônes biodynamiques du Valais par une vigneronne d'exception", descEn: "The iconic biodynamic wines of Valais by an exceptional winemaker", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/C4ia7l0I5w3/" },
  { titleFr: "Château Lagrange", titleEn: "Château Lagrange", descFr: "Splendeur, rigueur et précision d'un Grand Cru Classé de Saint-Julien", descEn: "Splendor, rigor and precision of a Saint-Julien Grand Cru Classé", photoCount: 0, region: "bordeaux", instagram: "https://www.instagram.com/p/C0819OxoHrm/" },
  { titleFr: "Moët & Chandon", titleEn: "Moët & Chandon", descFr: "L'éclat et le savoir-faire de l'une des plus célèbres Maisons de Champagne", descEn: "The brilliance and expertise of one of the world's most famous Champagne Houses", photoCount: 0, region: "champagne", instagram: "https://www.instagram.com/p/Cqcpb2AoDsq/" },
  { titleFr: "M. Chapoutier", titleEn: "M. Chapoutier", descFr: "Une immersion audacieuse au cœur des plus grands terroirs de la Vallée du Rhône", descEn: "A bold journey into the finest terroirs of the Rhône Valley", photoCount: 0, region: "rhone", instagram: "https://www.instagram.com/p/C7EIbRXoFDi/" },
  { titleFr: "Château du Crest", titleEn: "Château du Crest", descFr: "L'excellence helvétique et la tradition viticole genevoise", descEn: "Swiss excellence and the rich winemaking tradition of Geneva", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/DRFO-_pDIsV/" },
  { titleFr: "Maison Gilliard", titleEn: "Maison Gilliard", descFr: "Les trésors du Valais et l'iconique Dôle des Noirs à l'honneur", descEn: "Valais treasures and the iconic Dôle des Noirs highlighted", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/DIllq1nomiq/", noEmbed: true },
  { titleFr: "Cave La Madeleine", titleEn: "Cave La Madeleine", descFr: "Les grands crus d'André Fontannaz, reflets purs du terroir valaisan", descEn: "André Fontannaz's grand crus, a pure reflection of the Valais terroir", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/DCWX_3hItp6/", noEmbed: true },
  { titleFr: "Veuve Clicquot", titleEn: "Veuve Clicquot", descFr: "Une dégustation audacieuse sous le signe de l'excellence et de la culture Vintage", descEn: "A bold tasting experience driven by excellence and Vintage culture", photoCount: 0, region: "champagne", instagram: "https://www.instagram.com/p/C4BQFoOo4TX/" },
  { titleFr: "Jean-René Germanier", titleEn: "Jean-René Germanier", descFr: "L'art des grands vins du Valais et la quintessence de la Syrah helvétique", descEn: "The art of fine Valais wines and the ultimate expression of Swiss Syrah", photoCount: 0, region: "suisse", instagram: "https://www.instagram.com/p/C0ZaMg4IZ_a/" },
  { titleFr: "ÉroVins", titleEn: "ÉroVins", descFr: "Une sélection passionnée de vins d'artisans, mettant à l'honneur le terroir du Languedoc et des pépites du Roussilon", descEn: "A passionate curation of artisanal wines, celebrating Languedoc terroirs and authentic hidden gems from Roussillon", photoCount: 0, region: "suisse", instagram: "" },
  { titleFr: "Champagne Bollinger", titleEn: "Champagne Bollinger", descFr: "Le caractère affirmé et l'élégance intemporelle des grands vins de Champagne", descEn: "The distinctive character and timeless elegance of great Champagne wines", photoCount: 0, region: "champagne", instagram: "" },
  { titleFr: "Champagne Drappier", titleEn: "Champagne Drappier", descFr: "L'expression naturelle du Pinot Noir et le fleuron des cuvées de l'Aube", descEn: "The natural expression of Pinot Noir and the flagship cuvées of the Aube region", photoCount: 0, region: "champagne", instagram: "https://www.instagram.com/p/BM9FwrRDBec/" },
  { titleFr: "Schenk", titleEn: "Schenk", descFr: "Un voyage multisensoriel à travers les grands vignobles d'Europe", descEn: "A multi-sensory journey through Europe's finest vineyards", photoCount: 0, region: "autre", instagram: "" },
];

function InstagramEmbed({ url }: { url: string }) {
  const postId = url.split("/p/")[1]?.replace(/\/$/, "");
  if (!postId) return null;

  return (
    <div className="max-w-lg mx-auto mb-6">
      <iframe
        src={`https://www.instagram.com/p/${postId}/embed`}
        className="w-full border-0 rounded"
        style={{ minHeight: "700px" }}
        scrolling="no"
        title="Instagram"
      />
    </div>
  );
}

export default function EventsPage() {
  const { t, locale } = useLang();
  const [selectedPast, setSelectedPast] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredEvents = pastHighlights.filter((e) => filter === "all" || e.region === filter);

  useEffect(() => {
    if (selectedPast !== null && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selectedPast]);

  return (
    <>
      <section className="relative px-6 md:px-12 lg:px-24 pt-40 pb-8 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader title={t.events.title} subtitle={t.events.subtitle} light />
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="relative bg-wine-900 p-12 md:p-16 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-bg border border-wine-800/20 flex items-center justify-center">
                <Wine className="w-5 h-5 text-wine-800" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-cream-100 mb-6">{t.events.format.title}</h3>
              <p className="font-body text-cream-200/60 text-sm leading-[1.9] max-w-2xl mx-auto">{t.events.format.description}</p>
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

      <section className="section-padding bg-bg-alt">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h3 className="font-headline text-3xl text-wine-900 mb-12">{t.events.upcoming}</h3>
          </FadeUp>
          <StaggerContainer className="space-y-4">
            {upcomingEvents.map((event, i) => (
              <StaggerItem key={i}>
                <Link href={`/events/${event.slug}`} className="flex gap-8 items-start bg-white border border-wine-800/10 p-8 hover:border-wine-800/30 transition-all duration-500 group block">
                  <div className="bg-wine-800 px-5 py-4 text-center flex-shrink-0 min-w-[80px]">
                    <p className="font-headline text-2xl text-cream-100">{new Date(event.date).getDate()}</p>
                    <p className="font-body text-[10px] text-cream-200/60 uppercase tracking-wider">{new Date(event.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { month: "short" })}</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-lg text-wine-900 group-hover:text-wine-700 transition-colors duration-300">{locale === "fr" ? event.titleFr : event.titleEn}</h4>
                    <p className="font-body text-sm text-dark-500 mt-2">{locale === "fr" ? event.descFr : event.descEn}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-wine-800/30 group-hover:text-wine-800 mt-2 flex-shrink-0 transition-colors" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h3 className="font-headline text-3xl text-wine-900 mb-8">{t.events.past}</h3>
          </FadeUp>

          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { key: "all", fr: "Tous", en: "All" },
              { key: "bordeaux", fr: "Bordeaux", en: "Bordeaux" },
              { key: "bourgogne", fr: "Bourgogne", en: "Burgundy" },
              { key: "rhone", fr: "Rhône", en: "Rhône" },
              { key: "champagne", fr: "Champagne", en: "Champagne" },
              { key: "provence", fr: "Provence", en: "Provence" },
              { key: "alsace", fr: "Alsace", en: "Alsace" },
              { key: "suisse", fr: "Suisse", en: "Switzerland" },
              { key: "autre", fr: "Autre", en: "Other" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => { setFilter(f.key); setSelectedPast(null); }}
                className={`font-body text-[11px] uppercase tracking-[0.15em] px-5 py-2.5 transition-all duration-300 ${
                  filter === f.key
                    ? "bg-wine-800 text-cream-100"
                    : "border border-wine-800/15 text-wine-800/50 hover:border-wine-800/30 hover:text-wine-800"
                }`}
              >
                {locale === "fr" ? f.fr : f.en}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, i) => {
                const hasContent = event.photoCount > 0 || !!event.instagram;
                const isOpen = selectedPast === i && hasContent;

                return (
                  <div key={`${filter}-${i}`} ref={selectedPast === i ? scrollRef : null} className="bg-white border border-wine-800/10 hover:border-wine-800/25 transition-colors duration-300">
                    <button
                      onClick={() => hasContent && setSelectedPast(isOpen ? null : i)}
                      disabled={!hasContent}
                      className={`w-full text-left group ${hasContent ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div className="p-6 md:p-8 flex items-center justify-between gap-6">
                        <div className="flex-1">
                          <h4 className={`font-display text-lg md:text-xl text-wine-800 ${hasContent ? "group-hover:text-wine-600" : ""} transition-colors duration-500`}>
                            {locale === "fr" ? event.titleFr : event.titleEn}
                          </h4>
                          <p className="font-body text-sm text-dark-500 mt-1">
                            {locale === "fr" ? event.descFr : event.descEn}
                          </p>
                        </div>
                        {hasContent && (
                          <ChevronRight className={`w-4 h-4 text-wine-800/30 flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`} />
                        )}
                      </div>
                    </button>

                    {hasContent && (
                      <div
                        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 md:px-8 pb-8 pt-4 border-t border-wine-800/10">
                            {event.instagram && isOpen && event.noEmbed && (
                            <div className="max-w-lg mx-auto mb-6 text-center py-8">
                              <a
                                href={event.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-wine-800 text-cream-100 px-8 py-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-wine-700 transition-colors"
                              >
                                Voir sur Instagram
                                <ArrowRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                            {event.instagram && isOpen && !event.noEmbed && (
                              <InstagramEmbed url={event.instagram} />
                            )}
                            {event.photoCount > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {Array.from({ length: event.photoCount }).map((_, j) => (
                                  <div key={j} className="aspect-[4/3] bg-bg-alt border border-wine-800/10 flex flex-col items-center justify-center gap-2 hover:border-wine-800/20 transition-colors duration-300">
                                    <ImageIcon className="w-5 h-5 text-dark-300" />
                                    <span className="font-body text-[10px] text-dark-400 uppercase tracking-wider">Photo {j + 1}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <FadeUp>
                <div className="bg-white border border-dashed border-wine-800/20 p-12 text-center max-w-xl mx-auto my-4">
                  <Wine className="w-8 h-8 text-wine-800/30 mx-auto mb-4" />
                  <h4 className="font-display text-xl text-wine-900 mb-2">
                    {locale === "fr" ? "Soyez le premier domaine à faire découvrir cette région !" : "Be the first estate to showcase this region!"}
                  </h4>
                  <p className="font-body text-sm text-dark-500 max-w-sm mx-auto mb-6">
                    {locale === "fr" ? "Vous êtes un domaine ou un vigneron de cette magnifique région ? Contactez-nous pour organiser une dégustation à Lausanne." : "Are you an estate or a winemaker from this beautiful region? Contact us to organize an exclusive tasting in Lausanne."}
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-wider bg-wine-800 text-cream-100 px-6 py-3 hover:bg-wine-700 transition-colors">
                    {locale === "fr" ? "Nous contacter" : "Contact us"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </section>
    </>
  );
}