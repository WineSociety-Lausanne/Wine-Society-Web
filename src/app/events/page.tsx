"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import { getUpcomingEvents, getPastEvents } from "@/lib/events";
import { Calendar, Clock, MapPin, Wine, ChevronRight, ImageIcon, ArrowRight } from "lucide-react";

// Source unique : src/data/events.json (édition via /admin).
// La répartition « à venir » / « passés » est automatique selon la date de chaque événement :
// un événement bascule tout seul dans les « passés » une fois sa date dépassée.
// Les dates des événements passés ne sont pas affichées (champ hideDate).
const upcomingEvents = getUpcomingEvents();
const pastHighlights = getPastEvents();

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
                const photoCount = event.photoCount ?? 0;
                const hasContent = photoCount > 0 || !!event.instagram;
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
                            {photoCount > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {Array.from({ length: photoCount }).map((_, j) => (
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