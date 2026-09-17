'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Clock,
  MapPin,
  Download,
  BookOpen,
  Bell
} from 'lucide-react';
import { NEWS_ARTICLES, UPCOMING_EVENTS, NewsArticle, SchoolEvent } from '@/data/eventsData';
import SectionHeading from '@/components/shared/SectionHeading';
import NewsCard from '@/components/shared/NewsCard';
import EventCard from '@/components/shared/EventCard';

const NEWS_CATEGORIES = ['All', 'Academics', 'Sports', 'Culture', 'Achievements', 'Notices'];
const EVENT_CATEGORIES = ['All', 'Sports', 'Academic', 'Aesthetic', 'Religious', 'Alumni'];

export default function NewsEventsPage() {
  const [newsSearch, setNewsSearch] = useState('');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('All');
  const [selectedEventCategory, setSelectedEventCategory] = useState('All');

  const filteredNews = NEWS_ARTICLES.filter((article) => {
    const matchesCat = selectedNewsCategory === 'All' || article.category === selectedNewsCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
      article.summary.toLowerCase().includes(newsSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredEvents = UPCOMING_EVENTS.filter((event) => {
    return selectedEventCategory === 'All' || event.category === selectedEventCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <section className="relative bg-[#0a192f] text-white py-20 lg:py-24 border-b-2 border-[#d4af37]/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4">
            <Bell className="w-4 h-4" />
            Media & Event Secretariat
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            News, Announcements & <span className="gold-gradient-text">Events</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Stay abreast with the latest collegiate news, academic milestones, sporting triumphs, and official term dates.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Section 1: Latest News */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b89327] block mb-1">
                Official Bulletins
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0a192f]">
                College News & Press Releases
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#d4af37] shadow-sm"
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedNewsCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedNewsCategory === cat
                    ? 'bg-[#0a192f] text-[#d4af37]'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News Cards Grid */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500">
              <p className="text-sm">No articles match your current search query or category filter.</p>
            </div>
          )}
        </section>

        {/* Section 2: Events Calendar */}
        <section className="bg-slate-100 p-8 sm:p-12 rounded-3xl border border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b89327] block mb-1">
                College Calendar 2026
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0a192f]">
                Upcoming Convocations & Meets
              </h2>
            </div>

            {/* Event Category Filters */}
            <div className="flex flex-wrap gap-2">
              {EVENT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedEventCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedEventCategory === cat
                      ? 'bg-[#0a192f] text-[#d4af37]'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
