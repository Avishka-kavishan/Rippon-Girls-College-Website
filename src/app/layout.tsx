import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import NoticeBar from '@/components/layout/NoticeBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rippon Girls' College, Galle | Official Web Portal",
  description: "Official website of Rippon Girls' College, Galle (est. 1871) — A premier 1AB National School in Sri Lanka nurturing empowered and enlightened young women.",
  keywords: [
    "Rippon Girls' College",
    "Rippon College Galle",
    "Galle Girls Schools",
    "Southern Province Schools Sri Lanka",
    "Richmond Hill Galle",
    "Bradby House",
    "Peake House",
    "Rippon House",
    "Westlake House",
    "PPA Rippon Girls College"
  ],
  authors: [{ name: "Rippon Girls' College Media Unit" }],
  openGraph: {
    title: "Rippon Girls' College, Galle | 150+ Years of Excellence",
    description: "Empowering young women to conquer global frontiers with timeless values and academic excellence.",
    siteName: "Rippon Girls' College",
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
    <html lang="en" className={`${outfit.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] font-sans antialiased selection:bg-[#d4af37] selection:text-[#0a192f]">
        <NoticeBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
