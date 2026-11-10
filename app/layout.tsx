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
  title: "Spar",
  description: "A strong technical base for agentic development.",
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
