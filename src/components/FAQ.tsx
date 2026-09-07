import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const FAQS = [
  {
    q: "¿Puedo usar Estudia+ en el móvil?",
    a: "Sí. Estudia+ es una PWA (Progressive Web App), lo que significa que puedes instalarla en iOS y Android como si fuera una app nativa, y funciona offline para lo esencial. No hace falta pasar por la App Store.",
  },
  {
    q: "¿En qué idiomas está disponible?",
    a: "Español e inglés en la interfaz. El contenido de tus asignaturas puede estar en cualquier idioma que quieras, incluso mezclándolos: puedes tener «Biología» en español y «History» en inglés en la misma cuenta.",
  },
  {
    q: "¿Es seguro para uso académico?",
    a: "Sí, está diseñado precisamente para proteger tu integridad académica. El Coach de Deberes tiene un filtro anti-atajos: si no has intentado resolver el ejercicio primero, no obtienes ayuda. Y las pistas son graduales, nunca soluciones directas. Estudia+ te ayuda a aprender, no a copiar.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí, en un click desde tu perfil. Sin llamadas, sin correos, sin permanencia. Y si te has suscrito al plan anual, te devolvemos la parte no usada.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-bg-alt py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Todo lo que necesitas saber"
        />

        {/* <details> nativo: accesible por teclado y con búsqueda del navegador
            sin necesidad de JS. La animación va en globals.css. */}
        <div className="mx-auto max-w-3xl">
          {FAQS.map((faq, i) => (
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
