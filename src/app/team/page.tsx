"use client";

import { useLang } from "@/lib/lang-context";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import { User } from "lucide-react";

const teamMembers = [
  { nameKey: "president", name: "À définir" },
  { nameKey: "vicePresident", name: "À définir" },
  { nameKey: "sponsorship", name: "Adonis Casteret" },
  { nameKey: "events", name: "À définir" },
  { nameKey: "communication", name: "À définir" },
  { nameKey: "treasurer", name: "À définir" },
];

export default function TeamPage() {
  const { t } = useLang();

  return (
    <>
      <section className="relative section-padding pt-32 pb-16 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader title={t.team.title} subtitle={t.team.subtitle} light />
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <StaggerItem key={i}>
                <div className="bg-white border border-wine-800/10 p-10 text-center group hover:border-wine-800/25 transition-colors duration-500">
                  <div className="w-20 h-20 mx-auto mb-6 border border-wine-800/10 rounded-full flex items-center justify-center group-hover:border-wine-700/30 transition-colors duration-500">
                    <User className="w-7 h-7 text-dark-300 group-hover:text-wine-700 transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-lg text-wine-900">{member.name}</h3>
                  <p className="font-body text-[10px] text-wine-700/50 mt-2 uppercase tracking-[0.2em]">
                    {t.team.roles[member.nameKey as keyof typeof t.team.roles]}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}