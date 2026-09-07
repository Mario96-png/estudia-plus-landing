"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/** Grados máximos de inclinación en cada eje. Más que esto marea. */
const TILT = 6;

/**
 * Card que se inclina sutilmente hacia el cursor. El tilt es puramente
 * decorativo: con reduced motion la card se queda plana y solo cambia el borde.
 */
export default function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // -0.5..0.5 respecto al centro de la card.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 200, damping: 20, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [TILT, -TILT]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT, TILT]), spring);

  const handleMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    // perspective en el padre: sin ella el rotateX/Y se ve plano.
    <div style={{ perspective: 800 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={
          reduceMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className="h-full rounded-2xl border border-ink/10 bg-paper p-8 transition-colors duration-200 hover:border-ink/25"
      >
        <span aria-hidden="true" className="block text-4xl leading-none">
          {icon}
        </span>
        <h3 className="mt-6 font-serif text-xl font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
      </motion.div>
    </div>
  );
}
