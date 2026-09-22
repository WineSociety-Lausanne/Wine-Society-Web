"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { FadeUp } from "@/components/AnimatedText";
import { ArrowLeft, Calendar, Clock, ExternalLink, MapPin, Users } from "lucide-react";
import { getEventBySlug } from "@/lib/events";

// Lien d'inscription ouvert en plein écran (nouvel onglet), pas en iframe.
// On retire les paramètres qui cassent l'accès : usp (lien éditeur),
// ouid (identifiant du compte propriétaire, source d'erreurs de connexion)
// et embedded (réservé à l'iframe).
function toFormLink(raw: string): string {
  try {
    const url = new URL(raw);
    if (url.hostname.includes("docs.google.com")) {
      url.searchParams.delete("usp");
      url.searchParams.delete("ouid");
      url.searchParams.delete("embedded");
      return url.toString();
    }
    return raw;
  } catch {
    return raw;
  }
}

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLang();
  const event = getEventBySlug(slug);

  if (!event) {
    return (
      <section className="section-padding pt-32 text-center">
        <h2 className="font-headline text-3xl text-cream-100 mb-6">
          {locale === "fr" ? "Événement introuvable" : "Event not found"}
        </h2>
        <Link href="/events" className="btn-outline">
          {locale === "fr" ? "Retour aux événements" : "Back to events"}
        </Link>
      </section>
    );
  }

  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  // Pour intégrer ton Google Form :
  // 1. Crée ton form sur Google Forms
  // 2. Clique sur Envoyer > icône <> (intégrer)
  // 3. Copie l'URL qui ressemble à : https://docs.google.com/forms/d/e/XXXXX/viewform?embedded=true
  // 4. Colle-la dans formUrl ci-dessus

  return (
    <>
      {/* Header */}
      <section className="relative section-padding pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-wine-900/40 via-wine-950 to-wine-950" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-dark-500 hover:text-gold-400 font-body text-xs uppercase tracking-[0.2em] transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {locale === "fr" ? "Tous les événements" : "All events"}
          </Link>

          <FadeUp>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-cream-100 leading-tight">
              {locale === "fr" ? event.titleFr : event.titleEn}
            </h1>
            <div className="divider-gold mt-6 mb-8" />

            <div className="flex flex-wrap gap-8 text-dark-400 font-body text-sm">
              {!event.hideDate && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-500/50" />
                  {formattedDate}
                </span>
              )}
              {event.time && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-500/50" />
                  {event.time}
                </span>
              )}
              {event.location && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gold-500/50" />
                  {event.location}
                </a>
              )}
              {typeof event.spots === "number" && (
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold-500/50" />
                  {event.spots} places
                </span>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Description + Form */}
      <section className="section-padding pt-0">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-16">
              {/* Description */}
              <div>
                <h3 className="font-display text-xl text-cream-100 mb-4">
                  {locale === "fr" ? "À propos" : "About"}
                </h3>
                <p className="font-body text-sm text-dark-400 leading-[1.9]">
                  {locale === "fr"
                    ? event.longDescFr ?? event.descFr
                    : event.longDescEn ?? event.descEn}
                </p>

                <div className="mt-10 p-6 bg-dark-900 border border-white/5 rounded-xl">
                  <h4 className="font-display text-lg text-cream-100 mb-3">
                    {locale === "fr" ? "Infos pratiques" : "Practical info"}
                  </h4>
                  <ul className="space-y-3 font-body text-sm text-dark-400">
                    <li className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold-500/40 mt-2 flex-shrink-0" />
                      {locale === "fr" ? "Ouvert à tous les étudiants EPFL, UNIL & EHL" : "Open to all EPFL, UNIL & EHL students"}
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold-500/40 mt-2 flex-shrink-0" />
                      {locale === "fr" ? "Inscription obligatoire via le formulaire" : "Registration required via the form"}
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold-500/40 mt-2 flex-shrink-0" />
                      {locale === "fr" ? "Places limitées — premier arrivé, premier servi" : "Limited spots — first come, first served"}
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold-500/40 mt-2 flex-shrink-0" />
                      {locale === "fr" ? "Apéritif offert après la dégustation" : "Complimentary aperitif after the tasting"}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Google Form */}
              <div>
                <h3 className="font-display text-xl text-cream-100 mb-4">
                  {locale === "fr" ? "Inscription" : "Registration"}
                </h3>

                {event.formUrl ? (
                  <div className="bg-dark-900 border border-white/5 p-10 md:p-12 text-center flex flex-col items-center justify-center rounded-xl">
                    <div className="w-16 h-16 border border-gold-500/20 rounded-full flex items-center justify-center mb-6">
                      <Users className="w-7 h-7 text-gold-500/60" />
                    </div>
                    <p className="font-display text-xl text-cream-100 mb-3">
                      {locale === "fr" ? "Réserve ta place" : "Reserve your spot"}
                    </p>
                    <p className="font-body text-sm text-dark-500 max-w-sm mb-8">
                      {locale === "fr"
                        ? "L'inscription se fait via notre formulaire, où tu pourras joindre ta preuve de paiement. Une connexion à un compte Google est nécessaire pour envoyer le justificatif."
                        : "Registration is handled through our form, where you can attach your proof of payment. A Google account sign-in is required to upload the receipt."}
                    </p>
                    <a
                      href={toFormLink(event.formUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center justify-center gap-3"
                    >
                      {locale === "fr" ? "S'inscrire" : "Register"}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="bg-dark-900 border border-white/5 p-12 text-center min-h-[400px] flex flex-col items-center justify-center rounded-xl">
                    <div className="w-16 h-16 border border-gold-500/20 rounded-full flex items-center justify-center mb-6">
                      <Calendar className="w-7 h-7 text-gold-500/40" />
                    </div>
                    <p className="font-display text-xl text-cream-100 mb-3">
                      {locale === "fr" ? "Inscriptions bientôt ouvertes" : "Registration opening soon"}
                    </p>
                    <p className="font-body text-sm text-dark-500 max-w-xs">
                      {locale === "fr"
                        ? "Le formulaire d'inscription sera disponible prochainement. Suivez-nous sur les réseaux sociaux pour être informé !"
                        : "The registration form will be available soon. Follow us on social media to stay informed!"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}