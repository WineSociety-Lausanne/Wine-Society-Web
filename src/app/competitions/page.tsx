"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";
import { FadeUp } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
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
  const { t } = useLang();
  const [selectedComp, setSelectedComp] = useState<number | null>(null);

  return (
    <>
      <section className="relative section-padding pt-32 pb-16 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader title={t.competitions.title} subtitle={t.competitions.subtitle} light />
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {t.competitions.list.map((comp, i) => {
              const isOpen = selectedComp === i;
              const images = competitionImages[comp.name];
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="bg-white border border-wine-800/10 hover:border-wine-800/25 transition-colors duration-300">
                    <button
                      onClick={() => setSelectedComp(isOpen ? null : i)}
                      className="w-full text-left group"
                    >
                      <div className="p-8 md:p-10 flex items-start justify-between gap-6">
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
                    </button>

                    <div
                      className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-8 md:px-10 pb-10 pt-4 border-t border-wine-800/10">
                          <p className="font-body text-dark-500 text-sm leading-relaxed mb-8 max-w-2xl">{comp.description}</p>
                          {images && images.photos.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {images.photos.map((src, j) => (
                                <div key={j} className="aspect-[4/3] overflow-hidden border border-wine-800/10 relative">
                                  <Image
                                    src={src}
                                    alt={`${comp.name} - Photo ${j + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="font-body text-dark-400 text-sm italic">
                              Photos à venir
                            </p>
                          )}
                          {images?.placeholder && <p className="font-body text-dark-400 text-xs mt-4 italic">{images.placeholder}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}