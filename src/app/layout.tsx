import NextSessionProvider from "@/core/auth/providers/NextSessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

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
          <Toaster richColors position="top-right"/>
          {children}
        </NextSessionProvider>
      </body>
    </html>
  );
}
