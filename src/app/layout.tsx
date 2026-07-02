import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const Avenir = localFont({
  src: [
    {
      path: "../../public/fonts/Avenir Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir Heavy.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir Heavy.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir Heavy.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-avenir",
});

export const metadata: Metadata = {
  title: "Jukebox Media - The only one you need",
  description: "Scale your brand to new heights with structured marketing systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Avenir.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#fafaf9] text-[#0f0f10] font-light" suppressHydrationWarning>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
