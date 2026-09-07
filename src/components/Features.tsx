import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const FEATURES = [
  {
    icon: "🎯",
    title: "Método socrático probado",
    body: "Estudios muestran 3× mejor aprendizaje que herramientas que dan respuestas directas. Aprendes a pensar por ti mismo.",
  },
  {
    icon: "🌍",
    title: "Adaptado a tu sistema educativo",
    body: "IGCSE, IB, A-Levels, LOMLOE, ESO, AP. Estudia+ conoce los command words, los marks y el estilo de cada uno.",
  },
  {
    icon: "🃏",
    title: "Flashcards con FSRS",
    body: "El mismo algoritmo científico que Anki. Programa cada repaso en el momento óptimo para máxima retención con mínimo tiempo.",
  },
  {
    icon: "🔒",
    title: "Integridad académica integrada",
    body: "Filtro anti-trampa: si no lo has intentado primero, no obtienes ayuda. Diseñado para aprender, no para copiar.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-bg-alt py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Por qué Estudia+"
          title="Lo que ninguna otra app combina"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.1} className="h-full">
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
