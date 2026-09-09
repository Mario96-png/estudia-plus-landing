import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Icono y color por posición: son diseño, no texto traducible, así que viven
 * aquí emparejados con las cards del JSON — igual que en Problem.
 *
 * Las dos primeras van en verde (los momentos en que la app hace su trabajo) y
 * la tercera en ámbar. El ámbar NO es una alarma: es el mismo tono terroso de
 * la paleta (#7F5C0E), y solo aparece en la barra superior y en el título. El
 * resto de la card —fondo, borde, cuerpo— es idéntico a las otras dos, así que
 * la diferencia se lee como "esta es distinta", no como "cuidado".
 */
const MARKS = [
  { icon: "📚", bar: "bg-green", title: "text-ink" },
  { icon: "🎯", bar: "bg-green", title: "text-ink" },
  { icon: "⚠️", bar: "bg-amber", title: "text-amber" },
];

export default function WhenToUse({ t }: { t: Dictionary["whenToUse"] }) {
  return (
    <section id="when-to-use" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1} className="h-full">
              {/* overflow-hidden para que la barra de color respete el radio. */}
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper">
                <span aria-hidden="true" className={`block h-1 ${MARKS[i].bar}`} />

                <div className="p-8">
                  <span aria-hidden="true" className="block text-4xl leading-none">
                    {MARKS[i].icon}
                  </span>
                  <h3
                    className={`mt-6 font-serif text-xl font-semibold ${MARKS[i].title}`}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{card.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
