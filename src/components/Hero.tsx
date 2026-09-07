"use client";

import { motion, useReducedMotion } from "framer-motion";

const APP_URL = "https://app.estudia.plus";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Con reduced motion el contenido entra ya colocado, sin transición.
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <motion.h1
          {...rise(0)}
          className="max-w-4xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl md:text-7xl"
        >
          Aprende de verdad, no aprendas atajos
        </motion.h1>

        <motion.p
          {...rise(0.5)}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          Estudia+ convierte tus apuntes en preguntas, repaso y comprensión real.
          La IA te acompaña mientras estudias — no estudia por ti.
        </motion.p>

        <motion.div {...rise(1)} className="mt-12">
          <motion.a
            href={APP_URL}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-medium text-bg shadow-lg shadow-accent/20 transition-[background-color,box-shadow] hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30"
          >
            Empezar gratis
            <span aria-hidden="true">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
