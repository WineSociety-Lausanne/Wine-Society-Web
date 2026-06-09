"use client";

import { useLang } from "@/lib/lang-context";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import { User } from "lucide-react";

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
  { nameKey: "communication", name: "Mirko", fallbackRole: "Responsable Communication" },
];

// 3. Membres
const membres = [
  { nameKey: "memberSponso", name: "Colin ..", fallbackRole: "Pôle Sponsoring" },
  { nameKey: "memberSponso", name: "Eva Krief", fallbackRole: "Pôle Sponsoring" },
  { nameKey: "memberLogistique", name: "Louis ..", fallbackRole: "Pôle Logistique" },
  { nameKey: "memberLogistique", name: "Jules Weill", fallbackRole: "Pôle Logistique" },
  { nameKey: "memberEvent", name: "Stephanie Kuttler", fallbackRole: "Pôle Événements" },
  { nameKey: "memberEvent", name: "Elsa ..", fallbackRole: "Pôle Événements" },
  { nameKey: "memberEvent", name: "Youenn Boloré", fallbackRole: "Pôle Événements" },
  { nameKey: "memberEvent", name: "Hippolyte Richard", fallbackRole: "Pôle Événements" },
  { nameKey: "memberComm", name: "Eva B..", fallbackRole: "Pôle Communication" },
];

export default function TeamPage() {
  const { t } = useLang();

  // Fonction utilitaire pour éviter que ça crash si la clé de traduction n'existe pas encore
  const getRole = (key: string, fallback: string) => {
    // Si t.team.roles existe et contient la clé, on l'utilise, sinon on utilise le texte par défaut
    return (t?.team?.roles as any)?.[key] || fallback;
  };

  return (
    <>
      <section className="relative px-6 md:px-12 lg:px-24 pt-40 pb-8 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader title={t?.team?.title || "Notre Équipe"} subtitle={t?.team?.subtitle || "Comité de la Wine Society"} light />
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto space-y-20">
          
          {/* SECTION 1 : COMITÉ */}
          <div>
            <h2 className="font-headline text-3xl md:text-4xl text-wine-900 mb-8 text-center">
              {t?.team?.sections?.committee}
            </h2>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {direction.map((member, i) => (
                <StaggerItem key={`dir-${i}`}>
                  <div className="bg-white border border-wine-800/10 p-10 text-center group hover:border-wine-800/25 transition-colors duration-500 h-full">
                    <div className="w-20 h-20 mx-auto mb-6 border border-wine-800/10 rounded-full flex items-center justify-center group-hover:border-wine-700/30 transition-colors duration-500">
                      <User className="w-7 h-7 text-dark-300 group-hover:text-wine-700 transition-colors duration-500" />
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
            <h2 className="font-headline text-3xl md:text-4xl text-wine-900 mb-8 text-center">
              {t?.team?.sections?.heads}
            </h2>            
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {responsables.map((member, i) => (
                <StaggerItem key={`resp-${i}`}>
                  <div className="bg-white border border-wine-800/10 p-10 text-center group hover:border-wine-800/25 transition-colors duration-500 h-full">
                    <div className="w-20 h-20 mx-auto mb-6 border border-wine-800/10 rounded-full flex items-center justify-center group-hover:border-wine-700/30 transition-colors duration-500">
                      <User className="w-7 h-7 text-dark-300 group-hover:text-wine-700 transition-colors duration-500" />
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

          {/* SECTION 3 : MEMBRES */}
          <div>
            <h2 className="font-headline text-3xl md:text-4xl text-wine-900 mb-8 text-center">
              {t?.team?.sections?.members}
            </h2>            
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {membres.map((member, i) => (
                <StaggerItem key={`mem-${i}`}>
                  <div className="bg-white border border-wine-800/10 p-8 text-center group hover:border-wine-800/25 transition-colors duration-500 h-full">
                    <div className="w-16 h-16 mx-auto mb-4 border border-wine-800/10 rounded-full flex items-center justify-center group-hover:border-wine-700/30 transition-colors duration-500">
                      <User className="w-6 h-6 text-dark-300 group-hover:text-wine-700 transition-colors duration-500" />
                    </div>
                    <h3 className="font-display text-base text-wine-900">{member.name}</h3>
                    <p className="font-body text-[10px] text-wine-700/50 mt-2 uppercase tracking-[0.2em]">
                      {getRole(member.nameKey, member.fallbackRole)}
                    </p>
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