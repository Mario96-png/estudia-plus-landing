"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

/** Compensa la navbar fija al saltar a un ancla. Igual que scroll-mt-20 en CSS. */
const NAV_OFFSET = -80;

/**
 * Smooth scroll global. Se desactiva por completo si el usuario pide
 * reduced motion: en ese caso el scroll nativo es el correcto.
 *
 * Mientras Lenis está activo marca <html class="lenis">, y globals.css usa
 * esa clase para apagar el scroll-behavior nativo (si no, los dos pelean).
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      anchors: { offset: NAV_OFFSET },
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
