"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/lang-context";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { t, locale, toggleLocale } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/events", label: t.nav.events },
    { href: "/competitions", label: t.nav.competitions },
    { href: "/partenaires", label: t.nav.partners },
    { href: "/team", label: t.nav.team },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-bg/95 backdrop-blur-xl ${scrolled ? "border-b border-wine-800/10 shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Wine Society" width={36} height={36} className="opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="font-headline text-lg text-wine-900 tracking-wider">Wine Society</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-wine-800/60 hover:text-wine-800 text-[11px] font-body font-medium uppercase tracking-[0.2em] transition-colors duration-300">
                {link.label}
              </Link>
            ))}
            <button onClick={toggleLocale} className="ml-2 text-wine-800/40 hover:text-wine-800 text-[11px] font-body uppercase tracking-[0.2em] transition-colors duration-300">
              {locale === "fr" ? "EN" : "FR"}
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-wine-800">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-bg/98 backdrop-blur-xl border-t border-wine-800/10">
          <div className="px-6 py-8 space-y-5">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-wine-800/60 hover:text-wine-800 font-body text-[11px] uppercase tracking-[0.2em] transition-colors">
                {link.label}
              </Link>
            ))}
            <button onClick={toggleLocale} className="text-wine-800/40 hover:text-wine-800 text-[11px] font-body uppercase tracking-[0.2em] transition-colors">
              {locale === "fr" ? "EN" : "FR"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}