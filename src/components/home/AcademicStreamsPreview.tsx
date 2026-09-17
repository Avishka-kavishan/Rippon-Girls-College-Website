import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Sparkles, BookOpen, Microscope, Calculator, Briefcase, Palette, Cpu } from 'lucide-react';
import { ACADEMIC_STREAMS } from '@/data/schoolData';
import SectionHeading from '@/components/shared/SectionHeading';

export default function AcademicStreamsPreview() {
  const streamIcons: Record<string, any> = {
    'biological-science': Microscope,
    'physical-science': Calculator,
    'commerce': Briefcase,
    'arts-humanities': Palette,
    'technology': Cpu
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0a192f] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          theme="dark"
          badge="Educational Wings"
          title="Collegiate Academic Streams"
          subtitle="Empowering students to excel in G.C.E. Advanced Level curricula with modern laboratories and dedicated faculty mentors."
        />

        {/* Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACADEMIC_STREAMS.map((stream) => {
            const IconComponent = streamIcons[stream.id] || BookOpen;

            return (
              <div
                key={stream.id}
                className="bg-[#0f2444] rounded-3xl border border-[#d4af37]/25 p-7 flex flex-col justify-between hover:border-[#d4af37] hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-all duration-300 group"
              >
                <div>
                  {/* Stream Icon & Code */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-slate-700 text-slate-300">
                      {stream.code}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors mb-2.5">
                    {stream.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {stream.description}
                  </p>

                  {/* Key Subjects */}
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
                      Core Subjects Included
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {stream.subjects.slice(0, 4).map((sub, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Full Lab & Theory Syllabus
                  </span>
                  <Link
                    href={`/academics#${stream.id}`}
                    className="text-xs font-bold text-[#d4af37] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Curriculum <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Primary & Junior Secondary Wing Card */}
          <div className="bg-gradient-to-br from-[#d4af37]/20 via-[#0f2444] to-[#0a192f] rounded-3xl border-2 border-[#d4af37]/60 p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-[#0a192f] flex items-center justify-center mb-5 font-black text-xl shadow-md">
                1-11
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Primary & Junior Secondary
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed mb-5">
                Nurturing young minds through bilingual education, activity-based science projects, arts, mathematics, and Grade 5 Scholarship preparation.
              </p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300 space-y-1 mb-4">
                <p>• Grade 1 to 5: Primary Foundation</p>
                <p>• Grade 6 to 9: Junior Secondary</p>
                <p>• Grade 10 to 11: G.C.E. O/L Excellence</p>
              </div>
            </div>
            <Link
              href="/academics"
              className="w-full py-2.5 bg-[#d4af37] hover:bg-[#f5c518] text-[#0a192f] font-bold text-xs rounded-xl text-center shadow transition-colors"
            >
              Explore All Grades
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
