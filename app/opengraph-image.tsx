import { OG_SIZE, renderOgImage } from "~/app/_utils/og-image";

export const alt = "Thera — Plant the right idea. Harvest real growth.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
