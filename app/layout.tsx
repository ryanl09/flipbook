import type { Metadata } from "next";
import "./globals.css";
import { ApolloClientProvider } from "@/components/context/ApolloClientProvider";

export const metadata: Metadata = {
  title: "Flip Em Off",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} bg-background relative`}>
        <ApolloClientProvider>
          {children}
        </ApolloClientProvider>
      </body>
    </html>
  );
}
