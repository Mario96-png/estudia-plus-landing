import { ImageResponse } from "next/og";
import { OgCard, loadFonts } from "@/lib/og";

export const alt = "Estudia+ — Aprende de verdad, no aprendas atajos";

// 2× de 1200×600. X recorta a 2:1; el doble de resolución es lo que evita que
// el título se vea crudo al reescalar. Ver la nota en opengraph-image.tsx.
export const size = { width: 2400, height: 1200 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgCard {...size} />, {
    ...size,
    fonts: await loadFonts(),
  });
}
