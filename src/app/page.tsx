"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { FadeUp, FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref}>
      <span className="font-headline text-5xl md:text-6xl text-wine-800">
        {count.toLocaleString()}{suffix}
      </span>
    </div>
  );
}

function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-wine-900">
      <div className="relative z-10 text-center px-6 py-32 max-w-5xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-headline text-[3rem] sm:text-6xl md:text-7xl lg:text-[8rem] text-cream-100 leading-[0.9] tracking-tight"
        >
          Wine Society
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gold-400 leading-tight tracking-tight mt-3"
        >
          Lausanne
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="font-body text-cream-200/40 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] mt-6"
        >
          EPFL · UNIL · HEC
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto my-6 sm:my-8"
          style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #f2eeea, transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="font-display text-cream-200/30 text-lg sm:text-xl md:text-2xl italic tracking-wide"
        >
          In vino veritas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 sm:mt-14"
        >
          <Link href="/events" className="bg-cream-100 text-wine-900 px-8 py-4 font-body font-semibold text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 text-center">
            {t.hero.cta}
          </Link>
          <Link href="/partenaires" className="border border-cream-200/30 text-cream-200 px-8 py-4 font-body font-semibold text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-cream-100/10 transition-all duration-500 text-center">
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4 text-cream-200/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function PrestigiousDomains() {
  const { locale } = useLang();
  const domains = [
    "Château Lafite Rothschild", "Branaire-Ducru", "Joseph Drouhin",
    "Famille Perrin", "Champagne Lanson", "E. Guigal",
    "Château Lafite Rothschild", "Branaire-Ducru", "Joseph Drouhin",
    "Famille Perrin", "Champagne Lanson", "E. Guigal",
  ];

  return (
    <section className="py-16 border-b border-dark-300/20 overflow-hidden">
      <FadeIn>
        <p className="text-center font-body text-[10px] text-dark-500 uppercase tracking-[0.3em] mb-8">
          {locale === "fr" ? "Domaines reçus" : "Past guest estates"}
        </p>
      </FadeIn>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {domains.map((name, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl text-dark-300 italic flex-shrink-0">
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title={t.about.title} />

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <SlideIn direction="left">
            <p className="font-display text-xl md:text-2xl leading-relaxed text-wine-800/70 italic">
              {t.about.description}
            </p>
          </SlideIn>
          <SlideIn direction="right" delay={0.2}>
            <p className="font-body text-sm leading-[1.8] text-dark-500">
              {t.about.mission}
            </p>
          </SlideIn>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-wine-800/10">
          {[
            { target: 35000, suffix: "+", label: t.about.stats.studentsLabel },
            { target: 2014, suffix: "", label: t.about.stats.sinceLabel },
            { target: 50, suffix: "", label: t.about.stats.perEventLabel },
            { target: 4, suffix: "", label: t.about.stats.frequencyLabel + " /an" },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bg-bg p-8 md:p-10 text-center">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <p className="font-body text-[11px] text-dark-500 mt-3 uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Activities() {
  const { t } = useLang();
  const cards = [
    { ...t.activities.tastings, num: "01" },
    { ...t.activities.competitions, num: "02" },
    { ...t.activities.visits, num: "03" },
  ];

  return (
    <section className="section-padding bg-wine-900">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.activities.title} light />
        <StaggerContainer className="grid md:grid-cols-3 gap-px bg-wine-800/30">
          {cards.map((card, i) => (
            <StaggerItem key={i}>
              <div className="bg-wine-950 p-10 h-full group hover:bg-wine-900 transition-colors duration-700">
                <span className="font-body text-cream-200/20 text-xs tracking-[0.3em]">
                  {card.num}
                </span>
                <h3 className="font-display text-2xl text-cream-100 mt-4 mb-6 group-hover:text-gold-400 transition-colors duration-500">
                  {card.title}
                </h3>
                <ul className="space-y-4">
                  {card.items.map((item: string, j: number) => (
                    <li key={j} className="font-body text-sm text-cream-200/50 leading-relaxed flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold-400/40 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function CTASection() {
  const { t, locale } = useLang();
  return (
    <section className="relative py-40 overflow-hidden bg-bg-alt">
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <FadeUp>
          <p className="font-body text-wine-800/40 text-[11px] uppercase tracking-[0.3em] mb-8">
            {locale === "fr" ? "Rejoignez l'aventure" : "Join the adventure"}
          </p>
          <h2 className="font-headline text-5xl md:text-6xl text-wine-900 mb-8 leading-tight">
            {t.partners.become}
          </h2>
          <p className="font-body text-dark-500 text-sm leading-relaxed max-w-xl mx-auto mb-12">
            {t.partners.reasons[0].desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/partenaires" className="btn-primary inline-flex items-center gap-3">
              {t.partners.become}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline">
              {locale === "fr" ? "Nous contacter" : "Contact us"}
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PrestigiousDomains />
      <About />
      <Activities />
      <CTASection />
    </>
  );
}