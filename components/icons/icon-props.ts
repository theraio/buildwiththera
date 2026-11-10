// The curated prop surface every icon in this folder accepts — deliberately
// narrower than lucide-react's full SVG passthrough, so icons stay simple,
// decorative glyphs rather than general-purpose SVG elements.
export interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}
