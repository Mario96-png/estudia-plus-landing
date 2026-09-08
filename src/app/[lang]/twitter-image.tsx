import { ImageResponse } from "next/og";
import { OgCard, loadFonts } from "@/lib/og";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// 2× de 1200×600. X recorta a 2:1; el doble de resolución es lo que evita que
// el título se vea crudo al reescalar. Ver la nota en opengraph-image.tsx.
export const size = { width: 2400, height: 1200 };
export const contentType = "image/png";

type Params = { lang: string };

const localeOf = (lang: string) => (isLocale(lang) ? lang : DEFAULT_LOCALE);

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
