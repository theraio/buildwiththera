import { LANDING_COPY, Locale } from "~/components/landing";

import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

/** Social card size every platform crops cleanly (1.91:1). */
export const OG_SIZE = { width: 1200, height: 630 };

/**
 * The social card for one language: ink ground, the headline, a lime seed on
 * the horizon and the studio's signature, in the landing's own palette.
 *
 * @param locale - The page's language.
 * @returns A PNG response for an `opengraph-image` route.
 */
export async function renderOgImage(locale: Locale) {
  const { hero, meta } = LANDING_COPY[locale];
  // Static Chillax cuts: the image renderer reads neither woff2 nor variable fonts.
  const [regular, semibold] = await Promise.all(
    ["chillax-regular.ttf", "chillax-semibold.ttf"].map((file) =>
      readFile(join(process.cwd(), "app/fonts", file)),
    ),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "radial-gradient(circle at 78% 110%, rgba(155,211,1,0.22), transparent 45%), radial-gradient(circle at 12% -10%, rgba(0,102,255,0.18), transparent 45%), #1e1e1e",
        color: "#ffffff",
        fontFamily: "Chillax",
      }}
    >
      <div style={{ display: "flex", fontSize: 38, fontWeight: 600 }}>
        thera
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 80,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {hero.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 900,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#b4b4b4",
          }}
        >
          {meta.title.split(" — ")[1]}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            background: "#9bd301",
            boxShadow: "0 0 28px 8px rgba(155,211,1,0.6)",
          }}
        />
        <div style={{ display: "flex", fontSize: 26, color: "#b4b4b4" }}>
          Matías Santillan · buildwiththera.com
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Chillax", data: regular, weight: 400, style: "normal" },
        { name: "Chillax", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
