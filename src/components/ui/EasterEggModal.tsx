"use client";

import React, { useState } from "react";
import { Key, X, Heart, Sparkles } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

export default function EasterEggModal() {
  const [isOpen, setIsOpen] = useState(false);
  const easterEgg = birthdayConfig.easterEgg;

  const handleOpen = () => {
    audioManager.playStarChime();
    audioManager.playSparkle();
    setIsOpen(true);
  };

  return (
    <>
      {/* Discreet Golden Key in corner */}
      <button
        onClick={handleOpen}
        title={easterEgg.hint}
        aria-label="Unlock secret message"
        className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[#D9B779]/30 bg-[#151014]/80 text-[#D9B779]/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#D9B779] hover:text-[#D9B779]"
      >
        <Key className="h-4 w-4" />
      </button>

      {/* Secret Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-[#D9B779]/50 bg-gradient-to-b from-[#350B20] to-[#151014] p-8 text-center shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#D9B779]/30 text-[#FFF7EF]/70 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#791F42]/60 text-[#D9B779] border border-[#D9B779]/40">
              <Heart className="h-7 w-7 fill-[#D9B779]" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#D9B779] mb-2">
              <Sparkles className="h-3 w-3" /> Secret Keepsake
            </div>

            <h3 className="font-display text-2xl font-light text-[#FFF7EF] mb-4 text-glow-gold">
              {easterEgg.title}
            </h3>

            <p className="font-editorial text-base italic text-[#F5C8D5] leading-relaxed mb-6">
              &ldquo;{easterEgg.message}&rdquo;
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-[#D9B779]/40 bg-[#791F42]/80 px-6 py-2 text-xs uppercase tracking-widest text-[#FFF7EF] hover:bg-[#791F42] transition"
            >
              Keep Close to My Heart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
