import type { Metadata, Viewport } from "next";
import { Lora, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

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

const title = "Estudia+ | Aprende de verdad, no aprendas atajos";
const description =
  "El primer tutor IA que te enseña a estudiar. Coach socrático, flashcards inteligentes y adaptación a tu sistema educativo (IGCSE, IB, A-Levels, LOMLOE).";

export const metadata: Metadata = {
  metadataBase: new URL("https://estudia.plus"),
  title,
  description,
  applicationName: "Estudia+",
  // Iconos y tarjetas sociales van por convención de ficheros en src/app/
  // (icon.svg, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx).
  // Declararlos aquí además duplicaría las etiquetas en el HTML.
  openGraph: {
    type: "website",
    url: "https://estudia.plus",
    siteName: "Estudia+",
    title,
    description,
    locale: "es_ES",
    // La imagen la aporta src/app/opengraph-image.tsx por convención.
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    // Idem: src/app/twitter-image.tsx.
  },
};

// themeColor vive en `viewport`, no en `metadata` (Next 14+).
export const viewport: Viewport = {
  themeColor: "#F2EBDC",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
