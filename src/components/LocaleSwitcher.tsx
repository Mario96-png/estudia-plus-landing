"use client";

import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
  pathForLocale,
} from "@/i18n/config";

/**
 * Selector "EN | ES". Discreto a propósito: no es una función del producto,
 * es un escape para cuando la detección automática se equivoca.
 *
 * SIN BANDERAS. Una bandera nombra un país, no una lengua: el español no es
 * España más que México, y el inglés no es Reino Unido más que Estados Unidos.
 * Dos códigos de idioma no tienen ese problema.
 *
 * SON ANCLAS DE VERDAD, no botones. Dos motivos:
 *  - Googlebot necesita un <a href> real que seguir hasta /en; un onClick con
 *    router.push no se rastrea, y sin eso el hreflang apunta a una URL que el
 *    buscador nunca ve enlazada.
 *  - La navegación completa (en vez de client-side) garantiza que el <html
 *    lang> cambie y que el proxy vuelva a leer la cookie recién escrita. Con
 *    next/link, una carga previa hecha con la cookie anterior podría servir el
 *    idioma antiguo desde la caché del router.
 */
/**
 * Orden FIJO, independiente del idioma activo: si la lista se reordenara para
 * poner delante el idioma en uso, el enlace de al lado del botón "Entrar"
 * cambiaría de sitio al cambiar de idioma y se pulsaría mal.
 */
const ORDER = ["en", "es"] as const satisfies readonly Locale[];

export default function LocaleSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const remember = (next: Locale) => {
    // En localhost (http) el atributo `secure` haría que el navegador
    // descartara la cookie, y el selector no recordaría nada al probarlo.
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure}`;
  };

  return (
    <div
      aria-label={label}
      className="flex items-center gap-1.5 text-xs font-medium tracking-wide"
    >
      {ORDER.map((code, i) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-ink/25">
                |
              </span>
            )}
            <a
              href={pathForLocale(code)}
              hrefLang={code}
              lang={code}
              onClick={() => remember(code)}
              aria-current={active ? "true" : undefined}
              className={
                active
                  ? "text-ink"
                  : "text-ink-soft transition-colors hover:text-ink"
              }
            >
              {code.toUpperCase()}
            </a>
          </span>
        );
      })}
    </div>
  );
}
