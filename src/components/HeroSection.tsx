import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full bg-white flex flex-col items-center">
      {/* Hero Image Container */}
      <div className="w-full relative h-[340px] sm:h-[460px] md:h-[540px] lg:h-[600px] overflow-hidden bg-neutral-100">
        <Image
          src="/images/hero-image.webp"
          alt="Rippon Girls' College Campus"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle bottom gradient overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Text Content & Action Button */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 flex flex-col items-center text-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 font-sans leading-tight">
          Welcome to Rippon Girl&apos;s College
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-neutral-700 font-medium font-sans max-w-2xl">
          Oldest Girl&apos;s School in Southern Province of Sri Lanka
        </p>

        <div className="pt-2 sm:pt-4">
          <Link
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full bg-[#dcdcdc] hover:bg-[#cfcfcf] text-neutral-900 px-6 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-200 shadow-sm hover:shadow"
          >
            <span>Discover more</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
