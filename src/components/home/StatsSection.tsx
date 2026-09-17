import React from 'react';
import { Award, Users, GraduationCap, Trophy } from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';

export default function StatsSection() {
  const stats = [
    {
      value: '150+',
      label: 'Years of Noble Heritage',
      description: 'Pioneering female education in Sri Lanka since 1871',
      icon: Award
    },
    {
      value: SCHOOL_INFO.studentCount,
      label: 'Enrolled Young Leaders',
      description: 'From Primary to Advanced Level across diverse disciplines',
      icon: Users
    },
    {
      value: SCHOOL_INFO.facultyCount,
      label: 'Distinguished Educators',
      description: 'Dedicated graduate and postgraduate certified teachers',
      icon: GraduationCap
    },
    {
      value: SCHOOL_INFO.universityRate,
      label: 'University Eligibility Rate',
      description: 'Consistently excelling in G.C.E. Advanced Level examinations',
      icon: Trophy
    }
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0a192f] border-2 border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${
                idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-8' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-[#d4af37]" />
              </div>
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <span className="gold-gradient-text">{item.value}</span>
              </span>
              <span className="text-sm font-bold text-slate-200 mt-1.5">
                {item.label}
              </span>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
