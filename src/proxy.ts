import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Locale,
  isLocale,
} from "@/i18n/config";

/**
 * Resolución de idioma antes de renderizar.
 *
 * En Next 16 esto es `proxy.ts`: el convenio `middleware.ts` está deprecado
 * (ver node_modules/next/dist/docs/.../proxy.md).
 *
 * EL MAPA DE URLs
 *
 *   /            → rewrite interno a /es     (español, URL sin prefijo)
 *   /en          → tal cual                  (inglés)
 *   /es          → redirect 308 a /          (evita contenido duplicado)
 *
 * El rewrite es lo que permite que el español siga viviendo en "/" mientras el
 * árbol de `app/` está bajo `[lang]`. Y el 308 de /es a / existe porque si no
 * habría dos URLs sirviendo exactamente el mismo HTML, que es justo lo que
 * penaliza un buscador.
 *
 * La detección automática SÓLO manda cuando no hay cookie. En cuanto el usuario
 * toca el selector, su elección gana para siempre: un visitante con el
 * navegador en inglés que pide español a mano no debe volver a inglés en la
 * siguiente visita.
 */

/** Rutas de imagen generada. No son páginas y no se tocan. */
const IMAGE_ROUTE = /\/(opengraph-image|twitter-image|icon|apple-icon)(\/|$)/;

/**
 * Mejor idioma según Accept-Language, respetando los factores q.
 *
 * Se recorre por preferencia y gana el primer tag que sepamos servir, así que
 * "fr-FR,en;q=0.8" da inglés (el francés no lo tenemos, pero el inglés sí lo
 * lee) y "es-MX,en;q=0.5" da español. Mirar sólo el primer tag, como suele
 * hacerse, se equivocaría en el primer caso.
 */
function preferredLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const tags = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        base: tag.trim().toLowerCase().split("-")[0],
        q: q ? Number(q.split("=")[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { base } of tags) {
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (IMAGE_ROUTE.test(pathname)) return;

  // /es → / (canónica del español).
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // /en… ya lleva el idioma en la URL: la URL manda sobre cookie y navegador.
  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved)
    ? saved
    : preferredLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();

  if (locale !== DEFAULT_LOCALE) {
    // Redirect y no rewrite: si el inglés se sirviera en "/" tendríamos una
    // sola URL con dos contenidos, que es el problema que este montaje evita.
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Fuera: internos de Next, la API y cualquier cosa con extensión (favicon,
  // imágenes de /public). Lo demás son páginas y pasa por aquí.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
