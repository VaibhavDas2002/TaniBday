"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Heart, ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { birthdayConfig } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

const HeroGlassScene = dynamic(
  () => import("@/components/three/HeroGlassScene"),
  { ssr: false }
);

export default function HeroSection() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleScrollToNext = () => {
    audioManager.playStarChime();
    const target = document.getElementById("memories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#151014] via-[#350B20]/80 to-[#151014] px-6 py-12 lg:px-16">
      {/* 3D Background Scene */}
      {hasMounted && <HeroGlassScene />}

      {/* Atmospheric lighting orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#791F42]/25 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-[#D9B779]/15 blur-[140px]" />

      {/* Top Bar: Recipient Name & Birthday Date */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-[#D9B779]/15 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-editorial text-lg sm:text-xl text-[#FFF7EF] font-normal">
            {birthdayConfig.recipient.fullName}
          </span>
          <span className="font-script text-2xl text-[#D9B779]">
            ({birthdayConfig.recipient.nickname})
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C8D5]" />
          <span className="font-bengali-sans text-xs tracking-wider text-[#F5C8D5]/80">
            {birthdayConfig.recipient.fullNameBengali}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/30 bg-[#350B20]/40 px-3.5 py-1 text-xs tracking-wider text-[#D9B779]">
          <Sparkles className="h-3 w-3 text-[#D9B779]" />
          <span>{birthdayConfig.hero.badge}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 py-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Big Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          <div className="inline-flex flex-wrap items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D9B779]">
            <Heart className="h-3.5 w-3.5 text-[#F5C8D5] fill-[#F5C8D5]" />
            <span>Dedicated to {birthdayConfig.recipient.fullName} ({birthdayConfig.recipient.nickname}) • শুভ জন্মদিন তানি</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#FFF7EF] leading-[1.05]">
            <span className="block text-glow-gold">{birthdayConfig.hero.titleLine1}</span>
            <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7EF] via-[#F5C8D5] to-[#D9B779] text-glow-rose">
              {birthdayConfig.hero.titleLine2}
            </span>
          </h1>

          {/* Bengali Calligraphy Highlight */}
          <div className="rounded-2xl border border-[#D9B779]/30 bg-[#350B20]/50 px-5 py-3 backdrop-blur-md">
            <p className="font-bengali-serif text-xl sm:text-2xl text-[#D9B779] font-normal tracking-wide text-glow-gold">
              &ldquo;আমার পরাণ যাহা চায়, তুমি তাই, তুমি তাই গো...&rdquo;
            </p>
            <span className="block text-[11px] font-bengali-sans text-[#F5C8D5]/70 mt-1">
              — রবীন্দ্রনাথ ঠাকুর (গীতবিতান)
            </span>
          </div>

          <p className="max-w-xl text-base sm:text-lg text-[#FFF7EF]/85 font-light leading-relaxed">
            {birthdayConfig.hero.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleScrollToNext}
              className="group relative inline-flex items-center gap-3 rounded-full border border-[#D9B779] bg-gradient-to-r from-[#791F42] to-[#350B20] px-8 py-4 text-xs font-semibold tracking-[0.25em] text-[#FFF7EF] uppercase shadow-2xl shadow-[#791F42]/40 transition-all duration-300 hover:scale-105 hover:border-[#FFF7EF] hover:shadow-[#D9B779]/40"
            >
              <span>{birthdayConfig.hero.ctaText}</span>
              <ArrowDown className="h-4 w-4 text-[#D9B779] transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Large Luxury Framed Photograph */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="group relative w-full max-w-sm sm:max-w-md">
            {/* Glowing Backdrop Aura */}
            <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-[#791F42] via-[#D9B779] to-[#F5C8D5] opacity-35 blur-xl transition duration-700 group-hover:opacity-55" />

            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-[2rem] border border-[#D9B779]/40 bg-[#151014] p-3 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.6rem]">
                <Image
                  src={birthdayConfig.hero.heroImage}
                  alt={`Photograph of ${birthdayConfig.recipient.name}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover object-top transition duration-700 ease-out group-hover:scale-105"
                />

                {/* Editorial Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151014]/90 via-transparent to-black/20" />

                {/* Bottom Frame Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-[#FFF7EF]/20 pt-3 text-xs">
                  <span className="font-editorial italic text-sm text-[#FFF7EF]">
                    Our Golden Hour
                  </span>
                  <span className="font-script text-lg text-[#D9B779]">
                    Happy Birthday ❤️
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 mx-auto flex flex-col items-center gap-2 pt-6 text-center">
        <button
          onClick={handleScrollToNext}
          aria-label="Scroll to memories"
          className="flex flex-col items-center gap-1 text-[11px] tracking-[0.25em] text-[#D9B779]/80 uppercase hover:text-[#FFF7EF] transition"
        >
          <span>Scroll to Explore Memories</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#D9B779]" />
        </button>
      </div>
    </section>
  );
}
