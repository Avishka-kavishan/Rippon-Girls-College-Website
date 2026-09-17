import React from 'react';
import { Quote, Star, Award, GraduationCap } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const ALUMNAE_VOICES = [
  {
    name: 'Dr. Senuri Samarawickrama',
    batch: 'Batch of 2012 (Bio Science)',
    role: 'Consultant Neurosurgeon & Medical Researcher, Colombo National Hospital',
    image: 'https://images.unsplash.com/photo-1594824813580-534638708579?auto=format&fit=crop&w=400&q=80',
    quote: 'Rippon gave me the courage to challenge boundaries. The analytical mindset and resilience I gained within our science laboratories set the bedrock for my medical career.'
  },
  {
    name: 'Dilhara Jayawardena',
    batch: 'Batch of 2016 (Commerce)',
    role: 'Senior Financial Analyst, Global Investment Bank (London)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    quote: 'From leading the Prefects\' Guild to debating at national summits, Rippon shaped my leadership acumen and taught me to execute vision with unwavering discipline.'
  },
  {
    name: 'Himashi Perera',
    batch: 'Batch of 2019 (Math & Tech)',
    role: 'AI & Robotics Engineer, Tech Innovation Lab (Singapore)',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    quote: 'The encouragement our teachers gave us to enter national technology competitions opened doors to international scholarship opportunities and engineering distinction.'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Alumnae Hall of Fame"
          title="Inspiring Generations of Ripponians"
          subtitle="Our past pupils are transforming medicine, technology, governance, commerce, and the arts globally."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ALUMNAE_VOICES.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl border border-slate-200/80 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all duration-300 relative group"
            >
              <Quote className="w-10 h-10 text-[#d4af37]/25 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 text-[#d4af37] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/70">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0a192f]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#b89327] font-semibold">
                    {item.batch}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
