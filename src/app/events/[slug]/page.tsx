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
        <h2 className="font-headline text-3xl text-wine-900 mb-6">
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

  const practical = [
    locale === "fr" ? "Ouvert à tous les étudiants EPFL, UNIL & EHL" : "Open to all EPFL, UNIL & EHL students",
    locale === "fr" ? "Inscription obligatoire via le formulaire" : "Registration required via the form",
    locale === "fr" ? "Places limitées — premier arrivé, premier servi" : "Limited spots — first come, first served",
    locale === "fr" ? "Apéritif offert après la dégustation" : "Complimentary aperitif after the tasting",
  ];

  return (
    <>
      {/* Héros */}
      <section className="relative bg-wine-950 section-padding pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wine-900 to-wine-950" />
        <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-wine-700/20 blur-3xl" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-cream-100/60 hover:text-gold-400 font-body text-xs uppercase tracking-[0.2em] transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {locale === "fr" ? "Tous les événements" : "All events"}
          </Link>

          <FadeUp>
            <span className="flex items-center gap-3 text-gold-400 font-body text-xs uppercase tracking-[0.3em] mb-5">
              <span className="h-px w-8 bg-gold-400/60" />
              {locale === "fr" ? "Dégustation" : "Wine tasting"}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-cream-100 leading-[1.1]">
              {locale === "fr" ? event.titleFr : event.titleEn}
            </h1>

            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8 text-cream-100/70 font-body text-sm">
              {!event.hideDate && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  {formattedDate}
                </span>
              )}
              {event.time && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-400" />
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
                  <MapPin className="w-4 h-4 text-gold-400" />
                  {event.location}
                </a>
              )}
              {typeof event.spots === "number" && (
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold-400" />
                  {event.spots} {locale === "fr" ? "places" : "spots"}
                </span>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Contenu */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
              {/* À propos */}
              <div>
                <span className="flex items-center gap-3 text-gold-600 font-body text-[11px] uppercase tracking-[0.25em] mb-4">
                  <span className="h-px w-6 bg-gold-600/50" />
                  {locale === "fr" ? "À propos" : "About"}
                </span>
                <p className="font-body text-[15px] text-dark-700 leading-[1.9] whitespace-pre-line">
                  {locale === "fr"
                    ? event.longDescFr ?? event.descFr
                    : event.longDescEn ?? event.descEn}
                </p>

                <div className="mt-10 p-7 bg-bg-alt border border-wine-800/10 rounded-2xl">
                  <h4 className="font-display text-lg text-wine-900 mb-4">
                    {locale === "fr" ? "Infos pratiques" : "Practical info"}
                  </h4>
                  <ul className="space-y-3 font-body text-sm text-dark-700">
                    {practical.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Inscription */}
              <div className="md:sticky md:top-28">
                {event.formUrl ? (
                  <div className="relative overflow-hidden bg-wine-950 rounded-2xl p-9 md:p-10 text-center flex flex-col items-center">
                    <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-wine-700/25 blur-2xl" />
                    <div className="relative z-10 flex flex-col items-center w-full">
                      <div className="w-14 h-14 rounded-full border border-gold-400/30 flex items-center justify-center mb-6">
                        <Users className="w-6 h-6 text-gold-400" />
                      </div>
                      <p className="font-display text-2xl text-cream-100 mb-3">
                        {locale === "fr" ? "Réserve ta place" : "Reserve your spot"}
                      </p>
                      <p className="font-body text-sm text-cream-100/60 leading-relaxed mb-8">
                        {locale === "fr"
                          ? "L'inscription se fait via notre formulaire, où tu joins ta preuve de paiement. Une connexion à un compte Google est nécessaire pour l'envoi."
                          : "Registration is handled through our form, where you attach your proof of payment. A Google account sign-in is required to upload it."}
                      </p>
                      <a
                        href={toFormLink(event.formUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-cream-100 text-wine-900 px-8 py-4 font-body font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300 inline-flex items-center justify-center gap-3"
                      >
                        {locale === "fr" ? "S'inscrire" : "Register"}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-bg-alt border border-wine-800/10 rounded-2xl p-9 md:p-10 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border border-gold-500/25 flex items-center justify-center mb-6">
                      <Calendar className="w-6 h-6 text-gold-500/60" />
                    </div>
                    <p className="font-display text-xl text-wine-900 mb-3">
                      {locale === "fr" ? "Inscriptions bientôt ouvertes" : "Registration opening soon"}
                    </p>
                    <p className="font-body text-sm text-dark-600 leading-relaxed">
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
