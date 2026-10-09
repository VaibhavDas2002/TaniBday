"use client";

import React from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Sparkles, Heart, RotateCcw } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

interface FinalSurpriseProps {
  onReplay: () => void;
}

export default function FinalSurprise({ onReplay }: FinalSurpriseProps) {
  const finale = birthdayConfig.finale;

  const triggerGrandCelebration = () => {
    audioManager.playCelebrationCascade();
    audioManager.playSparkle();

    try {
      // Grand multi-burst confetti & rose petals
      const count = 120;
      const defaults = {
        origin: { y: 0.7 },
        colors: ["#791F42", "#D9B779", "#F5C8D5", "#B83B68", "#FFF7EF"],
      };

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.4),
        spread: 60,
      });

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.3),
        spread: 100,
        decay: 0.91,
        scalar: 1.2,
      });

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.3),
        spread: 120,
        startVelocity: 45,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-[#151014] via-[#350B20] to-[#151014] px-6 py-28 lg:px-16 overflow-hidden border-t border-[#D9B779]/20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full bg-[#791F42]/25 blur-[190px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-[#D9B779]/15 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center space-y-12">
        {/* Top Celebration Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/40 bg-[#350B20]/60 px-5 py-2 text-xs tracking-[0.3em] text-[#D9B779] uppercase backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-[#D9B779]" />
          <span>The Grand Birthday Finale</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-light text-[#FFF7EF] leading-[1.05]">
            <span className="block text-glow-gold">{finale.headlineLine1}</span>
            <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7EF] via-[#F5C8D5] to-[#D9B779] text-glow-rose">
              {finale.headlineLine2}
            </span>
          </h2>

          <p className="font-editorial text-2xl sm:text-3xl italic text-[#F5C8D5] text-glow-rose">
            {finale.subheadline}
          </p>

          <p className="font-bengali-serif text-2xl sm:text-3xl text-[#D9B779] font-light text-glow-gold">
            &ldquo;তুমি আছো বলেই আমার পৃথিবী এত সুন্দর... শুভ জন্মদিন ❤️&rdquo;
          </p>
        </div>

        {/* Centerpiece Memory Frame */}
        <div className="mx-auto max-w-md sm:max-w-lg">
          <div className="group relative rounded-3xl border border-[#D9B779]/40 bg-[#151014] p-3 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.02]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
              <Image
                src={finale.finaleImage}
                alt={`Happy Birthday ${birthdayConfig.recipient.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-white/20 pt-2 text-xs text-[#FFF7EF]">
                <span className="font-editorial italic">Always My Favorite View</span>
                <span className="font-script text-base text-[#D9B779]">
                  {birthdayConfig.recipient.fullName} & Vaibhav
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Heartfelt Message */}
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#D9B779]/30 bg-[#1f121a]/70 p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          <p className="font-display text-lg sm:text-xl font-light text-[#FFF7EF]/90 leading-relaxed">
            &ldquo;{finale.personalMessage}&rdquo;
          </p>

          <div className="pt-4 border-t border-[#FFF7EF]/10 flex flex-col items-center gap-1">
            <span className="font-editorial text-xs uppercase tracking-widest text-[#D9B779]">
              {finale.signature}
            </span>
            <span className="font-script text-3xl sm:text-4xl text-[#F5C8D5]">
              Forever Yours ❤️
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          {/* Celebrate Button */}
          <button
            onClick={triggerGrandCelebration}
            className="group relative inline-flex items-center gap-3 rounded-full border border-[#D9B779] bg-gradient-to-r from-[#791F42] to-[#B83B68] px-8 py-4 text-xs font-semibold tracking-[0.25em] text-[#FFF7EF] uppercase shadow-2xl shadow-[#791F42]/40 transition duration-300 hover:scale-105 hover:bg-[#791F42]"
          >
            <Heart className="h-4 w-4 text-[#FFF7EF] fill-[#FFF7EF] transition group-hover:scale-110" />
            <span>Celebrate With Fireworks</span>
          </button>

          {/* Replay Button */}
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/40 bg-[#151014]/70 px-7 py-4 text-xs uppercase tracking-[0.2em] text-[#D9B779] backdrop-blur-md transition hover:bg-white/10 hover:border-[#D9B779]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{finale.replayButtonText}</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-16 pb-8 border-t border-[#D9B779]/15 text-xs text-[#FFF7EF]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            Crafted with all my love for {birthdayConfig.recipient.fullName} ({birthdayConfig.recipient.nickname}) • 2026
          </span>
          <span className="font-script text-base text-[#D9B779]">
            To the moon and beyond ✨
          </span>
        </div>
      </div>
    </section>
  );
}
