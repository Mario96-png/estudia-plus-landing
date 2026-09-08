import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ancla la raíz del proyecto. Sin esto Turbopack sube por el árbol buscando
  // un lockfile, encuentra el del directorio personal del usuario y avisa de
  // que lo ignora en cada build. No cambia nada del bundle: sólo deja de
  // adivinar.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
