import Reveal from "@/components/Reveal";

/**
 * Eyebrow + h2 (+ subtítulo opcional) con el mismo ritmo en todas las secciones.
 * `centered` es para las secciones que van a eje central, como Pricing.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "flex flex-col items-center text-center" : undefined}>
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wider text-info">
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-4 text-ink-soft">{subtitle}</p>
        </Reveal>
      )}

      {/* El hueco hasta el contenido vive aquí para que todas las secciones
          compartan el mismo ritmo vertical. */}
      <div className="h-16" />
    </div>
  );
}
