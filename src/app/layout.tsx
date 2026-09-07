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
const ogImage = "/og-placeholder.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://estudia.plus"),
  title,
  description,
  applicationName: "Estudia+",
  // El favicon lo detecta Next solo desde src/app/favicon.ico. Declararlo aquí
  // además duplicaba el <link rel="icon"> en el HTML.
  openGraph: {
    type: "website",
    url: "https://estudia.plus",
    siteName: "Estudia+",
    title,
    description,
    locale: "es_ES",
    images: [
      {
        // TODO: OG real. De momento un lienzo crema del color de marca.
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Estudia+ — Aprende de verdad, no aprendas atajos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
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
