import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import './LatestNewsSection.css';
import { NEWS_ARTICLES } from '@/data/eventsData';

export default function LatestNewsSection() {
  const featuredArticle = NEWS_ARTICLES[0] || {
    id: 'news-1',
    title: 'Outstanding Triumphs at the National Examinations & Academic Competitions',
    date: 'Sep 15, 2026',
    category: 'Academics',
    summary: 'Rippon students showcase supreme academic distinction and leadership excellence across all national streams.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=80',
    readTime: '3 min read'
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight">
            Latest News
          </h2>
        </div>

        {/* Large Rounded News Feature Box (Figma Wireframe Banner) */}
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-200 border border-slate-200 shadow-sm group">
          
          {/* Temporary Image Container */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] overflow-hidden bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=80"
              alt="Latest News Banner"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Soft dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/85 via-[#0a192f]/35 to-transparent" />
            
            {/* Content inside the banner */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-[#d4af37] text-[#0a192f]">
                  <Sparkles className="w-3 h-3" />
                  Featured Announcement
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-200 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredArticle.date}
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold leading-tight max-w-3xl drop-shadow-sm">
                {featuredArticle.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-2xl line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {featuredArticle.summary}
              </p>

              <div className="mt-4">
                <Link
                  href="/news-events"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-semibold text-[#f5c518] hover:text-white transition-colors group/link"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
