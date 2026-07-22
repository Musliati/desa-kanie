import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desa Kanie - Website Resmi Pemerintah Desa",
  description:
    "Website resmi Pemerintah Desa Kanie - melayani masyarakat dengan integritas, transparansi, dan komitmen untuk kemajuan berkelanjutan.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body-md overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}