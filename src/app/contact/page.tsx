'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Navigation,
  Sparkles
} from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';
import SectionHeading from '@/components/shared/SectionHeading';
import './contact.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'General Inquiries',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <section className="relative bg-[#0a192f] text-white py-20 lg:py-24 border-b-2 border-[#d4af37]/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-4 h-4" />
            Secretariat & Campus Location
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Contact <span className="gold-gradient-text">Rippon Girls&apos; College</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            We are here to assist parents, prospective students, alumnae, and the public. Reach out directly or visit our campus in Galle.
          </p>
        </div>
      </section>

      {/* Main Contact Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Cards */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#0a192f] border-b border-slate-100 pb-4">
                College Secretariat
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#d4af37]/15 text-[#b89327] rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0a192f] block">Campus Address</span>
                    <span>{SCHOOL_INFO.name}, Richmond Hill, Galle, 80000, Sri Lanka.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#d4af37]/15 text-[#b89327] rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0a192f] block">Telephone Numbers</span>
                    <span>General Office: {SCHOOL_INFO.phonePrimary}</span>
                    <br />
                    <span>Admissions Office: {SCHOOL_INFO.phoneSecondary}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#d4af37]/15 text-[#b89327] rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0a192f] block">Official Email</span>
                    <span>{SCHOOL_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#d4af37]/15 text-[#b89327] rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0a192f] block">Office Hours</span>
                    <span>Monday - Friday: 7:30 AM – 2:00 PM</span>
                    <br />
                    <span>(Closed on Weekends & Public Holidays)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions & Landmark Guide */}
            <div className="bg-[#0a192f] text-white p-8 rounded-3xl border border-[#d4af37]/40 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Navigation className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Getting Here
                </span>
              </div>
              <h4 className="font-serif font-bold text-xl">
                Location on Richmond Hill
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Situated atop the scenic Richmond Hill in Galle, approximately 2.5 km from the Galle Central Bus Stand and Railway Station. Accessible via Richmond Hill Road.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b89327] block mb-1">
                Direct Communication
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0a192f]">
                Send an Official Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Please fill in the form below and the respective department officer will respond within 2 working days.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-800">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your inquiry has been forwarded to the <strong>{formData.department}</strong>. A confirmation email has been logged to <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      department: 'General Inquiries',
                      subject: '',
                      message: ''
                    });
                  }}
                  className="mt-4 px-5 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Kasun Fernando"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+94 77 123 4567"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                    >
                      <option>General Inquiries</option>
                      <option>Principal&apos;s Secretariat</option>
                      <option>Admissions & Examinations Branch</option>
                      <option>Past Pupils&apos; Association (PPA)</option>
                      <option>Sports & Co-Curricular Council</option>
                      <option>Media & Communications</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief subject of inquiry..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your detailed message here..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0a192f] hover:bg-slate-800 text-[#d4af37] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry to College
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
