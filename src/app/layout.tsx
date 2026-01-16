import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ConditionalLayout } from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Light Brand Consulting | AI Business Transformation",
  description: "Transform your business into an AI super intelligence. Illuminate the path between where you are and where AI can take you.",
  keywords: "AI consulting, business transformation, AI strategy, AI acceleration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-depth-base text-text-primary antialiased selection:bg-radiance-gold selection:text-depth-base">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
