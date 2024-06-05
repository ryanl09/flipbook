import type { Metadata } from "next";
import { Red_Hat_Display } from 'next/font/google'
import "./globals.css";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlipBook",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} bg-background relative`}>{children}</body>
    </html>
  );
}
