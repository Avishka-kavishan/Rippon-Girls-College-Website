'use client';

import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { NewsArticle } from '@/data/eventsData';
import './NewsCard.css';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all duration-300 overflow-hidden flex flex-col group">
        {/* Image Frame */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-[#0a192f]/90 text-[#d4af37] text-xs font-bold px-3 py-1 rounded-full border border-[#d4af37]/40 shadow backdrop-blur-md">
              {article.category}
            </span>
          </div>

          {/* Date & Read Time */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0a192f] group-hover:text-[#b89327] transition-colors line-clamp-2 mb-2.5 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
              {article.summary}
            </p>
          </div>

          {/* Read More Action */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0a192f] hover:text-[#b89327] pt-3 border-t border-slate-100 transition-colors w-full justify-between"
          >
            <span>Read Full Story</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modal View for Article */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] bg-[#0a192f] px-3 py-1 rounded-full">
                {article.category}
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative h-64 w-full bg-slate-900">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[#d4af37]" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0a192f] leading-tight">
                {article.title}
              </h2>

              <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {article.summary}
              </p>

              <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed pt-2">
                {article.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Published by Rippon Media & Communications Secretariat
                </span>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 bg-[#0a192f] text-[#d4af37] font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
