import "./globals.css";

import type { Metadata } from "next";
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
  title: "Thera",
  description: "Purpose-driven software for meaningful growth.",
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
      </body>
    </html>
  );
}
