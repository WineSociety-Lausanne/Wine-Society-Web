"use client";

import { useLang } from "@/lib/lang-context";
import { SlideIn } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

export default function ContactPage() {
  const { t } = useLang();

  return (
    <>
      <section className="relative section-padding pt-32 pb-16 bg-wine-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} light />
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20">
          <SlideIn direction="left">
            <div className="space-y-8">
              {[
                { label: t.contact.form.name, type: "text" },
                { label: t.contact.form.email, type: "email" },
                { label: t.contact.form.subject, type: "text" },
              ].map((field, i) => (
                <div key={i}>
                  <label className="font-body text-[10px] text-dark-500 uppercase tracking-[0.25em] block mb-3">{field.label}</label>
                  <input type={field.type} className="w-full bg-transparent border-b border-wine-800/15 py-3 font-body text-sm text-wine-900 focus:border-wine-800 focus:outline-none transition-colors duration-500" />
                </div>
              ))}
              <div>
                <label className="font-body text-[10px] text-dark-500 uppercase tracking-[0.25em] block mb-3">{t.contact.form.message}</label>
                <textarea rows={5} className="w-full bg-transparent border-b border-wine-800/15 py-3 font-body text-sm text-wine-900 focus:border-wine-800 focus:outline-none transition-colors duration-500 resize-none" />
              </div>
              <button className="btn-primary mt-4">{t.contact.form.send}</button>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <div className="space-y-8">
              <div className="bg-wine-900 p-10">
                <span className="font-body text-[10px] text-gold-400/60 uppercase tracking-[0.3em]">{t.contact.info.sponsoring}</span>
                <p className="font-headline text-2xl text-cream-100 mt-3">{t.contact.info.sponsoringName}</p>
                <p className="font-body text-cream-200/40 text-xs mt-1 uppercase tracking-wider">{t.contact.info.sponsoringRole}</p>
                <div className="mt-6 space-y-3 text-cream-200/60 font-body text-sm">
                  <p className="flex items-center gap-3"><Mail className="w-3.5 h-3.5 text-gold-400/40" />adonis.casteret@epfl.ch</p>
                  <p className="flex items-center gap-3"><Phone className="w-3.5 h-3.5 text-gold-400/40" />+41 78 312 48 18</p>
                  <p className="flex items-center gap-3"><Phone className="w-3.5 h-3.5 text-gold-400/40" />+33 7 85 89 65 82</p>
                </div>
              </div>

              <div className="border border-wine-800/15 p-10">
                <span className="font-body text-[10px] text-wine-700/50 uppercase tracking-[0.3em]">{t.contact.info.general}</span>
                <div className="mt-6 space-y-3 text-dark-500 font-body text-sm">
                  <p className="flex items-center gap-3"><Mail className="w-3.5 h-3.5 text-wine-800/30" />{t.contact.info.email}</p>
                  <p className="flex items-center gap-3"><Globe className="w-3.5 h-3.5 text-wine-800/30" />{t.contact.info.website}</p>
                  <p className="flex items-center gap-3"><MapPin className="w-3.5 h-3.5 text-wine-800/30" />{t.contact.info.location}</p>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>
    </>
  );
}