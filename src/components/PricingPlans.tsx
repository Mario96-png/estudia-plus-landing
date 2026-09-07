"use client";

import { useId, useState } from "react";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";

const APP_URL = "https://app.estudia.plus";

type Billing = "monthly" | "yearly";

const FREE_FEATURES = [
  "3 asignaturas activas",
  "15 generaciones al mes",
  "Coach de deberes (10 sesiones/día)",
  "Flashcards con FSRS ilimitadas",
  "5 simulacros al mes",
  "Modo oscuro y automático",
];

const PREMIUM_FEATURES = [
  "Asignaturas ilimitadas",
  "Generaciones ilimitadas",
  "Coach de deberes ilimitado",
  "Flashcards con FSRS ilimitadas",
  "Simulacros ilimitados",
  "Prioridad en respuestas IA",
  "Nuevas funciones antes que nadie",
];

const PREMIUM_PRICE = {
  yearly: { amount: "$30", period: "/año", note: "$2.50/mes" },
  monthly: { amount: "$3", period: "/mes", note: null },
} satisfies Record<Billing, { amount: string; period: string; note: string | null }>;

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-0.5 size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  );
}

export default function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const reduceMotion = useReducedMotion();
  const groupId = useId();

  const price = PREMIUM_PRICE[billing];

  return (
    <>
      {/* Toggle de facturación. role=radiogroup para que un lector de pantalla
          lo anuncie como una elección entre dos, no como dos botones sueltos. */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <div
          role="radiogroup"
          aria-label="Periodo de facturación"
          className="inline-flex rounded-full border border-ink/15 bg-paper p-1"
        >
          {(
            [
              ["monthly", "Mensual"],
              ["yearly", "Anual"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={billing === value}
              id={`${groupId}-${value}`}
              onClick={() => setBilling(value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                billing === value
                  ? "bg-ink text-bg"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <span className="rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green">
          Ahorra 17%
        </span>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* --- GRATIS --- */}
        <Reveal className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-ink-soft">
              Gratis
            </p>

            <p className="mt-6 font-serif text-5xl font-semibold text-ink">$0</p>
            <p className="mt-1 text-ink-soft">para siempre</p>

            <hr className="my-8 border-ink/10" />

            <ul className="flex flex-col gap-3 text-ink-soft">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="text-info">
                    <Check />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={APP_URL}
              onClick={() => track("cta_free_click")}
              className="mt-8 block rounded-full border border-ink px-8 py-3 text-center font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-bg"
            >
              Empezar ahora
            </a>
          </div>
        </Reveal>

        {/* --- PREMIUM --- */}
        <Reveal delay={0.1} className="h-full">
          <div className="flex h-full flex-col rounded-2xl border-4 border-accent-dark bg-accent p-8 text-bg">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium uppercase tracking-wider">
                Premium
              </p>
              <span className="rounded-full bg-bg/20 px-3 py-1 text-xs font-medium">
                Más popular
              </span>
            </div>

            {/* Altura fija: sin ella la card salta cuando el plan mensual pierde
                la línea de "$2.50/mes". */}
            <div className="relative mt-6 h-[4.75rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={billing}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 320, damping: 28 }
                  }
                  className="absolute inset-x-0 top-0"
                >
                  <p className="font-serif text-5xl font-semibold">
                    {price.amount}
                    <span className="ml-1 align-baseline text-lg font-medium">
                      {price.period}
                    </span>
                  </p>
                  {price.note && <p className="mt-1 text-bg/80">{price.note}</p>}
                </motion.div>
              </AnimatePresence>
            </div>

            <hr className="my-8 border-bg/20" />

            <ul className="flex flex-col gap-3 text-bg/90">
              {PREMIUM_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={`${APP_URL}?plan=premium`}
              onClick={() => track("cta_premium_click", { billing })}
              className="mt-8 block rounded-full bg-bg px-8 py-3 text-center font-medium text-accent transition-[filter] duration-200 hover:brightness-95"
            >
              Empezar Premium
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
