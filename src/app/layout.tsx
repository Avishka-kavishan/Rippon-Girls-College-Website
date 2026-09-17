import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rippon Girl's College, Galle | Official Web Portal",
  description: "Official website of Rippon Girl's College, Galle (est. 1871) — Oldest Girl's School in Southern Province of Sri Lanka.",
  keywords: [
    "Rippon Girl's College",
    "Rippon College Galle",
    "Galle Girls Schools",
    "Southern Province Schools Sri Lanka",
    "Richmond Hill Galle"
  ],
  authors: [{ name: "Rippon Girl's College Media Unit" }],
  openGraph: {
    title: "Rippon Girl's College, Galle",
    description: "Oldest Girl's School in Southern Province of Sri Lanka.",
    siteName: "Rippon Girl's College",
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-[#111827] font-sans antialiased selection:bg-[#d4af37] selection:text-[#0a192f]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
