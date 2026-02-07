import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mibanco | Banco de la Microempresa",
    template: "%s | Mibanco",
  },
  description: "Impulsamos el progreso de los emprendedores peruanos. Préstamos, ahorros, seguros y asesoría financiera para tu negocio.",
  keywords: ["Mibanco", "Préstamos", "Microempresa", "Ahorros", "Seguros", "Emprendedores", "Perú", "Crédito"],
  authors: [{ name: "Mibanco" }],
  creator: "Mibanco",
  publisher: "Mibanco",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://www.mibanco.com.pe",
    title: "Mibanco | Impulsamos tu progreso",
    description: "La banca líder en microfinanzas en Latinoamérica. Soluciones financieras diseñadas para el emprendedor peruano.",
    siteName: "Mibanco",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added if not present
        width: 1200,
        height: 630,
        alt: "Mibanco - Banco de la Microempresa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mibanco | Banco de la Microempresa",
    description: "Impulsamos el progreso de los emprendedores peruanos.",
    creator: "@mibanco",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#00a550",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
