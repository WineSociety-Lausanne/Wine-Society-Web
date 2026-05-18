"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import { MapPin, Award, ChevronRight, ImageIcon } from "lucide-react";

const competitionImages: Record<string, { placeholder: string; count: number }> = {
  "The Left Bank Bordeaux Cup": { placeholder: "Dégustation à l'aveugle des grands crus bordelais à Londres", count: 6 },
  Elyxir: { placeholder: "Compétition inter-écoles au cœur de Paris", count: 4 },
  "Millésime EHL": { placeholder: "Concours local à l'École Hôtelière de Lausanne", count: 4 },
  "L'Étiquette": { placeholder: "Compétition œnologique à Kedge Business School", count: 4 },
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
          <StaggerContainer className="space-y-4">
            {t.competitions.list.map((comp, i) => {
              const images = competitionImages[comp.name];
              return (
                <StaggerItem key={i}>
                  <button
                    onClick={() => setSelectedComp(selectedComp === i ? null : i)}
                    className="w-full text-left bg-white border border-wine-800/10 hover:border-wine-800/25 transition-all duration-500 group"
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
                      <ChevronRight className={`w-5 h-5 text-wine-800/30 transition-transform duration-300 mt-2 ${selectedComp === i ? "rotate-90" : ""}`} />
                    </div>

                    <AnimatePresence>
                      {selectedComp === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 md:px-10 pb-10 border-t border-wine-800/10 pt-8">
                            <p className="font-body text-dark-500 text-sm leading-relaxed mb-8 max-w-2xl">{comp.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {Array.from({ length: images?.count || 4 }).map((_, j) => (
                                <div key={j} className="aspect-[4/3] bg-bg-alt border border-wine-800/10 flex flex-col items-center justify-center gap-2 hover:border-wine-800/20 transition-colors duration-300">
                                  <ImageIcon className="w-6 h-6 text-dark-300" />
                                  <span className="font-body text-[10px] text-dark-400 uppercase tracking-wider">Photo {j + 1}</span>
                                </div>
                              ))}
                            </div>
                            {images && <p className="font-body text-dark-400 text-xs mt-4 italic">{images.placeholder}</p>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}