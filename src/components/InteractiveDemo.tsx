"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Demo = Dictionary["interactiveDemo"];
/** Las dos columnas tienen la misma forma; sólo cambia cuántos turnos traen. */
type Column = Demo["rightColumn"];

/**
 * Ritmo de la conversación, en ms.
 *
 * ChatGPT va MÁS RÁPIDO a propósito: suelta su parrafada y termina mientras el
 * Coach todavía está preguntando. El contraste de velocidad es parte del
 * argumento, no un detalle de animación.
 */
const START_DELAY = 300;
const STEP_FAST = 500; // ChatGPT
const STEP_SLOW = 800; // Coach: da tiempo a leer el turno anterior
const FADE = 400; // dura lo mismo en CSS (.demo-msg)

/** Color de la etiqueta según quién habla. El coach es el que debe destacar. */
const ROLE_COLOR: Record<string, string> = {
  user: "text-ink",
  ai: "text-ink-soft",
  coach: "text-accent",
};

export default function InteractiveDemo({
  t,
  locale,
}: {
  t: Demo;
  locale: Locale;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const timers = useRef<number[]>([]);
  const reduceMotion = useReducedMotion();

  const leftCount = t.leftColumn.messages.length;
  const rightCount = t.rightColumn.messages.length;

  /** Cuántos mensajes se ven ya en cada columna. */
  const [shown, setShown] = useState({ left: 0, right: 0 });
  /** El botón de repetir sólo aparece cuando la conversación ha terminado. */
  const [finished, setFinished] = useState(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const play = useCallback(() => {
    clearTimers();
    setFinished(false);

    if (reduceMotion) {
      setShown({ left: leftCount, right: rightCount });
      return;
    }

    setShown({ left: 0, right: 0 });

    const at = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    /** Programa una columna entera y devuelve cuándo entra su último mensaje. */
    const run = (key: "left" | "right", count: number, step: number) => {
      for (let i = 0; i < count; i++) {
        at(START_DELAY + i * step, () =>
          setShown((s) => ({ ...s, [key]: i + 1 })),
        );
      }
      return START_DELAY + (count - 1) * step;
    };

    // Las dos arrancan a la vez; cada una avanza a su ritmo.
    const endLeft = run("left", leftCount, STEP_FAST);
    const endRight = run("right", rightCount, STEP_SLOW);

    at(Math.max(endLeft, endRight) + FADE, () => setFinished(true));
  }, [leftCount, rightCount, reduceMotion]);

  // Arranca (y mide la visita) la primera vez que la sección entra en pantalla.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        track("interactive_demo_viewed", { locale });
        play();
      },
      // Mismo umbral que <Reveal>: cuando el bloque está de verdad en pantalla.
      { rootMargin: "-15% 0px -15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [locale, play]);

  useEffect(() => clearTimers, []);

  const replay = () => {
    track("interactive_demo_replayed");
    play();
  };

  return (
    <section id="demo" ref={sectionRef} className="bg-bg py-32">
      {/* Sin JS los mensajes no se destapan nunca: aquí se quedan visibles.
          Con JS activo el navegador ignora el bloque entero. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>.demo-msg[data-shown="false"]{opacity:1;transform:none}</style>`,
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-start justify-between gap-6">
          <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

          {/* Con reduced motion no hay nada que repetir: el botón no existe.
              Antes de terminar ocupa su sitio pero no se ve ni se tabula, así
              que aparecer no mueve el título. */}
          {!reduceMotion && (
            <button
              type="button"
              onClick={replay}
              className={`mt-1 flex shrink-0 items-center gap-2 text-sm text-ink-soft transition-colors duration-200 hover:text-ink ${
                finished ? "" : "invisible"
              }`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 12a9 9 0 1 0 2.64-6.36" />
                <path d="M3 4v5h5" />
              </svg>
              {t.replay}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Chat
            column={t.leftColumn}
            shown={shown.left}
            tone="chatgpt"
            icon="⚠️"
          />
          <Chat
            column={t.rightColumn}
            shown={shown.right}
            tone="estudia"
            icon="✅"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Una columna. Todos los mensajes se renderizan siempre en el HTML —la
 * animación sólo los tapa con opacidad—, así que el ejemplo completo está
 * disponible para Google y para un lector de pantalla sin esperar a nada.
 */
function Chat({
  column,
  shown,
  tone,
  icon,
}: {
  column: Column;
  shown: number;
  tone: "chatgpt" | "estudia";
  icon: string;
}) {
  const estudia = tone === "estudia";

  const banner = estudia
    ? "border-green/20 bg-green/10 text-green"
    : "border-ink/10 bg-ink/5 text-ink-soft";

  /* La barra es el borde izquierdo de la card, no un elemento aparte: así
     cubre toda la altura sola, sin depender del alto del contenido. */
  const bar = estudia ? "border-l-green" : "border-l-ink-soft";

  return (
    <div
      className={`flex h-full flex-col rounded-none border border-l-4 border-ink/10 bg-paper shadow-[0_10px_40px_-15px_rgba(72,52,38,0.15)] ${bar}`}
    >
      <div className="flex-1 p-6 md:p-8">
        <div className="flex items-center gap-3">
          {/* Marca de quién habla. La de ChatGPT va vacía a propósito: es "otra
              IA cualquiera", no su logo. */}
          {estudia ? (
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center bg-green font-serif text-xs font-semibold text-bg"
            >
              E+
            </span>
          ) : (
            <span aria-hidden="true" className="block h-8 w-8 bg-ink/10" />
          )}

          <p className="text-sm font-medium text-ink-soft">{column.label}</p>
        </div>

        <ol className="mt-6">
          {column.messages.map((message, i) => (
            <li
              key={i}
              className="demo-msg mb-6 last:mb-0"
              data-shown={i < shown}
            >
              <p
                className={`text-xs uppercase tracking-wide ${
                  ROLE_COLOR[message.role] ?? "text-ink-soft"
                }`}
              >
                {message.author}
              </p>
              <p className="mt-1.5 leading-relaxed text-ink">{message.content}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className={`flex items-start gap-3 border-t p-6 md:px-8 ${banner}`}>
        <span aria-hidden="true" className="leading-relaxed">
          {icon}
        </span>
        <p className="text-sm leading-relaxed">{column.footer}</p>
      </div>
    </div>
  );
}
