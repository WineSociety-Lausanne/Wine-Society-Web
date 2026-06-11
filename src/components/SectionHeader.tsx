"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className={`font-headline text-4xl md:text-5xl lg:text-6xl tracking-tight ${light ? "text-cream-100" : "text-wine-900"}`}>
        {title}
      </h2>
      <div className={`divider-wine mt-6 mb-5 ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`font-body text-sm uppercase tracking-[0.2em] max-w-xl mx-auto ${light ? "text-cream-200/60" : "text-dark-500"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}