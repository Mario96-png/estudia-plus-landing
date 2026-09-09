import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import WhenToUse from "@/components/WhenToUse";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

/**
 * Punto único donde se lee el diccionario. De aquí para abajo las secciones
 * reciben por props sólo su trozo, así que los componentes cliente (Navbar,
 * Hero, PricingPlans) no arrastran el JSON entero al bundle ni necesitan un
 * provider de contexto.
 */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);

  return (
    <main className="flex-1">
      <Navbar t={t.nav} locale={lang} />
      <Hero t={t.hero} locale={lang} />
      <Problem t={t.problem} />
      <HowItWorks t={t.howItWorks} />
      <WhenToUse t={t.whenToUse} />
      <Features t={t.features} />
      <Pricing t={t.pricing} locale={lang} />
      <FAQ t={t.faq} />
      <Footer t={t.footer} />
    </main>
  );
}
