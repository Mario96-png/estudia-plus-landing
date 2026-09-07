import Reveal from "@/components/Reveal";

const CONTACT_EMAIL = "hola@estudia.plus";

/** `href: null` = todavía no existe destino. Se pinta apagado, no navegable. */
type FooterLink = { label: string; href: string | null };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Producto",
    links: [
      { label: "Cómo funciona", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Precios", href: "#pricing" },
      { label: "Preguntas", href: "#faq" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog", href: null },
      { label: "Guía IGCSE", href: null },
      { label: "Guía IB", href: null },
      { label: "Guía A-Levels", href: null },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: null },
      { label: "Términos", href: null },
      { label: "Cookies", href: null },
      { label: "Contacto", href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

const SOCIALS = [
  {
    label: "Estudia+ en X",
    path: "M17.53 3h2.98l-6.51 7.44L21.75 21h-6l-4.7-6.14L5.68 21H2.7l6.96-7.96L2.25 3h6.15l4.25 5.62L17.53 3Zm-1.05 16.2h1.65L7.6 4.71H5.83l10.65 14.49Z",
  },
  {
    label: "Estudia+ en Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.89 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16Zm0 5.17a4.67 4.67 0 1 0 0 9.34 4.67 4.67 0 0 0 0-9.34Zm0 7.7a3.03 3.03 0 1 1 0-6.06 3.03 3.03 0 0 1 0 6.06Zm4.85-8.98a1.09 1.09 0 1 0 0 2.18 1.09 1.09 0 0 0 0-2.18Z",
  },
  {
    label: "Estudia+ en GitHub",
    path: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0 1 12 6.8c.85 0 1.71.12 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z",
  },
];

/**
 * Lo que aún no existe se pinta apagado y sin cursor de enlace. El aviso
 * "Próximamente" va en el title (ratón) y en texto oculto (lector de pantalla):
 * un tooltip a secas dejaría fuera a quien navega con teclado.
 */
function Soon({ children }: { children: React.ReactNode }) {
  return (
    <span
      title="Próximamente"
      aria-disabled="true"
      className="cursor-not-allowed text-bg/40"
    >
      {children}
      <span className="sr-only"> (próximamente)</span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink py-16 text-bg">
      <Reveal>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2">
              <p className="font-serif text-2xl font-semibold">Estudia+</p>
              <p className="mt-2 text-sm text-bg/70">
                Aprende de verdad, no aprendas atajos.
              </p>
              <p className="mt-6 text-xs text-bg/50">
                © 2026 Estudia+. Hecho con cuidado en España.
              </p>
            </div>

            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="mb-4 font-medium text-bg">{column.title}</h2>
                <ul className="flex flex-col gap-2 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a
                          href={link.href}
                          className="text-bg/70 transition-colors hover:text-bg"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Soon>{link.label}</Soon>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-6 border-t border-bg/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-bg/70">
              Hecho por estudiantes, para estudiantes.
            </p>

            <ul className="flex gap-5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <span
                    title="Próximamente"
                    aria-disabled="true"
                    className="block cursor-not-allowed text-bg/40"
                  >
                    <svg
                      role="img"
                      aria-label={`${social.label} (próximamente)`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d={social.path} />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
