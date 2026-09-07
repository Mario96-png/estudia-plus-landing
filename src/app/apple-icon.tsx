import { ImageResponse } from "next/og";
import { ACCENT, BG, loadFonts } from "@/lib/og";

// Next sólo detecta apple-icon en jpg/png, no en svg: por eso se genera aquí
// en vez de reutilizar icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: size.width,
          height: size.height,
          backgroundColor: BG,
        }}
      >
        <div
          style={{
            fontFamily: "Lora",
            fontWeight: 600,
            fontSize: 124,
            lineHeight: 1,
            color: ACCENT,
            marginLeft: -28,
            marginTop: 8,
          }}
        >
          E
        </div>
        <div // width/height explícitos y posición por `left`: Satori recorta las cajas
        // sin dimensionar y las pegadas al borde derecho.
        style={{
          position: "absolute",
          top: 40,
          left: 106,
          width: 42,
          height: 42,
          display: "flex",
        }}>
          <div
            style={{
              position: "absolute",
              top: 15,
              left: 0,
              width: 42,
              height: 13,
              borderRadius: 4,
              backgroundColor: ACCENT,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 14.5,
              width: 13,
              height: 42,
              borderRadius: 4,
              backgroundColor: ACCENT,
            }}
          />
        </div>
      </div>
    ),
    { ...size, fonts: await loadFonts() },
  );
}
