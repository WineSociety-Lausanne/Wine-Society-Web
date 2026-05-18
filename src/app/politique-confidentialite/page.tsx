"use client";

import { useLang } from "@/lib/lang-context";
import { FadeUp } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";

export default function PolitiqueConfidentialitePage() {
  const { locale } = useLang();

  return (
    <section className="section-padding pt-32 bg-bg">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title={locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"} />
        <FadeUp>
          <div className="space-y-10 font-body text-sm text-dark-400 leading-[1.9]">
            <div>
              <h3 className="font-display text-xl text-cream-100 mb-4">
                {locale === "fr" ? "Responsable du traitement" : "Data controller"}
              </h3>
              <p>Wine Society — Association UNIL · EPFL</p>
              <p>Lausanne, Suisse</p>
              <p>contact@wine-society.ch</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-cream-100 mb-4">
                {locale === "fr" ? "Données collectées" : "Data collected"}
              </h3>
              <p>
                {locale === "fr"
                  ? "Via le formulaire de contact : nom, adresse email, message. Ces données sont utilisées uniquement pour répondre à votre demande et ne sont pas transmises à des tiers."
                  : "Through the contact form: name, email address, message. This data is used solely to respond to your enquiry and is not shared with third parties."}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-cream-100 mb-4">
                {locale === "fr" ? "Base légale" : "Legal basis"}
              </h3>
              <p>
                {locale === "fr"
                  ? "Le traitement est fondé sur votre consentement (art. 6 nLPD). Vous pouvez retirer votre consentement à tout moment en nous contactant."
                  : "Processing is based on your consent (art. 6 nFADP). You may withdraw your consent at any time by contacting us."}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-cream-100 mb-4">
                {locale === "fr" ? "Cookies" : "Cookies"}
              </h3>
              <p>
                {locale === "fr"
                  ? "Ce site utilise des cookies strictement nécessaires au fonctionnement du site. Aucun cookie de suivi ou publicitaire n'est utilisé sans votre consentement explicite."
                  : "This site uses cookies strictly necessary for site functionality. No tracking or advertising cookies are used without your explicit consent."}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-cream-100 mb-4">
                {locale === "fr" ? "Durée de conservation" : "Retention period"}
              </h3>
              <p>
                {locale === "fr"
                  ? "Les données du formulaire de contact sont conservées pendant la durée nécessaire au traitement de votre demande, puis supprimées dans un délai de 12 mois."
                  : "Contact form data is retained for the period necessary to process your enquiry, then deleted within 12 months."}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-cream-100 mb-4">
                {locale === "fr" ? "Vos droits" : "Your rights"}
              </h3>
              <p>
                {locale === "fr"
                  ? "Conformément à la nouvelle Loi fédérale sur la protection des données (nLPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à contact@wine-society.ch."
                  : "In accordance with the Swiss Federal Act on Data Protection (nFADP), you have the right to access, rectify and delete your personal data. To exercise these rights, contact us at contact@wine-society.ch."}
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}