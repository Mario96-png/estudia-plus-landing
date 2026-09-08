import { ImageResponse } from "next/og";
import { OgCard, loadFonts } from "@/lib/og";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// 2× la medida nominal de 1200×630, misma proporción 1.91:1. Satori sólo pone
// un píxel de antialiasing por borde, así que la nitidez se compra con
// resolución: quien muestre la tarjeta la reescala y los bordes se suavizan.
// Facebook y X aceptan hasta 8 MB y recomiendan explícitamente 2× para pantallas
// de alta densidad.
export const size = { width: 2400, height: 1260 };
export const contentType = "image/png";

type Params = { lang: string };

/** El proxy nunca deja llegar un idioma raro aquí, pero esta ruta también se
 *  puede pedir a pelo, y una tarjeta social en español es mejor que un 500. */
const localeOf = (lang: string) => (isLocale(lang) ? lang : DEFAULT_LOCALE);

/**
 * `alt` no se puede exportar por idioma (es una constante de módulo), así que
 * el texto alternativo sale de aquí: es lo único que permite que og:image:alt
 * diga en inglés lo que la imagen dice en inglés.
 */
export async function generateImageMetadata({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  return [
    {
      id: "card",
      alt: getDictionary(localeOf(lang)).meta.ogAlt,
      size,
      contentType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  const { hero, meta } = getDictionary(localeOf(lang));

  return new ImageResponse(
    <OgCard
      {...size}
      titleLine1={hero.titleLine1}
      titleLine2={hero.titleLine2}
      subtitle={meta.ogSubtitle}
    />,
    { ...size, fonts: await loadFonts() },
  );
}
