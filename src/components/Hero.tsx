"use client";

import { track } from "@vercel/analytics";
import { motion, useReducedMotion } from "framer-motion";
import HeroGradient from "@/components/HeroGradient";
import CursorBlob from "@/components/CursorBlob";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const APP_URL = "https://app.estudia.plus";

export default function Hero({
  t,
  locale,
}: {
  t: Dictionary["hero"];
  locale: Locale;
}) {
  const reduceMotion = useReducedMotion();

  /** fade + slideUp de entrada. Con reduced motion no devuelve props: el
   *  elemento se pinta directamente en su sitio. */
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  const hover = reduceMotion ? undefined : { scale: 1.03 };
  const tap = reduceMotion ? undefined : { scale: 0.99 };
  const springy = { type: "spring" as const, stiffness: 400, damping: 26 };

  return (
    <section className="relative flex h-screen items-center overflow-hidden">
      <HeroGradient />
      {/* Va entre el fondo (z-0) y el texto (z-10). El overflow-hidden de la
          section es lo que impide que se vea al scrollear a otra sección. */}
      <CursorBlob />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <motion.h1
          {...rise(0)}
          className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-7xl"
        >
          {t.titleLine1}
          <br />
          {t.titleLine2}
        </motion.h1>

        <motion.p
          {...rise(0.15)}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          {...rise(0.3)}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href={APP_URL}
            target="_self"
            onClick={() =>
              track("empezar_gratis_click", { section: "hero", locale })
            }
            whileHover={hover}
            whileTap={tap}
            transition={springy}
            className="rounded-full bg-accent px-8 py-3 font-medium text-bg shadow-lg shadow-accent/20 transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-xl hover:shadow-accent/40"
          >
            {t.ctaPrimary}
          </motion.a>

          <motion.a
            href="#how-it-works"
            whileHover={hover}
            whileTap={tap}
            transition={springy}
            className="rounded-full border border-ink px-8 py-3 font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-bg"
          >
            {t.ctaSecondary}
          </motion.a>
        </motion.div>

        <motion.p
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.6, delay: 0.5 },
              })}
          className="mt-6 text-sm text-ink-soft"
        >
          {t.note}
        </motion.p>
      </div>
    </section>
  );
}
