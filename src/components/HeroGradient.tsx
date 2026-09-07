"use client";

import { motion, useReducedMotion } from "framer-motion";

type Blob = {
  color: string;
  /** Posición base dentro del hero. */
  position: string;
  size: number;
  blur: number;
  opacity: number;
  /** Recorrido del vaivén, en px. */
  drift: { x: number[]; y: number[]; scale: number[] };
  duration: number;
  delay: number;
};

/*
  Cuatro manchas de color de la paleta que se desplazan muy despacio sobre el
  crema base. Duraciones distintas y primas entre sí (17/23/19/29 s) para que
  el conjunto no vuelva nunca a la misma composición: si coincidieran, el ojo
  detectaría el bucle.
*/
const BLOBS: Blob[] = [
  {
    color: "#AB3D1D", // terracota
    position: "left-[-10%] top-[-15%]",
    size: 760,
    blur: 110,
    opacity: 0.42,
    drift: { x: [0, 90, -40, 0], y: [0, 60, 120, 0], scale: [1, 1.12, 0.95, 1] },
    duration: 17,
    delay: 0,
  },
  {
    color: "#466575", // info teal
    position: "right-[-15%] top-[5%]",
    size: 680,
    blur: 120,
    opacity: 0.4,
    drift: { x: [0, -70, 30, 0], y: [0, 90, -50, 0], scale: [1, 0.92, 1.1, 1] },
    duration: 23,
    delay: -4,
  },
  {
    color: "#E8DEC9", // crema oscuro
    position: "left-[25%] bottom-[-25%]",
    size: 800,
    blur: 100,
    opacity: 0.6,
    drift: { x: [0, 110, -60, 0], y: [0, -70, 40, 0], scale: [1, 1.08, 0.97, 1] },
    duration: 19,
    delay: -9,
  },
  {
    color: "#AB3D1D",
    position: "right-[10%] bottom-[-20%]",
    size: 600,
    blur: 120,
    opacity: 0.28,
    drift: { x: [0, -100, 50, 0], y: [0, -40, 80, 0], scale: [1, 1.15, 0.9, 1] },
    duration: 29,
    delay: -14,
  },
];

/**
 * Fondo orgánico del hero. Puramente decorativo: aria-hidden y sin eventos.
 * Con reduced motion las manchas se pintan igual pero quietas — el color de
 * fondo forma parte del diseño, el movimiento no.
 */
export default function HeroGradient() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${blob.position}`}
          style={{
            width: blob.size,
            height: blob.size,
            opacity: blob.opacity,
            filter: `blur(${blob.blur}px)`,
            background: `radial-gradient(circle at 50% 50%, ${blob.color} 0%, ${blob.color}00 70%)`,
            // Aísla el repintado del blur, que si no es carísimo en cada frame.
            willChange: reduceMotion ? undefined : "transform",
          }}
          animate={
            reduceMotion
              ? undefined
              : { x: blob.drift.x, y: blob.drift.y, scale: blob.drift.scale }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: blob.duration,
                  delay: blob.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.33, 0.66, 1],
                }
          }
        />
      ))}
    </div>
  );
}
