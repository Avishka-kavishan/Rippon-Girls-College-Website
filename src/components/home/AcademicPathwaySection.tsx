import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './AcademicPathwaySection.css';

const PATHWAYS = [
  {
    title: 'Primary Education',
    description:
      'The Primary Education stage introduces students to a supportive, nurturing learning environment. Developing basic foundational knowledge, languages, arts, and initial values to thrive as young learners.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Junior Secondary',
    description:
      'The Junior Secondary stage provides students with a broad and balanced curriculum, encouraging scientific thinking, analytical ability, bilingual education, and sports.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Advanced Level',
    description:
      'Advanced Level stage empowers students with in-depth knowledge in chosen streams: Science, Commerce, Arts & Technology, preparing them for higher education and future careers.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  }
];

export default function AcademicPathwaySection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-heading text-sm sm:text-base font-medium text-slate-800 block mb-2">
            Academic Program
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight">
            Our Academic Pathway
          </h2>
        </div>

        {/* 3 Pathway Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PATHWAYS.map((pathway, index) => (
            <div key={index} className="flex flex-col space-y-4 group">
              
              {/* Top Rounded Image Card */}
              <div className="relative w-full h-56 sm:h-60 rounded-[24px] sm:rounded-[28px] overflow-hidden bg-slate-200 border border-slate-200/80 shadow-sm">
                <img
                  src={pathway.imageUrl}
                  alt={pathway.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom Rounded Light-Gray Text Box */}
              <div className="p-6 rounded-[24px] sm:rounded-[28px] bg-[#e5e7eb] text-slate-800 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                  {pathway.description}
                </p>
                <div className="pt-4 mt-auto">
                  <Link
                    href="/academics"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-slate-900 hover:text-[#b89327] transition-colors"
                  >
                    <span>Explore pathway</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
