"use client";

import { useState , useEffect} from "react";
import { useLang } from "@/lib/lang-context";
import { FadeUp } from "@/components/AnimatedText";
import PageHeader from "@/components/PageHeader";
import { MapPin, Award, ChevronRight } from "lucide-react";
import Image from "next/image";


const competitionImages: Record<string, { placeholder: string; photos: string[] }> = {
  "The Left Bank Bordeaux Cup 2026": {
    placeholder: "",
    photos: [
      "/competitions/left-bank-26/1.jpg",
      "/competitions/left-bank-26/2b.jpg",
      "/competitions/left-bank-26/3.jpg",
      "/competitions/left-bank-26/4.jpg",
      "/competitions/left-bank-26/5.jpg",
      "/competitions/left-bank-26/6.jpg",
    ],
  },
  "Elyxir 2026": {
    placeholder: "",
    photos: [
      "/competitions/elyxir/1.jpg",
      "/competitions/elyxir/2.jpg",
      "/competitions/elyxir/3.jpg",
      "/competitions/elyxir/4.jpg",
      "/competitions/elyxir/5.jpg",
    ],
  },
  "The Left Bank Bordeaux Cup Final 2025 a venir": {
    placeholder: "",
    photos: [
      "/competitions/left-bank-25/1.jpg",
      "/competitions/left-bank-25/2.jpg",
      "/competitions/left-bank-25/3.jpg",
    ],
  },
};

export default function CompetitionsPage() {
  const { t, locale } = useLang();
  const [selectedComp, setSelectedComp] = useState<number | null>(null);
  useEffect(() => {
    Object.values(competitionImages).forEach((comp) => {
      comp.photos.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    });
  }, []);

  return (
    <>
      <section className="relative px-6 md:px-12 lg:px-24 pt-40 pb-16 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <PageHeader
            kicker={locale === "fr" ? "International" : "International"}
            title={t.competitions.title}
          />
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto space-y-4">
          {t.competitions.list.map((comp, i) => {
            const isOpen = selectedComp === i;
            const images = competitionImages[comp.name];
            const cover = images?.photos?.[0];
            const gallery = images?.photos ?? [];

            {/* Première compétition = mise en avant (grande carte + couverture) */}
            if (i === 0) {
              return (
                <FadeUp key={i}>
                  <div className="bg-white border border-wine-800/10 overflow-hidden">
                    {cover && (
                      <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full">
                        <Image
                          src={cover}
                          alt={comp.name}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 1024px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-wine-950/75 via-wine-950/10 to-transparent" />
                        <span className="absolute top-4 left-4 md:top-5 md:left-5 bg-gold-500 text-wine-950 font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] px-2.5 py-1 md:px-3 md:py-1.5">
                          {locale === "fr" ? "Compétition phare" : "Flagship competition"}
                        </span>
                        {/* Texte superposé : desktop uniquement */}
                        <div className="hidden md:block absolute bottom-0 left-0 right-0 p-10">
                          <div className="flex items-center gap-3 mb-2">
                            <Award className="w-4 h-4 text-gold-400/80" />
                            <span className="font-body text-[10px] text-cream-200/70 uppercase tracking-[0.3em]">{comp.organizer}</span>
                          </div>
                          <h3 className="font-headline text-4xl text-cream-100">{comp.name}</h3>
                          <div className="flex items-center gap-2 mt-3">
                            <MapPin className="w-3.5 h-3.5 text-cream-200/50" />
                            <span className="font-body text-sm text-cream-200/60">{comp.location}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-6 md:p-10">
                      {/* Texte sous l'image : mobile uniquement */}
                      <div className="md:hidden mb-5">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className="w-4 h-4 text-wine-700/50" />
                          <span className="font-body text-[10px] text-wine-700/50 uppercase tracking-[0.3em]">{comp.organizer}</span>
                        </div>
                        <h3 className="font-headline text-3xl text-wine-900">{comp.name}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <MapPin className="w-3.5 h-3.5 text-dark-400" />
                          <span className="font-body text-sm text-dark-500">{comp.location}</span>
                        </div>
                      </div>
                      <p className="font-body text-dark-500 text-sm leading-relaxed max-w-2xl">{comp.description}</p>
                      {gallery.length > 1 && (
                        <>
                          <button
                            onClick={() => setSelectedComp(isOpen ? null : i)}
                            className="mt-6 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-wine-800 hover:text-wine-600 transition-colors"
                          >
                            {isOpen
                              ? locale === "fr" ? "Masquer les photos" : "Hide photos"
                              : locale === "fr" ? "Voir les photos" : "View photos"}
                            <ChevronRight className={`w-4 h-4 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`} />
                          </button>
                          <div className="grid transition-[grid-template-rows] duration-500 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                            <div className="overflow-hidden">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6">
                                {gallery.map((src, j) => (
                                  <div key={j} className="aspect-[4/3] overflow-hidden border border-wine-800/10 relative">
                                    <Image src={src} alt={`${comp.name} - Photo ${j + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </FadeUp>
              );
            }

            {/* Autres compétitions = ligne avec vignette + accordéon */}
            return (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="bg-white border border-wine-800/10 hover:border-wine-800/25 transition-colors duration-300">
                  <button onClick={() => setSelectedComp(isOpen ? null : i)} className="w-full text-left group">
                    <div className="p-6 md:p-8 flex items-stretch gap-6">
                      {cover && (
                        <div className="relative w-28 md:w-36 self-stretch flex-shrink-0 overflow-hidden border border-wine-800/10 hidden sm:block">
                          <Image src={cover} alt={comp.name} fill sizes="150px" className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1 flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Award className="w-4 h-4 text-wine-700/50" />
                            <span className="font-body text-[10px] text-wine-700/50 uppercase tracking-[0.3em]">{comp.organizer}</span>
                          </div>
                          <h3 className="font-headline text-2xl md:text-3xl text-wine-900 group-hover:text-wine-700 transition-colors duration-500">{comp.name}</h3>
                          <div className="flex items-center gap-2 mt-3">
                            <MapPin className="w-3.5 h-3.5 text-dark-400" />
                            <span className="font-body text-sm text-dark-500">{comp.location}</span>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-wine-800/30 mt-2 flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`} />
                      </div>
                    </div>
                  </button>

                  <div className="grid transition-[grid-template-rows] duration-500 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-10 pt-4 border-t border-wine-800/10">
                        <p className="font-body text-dark-500 text-sm leading-relaxed mb-8 max-w-2xl">{comp.description}</p>
                        {gallery.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {gallery.map((src, j) => (
                              <div key={j} className="aspect-[4/3] overflow-hidden border border-wine-800/10 relative">
                                <Image src={src} alt={`${comp.name} - Photo ${j + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="font-body text-dark-400 text-sm italic">
                            {locale === "fr" ? "Photos à venir" : "Photos coming soon"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>
    </>
  );
}