"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * En-tête de page éditorial : aligné à gauche, gros titre serif,
 * eyebrow (kicker) en petites capitales, intro en italique, filet fin en bas.
 * Remplace l'ancien bandeau centré (titre + mini-divider + sous-titre uppercase).
 */
export default function PageHeader({
  kicker,
  title,
  intro,
  light = true,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  const fg = light ? "text-cream-100" : "text-wine-900";
  const muted = light ? "text-cream-200/55" : "text-dark-500";
  const rule = light ? "bg-cream-200/15" : "bg-wine-900/10";

  return (
    <div className="w-full">
      {kicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-7"
        >
          <span className="h-px w-10 bg-gold-400/50" />
          <span className="font-body text-[11px] uppercase tracking-[0.35em] text-gold-400">
            {kicker}
          </span>
        </motion.div>
      )}

      <h1
        className={`font-headline ${fg} leading-[0.95] tracking-[-0.015em] text-[clamp(2.75rem,7vw,5.75rem)]`}
      >
        <span className="block overflow-hidden py-[0.2em] -my-[0.2em]">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            {title}
          </motion.span>
        </span>
      </h1>

      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease }}
          className={`font-display italic text-xl md:text-2xl ${muted} mt-6 max-w-2xl leading-relaxed`}
        >
          {intro}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className={`h-px ${rule} mt-10 origin-left`}
      />
    </div>
  );
}
