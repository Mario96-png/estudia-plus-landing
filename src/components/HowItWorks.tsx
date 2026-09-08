import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import type { Dictionary } from "@/i18n/dictionaries";

/** Número e icono son diseño, no texto: no pasan por el diccionario. */
const MARKS = [
  { number: "01", icon: "📚" },
  { number: "02", icon: "🎓" },
  { number: "03", icon: "🧠" },
];

export default function HowItWorks({ t }: { t: Dictionary["howItWorks"] }) {
  return (
    <section id="how-it-works" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {t.steps.map((step, i) => (
            <Reveal key={MARKS[i].number} delay={i * 0.15} as="li" className="relative h-full">
                {/* Línea que conecta con el paso siguiente. Solo en desktop,
                    y no después del último. */}
                {i < t.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-32 top-8 hidden h-px w-[calc(100%-6rem)] bg-ink/15 md:block"
                  />
                )}

                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-6xl font-semibold leading-none text-accent">
                    {MARKS[i].number}
                  </span>
                  <span aria-hidden="true" className="text-3xl leading-none">
                    {MARKS[i].icon}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-xl font-semibold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
