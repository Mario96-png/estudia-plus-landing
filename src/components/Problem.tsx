import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const CARDS = [
  {
    icon: "❌",
    iconClass: "",
    title: "ChatGPT te da la respuesta",
    body: "Copias, pegas, apruebas ese día. Pero en el examen, sin ChatGPT, te quedas en blanco.",
  },
  {
    icon: "❌",
    iconClass: "",
    title: "Photomath resuelve por ti",
    body: "Ves la solución pero no aprendes el método. Cuando cambian los números, no sabes qué hacer.",
  },
  {
    icon: "✅",
    iconClass: "text-green",
    title: "Estudia+ te hace pensar",
    body: "Pistas graduales, coach socrático, ejercicios similares. Aprendes DE VERDAD y lo demuestras en el examen.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-bg-alt py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="El problema con la IA"
          title="Los atajos hoy son malas notas mañana."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-ink/10 bg-paper p-8">
                <span
                  aria-hidden="true"
                  className={`block text-4xl leading-none ${card.iconClass}`}
                >
                  {card.icon}
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
