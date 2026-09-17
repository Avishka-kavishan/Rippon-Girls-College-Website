'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  Microscope,
  Calculator,
  Briefcase,
  Palette,
  Cpu,
  CheckCircle,
  FileText,
  Download,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { ACADEMIC_STREAMS, SCHOOL_INFO } from '@/data/schoolData';
import SectionHeading from '@/components/shared/SectionHeading';

export default function AcademicsPage() {
  const streamIcons: Record<string, any> = {
    'biological-science': Microscope,
    'physical-science': Calculator,
    'commerce': Briefcase,
    'arts-humanities': Palette,
    'technology': Cpu
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <section className="relative bg-[#0a192f] text-white py-20 lg:py-24 border-b-2 border-[#d4af37]/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            Academic Rigor & Curricula
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Academic <span className="gold-gradient-text">Excellence at Rippon</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Delivering national educational standards enhanced with modern bilingual instruction, experiential STEAM laboratory practicals, and dedicated student mentorship.
          </p>
        </div>
      </section>

      {/* Grade Stages Overview */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Educational Progression"
          title="Curriculum Framework by Grades"
          subtitle="A structured educational journey nurturing foundational skills in childhood to collegiate mastery."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Primary Education */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-serif font-black text-xl mb-4 border border-amber-200">
                1-5
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] mb-2">
                Primary Education
              </h3>
              <span className="text-xs font-bold text-[#b89327] uppercase tracking-wider block mb-3">
                Foundation & Discovery
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Activity-based learning covering Mother Tongue, English Language, Mathematics, Environmental Studies, Religion, and Creative Arts. Special training for the Grade 5 Scholarship Examination.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Interactive Smart Learning Corners</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Bilingual Immersion from Grade 3</span>
              </li>
            </ul>
          </div>

          {/* Junior Secondary */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-serif font-black text-xl mb-4 border border-blue-200">
                6-9
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] mb-2">
                Junior Secondary
              </h3>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-3">
                Broad Horizon Exploration
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Comprehensive subject coverage including General Science, Mathematics, Social Studies, English, ICT, Second National Language, Health & Physical Education, and Aesthetic Studies.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Dedicated Junior Science Labs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Choice of Aesthetic: Music, Dance, Drama, Art</span>
              </li>
            </ul>
          </div>

          {/* Senior Secondary */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-serif font-black text-xl mb-4 border border-emerald-200">
                10-11
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] mb-2">
                Senior Secondary (O/L)
              </h3>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-3">
                G.C.E. Ordinary Level Mastery
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Rigorous preparation across 9 core subjects with specialized mock examinations, revision bootcamps, and personalized guidance for outstanding national exam results.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>99.4% Advanced Level Qualification Rate</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Continuous Assessment & Model Exams</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Advanced Level Streams (In-Depth) */}
      <section className="py-16 lg:py-24 bg-[#0a192f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            theme="dark"
            badge="Collegiate Wings (Grades 12 - 13)"
            title="G.C.E. Advanced Level Streams"
            subtitle="Explore our 5 Advanced Level disciplines designed to lead directly to premier national and international universities."
          />

          <div className="space-y-8">
            {ACADEMIC_STREAMS.map((stream) => {
              const IconComponent = streamIcons[stream.id] || BookOpen;

              return (
                <div
                  key={stream.id}
                  id={stream.id}
                  className="bg-[#0f2444] rounded-3xl border border-[#d4af37]/30 p-8 sm:p-10 shadow-xl hover:border-[#d4af37] transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Stream Header & Description */}
                    <div className="lg:col-span-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-[#d4af37]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                            {stream.code}
                          </span>
                          <h3 className="font-serif text-2xl font-bold text-white">
                            {stream.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                        {stream.description}
                      </p>
                    </div>

                    {/* Subjects Grid */}
                    <div className="lg:col-span-4 bg-black/20 p-5 rounded-2xl border border-white/5 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block">
                        Subject Offerings
                      </span>
                      <ul className="space-y-2 text-xs text-slate-200">
                        {stream.subjects.map((sub, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Career Prospects & Lab Features */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
                          Key Career Pathways
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {stream.careerPaths.map((career, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-white/10 text-slate-200 px-2.5 py-1 rounded-md"
                            >
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Lab Practical Capacity: <strong>Fully Equipped</strong></span>
                        <Link
                          href="/admissions"
                          className="text-[#d4af37] font-bold hover:underline"
                        >
                          Apply For Stream →
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Downloads & Academic Resources */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Resources & Handouts"
          title="Curriculum Downloads & Syllabi"
          subtitle="Access official course guides, examination timetables, and academic handbooks."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "G.C.E. Advanced Level Subject Guide 2026/27",
              size: "2.4 MB PDF",
              desc: "Complete breakdown of subject combinations, credit requirements & laboratory guidelines."
            },
            {
              title: "Academic Term Syllabus & Exam Schedule",
              size: "1.8 MB PDF",
              desc: "Term-wise unit allocations, mid-term test dates, and final term evaluation timetable."
            },
            {
              title: "Grade 1 - 11 Student Academic Handbook",
              size: "3.1 MB PDF",
              desc: "School rules, assessment policies, library regulations & co-curricular guidelines."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 bg-[#0a192f] text-[#d4af37] rounded-xl shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0a192f] mb-1">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    {item.size}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                {item.desc}
              </p>
              <button
                onClick={() => alert(`Downloading ${item.title}...`)}
                className="w-full py-2.5 bg-slate-100 hover:bg-[#0a192f] hover:text-[#d4af37] text-[#0a192f] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Document
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
