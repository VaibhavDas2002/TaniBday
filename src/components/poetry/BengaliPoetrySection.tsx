"use client";

import React, { useState } from "react";
import { Feather, Sparkles, Heart, ChevronLeft, ChevronRight, BookOpen, Quote } from "lucide-react";
import { birthdayConfig, BengaliPoem } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

export default function BengaliPoetrySection() {
  const poetry = birthdayConfig.poetry;
  const poems = poetry.poems;
  const [activePoemIndex, setActivePoemIndex] = useState(0);

  const activePoem: BengaliPoem = poems[activePoemIndex];

  const handleSelectPoem = (index: number) => {
    audioManager.playStarChime();
    audioManager.playSparkle();
    setActivePoemIndex(index);
  };

  const handleNext = () => {
    const nextIdx = (activePoemIndex + 1) % poems.length;
    handleSelectPoem(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activePoemIndex - 1 + poems.length) % poems.length;
    handleSelectPoem(prevIdx);
  };

  return (
    <section id="poetry" className="relative min-h-screen w-full bg-[#151014] px-6 py-28 lg:px-16 overflow-hidden border-t border-[#D9B779]/20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full bg-[#791F42]/15 blur-[190px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-[#D9B779]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/35 bg-[#350B20]/50 px-5 py-1.5 text-xs tracking-[0.25em] text-[#D9B779] uppercase backdrop-blur-md">
            <Feather className="h-3.5 w-3.5 text-[#D9B779]" />
            <span>{poetry.sectionTitle}</span>
          </div>

          <h2 className="font-bengali-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#FFF7EF] leading-[1.2]">
            <span className="block text-glow-gold">{poetry.sectionSubtitle}</span>
          </h2>

          <p className="font-bengali-sans text-base sm:text-xl text-[#F5C8D5]/90 tracking-wide">
            {poetry.bengaliHeading}
          </p>

          <p className="font-editorial text-sm sm:text-base italic text-[#FFF7EF]/75 font-light max-w-2xl mx-auto pt-2">
            {poetry.description}
          </p>
        </div>

        {/* Poet Selector Tabs with Calligraphic Bengali Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {poems.map((poem, idx) => {
            const isCurrent = idx === activePoemIndex;
            return (
              <button
                key={poem.id}
                onClick={() => handleSelectPoem(idx)}
                className={`group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs transition-all duration-300 ${
                  isCurrent
                    ? "border border-[#D9B779] bg-gradient-to-r from-[#791F42] to-[#350B20] text-[#FFF7EF] shadow-lg shadow-[#791F42]/40 scale-105"
                    : "border border-[#D9B779]/20 bg-[#1f121a]/60 text-[#FFF7EF]/70 hover:border-[#D9B779]/50 hover:text-[#FFF7EF]"
                }`}
              >
                <span className="font-bengali-serif text-sm font-medium">
                  {poem.poetBengali}
                </span>
                <span className="text-[10px] text-[#D9B779]/80 font-sans hidden sm:inline">
                  • {poem.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Literary Parchment Scroll / Book Layout */}
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-[#D9B779]/40 bg-gradient-to-b from-[#24111d]/90 via-[#1a0f17]/95 to-[#151014]/95 p-6 sm:p-12 shadow-2xl backdrop-blur-xl">
          {/* Decorative Gold Filigree Corners */}
          <div className="absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-[#D9B779]/60 rounded-tl-lg" />
          <div className="absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-[#D9B779]/60 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[#D9B779]/60 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-[#D9B779]/60 rounded-br-lg" />

          {/* Top Bar with Navigation & Theme */}
          <div className="flex items-center justify-between border-b border-[#D9B779]/20 pb-5 mb-8 text-xs">
            <div className="flex items-center gap-2 text-[#D9B779]">
              <BookOpen className="h-4 w-4" />
              <span className="tracking-widest uppercase font-medium">{activePoem.theme}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#FFF7EF]/50">
                {activePoemIndex + 1} / {poems.length}
              </span>
              <button
                onClick={handlePrev}
                aria-label="Previous poem"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9B779]/30 text-[#D9B779] hover:bg-[#791F42] hover:text-[#FFF7EF] transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next poem"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9B779]/30 text-[#D9B779] hover:bg-[#791F42] hover:text-[#FFF7EF] transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Featured Calligraphy Banner */}
          <div className="mb-8 rounded-2xl border border-[#D9B779]/20 bg-[#350B20]/40 p-4 text-center">
            <p className="font-bengali-serif text-xl sm:text-2xl lg:text-3xl font-light text-[#D9B779] tracking-wider text-glow-gold">
              &ldquo;{activePoem.calligraphySnippet}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: The Bengali Poem with Literary Calligraphy */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-bengali-serif text-3xl sm:text-4xl text-[#FFF7EF] font-medium leading-tight">
                  {activePoem.titleBengali}
                </h3>
                <p className="font-bengali-sans text-sm text-[#D9B779] mt-1 font-light">
                  — {activePoem.poetBengali} ({activePoem.poet})
                </p>
              </div>

              {/* Verses Container */}
              <div className="space-y-3 pl-4 border-l-2 border-[#791F42] font-bengali-serif text-lg sm:text-xl font-light text-[#FFF7EF]/95 leading-relaxed">
                {activePoem.verses.map((verse, vIdx) => (
                  <p key={vIdx} className="tracking-wide">
                    {verse}
                  </p>
                ))}
              </div>

              {activePoem.transliteration && (
                <div className="pt-2">
                  <p className="text-xs text-[#F5C8D5]/70 italic font-editorial">
                    Cadence: &ldquo;{activePoem.transliteration}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: English Meaning & Context */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-2xl border border-[#FFF7EF]/10 bg-[#151014]/60 p-6 backdrop-blur-md">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D9B779]">
                  <Quote className="h-4 w-4 text-[#D9B779]" />
                  <span>Poetic Essence & Meaning</span>
                </div>

                <p className="font-editorial text-base sm:text-lg italic text-[#FFF7EF]/90 leading-relaxed">
                  &ldquo;{activePoem.englishMeaning}&rdquo;
                </p>

                <div className="h-0.5 w-12 bg-[#D9B779]/30" />

                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-wider text-[#D9B779]/80 font-semibold">
                    Literary Background
                  </p>
                  <p className="text-xs text-[#FFF7EF]/75 font-light leading-relaxed">
                    {activePoem.context}
                  </p>
                </div>
              </div>

              {/* Dedication footer badge */}
              <div className="pt-4 border-t border-[#FFF7EF]/10 flex items-center justify-between text-xs text-[#D9B779]">
                <span className="flex items-center gap-1.5 font-bengali-sans">
                  <Heart className="h-3.5 w-3.5 fill-[#791F42] text-[#F5C8D5]" />
                  শুধু তোমার জন্য
                </span>
                <span className="font-script text-base text-[#F5C8D5]">
                  With Infinite Love ❤️
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Card Guidance */}
          <div className="mt-8 pt-6 border-t border-[#D9B779]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9B779]/70">
            <span className="flex items-center gap-1.5 font-bengali-sans">
              <Sparkles className="h-3.5 w-3.5 text-[#D9B779]" />
              রবীন্দ্রনাথ ঠাকুর • জীবনানন্দ দাশ • শরৎচন্দ্র চট্টোপাধ্যায় • কাজী নজরুল ইসলাম • সুনীল গঙ্গোপাধ্যায়
            </span>
            <span className="font-editorial italic text-white/50">
              Timeless Bengali Romantic Heritage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
