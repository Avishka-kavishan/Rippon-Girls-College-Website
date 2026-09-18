import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <main className="max-w-2xl mx-auto flex flex-col items-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300">
          Rippon Girls&apos; College
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Welcome to Rippon Girls&apos; College
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
          Clean Next.js project starter. Ready for your custom design and fresh content.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-amber-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-amber-400 shadow-lg shadow-amber-500/20"
          >
            Next.js Docs
          </a>
          <a
            href="https://github.com/Avishka-kavishan/Rippon-Girls-College-Website"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            GitHub Repo
          </a>
        </div>
      </main>
    </div>
  );
}
