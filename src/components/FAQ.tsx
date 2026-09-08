import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import type { Dictionary } from "@/i18n/dictionaries";

export default function FAQ({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" className="bg-bg-alt py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        {/* <details> nativo: accesible por teclado y con búsqueda del navegador
            sin necesidad de JS. La animación va en globals.css. */}
        <div className="mx-auto max-w-3xl">
          {t.items.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.05}>
              <details className="faq group border-b border-ink/10 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-ink">
                  {faq.q}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="size-5 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 7.5 5 5 5-5" />
                  </svg>
                </summary>

                <p className="faq-answer mt-4 leading-relaxed text-ink-soft">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
