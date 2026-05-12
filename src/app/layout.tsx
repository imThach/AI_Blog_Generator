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
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          body { transition: background-color 0.3s ease, color 0.3s ease; }
          body.dark-mode { background-color: #0a0a0a !important; color: #ededed !important; }
          body.dark-mode .bg-white { background-color: #141414 !important; }
          body.dark-mode .text-black { color: #ededed !important; }
          body.dark-mode .border-gray-100 { border-color: #2a2a2a !important; }
          body.dark-mode .border-gray-50 { border-color: #222 !important; }
          body.dark-mode .border-gray-200 { border-color: #333 !important; }
          body.dark-mode .bg-gray-50 { background-color: #1e1e1e !important; }
          body.dark-mode .text-gray-500 { color: #a1a1a1 !important; }
          body.dark-mode .text-gray-400 { color: #888 !important; }
          body.dark-mode .bg-black { background-color: #ededed !important; color: #0a0a0a !important; }
          body.dark-mode .bg-\\[\\#111\\] { background-color: #ededed !important; color: #0a0a0a !important; }
          body.dark-mode .hover\\:bg-black:hover { background-color: #ccc !important; color: #0a0a0a !important; }
          body.dark-mode .hover\\:bg-gray-50:hover { background-color: #2a2a2a !important; }
          body.dark-mode .bg-zinc-900 { background-color: #ededed !important; color: #0a0a0a !important; }
          body.dark-mode input { background-color: #141414 !important; color: #ededed !important; }
          body.dark-mode .focus\\:border-black:focus { border-color: #ededed !important; }
          body.dark-mode .disabled\\:bg-gray-300:disabled { background-color: #333 !important; color: #666 !important; }
          body.dark-mode .prose { --tw-prose-body: #ededed; --tw-prose-headings: #ffffff; --tw-prose-lead: #ededed; --tw-prose-links: #60a5fa; --tw-prose-bold: #ffffff; --tw-prose-counters: #a1a1a1; --tw-prose-bullets: #a1a1a1; --tw-prose-hr: #333; --tw-prose-quotes: #ededed; --tw-prose-quote-borders: #333; --tw-prose-captions: #a1a1a1; --tw-prose-code: #ffffff; --tw-prose-pre-code: #ededed; --tw-prose-pre-bg: #1e1e1e; --tw-prose-th-borders: #333; --tw-prose-td-borders: #2a2a2a; }
        ` }} />
      </head>
      <body className="min-h-screen bg-white">
        <Toaster />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}