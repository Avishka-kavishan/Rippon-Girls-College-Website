import React from 'react';
import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';
import './HomeGallerySection.css';

const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Academic Convocations & Honors',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    category: 'Academics'
  },
  {
    id: 2,
    title: 'Inter-House Sports Meet & Athletics',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    category: 'Sports'
  },
  {
    id: 3,
    title: 'Aesthetic Dance & Music Concerts',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    category: 'Aesthetic'
  },
  {
    id: 4,
    title: 'Historic Richmond Hill Campus',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    category: 'Campus'
  },
  {
    id: 5,
    title: 'Smart STEAM & Robotics Laboratory',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    category: 'Science & Tech'
  },
  {
    id: 6,
    title: 'Prefects Guild & Student Leadership',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    category: 'Leadership'
  }
];

export default function HomeGallerySection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-heading text-sm sm:text-base font-medium text-slate-800 block mb-2">
            School Life
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight">
            Our Gallery
          </h2>
        </div>

        {/* 6-Grid Images (2 rows x 3 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img) => (
            <Link
              key={img.id}
              href="/gallery"
              className="group relative rounded-[24px] sm:rounded-[28px] overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 block"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-heading font-semibold text-[#f5c518] uppercase tracking-wider">
                  {img.category}
                </span>
                <h4 className="font-heading font-bold text-sm sm:text-base leading-snug">
                  {img.title}
                </h4>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-200">
                  <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>View in Gallery</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-2.5 sm:py-3 rounded-full bg-[#d1d5db] hover:bg-[#1e293b] hover:text-white text-slate-900 text-xs sm:text-sm font-heading font-semibold transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
