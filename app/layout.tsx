import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV - Nathan FERRE | Etudiant en Informatique",
  description: "CV interactif de Nathan FERRE - Etudiant en Informatique",
  keywords: ["CV", "Resume", "Etudiant", "Informatique", "Nathan FERRE"],
  authors: [{ name: "Nathan FERRE" }],
  openGraph: {
    title: "CV - Nathan FERRE | Etudiant en Informatique",
    description: "CV interactif de Nathan FERRE - Etudiant en Informatique",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
