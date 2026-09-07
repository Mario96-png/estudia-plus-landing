"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Etiquetas permitidas: basta con las que necesitan las secciones. */
const TAGS = { div: motion.div, li: motion.li } as const;

/**
 * Fade + slideUp cuando el bloque entra en viewport (una sola vez).
 * Con reduced motion no hay transición: el contenido ya está en su sitio.
 *
 * `as` existe para poder envolver un <li> sin meter un <div> entre <ol> y su
 * hijo, que sería HTML inválido.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof TAGS;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  const Motion = TAGS[as];
  const Plain = as;

  if (reduceMotion) {
    return (
      <Plain ref={ref as React.Ref<never>} className={className}>
        {children}
      </Plain>
    );
  }

  return (
    <Motion
      ref={ref as React.Ref<never>}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion>
  );
}
