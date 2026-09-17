import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-36 bg-white text-[#0a192f] overflow-hidden flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Main Title */}
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#111827] tracking-tight leading-tight sm:leading-tight">
          Welcome to Rippon Girl&apos;s College
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-xl font-medium text-slate-700 font-heading tracking-tight max-w-2xl mx-auto">
          Oldest Girl&apos;s School in Southern Province of Sri Lanka
        </p>

        {/* Discover More CTA Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link
            href="#discover"
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#1e293b] hover:bg-[#0a192f] text-white text-xs sm:text-sm font-heading font-medium shadow-md hover:shadow-lg transition-all duration-200 group"
          >
            <span>Discover more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

      </div>
    </section>
  );
}
