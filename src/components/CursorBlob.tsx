"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/** Blanda a propósito: el retraso al seguir el cursor es el efecto. */
const SPRING = { stiffness: 70, damping: 25 };

/** Sin ratón de verdad no hay efecto que valga: fuera en táctil. */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Media query como fuente externa. Así el servidor renderiza `false` sin
 * desajustar la hidratación, y encima queda reactivo: si conectas un ratón a
 * una tablet, el blob aparece sin recargar.
 */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default function CursorBlob({
  color = "#AB3D1D",
  size = 400,
  blur = 110,
  opacity: maxOpacity = 0.4,
}: {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const hasMouse = useMediaQuery(FINE_POINTER);
  const enabled = hasMouse && !reduceMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const opacity = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return;

    const el = ref.current?.parentElement;
    if (!el) return;

    let visible = false;
    let placed = false;

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = event.clientX - rect.left;
      const ny = event.clientY - rect.top;

      if (!placed) {
        // Sin esto el blob cruzaría el hero en diagonal desde la esquina
        // superior izquierda la primera vez que mueves el ratón.
        placed = true;
        springX.jump(nx);
        springY.jump(ny);
      }

      x.set(nx);
      y.set(ny);

      if (!visible) {
        visible = true;
        animate(opacity, maxOpacity, { duration: 0.45, ease: "easeOut" });
      }
    };

    // Al salir del hero el blob se queda donde estaba y sólo se apaga.
    const onLeave = () => {
      if (!visible) return;
      visible = false;
      animate(opacity, 0, { duration: 0.5, ease: "easeOut" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, maxOpacity, opacity, springX, springY, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-[1] rounded-full"
      style={{
        x: springX,
        y: springY,
        opacity,
        width: size,
        height: size,
        // Centrado con márgenes y no con translate(-50%, -50%): en
        // framer-motion `x`/`y` YA son translateX/translateY, así que un
        // translate propio pisaría el seguimiento del cursor.
        marginLeft: -size / 2,
        marginTop: -size / 2,
        filter: `blur(${blur}px)`,
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, ${color}00 70%)`,
        willChange: "transform, opacity",
      }}
    />
  );
}
