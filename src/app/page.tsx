"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, type TouchEvent } from "react";
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
    <div ref={ref} className="whitespace-nowrap">
      <span className="font-headline text-3xl sm:text-4xl md:text-5xl text-wine-800">
        {target === 2014 ? count : count.toLocaleString("de-CH")}{suffix}
      </span>
    </div>
  );
}

function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden bg-wine-950">
      {/* Photographie du lac Léman en fond plein écran */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src="/lac.jpg"
          alt="Le lac Léman et les Alpes vus depuis le campus lausannois"
          className="h-full w-full object-cover object-center"
        />
        {/* Voiles de teinte pour la lisibilité et l'ambiance */}
        <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/40 to-wine-950/10" />
        <div className="absolute inset-0 bg-wine-950/20 mix-blend-multiply" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pb-20 md:pb-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-body text-cream-100 text-[11px] sm:text-xs uppercase tracking-[0.4em]"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-cream-100 leading-[0.92] tracking-tight mt-5 text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[8.5rem]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex items-center gap-4 mt-6"
          >
            <span className="h-px w-12 bg-gold-400/70" />
            <p className="font-display text-cream-100/80 text-lg sm:text-xl md:text-2xl italic">
              {t.hero.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link href="/events" className="bg-cream-100 text-wine-900 px-8 py-4 font-body font-semibold text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 text-center">
              {t.hero.cta}
            </Link>
            <Link href="/partenaires" className="border border-cream-100/40 text-cream-100 px-8 py-4 font-body font-semibold text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-cream-100/10 transition-all duration-500 text-center backdrop-blur-sm">
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 right-6 md:right-12 lg:right-24"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4 text-cream-100/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}


function PrestigiousDomains() {
  const { locale } = useLang();

  const initialLogos = [
    { src: "/domaines/branaire.png", alt: "Château Branaire-Ducru", h: "h-20 sm:h-20 md:h-24" },
    { src: "/domaines/lanson.png", alt: "Champagne Lanson", h: "h-12 sm:h-14 md:h-16" },
    { src: "/domaines/drouhin.png", alt: "Joseph Drouhin", h: "h-8 sm:h-10 md:h-12" },
    { src: "/domaines/chapoutier.png", alt: "M. Chapoutier", h: "h-8 sm:h-10 md:h-12" },
    { src: "/domaines/lafite.png", alt: "Chateau Lafite Rotschild", h: "h-16 sm:h-18 md:h-20" },
    { src: "/domaines/bouchard.png", alt: "Bouchard Père & Fils", h: "h-12 sm:h-14 md:h-16" },
    { src: "/domaines/lagrange.png", alt: "Château Lagrange", h: "h-16 sm:h-18 md:h-20" },
    { src: "/domaines/mauler.png", alt: "Mauler", h: "h-8 sm:h-10 md:h-12" },
    { src: "/domaines/dutruy.png", alt: "Les Frères Dutruy", h: "h-10 sm:h-12 md:h-14" },
    { src: "/domaines/latour.png", alt: "Maison Louis Latour", h: "h-8 sm:h-10 md:h-12" },
    { src: "/domaines/perrin.png", alt: "Famille Perrin", h: "h-5 sm:h-6 md:h-8" },
    { src: "/domaines/chappaz.png", alt: "Marie-Thérèse Chappaz", h: "h-10 sm:h-12 md:h-14" },
  ];

   const [logos] = useState(initialLogos);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
  }, []);
  
  return (
    <section className="py-14 border-b border-dark-300/20 overflow-hidden">
      <FadeIn>
        <p className="text-center font-body text-[10px] text-dark-500 uppercase tracking-[0.3em] mb-10">
          {locale === "fr" ? "Domaines reçus" : "Past guest estates"}
        </p>
      </FadeIn>
      <div className="relative flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
        <div className="flex w-max">
          <div className={`flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24 flex-shrink-0 ${mounted ? "scroll-banner" : ""} group-hover:[animation-play-state:paused]`}>
            {logos.map((logo, i) => (
              <img key={`a-${i}`} src={logo.src} alt={logo.alt} className={`${logo.h} w-auto object-contain flex-shrink-0`} />
            ))}
          </div>
          <div className={`flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24 flex-shrink-0 ${mounted ? "scroll-banner" : ""} group-hover:[animation-play-state:paused]`} aria-hidden="true">
            {logos.map((logo, i) => (
              <img key={`b-${i}`} src={logo.src} alt={logo.alt} className={`${logo.h} w-auto object-contain flex-shrink-0`} />
            ))}
          </div>
        </div>
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

        {/* Le conteneur grid gère l'écartement global */}
        <div className="grid md:grid-cols-2 gap-0 mb-24">
          
          {/* BLOC GAUCHE : On aligne le texte à droite (vers le centre) et on met la bordure */}
          <SlideIn direction="left">
            <div className="md:text-right md:border-r md:border-dark-300/20 md:pr-12 pr-0 pb-6 md:pb-0">
              <p className="font-display text-xl md:text-2xl leading-relaxed text-wine-800/70 italic inline-block">
                {t.about.description}
              </p>
            </div>
          </SlideIn>

          {/* BLOC DROITE : On aligne le texte à gauche (vers le centre) et on espace par rapport à la ligne */}
          <SlideIn direction="right" delay={0.2}>
            <div className="md:text-left md:pl-12 pl-0 pt-6 md:pt-0">
              <p className="font-display text-xl md:text-2xl leading-relaxed text-wine-800/70 italic inline-block">
                {t.about.mission}
              </p>
            </div>
          </SlideIn>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { target: 30000, suffix: "+", label: t.about.stats.studentsLabel },
            { target: 2014, suffix: "", label: t.about.stats.sinceLabel },
            { target: 50, suffix: "", label: t.about.stats.perEventLabel },
            { target: 12, suffix: "", label: t.about.stats.frequencyLabel + " /an" },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div
                className={`bg-bg p-6 sm:p-8 md:p-10 text-center h-full
                  ${i % 2 === 0 ? 'border-r border-dark-300/20' : ''}
                  ${i === 1 ? 'lg:border-r lg:border-dark-300/20' : ''}
                  ${i < 2 ? 'border-b border-dark-300/20 lg:border-b-0' : ''}
                `}
              >
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
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    { ...t.activities.tastings, num: "01" },
    { ...t.activities.competitions, num: "02" },
    { ...t.activities.visits, num: "03" },
  ];

  // Glissement au doigt (mobile) : swipe gauche = suivant, droite = précédent.
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      setActiveCard((prev) =>
        dx < 0 ? (prev + 1) % cards.length : (prev - 1 + cards.length) % cards.length
      );
    }
    touchStartX.current = null;
  };

  // Défilement automatique des onglets (mobile) toutes les 5 s.
  // Se relance après chaque changement (auto ou tap), et se met en pause
  // si l'utilisateur préfère réduire les animations.
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(id);
  }, [activeCard, cards.length]);

  return (
    <section className="py-20 md:py-24 bg-wine-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionHeader title={t.activities.title} light />

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="border-t border-gold-400/20 pt-8 h-full group">
                <span className="font-headline text-gold-400/20 text-3xl sm:text-4xl">
                  {card.num}
                </span>
                <h3 className="font-display text-2xl text-cream-100 mt-3 mb-6 group-hover:text-gold-400 transition-colors duration-500">
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
            </FadeUp>
          ))}
        </div>

        {/* Mobile: tabs + contenu animé */}
        <div className="md:hidden">
          {/* Tabs */}
          <div className="flex border-b border-wine-700/30 mb-8">
            {cards.map((card, i) => (
              <button
                key={i}
                onClick={() => setActiveCard(i)}
                className={`flex-1 pb-4 font-body text-[11px] uppercase tracking-[0.15em] transition-all duration-300 relative ${
                  activeCard === i ? "text-gold-400" : "text-cream-200/30"
                }`}
              >
                {card.title}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                    activeCard === i ? "bg-gold-400" : "bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Contenu */}
          <div
            className="relative overflow-hidden touch-pan-y select-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  height: activeCard === i ? "auto" : "0",
                  opacity: activeCard === i ? 1 : 0,
                  overflow: "hidden",
                }}
              >
                <div className="border-l-2 border-gold-400/30 pl-6 py-2">
                  <span className="font-body text-gold-400/30 text-[10px] tracking-[0.4em] uppercase">
                    {card.num}
                  </span>
                  <h3 className="font-display text-2xl text-cream-100 mt-2 mb-5">
                    {card.title}
                  </h3>
                  <ul className="space-y-4">
                    {card.items.map((item: string, j: number) => (
                      <li key={j} className="font-body text-sm text-cream-200/50 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Indicateur de défilement (points + barre active) */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCard(i)}
                aria-label={`${t.activities.title} ${i + 1}`}
                aria-current={activeCard === i ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCard === i ? "w-6 bg-gold-400" : "w-1.5 bg-cream-200/25 hover:bg-cream-200/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t, locale } = useLang();
  return (
    <section className="relative py-20 md:py-40 overflow-hidden bg-bg-alt">
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