/**
 * Constantes de idioma. Este fichero lo importan el proxy (que corre en el
 * edge), los componentes de servidor y el selector del navbar, así que no puede
 * traer nada de Node ni de React: sólo datos.
 */

export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * El español no lleva prefijo: vive en "/", que es la URL que lleva indexada
 * desde el principio. Meterlo en "/es" habría convertido la home en un redirect
 * permanente y habría movido la URL canónica de todo el dominio — mucho riesgo
 * de SEO a cambio de nada. Es además lo que hacen Vercel, Stripe y Linear.
 */
export const DEFAULT_LOCALE: Locale = "es";

/** Nombre convencional de Next; lo reconocen las herramientas del ecosistema. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Un año. La preferencia de idioma no caduca en una sesión. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const SITE_URL = "https://estudia.plus";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Ruta pública de un idioma. El default va sin prefijo, el resto con él. */
export function pathForLocale(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}
