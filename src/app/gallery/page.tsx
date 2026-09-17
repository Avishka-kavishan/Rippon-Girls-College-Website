'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '@/data/eventsData';
import SectionHeading from '@/components/shared/SectionHeading';
import './gallery.css';

const CATEGORIES = ['All', 'Academics', 'Sports', 'Aesthetic', 'Tradition', 'Campus'];

export default function GalleryPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCat === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCat);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <section className="relative bg-[#0a192f] text-white py-20 lg:py-24 border-b-2 border-[#d4af37]/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4">
            <ImageIcon className="w-4 h-4" />
            Visual Memories
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Campus <span className="gold-gradient-text">Photo Gallery</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Capturing timeless memories, sports championships, artistic theatricals, and celebratory milestones of Rippon Girls&apos; College.
          </p>
        </div>
      </section>

      {/* Main Gallery Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-[#0a192f] text-[#d4af37] shadow-lg border-2 border-[#d4af37]'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-80 rounded-3xl overflow-hidden bg-slate-900 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#0a192f]/90 text-[#d4af37] text-[11px] font-bold px-3 py-1 rounded-full border border-[#d4af37]/40 backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors line-clamp-1 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-[#0a192f] rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="relative h-96 sm:h-[480px] w-full bg-black">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-6 text-white space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-[#d4af37] text-[#0a192f] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {activeItem.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeItem.date}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold">
                {activeItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeItem.description}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
