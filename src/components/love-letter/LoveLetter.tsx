"use client";

import React, { useState } from "react";
import { Mail, Sparkles, Heart, ChevronDown } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const letter = birthdayConfig.letter;

  const handleOpenLetter = () => {
    audioManager.playStarChime();
    audioManager.playSparkle();
    setIsOpen(true);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#151014] px-6 py-28 lg:px-16 overflow-hidden border-t border-[#D9B779]/15">
      {/* Background warm rose and gold glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[#791F42]/15 blur-[180px]" />
      <div className="pointer-events-none absolute top-20 right-20 h-[350px] w-[350px] rounded-full bg-[#D9B779]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/30 bg-[#350B20]/40 px-4 py-1 text-xs tracking-[0.25em] text-[#D9B779] uppercase backdrop-blur-md">
            <Mail className="h-3.5 w-3.5 text-[#D9B779]" />
            <span>{letter.sectionTitle}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFF7EF]">
            {letter.sectionSubtitle}
          </h2>

          <p className="font-editorial text-sm sm:text-base italic text-[#F5C8D5]">
            Words penned from the quietest depths of my heart.
          </p>
        </div>

        {/* Envelope / Parchment Experience */}
        {!isOpen ? (
          <div className="relative mx-auto max-w-lg rounded-3xl border border-[#D9B779]/40 bg-gradient-to-b from-[#350B20] to-[#1f121a] p-8 sm:p-12 text-center shadow-2xl shadow-black/80 transition-all duration-500 hover:border-[#D9B779] hover:shadow-[#791F42]/30">
            {/* Wax Seal Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D9B779] bg-gradient-to-tr from-[#791F42] to-[#B83B68] text-[#FFF7EF] shadow-xl shadow-[#791F42]/50 animate-pulse-glow">
              <Heart className="h-9 w-9 fill-[#FFF7EF]" />
            </div>

            <p className="font-editorial text-lg italic text-[#FFF7EF]/90 mb-2">
              To my favorite person in the whole universe
            </p>
            <p className="text-xs tracking-widest text-[#D9B779] uppercase mb-8">
              {letter.date}
            </p>

            <button
              onClick={handleOpenLetter}
              className="group relative inline-flex items-center gap-3 rounded-full border border-[#D9B779] bg-gradient-to-r from-[#791F42] to-[#350B20] px-8 py-3.5 text-xs font-semibold tracking-[0.25em] text-[#FFF7EF] uppercase shadow-lg shadow-[#791F42]/40 transition duration-300 hover:scale-105 hover:bg-[#791F42]"
            >
              <span>{letter.buttonLabel}</span>
              <Sparkles className="h-4 w-4 text-[#D9B779] transition group-hover:rotate-12" />
            </button>
          </div>
        ) : (
          /* Unfolded Warm Ivory Parchment Letter */
          <div className="relative mx-auto rounded-3xl border border-[#D9B779]/60 bg-[#FFF7EF] p-8 sm:p-14 text-[#151014] shadow-2xl shadow-black/90 transition-all duration-700 animate-fade-in">
            {/* Delicate gold border corner accents */}
            <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-[#D9B779]" />
            <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-[#D9B779]" />
            <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[#D9B779]" />
            <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#D9B779]" />

            {/* Letter Date & Salutation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#151014]/15 pb-4 mb-8">
              <span className="font-editorial text-xs uppercase tracking-widest text-[#791F42]">
                {letter.date}
              </span>
              <span className="font-script text-lg text-[#791F42]">
                A Love Letter
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#151014] mb-6">
              {letter.salutation}
            </h3>

            {/* Bengali Poetic Blessing */}
            <div className="mb-8 rounded-2xl border border-[#D9B779]/40 bg-[#350B20]/10 p-5 text-center">
              <p className="font-bengali-serif text-lg sm:text-xl text-[#791F42] leading-relaxed">
                &ldquo;ভালোবাসা মানে কাউকে নিজের সম্পূর্ণ অস্তিত্ব দিয়ে ভালোবাসার নাম, তার ভালো থাকায় নিজের সুখকে খুঁজে পাওয়া।&rdquo;
              </p>
              <span className="block font-bengali-sans text-xs text-[#151014]/60 mt-1.5 font-light">
                — শরৎচন্দ্র চট্টোপাধ্যায়ের প্রেমদর্শন
              </span>
            </div>

            {/* Letter Paragraphs */}
            <div className="space-y-6 font-display text-lg sm:text-xl font-light text-[#151014]/90 leading-relaxed">
              {letter.paragraphs.map((p, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-normal">
                  {p}
                </p>
              ))}
            </div>

            {/* Closing & Signature */}
            <div className="mt-12 pt-8 border-t border-[#151014]/15 flex flex-col items-end space-y-2">
              <p className="font-editorial text-base sm:text-lg italic text-[#791F42]">
                {letter.closing}
              </p>
              <p className="font-script text-3xl sm:text-4xl text-[#350B20]">
                {letter.signature}
              </p>
            </div>

            {/* Close / Fold Button */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-full border border-[#151014]/20 bg-black/5 px-6 py-2 text-xs uppercase tracking-widest text-[#151014] hover:bg-black/10 transition"
              >
                <span>Fold Letter</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
