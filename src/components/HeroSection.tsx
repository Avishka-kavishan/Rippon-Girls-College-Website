import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[520px] sm:h-[620px] md:h-[700px] lg:h-[780px] flex items-end justify-center overflow-hidden">
      {/* Background Hero Image */}
      <Image
        src="/images/hero-image.webp"
        alt="Rippon Girls' College Campus"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />

      {/* Overlay Content (Centered Text & Golden CTA) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 md:pb-24 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans drop-shadow-md leading-tight">
          Welcome to Rippon Girl&apos;s College
        </h1>

        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white/95 font-medium font-sans max-w-2xl drop-shadow-sm">
          Oldest Girl&apos;s School in Southern Province of Sri Lanka
        </p>

        <div className="mt-6 sm:mt-8">
          <Link
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full bg-[#f5a600] hover:bg-[#e09800] text-black px-7 py-3 sm:px-9 sm:py-3.5 text-sm sm:text-base font-bold transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Discover more</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
