"use client";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { Check, ExternalLink, Minus } from "lucide-react";

const currentPartners: {
  name: string;
  descFr: string;
  descEn: string;
  url: string;
  category: { fr: string; en: string };
  logo?: string;
}[] = [
  {
    name: "Grassl Glass",
    descFr: "Verres de dégustation haut de gamme, conçus pour révéler chaque nuance aromatique. Grassl accompagne nos dégustations avec leur verrerie d'exception.",
    descEn: "Premium tasting glasses designed to reveal every aromatic nuance. Grassl supports our tastings with their exceptional glassware.",
    url: "https://grasslglass.com",
    category: { fr: "Verrerie", en: "Glassware" },
    logo: "/partenaires/grassl.png",
  },
];

export default function PartenairesPage() {
  const { t, locale } = useLang();
  
  const features = [
    "Logos sur flyers et posts récapitulatifs",
    "Emplacement partenaire sur notre site",
    "Flyers sur notre buffet d'apéritif",
    "Newsletter",
    "Interview / Portrait croisé exclusif",
    "Logo (Cartes de visite, PPT, Affiches)",
    "Roll-up permanent",
    "Logo sur pulls comité",
    "Invitations VIP aux dégustations"
  ];

  const tiersMatrix = [
    { 
      name: "Bronze", 
      price: "Prix sur demande", 
      bg: "bg-[#8c2a3e]", // Rubis / Grenat clair
      checks: [true, true, true, true, false, false, false, false, false] 
    },
    { 
      name: "Silver", 
      price: "Prix sur demande", 
      bg: "bg-[#6b1e2e]", // Bordeaux classique
      checks: [true, true, true, true, true, true, false, false, false] 
    },
    { 
      name: "Gold", 
      price: "Prix sur demande", 
      bg: "bg-[#4a121e]", // Rouge vin très sombre / Premium
      checks: [true, true, true, true, true, true, true, true, true] 
    },
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

      {/* Tiers - Structure Verticale & Couleurs Bordeaux */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto overflow-x-auto pb-4">
          <div className="mb-12">
            <h2 className="font-headline text-4xl text-wine-900 mb-4">
              Devenez Partenaire Officiel
            </h2>
            <p className="font-body text-dark-500 text-lg">
              Comparez nos offres et choisissez le niveau de visibilité adapté à vos objectifs.
            </p>
          </div>

          <div className="min-w-[900px]">
            <div className="grid grid-cols-[minmax(300px,1fr)_repeat(3,1fr)] gap-4">
              
              {/* Colonne 1 : Textes descriptifs à gauche */}
              <div className="flex flex-col">
                {/* En-tête invisible pour s'aligner avec les blocs couleurs */}
                <div className="h-28 flex flex-col justify-end pb-6">
                  <div className="font-bold text-wine-900 text-lg">Avantages et Visibilité</div>
                </div>
                {/* Lignes de texte */}
                {features.map((feature, i) => (
                  <div key={i} className="h-14 flex items-center border-b border-gray-100 font-body text-sm text-dark-600 pr-4">
                    {feature}
                  </div>
                ))}
              </div>

              {/* Colonnes 2, 3, 4 : Packs Bronze, Silver, Gold */}
              {tiersMatrix.map((tier, i) => (
                <div key={i} className={`${tier.bg} rounded-2xl flex flex-col overflow-hidden shadow-sm`}>
                  {/* En-tête du pack */}
                  <div className="h-28 flex flex-col justify-center items-center text-center p-4">
                    <h3 className="text-3xl font-bold text-white mb-1">{tier.name}</h3>
                    <p className="text-sm text-white/90">{tier.price}</p>
                  </div>
                  {/* Cases à cocher ou tirets */}
                  {tier.checks.map((hasFeature, j) => (
                    <div key={j} className="h-14 flex items-center justify-center border-t border-white/20">
                      {hasFeature ? (
                        <Check className="w-5 h-5 text-white stroke-[3]" />
                      ) : (
                        <Minus className="w-5 h-5 text-white/40" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <a href="/WineSociety_Sponsoring_2026-2027.pdf" download className="btn-primary inline-block">
               {locale === "fr" ? "Télécharger le dossier complet" : "Download full brochure"}
             </a>
          </div>
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