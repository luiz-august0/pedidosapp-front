import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextSessionProvider from "@/core/auth/providers/NextSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pedidos APP",
  description: "Mini ERP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSessionProvider>
          {children}
        </NextSessionProvider>
      </body>
    </html>
  );
}
