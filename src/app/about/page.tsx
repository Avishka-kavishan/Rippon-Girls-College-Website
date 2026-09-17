import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Award,
  Sparkles,
  BookOpen,
  Volume2,
  Users,
  Compass,
  CheckCircle2,
  History,
  Flame,
  Crown,
  HeartHandshake
} from 'lucide-react';
import { SCHOOL_INFO, TIMELINE, HOUSES, SCHOOL_ANTHEM } from '@/data/schoolData';
import SectionHeading from '@/components/shared/SectionHeading';

export const metadata = {
  title: "About Rippon | 150+ Years of Noble Heritage",
  description: "Learn about the illustrious history, vision, mission, school crest, anthem, house system, and leadership of Rippon Girls' College, Galle."
};

export default function AboutPage() {
  const houseIcons: Record<string, any> = {
    bradby: Shield,
    peake: Flame,
    rippon: Crown,
    westlake: HeartHandshake
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Page Header Banner */}
      <section className="relative bg-[#0a192f] text-white py-20 lg:py-24 overflow-hidden border-b-2 border-[#d4af37]/40">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4">
            <History className="w-3.5 h-3.5" />
            Our Heritage & Legacy
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            About <span className="gold-gradient-text">Rippon Girls&apos; College</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Founded in 1871 on the historic heights of Richmond Hill, Galle, our institution has stood for over a century and a half as an enduring beacon of enlightened female education.
          </p>
        </div>
      </section>

      {/* Vision, Mission & Motto */}
      <section id="vision" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Guiding Principles"
          title="Vision, Mission & Latin Motto"
          subtitle="The foundational philosophies that inspire our academic rigor and moral nobility."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0a192f] text-[#d4af37] flex items-center justify-center mb-5 border border-[#d4af37]/30">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] mb-3">
                Our Vision
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {SCHOOL_INFO.vision}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#b89327]">
              <Sparkles className="w-4 h-4" />
              Enlightened Female Leadership
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0a192f] text-[#d4af37] flex items-center justify-center mb-5 border border-[#d4af37]/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] mb-3">
                Our Mission
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {SCHOOL_INFO.mission}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#b89327]">
              <CheckCircle2 className="w-4 h-4" />
              Holistic Excellence & Virtue
            </div>
          </div>

          {/* Motto & Crest */}
          <div className="bg-[#0a192f] text-white rounded-3xl p-8 border border-[#d4af37]/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-[#0a192f] flex items-center justify-center mb-5 font-black text-lg shadow">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                Collegiate Motto
              </h3>
              <p className="text-xs text-[#d4af37] uppercase tracking-widest font-mono font-semibold mb-3">
                Latin Inscription
              </p>
              <p className="font-serif italic text-xl text-[#d4af37] font-semibold mb-2">
                &ldquo;{SCHOOL_INFO.motto}&rdquo;
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {SCHOOL_INFO.mottoMeaning}. Reminding every generation that true wisdom and enduring success are built upon reverence, humility, and moral integrity.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800 text-xs text-[#d4af37] font-mono">
              Psalm 127:1 Foundation
            </div>
          </div>

        </div>
      </section>

      {/* Historical Timeline (1871 to Present) */}
      <section id="timeline" className="py-16 lg:py-24 bg-[#0a192f] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            theme="dark"
            badge="Chronicles of Distinction"
            title="150+ Years Milestones Timeline"
            subtitle="Explore the key historical epochs that transformed a small missionary school into a leading national academy."
          />

          <div className="relative border-l-2 border-[#d4af37]/40 ml-4 md:ml-32 space-y-12 py-4">
            {TIMELINE.map((event, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                
                {/* Year Marker on the left (Desktop) */}
                <div className="hidden md:flex absolute -left-32 top-0 w-24 text-right">
                  <span className="font-serif font-black text-2xl text-[#d4af37]">
                    {event.year}
                  </span>
                </div>

                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#d4af37] border-4 border-[#0a192f] group-hover:scale-125 transition-transform" />

                {/* Event Card */}
                <div className="bg-[#0f2444] p-6 sm:p-8 rounded-2xl border border-[#d4af37]/20 shadow-lg hover:border-[#d4af37] transition-all">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="md:hidden font-serif font-bold text-lg text-[#d4af37]">
                      {event.year}
                    </span>
                    {event.badge && (
                      <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                        {event.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* School Anthem */}
      <section id="anthem" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Alma Mater Anthem"
          title="The College Anthem"
          subtitle="Sung with immense pride and devotion by generations of Ripponians worldwide."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Sinhala Lyrics */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <span className="font-serif font-bold text-lg text-[#0a192f]">
                  පාසල් ගීතය (Sinhala Anthem)
                </span>
                <span className="text-xs bg-[#d4af37]/15 text-[#b89327] font-bold px-2.5 py-1 rounded-full">
                  Original
                </span>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-loose font-medium">
                {SCHOOL_ANTHEM.sinhalaLyrics.map((line, idx) => (
                  <p key={idx} className="hover:text-[#b89327] transition-colors">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-400">
              Composed in dedication to Rippon Girls&apos; College
            </div>
          </div>

          {/* English Translation */}
          <div className="bg-[#0a192f] text-white rounded-3xl p-8 sm:p-10 border border-[#d4af37]/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <span className="font-serif font-bold text-lg text-white">
                  English Poetic Translation
                </span>
                <span className="text-xs bg-[#d4af37] text-[#0a192f] font-bold px-2.5 py-1 rounded-full">
                  Meaning
                </span>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-loose italic">
                {SCHOOL_ANTHEM.englishTranslation.map((line, idx) => (
                  <p key={idx}>
                    &ldquo;{line}&rdquo;
                  </p>
                ))}
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800 text-xs text-[#d4af37]">
              Sung at morning assemblies, sports meets & official convocations.
            </div>
          </div>

        </div>
      </section>

      {/* House System Detailed */}
      <section id="houses" className="py-16 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Tradition of Excellence"
            title="The Four Collegiate Houses"
            subtitle="The House System fosters teamwork, sporting brilliance, loyalty, and lifelong sisterhood."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HOUSES.map((house) => {
              const IconComponent = houseIcons[house.id] || Shield;

              return (
                <div
                  key={house.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div
                    className="p-6 text-white"
                    style={{ backgroundColor: house.color }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/30">
                        Inaugurated 1928
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold">
                      {house.name}
                    </h3>
                    <p className="text-sm font-serif italic text-white/90 mt-1">
                      Motto: &ldquo;{house.motto}&rdquo;
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Historical Namesake
                        </span>
                        <p className="text-sm font-semibold text-slate-800">
                          {house.namedAfter}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          House Meaning & Values
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {house.meaning}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Colour: <strong className="text-slate-800">{house.name.split(' ')[0]}</strong></span>
                      <span className="font-semibold text-[#b89327]">Inter-House Championship Competitor</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Leadership & Administration Directory */}
      <section id="leadership" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Administration"
          title="College Executive Leadership"
          subtitle="Guided by visionary educational administrators committed to academic and moral excellence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              role: 'Principal',
              name: 'Mrs. R. M. D. Samanmalee',
              creds: 'SLEAS I, B.Sc., M.Ed.',
              area: 'Overall School Administration & Strategy'
            },
            {
              role: 'Deputy Principal (Academics)',
              name: 'Mrs. K. L. Wijesuriya',
              creds: 'SLEAS II, B.Sc., PGDE',
              area: 'Curriculum, Labs & Examination Affairs'
            },
            {
              role: 'Deputy Principal (Co-Curricular)',
              name: 'Mrs. N. D. Karunaratne',
              creds: 'SLEAS III, B.A., M.A.',
              area: 'Sports, Clubs & Student Discipline'
            },
            {
              role: 'Head of Advanced Level Wing',
              name: 'Mr. S. H. Senanayake',
              creds: 'B.Sc. (Sp. Physics), PGDE',
              area: 'Collegiate Sciences & STEAM Innovation'
            }
          ].map((leader, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="w-16 h-16 rounded-full bg-[#0a192f] text-[#d4af37] mx-auto flex items-center justify-center font-serif font-bold text-xl mb-4 border-2 border-[#d4af37]/40">
                  <Users className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#b89327] block mb-1">
                  {leader.role}
                </span>
                <h4 className="font-serif font-bold text-base text-[#0a192f] mb-1">
                  {leader.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mb-3">
                  {leader.creds}
                </p>
              </div>
              <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {leader.area}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
