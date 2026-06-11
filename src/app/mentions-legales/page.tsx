"use client";

import { useLang } from "@/lib/lang-context";
import { FadeUp } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";

export default function MentionsLegalesPage() {
  const { locale } = useLang();

  return (
    <section className="section-padding pt-32 bg-bg">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title={locale === "fr" ? "Mentions légales" : "Legal Notice"} />
        <FadeUp>
          <div className="space-y-10 font-body text-sm text-dark-400 leading-[1.9]">
            <div>
              <h3 className="font-display text-xl text-dark-800 mb-4">
                {locale === "fr" ? "Éditeur du site" : "Site publisher"}
              </h3>
              <p>Wine Society — Association UNIL · EPFL</p>
              <p>Lausanne, Suisse</p>
              <p>Email : contact@wine-society.ch</p>
              <p>Site : www.wine-society.ch</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-dark-800 mb-4">
                {locale === "fr" ? "Responsable de la publication" : "Publication manager"}
              </h3>
              <p>Wine Society — Association UNIL · EPFL</p>
              <p>contact@wine-society.ch</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-dark-800 mb-4">
                {locale === "fr" ? "Hébergement" : "Hosting"}
              </h3>
              <p>{locale === "fr" ? "Vercel" : "Vercel"}</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-dark-800 mb-4">
                {locale === "fr" ? "Propriété intellectuelle" : "Intellectual property"}
              </h3>
              <p>
                {locale === "fr"
                  ? "L'ensemble du contenu de ce site (textes, images, logos) est la propriété de la Wine Society ou de ses partenaires. Toute reproduction sans autorisation préalable est interdite."
                  : "All content on this site (text, images, logos) is the property of Wine Society or its partners. Any reproduction without prior authorisation is prohibited."}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-dark-800 mb-4">
                {locale === "fr" ? "Consommation responsable" : "Responsible drinking"}
              </h3>
              <p>
                {locale === "fr"
                  ? "L'abus d'alcool est dangereux pour la santé. À consommer avec modération. La vente d'alcool est interdite aux mineurs."
                  : "Alcohol abuse is dangerous for health. Drink responsibly. The sale of alcohol to minors is prohibited."}
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}