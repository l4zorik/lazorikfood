import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FoodHub – Manažer potravinářského businessu",
  description:
    "Moderní webová aplikace pro správu restaurace, bistra nebo food trucku. Objednávky, menu, sklad, personál a analytika na jednom místě.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
