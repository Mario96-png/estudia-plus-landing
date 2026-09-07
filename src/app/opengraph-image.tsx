import { ImageResponse } from "next/og";
import { OgCard, loadFonts } from "@/lib/og";

export const alt = "Estudia+ — Aprende de verdad, no aprendas atajos";

// 2× la medida nominal de 1200×630, misma proporción 1.91:1. Satori sólo pone
// un píxel de antialiasing por borde, así que la nitidez se compra con
// resolución: quien muestre la tarjeta la reescala y los bordes se suavizan.
// Facebook y X aceptan hasta 8 MB y recomiendan explícitamente 2× para pantallas
// de alta densidad.
export const size = { width: 2400, height: 1260 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgCard {...size} />, {
    ...size,
    fonts: await loadFonts(),
  });
}
