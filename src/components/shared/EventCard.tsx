import { Clock, MapPin } from 'lucide-react';
import { SchoolEvent } from '@/data/eventsData';
import './EventCard.css';

interface EventCardProps {
  event: SchoolEvent;
  onSelect?: (event: SchoolEvent) => void;
}

export default function EventCard({ event, onSelect }: EventCardProps) {
  // Parse date for visual calendar badge
  const dateParts = event.date.split(' ');
  const month = dateParts[0] || 'OCT';
  const day = dateParts[1] ? dateParts[1].replace(',', '') : '15';

  const categoryColors: Record<string, string> = {
    Sports: 'bg-blue-50 text-blue-700 border-blue-200',
    Academic: 'bg-amber-50 text-amber-700 border-amber-200',
    Aesthetic: 'bg-purple-50 text-purple-700 border-purple-200',
    Religious: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Alumni: 'bg-rose-50 text-rose-700 border-rose-200'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all duration-300 p-6 flex flex-col justify-between group">
      <div>
        {/* Top Header with Date Badge & Category Tag */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-[#0a192f] text-white flex flex-col items-center justify-center border-2 border-[#d4af37]/40 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                {month.substring(0, 3)}
              </span>
              <span className="text-xl font-extrabold leading-none">
                {day}
              </span>
            </div>
            <div>
              <span
                className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  categoryColors[event.category] || 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {event.category}
              </span>
              <span className="block text-xs text-slate-400 mt-1 font-medium">
                {event.status}
              </span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-serif text-lg font-bold text-[#0a192f] group-hover:text-[#b89327] transition-colors line-clamp-2 mb-2">
          {event.title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {event.description}
        </p>
      </div>

      {/* Meta Footer */}
      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="truncate">{event.venue}</span>
        </div>
      </div>
    </div>
  );
}
