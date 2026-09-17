import React from 'react';
import Link from 'next/link';
import { Shield, Flame, Crown, HeartHandshake, ArrowRight, LucideIcon } from 'lucide-react';
import { HOUSES } from '@/data/schoolData';
import SectionHeading from '@/components/shared/SectionHeading';
import './HouseSystemPreview.css';

export default function HouseSystemPreview() {
  const houseIcons: Record<string, LucideIcon> = {
    bradby: Shield,
    peake: Flame,
    rippon: Crown,
    westlake: HeartHandshake
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Tradition & Brotherhood of Spirit"
          title="The House System"
          subtitle="Established in 1928, our four collegiate houses inspire fellowship, healthy athletic competition, and enduring leadership."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOUSES.map((house) => {
            const IconComponent = houseIcons[house.id] || Shield;

            return (
              <div
                key={house.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* House Top Banner */}
                <div
                  className="p-6 text-white relative"
                  style={{ backgroundColor: house.color }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/25 text-white">
                      Est. {house.established}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold tracking-tight">
                    {house.name}
                  </h3>
                  <p className="text-xs text-white/90 italic font-medium mt-1">
                    &ldquo;{house.motto}&rdquo;
                  </p>
                </div>

                {/* House Details */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Named In Honour Of
                      </span>
                      <p className="text-xs font-semibold text-slate-800">
                        {house.namedAfter}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Guiding Virtue
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {house.meaning}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/about#houses"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-800 text-[#0a192f] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors group-hover:bg-slate-50"
                  >
                    House Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
