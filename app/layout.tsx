import { CheckoutProvider } from "@/lib/CheckoutContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecoyaan — Sustainable Checkout",
  description:
    "Complete your purchase of eco-friendly, sustainable products on Ecoyaan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
