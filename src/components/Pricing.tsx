import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import PricingPlans from "@/components/PricingPlans";

export default function Pricing() {
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Precios"
          title="Empieza gratis. Mejora cuando estés listo."
          subtitle="Sin permanencia. Cancela en un click."
          centered
        />

        <PricingPlans />

        <Reveal>
          <p className="mt-12 text-center text-sm text-ink-soft">
            ¿Estudiante con carnet? Escríbenos y hablamos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
