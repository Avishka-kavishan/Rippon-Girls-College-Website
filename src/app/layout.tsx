import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rippon Girl's College | Galle, Sri Lanka",
  description: "Official website of Rippon Girl's College - Oldest Girl's School in Southern Province of Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="font-sans antialiased min-h-screen bg-neutral-100 text-neutral-900 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
