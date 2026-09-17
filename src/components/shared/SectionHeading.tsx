import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  theme = 'light'
}: SectionHeadingProps) {
  const alignmentClass =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : align === 'right'
      ? 'text-right items-end ml-auto'
      : 'text-left items-start mr-auto';

  const titleColor = theme === 'dark' ? 'text-white' : 'text-[#0a192f]';
  const subtitleColor = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`flex flex-col max-w-3xl mb-12 ${alignmentClass}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d4af37]/15 text-[#b89327] border border-[#d4af37]/40 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
          {badge}
        </div>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold tracking-tight leading-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3.5 text-base sm:text-lg leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
      {/* Decorative Collegiate Gold Underline */}
      <div className="flex items-center gap-1.5 mt-4">
        <div className="w-10 h-0.5 bg-[#d4af37]" />
        <div className="w-2.5 h-2.5 rotate-45 border border-[#d4af37] bg-[#d4af37]" />
        <div className="w-10 h-0.5 bg-[#d4af37]" />
      </div>
    </div>
  );
}
