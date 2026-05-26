"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/lang-context";
import Link from "next/link";

export default function CookieBanner() {
  const { locale } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) setVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  const linkText = locale === "fr" ? "politique de confidentialité" : "privacy policy";
  const mainText = locale === "fr"
    ? "Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre "
    : "This site uses cookies to improve your experience. By continuing, you accept our ";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-wine-950 border-t border-white/5 px-6 py-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-body text-sm text-dark-400 flex-1">
          {mainText}
          <Link href="/politique-confidentialite" className="text-gold-500/70 hover:text-gold-400 underline underline-offset-2 transition-colors">
            {linkText}
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button onClick={decline} className="font-body text-xs text-dark-500 hover:text-cream-200 uppercase tracking-wider transition-colors">
            {locale === "fr" ? "Refuser" : "Decline"}
          </button>
          <button onClick={accept} className="bg-gold-500 text-dark-950 px-6 py-2.5 font-body font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors">
            {locale === "fr" ? "Accepter" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}