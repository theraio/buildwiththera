import "./globals.css";

import type { Metadata } from "next";
import { FOUNDER, SITE_NAME, SITE_URL } from "~/app/_constants/site";

import { CursorSparks } from "~/components/widgets/cursor-sparks";
import { LANDING_COPY } from "~/components/landing";
import { ThemeProvider } from "~/providers";
import { Toaster } from "~/components/ui";
import { TrpcProvider } from "~/widgets/trpc/client";
import localFont from "next/font/local";

const chillax = localFont({
  src: "./fonts/chillax-variable.woff2",
  variable: "--font-chillax",
  weight: "200 700",
});

export const metadata: Metadata = {
  // Resolves every relative URL in metadata (canonicals, social images).
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: LANDING_COPY.en.meta.description,
  applicationName: SITE_NAME,
  authors: [{ name: FOUNDER.name, url: FOUNDER.linkedin }],
  creator: FOUNDER.name,
  publisher: "thera LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  // Positive mark on light browser chrome, negative on dark; favicon.ico
  // (positive) covers browsers that ignore `media`.
  icons: {
    icon: [
      ...[32, 196].flatMap((size) => [
        {
          url: `/favicon-${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: `/favicon-dark-${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
          media: "(prefers-color-scheme: dark)",
        },
      ]),
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${chillax.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <TrpcProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </TrpcProvider>
        {/* Outside every stacking context, so the sparks also cross dialogs. */}
        <CursorSparks />
      </body>
    </html>
  );
}
