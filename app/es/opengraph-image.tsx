import { OG_SIZE, renderOgImage } from "~/app/_utils/og-image";

export const alt = "Thera — Sembrá la idea correcta. Cosechá crecimiento real.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("es");
}
