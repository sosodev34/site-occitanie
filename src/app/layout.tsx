import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ConsentProvider } from "@/lib/consent";
import { CookieBanner } from "@/components/CookieBanner";

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cœur d'Occitanie",
  description: "Box terroir & soirées étudiantes en Occitanie (précommande + retrait sur événement).",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} antialiased`}
      >
        <ConsentProvider>
          <CookieBanner />
          {children}
        </ConsentProvider>
      </body>
    </html>
  );
}
