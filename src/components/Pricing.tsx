import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import PricingPlans from "@/components/PricingPlans";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Pricing({
  t,
  locale,
}: {
  t: Dictionary["pricing"];
  locale: Locale;
}) {
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
          centered
        />

        <PricingPlans t={t} locale={locale} />

        <Reveal>
          <p className="mt-12 text-center text-sm text-ink-soft">
            {t.studentNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
