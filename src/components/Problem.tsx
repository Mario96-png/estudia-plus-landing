import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Los iconos NO viven en el diccionario: no son texto traducible, son parte del
 * diseño. Van aquí, emparejados por posición con las cards del JSON, que
 * siempre son tres.
 */
const ICONS = [
  { icon: "❌", className: "" },
  { icon: "❌", className: "" },
  { icon: "✅", className: "text-green" },
];

export default function Problem({ t }: { t: Dictionary["problem"] }) {
  return (
    <section id="problem" className="bg-bg-alt py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-ink/10 bg-paper p-8">
                <span
                  aria-hidden="true"
                  className={`block text-4xl leading-none ${ICONS[i].className}`}
                >
                  {ICONS[i].icon}
                </span>
                <h3 className="mt-6 font-serif text-xl font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
