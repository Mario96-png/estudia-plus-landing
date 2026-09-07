import Reveal from "@/components/Reveal";

/** Eyebrow + h2 con el mismo ritmo en todas las secciones. */
export default function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wider text-info">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 mb-16 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
      </Reveal>
    </>
  );
}
