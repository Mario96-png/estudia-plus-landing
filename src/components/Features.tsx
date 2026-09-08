import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";
import type { Dictionary } from "@/i18n/dictionaries";

const ICONS = ["🎯", "🌍", "🃏", "🔒"];

export default function Features({ t }: { t: Dictionary["features"] }) {
  return (
    <section id="features" className="bg-bg-alt py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.items.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.1} className="h-full">
              <FeatureCard
                icon={ICONS[i]}
                title={feature.title}
                body={feature.body}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
