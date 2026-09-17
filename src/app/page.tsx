import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, BookOpen, GraduationCap, ChevronRight, Award, Bell } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import PrincipalMessage from '@/components/home/PrincipalMessage';
import AcademicStreamsPreview from '@/components/home/AcademicStreamsPreview';
import HouseSystemPreview from '@/components/home/HouseSystemPreview';
import CampusHighlights from '@/components/home/CampusHighlights';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SectionHeading from '@/components/shared/SectionHeading';
import NewsCard from '@/components/shared/NewsCard';
import EventCard from '@/components/shared/EventCard';
import { NEWS_ARTICLES, UPCOMING_EVENTS } from '@/data/eventsData';

export default function HomePage() {
  const featuredNews = NEWS_ARTICLES.slice(0, 3);
  const featuredEvents = UPCOMING_EVENTS.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Stats Section */}
      <StatsSection />

      {/* 3. Principal's Message & Vision */}
      <PrincipalMessage />

      {/* 4. Academic Streams Preview */}
      <AcademicStreamsPreview />

      {/* 5. House System Showcase */}
      <HouseSystemPreview />

      {/* 6. Campus Infrastructure & STEAM Hub */}
      <CampusHighlights />

      {/* 7. Latest News & Upcoming Events Section */}
      <section className="py-20 lg:py-28 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d4af37]/15 text-[#b89327] border border-[#d4af37]/40 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Happenings at Rippon
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0a192f]">
                News, Triumphs & Event Calendar
              </h2>
            </div>
            <Link
              href="/news-events"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#b89327] hover:text-[#0a192f] transition-colors"
            >
              View Full News & Events Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 2 Columns: News Articles */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            {/* Right Column: Upcoming Events */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0a192f] text-white p-5 rounded-2xl border border-[#d4af37]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#d4af37]" />
                  <h3 className="font-serif text-base font-bold">Upcoming Key Dates</h3>
                </div>
                <Link
                  href="/news-events"
                  className="text-xs text-[#d4af37] font-semibold hover:underline"
                >
                  All Events
                </Link>
              </div>

              <div className="space-y-4">
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Quick Calendar Download */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <h4 className="font-serif font-bold text-sm text-[#0a192f] mb-1">
                  Academic Term Calendar 2026
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Download official school term schedules, examination dates & holidays.
                </p>
                <Link
                  href="/news-events"
                  className="inline-flex items-center justify-center w-full py-2 bg-[#0a192f] hover:bg-slate-800 text-[#d4af37] text-xs font-bold rounded-lg transition-colors"
                >
                  Download Schedule (PDF)
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Alumnae & Testimonials */}
      <TestimonialsSection />

      {/* 9. Admissions Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#0a192f] via-[#0f2850] to-[#0a192f] text-white relative overflow-hidden border-t-2 border-b-2 border-[#d4af37]/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(212,175,55,0.2)_0,transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Admissions 2026 / 2027
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
              Begin Your Journey of Excellence at Rippon
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore enrollment guidelines for Grade 1, Grade 5 Scholarship transfers, and G.C.E. Advanced Level admissions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/admissions"
              className="px-8 py-4 bg-[#d4af37] hover:bg-[#f5c518] text-[#0a192f] font-bold text-sm rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              Admissions Guidelines
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-slate-600 text-white font-semibold text-sm rounded-xl backdrop-blur-md transition-all"
            >
              Contact Admissions Office
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
