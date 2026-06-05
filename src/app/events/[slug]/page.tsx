"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { FadeUp } from "@/components/AnimatedText";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";

const events: Record<string, {
  titleFr: string;
  titleEn: string;
  date: string;
  time: string;
  location: string;
  descFr: string;
  descEn: string;
  spots: number;
  formUrl: string | null;
}> = {
  "mouex": {
    titleFr: "Jean-Pierre Moueix",
    titleEn: "Jean-Pierre Moueix",
    date: "2026-11-12",
    time: "19:00",
    location: "Vortex, Campus UNIL-EPFL",
    descFr: "Rejoignez-nous pour la première dégustation de la saison 2026-2027 ! Une soirée de bienvenue ouverte à tous les étudiants, avec une sélection de vins pour bien commencer l'année. 4 à 6 cuvées dégustées, suivies d'un apéritif convivial.",
    descEn: "Join us for the first tasting of the 2026-2026 season! A welcome evening open to all students, featuring a selection of wines to kick off the year. 4 to 6 wines tasted, followed by a convivial aperitif.",
    spots: 40,
    formUrl: null, // Remplacer par l'URL de ton Google Form
  },/*
  "octobre-2025": {
    titleFr: "Domaine à confirmer",
    titleEn: "Estate TBC",
    date: "2025-10-01",
    time: "18:30",
    location: "Salle à confirmer, Campus UNIL-EPFL",
    descFr: "Soirée dégustation bimensuelle. Le domaine invité sera annoncé prochainement. Restez connectés sur nos réseaux sociaux !",
    descEn: "Bimonthly tasting evening. The guest estate will be announced soon. Stay tuned on our social media!",
    spots: 55,
    formUrl: null,
  },*/
};

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLang();
  const event = events[slug];

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
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-500/50" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500/50" />
                {event.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500/50" />
                {event.location}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold-500/50" />
                {event.spots} places
              </span>
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
                  {locale === "fr" ? event.descFr : event.descEn}
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
                  <div className="bg-dark-900 border border-white/5 overflow-hidden rounded-xl">
                    <iframe
                      src={event.formUrl}
                      width="100%"
                      height="800"
                      className="border-0 rounded-xl"
                      title={locale === "fr" ? "Formulaire d'inscription" : "Registration form"}
                    >
                      {locale === "fr" ? "Chargement du formulaire..." : "Loading form..."}
                    </iframe>
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