'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileText,
  Download,
  HelpCircle,
  ChevronDown,
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { SCHOOL_INFO } from '@/data/schoolData';

const FAQS = [
  {
    q: "What is the procedure for Grade 1 admissions?",
    a: "Grade 1 admissions follow Ministry of Education circular guidelines based on proximity, past pupils (alumnae) quota, siblings of currently enrolled students, and government officers transfers. Official application forms are released annually according to ministry schedules."
  },
  {
    q: "How are Grade 6 admissions handled after the Grade 5 Scholarship Examination?",
    a: "Grade 6 admissions are allocated strictly through national cutoff marks set by the Ministry of Education for Southern Province 1AB girls' schools. Eligible students receive direct placement letters through the Department of Examinations."
  },
  {
    q: "What are the entry criteria for G.C.E. Advanced Level (Grade 12)?",
    a: "Applicants must obtain at least 6 passes at the G.C.E. Ordinary Level examination in one sitting with credit passes (C) in Mother Tongue and Mathematics, and designated distinctions/credits in relevant stream subjects (e.g. Science for Bio/Maths, Business Studies/Maths for Commerce)."
  },
  {
    q: "Can students from other schools apply for the Advanced Level stream?",
    a: "Yes, a dedicated quota is allocated for high-performing external students who meet the stream entry criteria and pass the college entrance aptitude interview."
  }
];

export default function AdmissionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeApplying: 'Grade 12 (Advanced Level)',
    stream: 'Biological Science',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <section className="relative bg-[#0a192f] text-white py-20 lg:py-24 border-b-2 border-[#d4af37]/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            Admissions Secretariat
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Admissions & <span className="gold-gradient-text">Enrollments</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Join a legacy of excellence. Learn about application criteria, deadlines, downloadable forms, and submit online admission queries.
          </p>
        </div>
      </section>

      {/* Entry Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Admissions Pathways"
          title="Enrollment Categories & Eligibility"
          subtitle="Explore the standard criteria for entering primary, junior secondary, and collegiate classes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Grade 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-serif font-black text-xl mb-4 border border-amber-200">
                Gr 1
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] mb-2">
                Grade 1 Primary
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-semibold uppercase tracking-wider">
                Annual Ministry Intake
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Proximity & Residential Eligibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Past Pupils Association (Alumnae) Quota</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Sibling enrollment in school</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-[#b89327] font-semibold">
              Applications open: May – June annually
            </div>
          </div>

          {/* Grade 6 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-serif font-black text-xl mb-4 border border-blue-200">
                Gr 6
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] mb-2">
                Grade 6 Scholarship
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-semibold uppercase tracking-wider">
                National Merit Cutoff
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Galle District Cutoff Marks eligibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Direct Ministry Placement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Hostel / Boarding facilities available</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-blue-700 font-semibold">
              Placements released upon exam results
            </div>
          </div>

          {/* Grade 12 A/L */}
          <div className="bg-[#0a192f] text-white rounded-3xl p-8 border border-[#d4af37]/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-[#0a192f] flex items-center justify-center font-serif font-black text-xl mb-4 shadow">
                A/L
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                G.C.E. Advanced Level
              </h3>
              <p className="text-xs text-[#d4af37] mb-4 font-semibold uppercase tracking-wider">
                Grades 12 & 13 (5 Streams)
              </p>
              <ul className="space-y-2 text-xs text-slate-200 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Internal & External student intake</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Bio Science, Maths, Commerce, Arts, Tech</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Subject aptitude interview & merit test</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-[#d4af37] font-semibold">
              Applications open post-O/L results
            </div>
          </div>

        </div>
      </section>

      {/* Online Inquiry Form & Downloads */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Admissions Inquiry Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b89327] block mb-1">
                  Online Inquiry
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0a192f]">
                  Admissions Query Form
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Submit your details for guidance from our school admissions committee.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-emerald-800">
                    Inquiry Submitted Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed max-w-md mx-auto">
                    Thank you, {formData.parentName || 'Parent'}. Our admissions office has received your inquiry for <strong>{formData.studentName}</strong> ({formData.gradeApplying}). We will contact you at <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        studentName: '',
                        parentName: '',
                        email: '',
                        phone: '',
                        gradeApplying: 'Grade 12 (Advanced Level)',
                        stream: 'Biological Science',
                        message: ''
                      });
                    }}
                    className="mt-4 px-5 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        placeholder="e.g. Amanda Jayawardene"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="e.g. Dr. Sunil Jayawardene"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                      />
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
                        placeholder="parent@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Phone Number *
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Grade Applying For
                      </label>
                      <select
                        value={formData.gradeApplying}
                        onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option>Grade 1 (Primary)</option>
                        <option>Grade 6 (Scholarship)</option>
                        <option>Grade 12 (Advanced Level)</option>
                        <option>Intermediate Transfer (Grades 2-9)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Desired A/L Stream (if applicable)
                      </label>
                      <select
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option>Biological Science</option>
                        <option>Physical Science (Maths)</option>
                        <option>Commerce</option>
                        <option>Arts & Humanities</option>
                        <option>Technology</option>
                        <option>Not Applicable</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Additional Details / Inquiries
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please state any specific queries regarding subjects, past school results, or sports quotas..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0a192f] hover:bg-slate-800 text-[#d4af37] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Submit Online Inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Right: Downloadable Application Forms & Contact Help */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#d4af37]/15 text-[#b89327] rounded-xl">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#0a192f]">
                      Official Application Forms
                    </h4>
                    <p className="text-xs text-slate-500">
                      Download, print, and submit with supporting credentials.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    { name: 'G.C.E. Advanced Level Application 2026/27', size: '1.2 MB PDF' },
                    { name: 'Grade 1 Admission Verification Specimen Form', size: '850 KB PDF' },
                    { name: 'Hostel Accommodation Request Form', size: '640 KB PDF' }
                  ].map((form, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-xs text-slate-800 block">
                          {form.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {form.size}
                        </span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading ${form.name}...`)}
                        className="p-2 text-[#0a192f] hover:text-[#d4af37]"
                        title="Download form"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admissions Secretariat Box */}
              <div className="bg-[#0a192f] text-white p-6 sm:p-8 rounded-3xl border border-[#d4af37]/40 shadow-xl space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] bg-white/10 px-2.5 py-0.5 rounded-full">
                  Direct Assistance
                </span>
                <h4 className="font-serif font-bold text-lg">
                  Admissions Office Secretariat
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For official inquiries, document submissions, and appointment scheduling:
                </p>
                <div className="text-xs text-slate-300 space-y-1 pt-1">
                  <p>• Phone: {SCHOOL_INFO.phonePrimary}</p>
                  <p>• Email: admissions@rippongirlscollege.lk</p>
                  <p>• Counter Hours: Mon - Fri (8:00 AM - 1:30 PM)</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 lg:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Clarifications"
          title="Frequently Asked Questions"
          subtitle="Clear guidance on admissions rules, documentation, and Ministry of Education guidelines."
        />

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#0a192f]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
