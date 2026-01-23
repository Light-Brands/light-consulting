import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { PaletteProvider } from "@/design-system";

export const metadata: Metadata = {
  title: "Light Brand Consulting | AI Business Transformation",
  description: "Transform your business into an AI super intelligence. Illuminate the path between where you are and where AI can take you.",
  keywords: "AI consulting, business transformation, AI strategy, AI acceleration",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Light Brand",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#FAFAF8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-depth-base text-text-primary antialiased">
        <ServiceWorkerRegistration />
        <PaletteProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </PaletteProvider>
      </body>
    </html>
  );
}
