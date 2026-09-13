"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function EventsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur (utile en dev / monitoring)
    console.error("Erreur sur la page événements :", error);
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-wine-900 px-6 py-40">
      <div className="max-w-lg mx-auto text-center">
        <p className="font-body text-gold-400/40 text-[11px] uppercase tracking-[0.3em] mb-6">
          Oups
        </p>
        <h1 className="font-headline text-4xl md:text-5xl text-cream-100 mb-6 leading-tight">
          Un souci est survenu
        </h1>
        <p className="font-body text-cream-200/50 text-sm leading-relaxed mb-10">
          Cette page n&apos;a pas pu s&apos;afficher correctement. Cela vient
          souvent d&apos;un contenu externe (comme un post Instagram) qui met du
          temps à charger. Vous pouvez réessayer ou revenir à l&apos;accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button
            onClick={() => reset()}
            className="btn-primary inline-flex items-center justify-center gap-3"
          >
            Réessayer
          </button>
          <Link href="/" className="btn-outline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
