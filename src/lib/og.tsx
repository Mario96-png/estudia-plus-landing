/**
 * Piezas compartidas por las imágenes generadas (opengraph, twitter, apple-icon).
 *
 * Satori — el renderer que hay detrás de ImageResponse — sólo entiende un
 * subconjunto de CSS: no hay filter: blur(), así que las manchas del hero se
 * imitan con radial-gradients de caída suave. Todo div con más de un hijo
 * necesita display:flex explícito.
 */

// UA antiguo a propósito: con uno moderno Google devuelve woff2, que Satori no lee.
const LEGACY_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27";

type FontSpec = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600;
  style: "normal";
};

async function fetchFont(
  name: string,
  family: string,
  weight: 400 | 600,
): Promise<FontSpec | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
      { headers: { "User-Agent": LEGACY_UA } },
    ).then((r) => r.text());

    const url = css.match(
      /src:\s*url\((https:\/\/[^)]+)\)\s*format\('(?:truetype|opentype)'\)/,
    )?.[1];
    if (!url) return null;

    const data = await fetch(url).then((r) => r.arrayBuffer());
    return { name, data, weight, style: "normal" };
  } catch {
    return null;
  }
}

/**
 * Descarga Lora e Inter en TTF durante el build — las mismas de la web.
 * Si algo falla (sin red, Google caído) devuelve lo que haya conseguido, o []:
 * ImageResponse tira entonces de su fuente por defecto. Nunca rompe el build.
 */
export async function loadFonts(): Promise<FontSpec[]> {
  const fonts = await Promise.all([
    fetchFont("Lora", "Lora", 600),
    fetchFont("Inter", "Inter", 400),
  ]);
  return fonts.filter((f): f is FontSpec => f !== null);
}

const BG = "#F2EBDC";
const INK = "#1F1B16";
const INK_SOFT = "#665E50";
const ACCENT = "#AB3D1D";

/**
 * Mancha difusa. La caja ocupa el lienzo entero y lo que se mueve es el centro
 * del degradado, en porcentaje.
 *
 * Tres cosas son obligatorias aquí, y todas se descubrieron pintando:
 *  - width/height explícitos: con `inset: 0` Satori no dimensiona la caja y no
 *    pinta absolutamente nada.
 *  - top/left NO negativos: Satori recorta las cajas desplazadas fuera del
 *    lienzo, y el corte se ve como una banda recta. Por eso la caja no se mueve
 *    y se mueve el centro del degradado.
 *  - `farthest-corner`: sin esa palabra Satori ignora `circle` y pinta una
 *    elipse que llena la caja, dejando color vivo hasta el borde.
 */
function Blob({
  color,
  cx,
  cy,
  spread,
  opacity,
  width,
  height,
}: {
  color: string;
  /** Centro del degradado, en % del lienzo. Puede caer fuera de 0–100. */
  cx: number;
  cy: number;
  /** Dónde muere el color, en % del radio hasta la esquina más lejana. */
  spread: number;
  opacity: number;
  width: number;
  height: number;
}) {
  const transparent = color.replace("rgb(", "rgba(").replace(")", ", 0)");
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        opacity,
        backgroundImage: `radial-gradient(circle farthest-corner at ${cx}% ${cy}%, ${color} 0%, ${transparent} ${spread}%)`,
      }}
    />
  );
}

/** Marca E+ en pequeño, dibujada con divs porque no hay SVG en Satori. */
function Wordmark({ s }: { s: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div
        style={{
          fontFamily: "Lora",
          fontSize: 34 * s,
          fontWeight: 600,
          color: ACCENT,
          lineHeight: 1,
        }}
      >
        Estudia
      </div>
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 18 * s,
          height: 18 * s,
          marginLeft: 3 * s,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 6 * s,
            left: 0,
            width: 18 * s,
            height: 5 * s,
            borderRadius: 2 * s,
            backgroundColor: ACCENT,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 6.5 * s,
            width: 5 * s,
            height: 18 * s,
            borderRadius: 2 * s,
            backgroundColor: ACCENT,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Tarjeta social. La composición se define para un lienzo de 1200 de ancho y
 * se escala a partir de ahí, así que la misma función sirve para og y twitter.
 *
 * Se renderiza al DOBLE de la medida nominal (2400×1260) a propósito. Satori
 * rasteriza el texto con un único píxel de antialiasing por borde: a 1200 de
 * ancho eso se ve crudo en un título de 78px. Pintando al doble, ese píxel
 * pasa a ser medio píxel cuando WhatsApp o X reescalan la imagen, y el borde
 * queda suave. Es supersampling: la nitidez la pone la resolución, no un
 * retoque de tipografía.
 */
export function OgCard({ width, height }: { width: number; height: number }) {
  const s = width / 1200;
  const canvas = { width, height };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width,
        height,
        backgroundColor: BG,
        fontFamily: "Inter",
        padding: 72 * s,
      }}
    >
      <Blob {...canvas} color="rgb(171, 61, 29)" cx={11} cy={2} spread={33} opacity={0.34} />
      <Blob {...canvas} color="rgb(70, 101, 117)" cx={94} cy={9} spread={29} opacity={0.3} />
      <Blob {...canvas} color="rgb(216, 198, 166)" cx={52} cy={116} spread={42} opacity={0.6} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Lora",
            fontWeight: 600,
            fontSize: 78 * s,
            lineHeight: 1.12,
            letterSpacing: -1.5 * s,
            color: INK,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Aprende de verdad,</span>
          <span>no aprendas atajos.</span>
        </div>

        <div style={{ marginTop: 30 * s, fontSize: 31 * s, color: INK_SOFT }}>
          El primer tutor IA que te enseña a estudiar.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 56 * s,
          left: 72 * s,
          right: 72 * s,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Wordmark s={s} />
        <div style={{ fontSize: 23 * s, color: INK_SOFT, opacity: 0.7 }}>
          estudia.plus
        </div>
      </div>
    </div>
  );
}

export { ACCENT, BG };
