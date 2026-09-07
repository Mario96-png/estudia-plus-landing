import Link from "next/link";

const APP_URL = "https://app.estudia.plus";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl font-semibold text-ink">
          Estudia+
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="#producto"
            className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Producto
          </Link>
          <Link
            href="#precios"
            className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Precios
          </Link>
          <a
            href={APP_URL}
            className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/30 hover:bg-paper"
          >
            Entrar
          </a>
        </div>
      </nav>
    </header>
  );
}
