"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const APP_URL = "https://app.estudia.plus";

const LINKS = [
  { href: "#how-it-works", label: "Cómo funciona" },
  { href: "#pricing", label: "Precios" },
];

/** Píxeles de scroll a partir de los cuales la barra deja de ser transparente. */
const SOLID_AT = 50;

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SOLID_AT);
    onScroll(); // por si se recarga a media página
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        solid
          ? "border-b border-ink/10 bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl font-semibold text-ink">
          Estudia+
        </Link>

        <div className="flex items-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
            >
              {link.label}
            </a>
          ))}
          <a
            href={APP_URL}
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-[filter] duration-200 hover:brightness-110"
          >
            Entrar
          </a>
        </div>
      </nav>
    </header>
  );
}
