"use client";

import { useLang } from "@/lib/lang-context";
import { FadeUp, SlideIn } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

export default function ContactPage() {
  const { t, locale } = useLang();

  return (
    <>
      <section className="relative section-padding pt-32 pb-16 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} light />
        </div>
      </section>

      {/* Contacts */}
      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Événements — Orso */}
          <SlideIn direction="left">
            <div className="bg-wine-900 p-10 h-full">
              <span className="font-body text-[10px] text-gold-400/60 uppercase tracking-[0.3em]">
                {locale === "fr" ? "Événements & Dégustations" : "Events & Tastings"}
              </span>
              <p className="font-headline text-2xl text-cream-100 mt-4">Orso Jean Renucci</p>
              <p className="font-body text-cream-200/40 text-xs mt-1 uppercase tracking-wider">
                {locale === "fr" ? "Responsable Événements" : "Head of Events"}
              </p>
              <div className="mt-6 space-y-3 text-cream-200/60 font-body text-sm">
                <p className="flex items-center gap-3"><Mail className="w-3.5 h-3.5 text-gold-400/40" />orso.renucci@epfl.ch</p>
                <p className="flex items-center gap-3"><Phone className="w-3.5 h-3.5 text-gold-400/40" />+33 6 69 97 65 98</p>
              </div>
            </div>
          </SlideIn>

          {/* Sponsoring — Adonis */}
          <SlideIn direction="right" delay={0.15}>
            <div className="bg-wine-900 p-10 h-full">
              <span className="font-body text-[10px] text-gold-400/60 uppercase tracking-[0.3em]">
                {locale === "fr" ? "Partenariats & Sponsoring" : "Partnerships & Sponsoring"}
              </span>
              <p className="font-headline text-2xl text-cream-100 mt-4">Adonis Casteret</p>
              <p className="font-body text-cream-200/40 text-xs mt-1 uppercase tracking-wider">
                {locale === "fr" ? "Responsable Sponsorship" : "Head of Sponsorship"}
              </p>
              <div className="mt-6 space-y-3 text-cream-200/60 font-body text-sm">
                <p className="flex items-center gap-3"><Mail className="w-3.5 h-3.5 text-gold-400/40" />adonis.casteret@epfl.ch</p>
                <p className="flex items-center gap-3"><Phone className="w-3.5 h-3.5 text-gold-400/40" />+41 78 312 48 18</p>
                <p className="flex items-center gap-3"><Phone className="w-3.5 h-3.5 text-gold-400/40" />+33 7 85 89 65 82</p>
              </div>
            </div>
          </SlideIn>
        </div>
        
        {/* Contact général */}
        
      </section>

      {/* Formulaire */}
      <section className="section-padding bg-bg-alt">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <h3 className="font-headline text-3xl text-wine-900 mb-12 text-center">
              {locale === "fr" ? "Écrivez-nous" : "Write to us"}
            </h3>
          </FadeUp>
          <FadeUp delay={0.15}>
            <form action="https://formspree.io/f/mnjrpawp" method="POST" className="space-y-8">
              <div>
                <label className="font-body text-[10px] text-dark-500 uppercase tracking-[0.25em] block mb-3">{t.contact.form.name}</label>
                <input type="text" name="name" required className="w-full bg-transparent border-b border-wine-800/15 py-3 font-body text-sm text-wine-900 focus:border-wine-800 focus:outline-none transition-colors duration-500" />
              </div>
              <div>
                <label className="font-body text-[10px] text-dark-500 uppercase tracking-[0.25em] block mb-3">{t.contact.form.email}</label>
                <input type="email" name="email" required className="w-full bg-transparent border-b border-wine-800/15 py-3 font-body text-sm text-wine-900 focus:border-wine-800 focus:outline-none transition-colors duration-500" />
              </div>
              <div>
                <label className="font-body text-[10px] text-dark-500 uppercase tracking-[0.25em] block mb-3">{t.contact.form.subject}</label>
                <input type="text" name="subject" required className="w-full bg-transparent border-b border-wine-800/15 py-3 font-body text-sm text-wine-900 focus:border-wine-800 focus:outline-none transition-colors duration-500" />
              </div>
              <div>
                <label className="font-body text-[10px] text-dark-500 uppercase tracking-[0.25em] block mb-3">{t.contact.form.message}</label>
                <textarea name="message" rows={5} required className="w-full bg-transparent border-b border-wine-800/15 py-3 font-body text-sm text-wine-900 focus:border-wine-800 focus:outline-none transition-colors duration-500 resize-none" />
              </div>
              <button type="submit" className="btn-primary mt-4">{t.contact.form.send}</button>
            </form>
          </FadeUp>
        </div>
      </section>
    </>
  );
}