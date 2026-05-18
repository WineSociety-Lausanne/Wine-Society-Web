"use client";

import { useLang } from "@/lib/lang-context";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const { t, locale } = useLang();

  return (
    <footer className="bg-dark-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Wine Society" width={32} height={32} className="opacity-80" />
              <span className="font-headline text-xl text-cream-100">Wine Society</span>
            </div>
            <p className="font-display text-cream-300/40 text-sm italic mt-3">{t.footer.tagline}</p>
            <p className="text-dark-500 text-xs mt-2 font-body tracking-wider">{t.footer.association}</p>
          </div>

          <div>
            <h4 className="text-[11px] text-gold-500/60 uppercase tracking-[0.25em] font-body mb-6">Navigation</h4>
            <div className="space-y-3">
              {[
                { href: "/events", label: t.nav.events },
                { href: "/competitions", label: t.nav.competitions },
                { href: "/partenaires", label: t.nav.partners },
                { href: "/team", label: t.nav.team },
                { href: "/contact", label: t.nav.contact },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-dark-400 hover:text-gold-400 text-sm font-body transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] text-gold-500/60 uppercase tracking-[0.25em] font-body mb-6">Contact</h4>
            <div className="space-y-3 text-sm text-dark-400 font-body">
              <p>contact@wine-society.ch</p>
              <p>www.wine-society.ch</p>
              <p>Lausanne, Suisse</p>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] text-gold-500/60 uppercase tracking-[0.25em] font-body mb-6">
              {locale === "fr" ? "Légal" : "Legal"}
            </h4>
            <div className="space-y-3">
              <Link href="/mentions-legales" className="block text-dark-400 hover:text-gold-400 text-sm font-body transition-colors duration-300">
                {locale === "fr" ? "Mentions légales" : "Legal notice"}
              </Link>
              <Link href="/politique-confidentialite" className="block text-dark-400 hover:text-gold-400 text-sm font-body transition-colors duration-300">
                {locale === "fr" ? "Politique de confidentialité" : "Privacy policy"}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-dark-600 text-xs font-body tracking-wider">
            © {new Date().getFullYear()} Wine Society · {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}