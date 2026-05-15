import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "AI Blog Generator",
  description: "Generate blog content with AI",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Toaster />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}