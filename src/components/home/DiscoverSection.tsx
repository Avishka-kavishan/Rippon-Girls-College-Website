import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DiscoverSection() {
  return (
    <section id="discover" className="py-16 sm:py-24 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-heading text-sm sm:text-base font-medium text-slate-800 block mb-2">
                Discover Our School
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight leading-snug">
                Empowering Girls Through Education, Character and Excellence
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
              <p>
                Rippon Girl&apos;s College, Galle — a school dedicated to nurturing young women through quality education, strong values and a wide range of opportunities.
              </p>
              <p>
                For generations, Rippon Girl&apos;s College has provided a supportive environment where students can learn, grow, discover their talents and prepare for the future.
              </p>
            </div>

            {/* Tagline / Core Pillars */}
            <div className="pt-2">
              <p className="font-heading text-base sm:text-lg font-bold text-[#111827] tracking-tight">
                Learn. Grow. Lead.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-semibold text-[#111827] hover:text-[#b89327] transition-colors group"
              >
                <span>Read more about our school</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large Rounded Image Container */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-sm border border-slate-200 bg-slate-200 aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
                alt="Students of Rippon Girls College"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
