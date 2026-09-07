import type { Metadata } from "next";
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
  "Estudia+ te ayuda a entender lo que estudias en lugar de memorizarlo. Apuntes, preguntas y repaso espaciado, con la IA como tutor y no como atajo.";

export const metadata: Metadata = {
  metadataBase: new URL("https://estudia.plus"),
  title,
  description,
  applicationName: "Estudia+",
  openGraph: {
    type: "website",
    url: "https://estudia.plus",
    siteName: "Estudia+",
    title,
    description,
    locale: "es_ES",
    images: [
      {
        // TODO: sustituir por la OG real en Fase 2.
        url: "/og-placeholder.png",
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
    images: ["/og-placeholder.png"],
  },
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
