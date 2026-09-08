import type { Metadata, Viewport } from "next";
import { Lora, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_URL,
  isLocale,
  pathForLocale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Los dos idiomas se prerrenderizan en el build: la landing es estática. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/**
 * hreflang para los dos idiomas + x-default apuntando al español, que es el que
 * sirve "/" cuando el navegador no pide nada en concreto.
 *
 * Las rutas son relativas a propósito: `metadataBase` las convierte en
 * absolutas, así que la URL del dominio se escribe UNA vez (en i18n/config) y
 * no se puede quedar desparejada entre canonical y alternate.
 */
const alternates = {
  languages: {
    es: pathForLocale("es"),
    en: pathForLocale("en"),
    "x-default": pathForLocale(DEFAULT_LOCALE),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { title, description, ogLocale } = getDictionary(lang).meta;
  const canonical = pathForLocale(lang);
  const other = LOCALES.filter((l) => l !== lang);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: "Estudia+",
    alternates: { canonical, ...alternates },
    // Iconos y tarjetas sociales van por convención de ficheros en src/app/
    // (icon.svg, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx).
    // Declararlos aquí además duplicaría las etiquetas en el HTML.
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Estudia+",
      title,
      description,
      locale: ogLocale,
      alternateLocale: other.map((l) => getDictionary(l).meta.ogLocale),
      // La imagen la aporta src/app/[lang]/opengraph-image.tsx por convención.
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // Idem: src/app/[lang]/twitter-image.tsx.
    },
  };
}

// themeColor vive en `viewport`, no en `metadata` (Next 14+).
export const viewport: Viewport = {
  themeColor: "#F2EBDC",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg text-ink">
        <SmoothScroll>{children}</SmoothScroll>
        {/* Ambos se desactivan solos fuera de producción, así que en local no
            ensucian los datos. Sin cookies: no hacen falta banner ni consent. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
