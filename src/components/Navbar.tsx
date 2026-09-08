"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import type { Locale } from "@/i18n/config";
import { pathForLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const APP_URL = "https://app.estudia.plus";

/** Píxeles de scroll a partir de los cuales la barra deja de ser transparente. */
const SOLID_AT = 50;

export default function Navbar({
  t,
  locale,
}: {
  t: Dictionary["nav"];
  locale: Locale;
}) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SOLID_AT);
    onScroll(); // por si se recarga a media página
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#how-it-works", label: t.howItWorks },
    { href: "#pricing", label: t.pricing },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        solid
          ? "border-b border-ink/10 bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* El logo lleva al inicio DEL IDIOMA ACTIVO: en inglés debe volver a
            /en, no a la home española. */}
        <Link
          href={pathForLocale(locale)}
          className="font-serif text-2xl font-semibold text-ink"
        >
          Estudia+
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
            >
              {link.label}
            </a>
          ))}

          <LocaleSwitcher locale={locale} label={t.languageLabel} />

          {/* Separador entre el selector y la acción principal. Decorativo:
              con aria-hidden no se lo lee nadie. */}
          <span aria-hidden="true" className="h-4 w-px bg-ink/15" />

          <a
            href={APP_URL}
            onClick={() => track("navbar_entrar_click", { locale })}
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-[filter] duration-200 hover:brightness-110"
          >
            {t.enter}
          </a>
        </div>
      </nav>
    </header>
  );
}
