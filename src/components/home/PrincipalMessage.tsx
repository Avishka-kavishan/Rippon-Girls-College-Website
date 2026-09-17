import React from 'react';
import Link from 'next/link';
import { Quote, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';
import SectionHeading from '@/components/shared/SectionHeading';

export default function PrincipalMessage() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Leadership & Vision"
          title="Principal's Welcome Address"
          subtitle="Inspiring generations of young women to attain intellectual eminence and virtuous life."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Principal Portrait Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-[#0a192f] group">
              <div className="relative h-96 sm:h-[420px] w-full bg-[#0a192f]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Principal Mrs. R. M. D. Samanmalee"
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-90" />

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-1 text-[#d4af37]">
                    <Award className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Office of the Principal
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold">
                    {SCHOOL_INFO.principal.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {SCHOOL_INFO.principal.designation}
                  </p>
                  <p className="text-[11px] text-[#d4af37]/90 mt-0.5">
                    {SCHOOL_INFO.principal.degrees}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Principal Speech & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md relative">
              <Quote className="w-12 h-12 text-[#d4af37]/30 absolute top-6 right-6" />
              
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] mb-4">
                &ldquo;Where Heritage Meets Tomorrow&apos;s Possibilities&rdquo;
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                {SCHOOL_INFO.principal.message}
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                As we continue our journey beyond 150 glorious years, our commitment remains unshakable: providing an inclusive ecosystem where academic brilliance, athletic mastery, cultural pride, and moral courage flourish hand in hand.
              </p>

              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-base text-[#0a192f]">
                    {SCHOOL_INFO.principal.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    Principal, Rippon Girls&apos; College
                  </span>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b89327] hover:text-[#0a192f] transition-colors"
                >
                  Read College History <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Academic Rigor', desc: 'National top ranks across Science, Tech & Arts' },
                { title: 'Value-Centric', desc: 'Rooted in timeless morals & noble empathy' },
                { title: 'Global Vision', desc: 'STEAM labs, coding & multilingual skills' }
              ].map((pillar, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#0a192f] block">{pillar.title}</span>
                    <span className="text-[11px] text-slate-500 leading-snug">{pillar.desc}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
