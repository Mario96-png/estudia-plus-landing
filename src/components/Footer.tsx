import Link from "next/link";

const APP_URL = "https://app.estudia.plus";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-bg-alt">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">© 2026 Estudia+</p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          <Link href="#producto" className="transition-colors hover:text-ink">
            Producto
          </Link>
          <Link href="#precios" className="transition-colors hover:text-ink">
            Precios
          </Link>
          <Link href="#faq" className="transition-colors hover:text-ink">
            FAQ
          </Link>
          <a href={APP_URL} className="transition-colors hover:text-ink">
            Entrar
          </a>
        </nav>
      </div>
    </footer>
  );
}
