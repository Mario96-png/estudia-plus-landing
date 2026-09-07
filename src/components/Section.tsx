import Reveal from "@/components/Reveal";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

/**
 * Placeholder de sección para la Fase 1: solo título + lorem, dentro del
 * mismo contenedor y ritmo vertical que usarán las secciones reales.
 */
export default function Section({
  id,
  title,
  alt = false,
}: {
  id: string;
  title: string;
  alt?: boolean;
}) {
  return (
    <section id={id} className={alt ? "bg-bg-alt" : undefined}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {LOREM}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
