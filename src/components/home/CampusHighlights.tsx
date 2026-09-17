'use client';

import React, { useState } from 'react';
import { Microscope, Cpu, Music, Trophy, BookOpen, Layers } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const HIGHLIGHTS = [
  {
    id: 'steam',
    title: 'Smart STEAM & Robotics Lab',
    category: 'Innovation',
    icon: Cpu,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Equipped with 3D printers, micro-controllers, Arduino kits, and high-performance workstations for robotics research and IoT coding.'
  },
  {
    id: 'science-complex',
    title: 'Advanced Science Laboratories',
    category: 'Academics',
    icon: Microscope,
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    description: 'Dedicated multi-disciplinary Biology, Chemistry, and Physics laboratories supporting hands-on G.C.E. Advanced Level practicals.'
  },
  {
    id: 'auditorium',
    title: 'Heritage Auditorium & Performing Arts',
    category: 'Culture',
    icon: Music,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    description: 'A grand multi-tier acoustic theatre hosting national dramas, orchestral symphonies, debating leagues, and inter-school summits.'
  },
  {
    id: 'sports-complex',
    title: 'Athletics, Netball & Courts Complex',
    category: 'Sports',
    icon: Trophy,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    description: 'Comprehensive sporting grounds, synthetic badminton courts, table tennis pavilion, and athletic training tracks.'
  },
  {
    id: 'library',
    title: 'E-Library & Resource Hub',
    category: 'Research',
    icon: BookOpen,
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    description: 'Home to over 20,000 volumes, international academic journals, digital archives, and quiet study carrels.'
  }
];

export default function CampusHighlights() {
  const [activeTab, setActiveTab] = useState(0);
  const current = HIGHLIGHTS[activeTab];

  return (
    <section className="py-20 lg:py-28 bg-[#071324] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          theme="dark"
          badge="World-Class Infrastructure"
          title="Campus Facilities & Innovation"
          subtitle="Providing our students with state-of-the-art facilities that spark intellectual curiosity and athletic distinction."
        />

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#d4af37] text-[#0a192f] shadow-lg shadow-[#d4af37]/25 scale-105'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0a192f] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Image */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-slate-700">
            <img
              src={current.imageUrl}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#0a192f]/90 text-[#d4af37] text-xs font-bold px-3 py-1 rounded-full border border-[#d4af37]/40 shadow">
                {current.category}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center">
              <current.icon className="w-6 h-6 text-[#d4af37]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {current.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {current.description}
            </p>

            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-[#d4af37]">
                Open for guided student access & research daily.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
