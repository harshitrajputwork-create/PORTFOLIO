import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harshit Rajput · AI-native Product Manager",
  description:
    "Product Manager who ships: PM fundamentals, AI-built prototypes, and street-smart numbers. Projects, case studies and live napkin math.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
