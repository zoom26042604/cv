import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - zoom2604.dev",
  description: "Tableau de bord d'administration pour gérer tous les services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
