'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HeartHandshake,
  Sparkles,
  Globe,
  Award,
  Users,
  CheckCircle2,
  Mail,
  MapPin,
  Send,
  Calendar,
  Gift
} from 'lucide-react';
import { ALUMNAE_BRANCHES, SCHOOL_INFO } from '@/data/schoolData';
import SectionHeading from '@/components/shared/SectionHeading';

const ALUMNAE_LEADERS = [
  {
    name: 'Deshamanya Dr. Shanthi Peiris',
    batch: 'Batch of 1978',
    achievement: 'Pioneering Pediatric Surgeon & Medical Philanthropist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Justice Nilanthi Fernando',
    batch: 'Batch of 1985',
    achievement: 'Judge of the Court of Appeal of Sri Lanka',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Prof. Anoma Wickramasinghe',
    batch: 'Batch of 1992',
    achievement: 'Dean of Faculty of Engineering & International STEAM Consultant',
    image: 'https://images.unsplash.com/photo-1594824813580-534638708579?auto=format&fit=crop&w=400&q=80'
  }
];

export default function AlumnaePage() {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    maidenName: '',
    gradYear: '2020',
    house: 'Bradby House',
    chapter: 'PPA Galle (Parent Body)',
    email: '',
    phone: '',
    country: 'Sri Lanka',
    profession: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please enter all required fields.");
      return;
    }
    setRegistered(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <section className="relative bg-[#0a192f] text-white py-20 lg:py-24 border-b-2 border-[#d4af37]/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4">
            <HeartHandshake className="w-4 h-4" />
            Global Rippon Sisterhood
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Past Pupils&apos; <span className="gold-gradient-text">Association (PPA)</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Connecting over 25,000 illustrious alumnae worldwide, fostering lifelong fellowship and championing modern infrastructure and student scholarships for our Alma Mater.
          </p>
        </div>
      </section>

      {/* PPA Global Chapters Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Worldwide Network"
          title="PPA Branches & International Chapters"
          subtitle="Stay linked with your Alma Mater no matter where in the world you reside."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALUMNAE_BRANCHES.map((branch, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0a192f] text-[#d4af37] flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0a192f] mb-1">
                  {branch.name}
                </h3>
                <span className="text-xs font-semibold text-[#b89327] block mb-3">
                  {branch.members} Active Members
                </span>
                
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <p><strong>President:</strong> {branch.president}</p>
                  <p className="flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{branch.location}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`mailto:${branch.contact}`}
                  className="text-[#0a192f] font-bold hover:text-[#b89327] flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" /> Connect Branch
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notable Alumnae Spotlight */}
      <section className="py-16 bg-[#0a192f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            theme="dark"
            badge="Hall of Distinction"
            title="Notable Alumnae Hall of Fame"
            subtitle="Celebrating exceptional women whose contributions have shaped Sri Lanka and the international sphere."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ALUMNAE_LEADERS.map((leader, i) => (
              <div
                key={i}
                className="bg-[#0f2444] rounded-3xl border border-[#d4af37]/30 p-6 flex flex-col items-center text-center shadow-lg hover:border-[#d4af37] transition-all"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#d4af37] mb-4 shadow-md"
                />
                <h4 className="font-serif font-bold text-lg text-white mb-1">
                  {leader.name}
                </h4>
                <span className="text-xs text-[#d4af37] font-semibold mb-3">
                  {leader.batch}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {leader.achievement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumnae Registration & Ongoing Projects */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Registration Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b89327] block mb-1">
                Alumnae Directory
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0a192f]">
                Register with the PPA Network
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Register your details to receive alumnae newsletters, reunion invitations, and project updates.
              </p>
            </div>

            {registered ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-800">
                  Welcome Back to the Rippon Family!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your membership registration has been recorded with the {formData.chapter}.
                </p>
                <button
                  onClick={() => setRegistered(false)}
                  className="mt-4 px-5 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg"
                >
                  Register Another Member
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Kasuni Samarasinghe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Maiden Name (at School)
                    </label>
                    <input
                      type="text"
                      value={formData.maidenName}
                      onChange={(e) => setFormData({ ...formData, maidenName: e.target.value })}
                      placeholder="e.g. Kasuni Perera"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      A/L Leaving Year
                    </label>
                    <input
                      type="text"
                      value={formData.gradYear}
                      onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                      placeholder="e.g. 2015"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      School House
                    </label>
                    <select
                      value={formData.house}
                      onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    >
                      <option>Bradby House</option>
                      <option>Peake House</option>
                      <option>Rippon House</option>
                      <option>Westlake House</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nearest Chapter
                    </label>
                    <select
                      value={formData.chapter}
                      onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    >
                      <option>PPA Galle (Parent Body)</option>
                      <option>PPA Colombo Branch</option>
                      <option>PPA United Kingdom</option>
                      <option>PPA Australia & Oceania</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alumna@domain.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+94 77 123 4567"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Profession & Organization
                  </label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="e.g. Senior Software Architect at Virtusa / Attorney-at-Law"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0a192f] hover:bg-slate-800 text-[#d4af37] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  Submit Alumnae Registration
                </button>
              </form>
            )}
          </div>

          {/* Right: Key Alumnae Initiatives & Projects */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#d4af37]/15 text-[#b89327] rounded-xl">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#0a192f]">
                    PPA Landmark Projects
                  </h4>
                  <p className="text-xs text-slate-500">
                    Empowering current students through alumni patronage.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Student Scholarship Trust Fund',
                    desc: 'Annual financial grants for underprivileged gifted students facing O/L & A/L examinations.'
                  },
                  {
                    title: 'Smart STEAM & Robotics Lab Sponsorship',
                    desc: 'Fully equipped 40-workstation technology lab funded by Colombo and International chapters.'
                  },
                  {
                    title: 'Heritage Auditorium Acoustic Restoration',
                    desc: 'Refurbishing audio-visual systems and heritage teak seating.'
                  }
                ].map((proj, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-semibold text-xs text-[#0a192f] block mb-0.5">
                      ✓ {proj.title}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {proj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secretariat Contact */}
            <div className="bg-[#0a192f] text-white p-6 sm:p-8 rounded-3xl border border-[#d4af37]/40 shadow-xl space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                PPA Galle Secretariat
              </span>
              <h4 className="font-serif font-bold text-lg">
                Rippon Girls&apos; College Secretariat
              </h4>
              <p className="text-xs text-slate-300">
                Richmond Hill, Galle, Southern Province, Sri Lanka
              </p>
              <p className="text-xs text-[#d4af37] pt-1">
                Email: ppa@rippongirlscollege.lk
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
