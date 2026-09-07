import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const STEPS = [
  {
    number: "01",
    icon: "📚",
    title: "Sube tus apuntes o pega el ejercicio",
    body: "PDF, foto o texto. Estudia+ procesa el material y detecta los conceptos clave.",
  },
  {
    number: "02",
    icon: "🎓",
    title: "El Coach te guía con pistas, nunca con respuestas",
    body: "Sistema socrático de 3 niveles. Si de verdad has intentado, avanzas rápido. Si buscas atajos, te devuelve a pensar.",
  },
  {
    number: "03",
    icon: "🧠",
    title: "Retienes lo aprendido con flashcards inteligentes",
    body: "Algoritmo científico FSRS (el mismo que Anki). Repasas justo cuando lo vas a olvidar. Máxima retención con mínimo esfuerzo.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Cómo funciona"
          title="Del atasco a dominar el tema, en 3 pasos"
        />

        <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.15} as="li" className="relative h-full">
                {/* Línea que conecta con el paso siguiente. Solo en desktop,
                    y no después del último. */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-32 top-8 hidden h-px w-[calc(100%-6rem)] bg-ink/15 md:block"
                  />
                )}

                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-6xl font-semibold leading-none text-accent">
                    {step.number}
                  </span>
                  <span aria-hidden="true" className="text-3xl leading-none">
                    {step.icon}
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
