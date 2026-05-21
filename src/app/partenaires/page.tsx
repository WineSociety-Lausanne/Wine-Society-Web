"use client";

import { useLang } from "@/lib/lang-context";
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";

const currentPartners: {
  name: string;
  descFr: string;
  descEn: string;
  url: string;
  category:{ fr: string; en: string };
}[] = [
  
  /*{
    name: "Grassl Glass",
    descFr: "Verres de dégustation haut de gamme, conçus pour révéler chaque nuance aromatique. Grassl accompagne nos dégustations avec leur verrerie d'exception.",
    descEn: "Premium tasting glasses designed to reveal every aromatic nuance. Grassl supports our tastings with their exceptional glassware.",
    url: "https://glasslglass.com",
    category: { fr: "Verrerie", en: "Glassware" },
  },*/
  /*{
    name: "Daniel Gazzar Vins",
    descFr: "Maison de vins basée à Pully, sélection pointue de domaines français et suisses. Partenaire clé pour nos bouteilles d'entraînement aux concours.",
    descEn: "Wine house based in Pully, with a refined selection of French and Swiss estates. Key partner for our competition training samples.",
    url: "https://daniel-vins.ch",
    category: { fr: "Vins", en: "Wines" },
  },*/
];

export default function PartenairesPage() {
  const { t, locale } = useLang();
  const tiers = [
    { ...t.partners.tiers.bronze, accent: "border-amber-700/30 hover:border-amber-700/50", badge: "bg-amber-800/10 text-amber-800", header: "bg-gradient-to-br from-amber-700 to-amber-800" },
    { ...t.partners.tiers.silver, accent: "border-dark-400/30 hover:border-dark-400/50", badge: "bg-dark-400/10 text-dark-600", header: "bg-gradient-to-br from-dark-400 to-dark-500" },
    { ...t.partners.tiers.gold, accent: "border-gold-500/30 hover:border-gold-500/50", badge: "bg-gold-500/10 text-gold-600", header: "bg-gradient-to-br from-gold-400 to-gold-500" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-40 pb-8 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader title={t.partners.title} subtitle={t.partners.subtitle} light />
        </div>
      </section>

      {/* Current partners */}
      {currentPartners.length > 0 && (
        <section className="section-padding bg-bg">
          <div className="max-w-5xl mx-auto space-y-6">
            {currentPartners.map((partner, i) => (
              <SlideIn key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.15}>
                <div className="bg-white border border-wine-800/10 p-10 md:p-14 group hover:border-wine-800/25 transition-all duration-700">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="flex-1">
                      <span className="font-body text-wine-700/50 text-[10px] uppercase tracking-[0.3em]">
                        {locale === "fr" ? partner.category.fr : partner.category.en}
                      </span>
                      <h3 className="font-headline text-3xl md:text-4xl text-wine-900 mt-3 mb-5 group-hover:text-wine-700 transition-colors duration-500">{partner.name}</h3>
                      <p className="font-body text-dark-500 text-sm leading-[1.8] max-w-lg">
                        {locale === "fr" ? partner.descFr : partner.descEn}
                      </p>
                    </div>
                    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-shrink-0 mt-4 md:mt-8">
                      {locale === "fr" ? "Visiter" : "Visit"} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </section>
      )}

      {/* Why sponsor */}
      <section className="section-padding bg-bg-alt">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t.partners.whyTitle} />
          <StaggerContainer className="grid md:grid-cols-2 gap-12">
            {t.partners.reasons.map((reason, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-6">
                  <span className="font-headline text-4xl text-wine-800/15">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl text-wine-900 mb-3">{reason.title}</h3>
                    <p className="font-body text-sm text-dark-500 leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Tiers */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t.partners.tiers.title} />
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <StaggerItem key={i}>
                <div className={`border ${tier.accent} bg-white transition-all duration-500 h-full flex flex-col`}>
                  <div className={`${tier.header} p-10 pb-8 text-center`}>
                    <p className="font-body text-cream-100/70 text-xs uppercase tracking-[0.2em]">Sponsor</p>
                    <p className="font-headline text-4xl text-cream-100 mt-2">{tier.name}</p>
                    <p className="font-display text-cream-100/60 text-sm mt-2 italic">
                      {locale === "fr" ? "Sur demande" : "On request"}
                    </p>
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <ul className="space-y-4 flex-1">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3 font-body text-sm text-dark-500">
                          <Check className="w-3.5 h-3.5 text-wine-700/50 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a href="/WineSociety_Sponsoring_2025-2026.pdf" download className="btn-primary w-full mt-8 text-center">
                      {locale === "fr" ? "Télécharger le dossier" : "Download brochure"}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="section-padding bg-wine-900 text-center">
        <FadeUp>
          <p className="font-display text-2xl md:text-3xl text-cream-100 mb-4">
            {locale === "fr" ? "Intéressé par un partenariat ?" : "Interested in a partnership?"}
          </p>
          <p className="font-body text-cream-200/40 text-sm mb-8">
            {locale === "fr" ? "Contactez-nous pour discuter d'une offre sur mesure" : "Get in touch to discuss a tailored offer"}
          </p>
          <Link href="/contact" className="bg-cream-100 text-wine-900 px-10 py-4 font-body font-semibold text-xs uppercase tracking-[0.25em] hover:bg-white transition-all duration-500 inline-block text-center">
            {locale === "fr" ? "Nous contacter" : "Contact us"}
          </Link>
        </FadeUp>
      </section>
    </>
  );
}