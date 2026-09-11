"use client";

import { useLang } from "@/lib/lang-context";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import PageHeader from "@/components/PageHeader";

// Initiales (prénom + nom) pour le monogramme, ex. "Orso Renucci" → "OR"
const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// 1. Comité (Direction)
const direction = [
  { nameKey: "president", name: "Damien Grosset-Bourbange", fallbackRole: "Président" },
  { nameKey: "vicePresident", name: "Jan Hoffman", fallbackRole: "Vice-Président" },
  { nameKey: "treasurer", name: "Thomas Grosso", fallbackRole: "Trésorier" },
];

// 2. Responsables de Pôles
const responsables = [
  { nameKey: "events", name: "Orso Renucci", fallbackRole: "Responsable Événements" },
  { nameKey: "sponsorship", name: "Adonis Casteret", fallbackRole: "Responsable Sponsoring" },
  { nameKey: "communication", name: "Mirko Von Kaenel", fallbackRole: "Responsable Communication" },
];

// 3. Membres, regroupés par pôle
const poles = [
  { fr: "Pôle Événements", en: "Events", members: ["Stephanie Kuttler", "Elsa Martinoli", "Youenn Boloré", "Hippolyte Richard"] },
  { fr: "Pôle Sponsoring", en: "Sponsorship", members: ["Colin Leproux", "Eva Krief"] },
  { fr: "Pôle Logistique", en: "Logistics", members: ["Louis Steinmetz", "Jules Weill"] },
  { fr: "Pôle Communication", en: "Communication", members: ["Eva Beyer"] },
];

export default function TeamPage() {
  const { t, locale } = useLang();

  // Fonction utilitaire pour éviter que ça crash si la clé de traduction n'existe pas encore
  const getRole = (key: string, fallback: string) => {
    // Si t.team.roles existe et contient la clé, on l'utilise, sinon on utilise le texte par défaut
    return (t?.team?.roles as Record<string, string> | undefined)?.[key] || fallback;
  };

  return (
    <>
      <section className="relative px-6 md:px-12 lg:px-24 pt-40 pb-16 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <PageHeader
            kicker={locale === "fr" ? "Le comité" : "The committee"}
            title={t?.team?.title || "Notre Équipe"}
          />
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto space-y-20">
          
          {/* SECTION 1 : COMITÉ */}
          <div>
            <div className="flex items-baseline gap-4 mb-10">
              <span className="font-body text-[11px] text-gold-500 tracking-[0.35em]">01</span>
              <h2 className="font-headline text-3xl md:text-4xl text-wine-900">
                {t?.team?.sections?.committee}
              </h2>
              <span className="flex-1 h-px bg-wine-800/10" />
            </div>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {direction.map((member, i) => (
                <StaggerItem key={`dir-${i}`}>
                  <div className="bg-white border border-wine-800/10 p-10 text-center group hover:border-wine-800/25 transition-colors duration-500 h-full">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-wine-800/[0.04] border border-wine-800/10 group-hover:bg-wine-800 group-hover:border-wine-800 transition-colors duration-500">
                      <span className="font-display text-2xl text-wine-800/70 group-hover:text-cream-100 transition-colors duration-500">
                        {initials(member.name)}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-wine-900">{member.name}</h3>
                    <p className="font-body text-[10px] text-wine-700/50 mt-2 uppercase tracking-[0.2em]">
                      {getRole(member.nameKey, member.fallbackRole)}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* SECTION 2 : RESPONSABLES */}
          <div>
            <div className="flex items-baseline gap-4 mb-10">
              <span className="font-body text-[11px] text-gold-500 tracking-[0.35em]">02</span>
              <h2 className="font-headline text-3xl md:text-4xl text-wine-900">
                {t?.team?.sections?.heads}
              </h2>
              <span className="flex-1 h-px bg-wine-800/10" />
            </div>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {responsables.map((member, i) => (
                <StaggerItem key={`resp-${i}`}>
                  <div className="bg-white border border-wine-800/10 p-10 text-center group hover:border-wine-800/25 transition-colors duration-500 h-full">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-wine-800/[0.04] border border-wine-800/10 group-hover:bg-wine-800 group-hover:border-wine-800 transition-colors duration-500">
                      <span className="font-display text-2xl text-wine-800/70 group-hover:text-cream-100 transition-colors duration-500">
                        {initials(member.name)}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-wine-900">{member.name}</h3>
                    <p className="font-body text-[10px] text-wine-700/50 mt-2 uppercase tracking-[0.2em]">
                      {getRole(member.nameKey, member.fallbackRole)}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* SECTION 3 : MEMBRES PAR PÔLE */}
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-body text-[11px] text-gold-500 tracking-[0.35em]">03</span>
              <h2 className="font-headline text-3xl md:text-4xl text-wine-900">
                {t?.team?.sections?.members}
              </h2>
              <span className="flex-1 h-px bg-wine-800/10" />
            </div>
            <StaggerContainer>
              {poles.map((pole, i) => (
                <StaggerItem key={`pole-${i}`}>
                  <div className="grid md:grid-cols-[240px_1fr] gap-4 md:gap-10 py-9 border-t border-wine-800/10">
                    <div>
                      <h3 className="font-headline text-xl md:text-2xl text-wine-900">
                        {locale === "fr" ? pole.fr : pole.en}
                      </h3>
                      <p className="font-body text-[10px] text-wine-700/40 uppercase tracking-[0.2em] mt-2">
                        {pole.members.length}{" "}
                        {locale === "fr"
                          ? pole.members.length > 1
                            ? "membres"
                            : "membre"
                          : pole.members.length > 1
                            ? "members"
                            : "member"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-10 gap-y-5">
                      {pole.members.map((name, j) => (
                        <div key={`pm-${j}`} className="flex items-center gap-3 group">
                          <span className="w-11 h-11 rounded-full flex items-center justify-center bg-wine-800/[0.04] border border-wine-800/10 group-hover:bg-wine-800 group-hover:border-wine-800 transition-colors duration-500 flex-shrink-0">
                            <span className="font-display text-sm text-wine-800/70 group-hover:text-cream-100 transition-colors duration-500">
                              {initials(name)}
                            </span>
                          </span>
                          <span className="font-display text-lg text-wine-900">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </section>
    </>
  );
}