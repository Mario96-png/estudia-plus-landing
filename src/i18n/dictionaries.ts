import type { Locale } from "@/i18n/config";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

/**
 * Diccionarios de la landing.
 *
 * Se importan de forma ESTÁTICA, no con `import()` dinámico, y es a propósito:
 * el español es la forma del contrato. `Dictionary` se deriva de es.json, así
 * que si en.json se queda sin una clave el build falla en el `Record` de abajo
 * — que es justo lo que uno quiere de un fichero de traducciones, y lo que un
 * import dinámico (tipado como `any` en la práctica) no daría.
 *
 * Los dos ficheros juntos pesan ~9 KB y sólo se leen en componentes de
 * servidor: nada de esto llega al bundle del cliente. Los componentes cliente
 * (Navbar, Hero, PricingPlans) reciben por props sólo las cadenas que usan.
 */
export type Dictionary = typeof es;

const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
