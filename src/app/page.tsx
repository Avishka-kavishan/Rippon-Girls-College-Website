import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-900">
          Official Web Portal
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900">
          Rippon Girl&apos;s College
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
          Oldest Girl&apos;s School in Southern Province of Sri Lanka.
        </p>
      </div>
    </div>
  );
}
