"use client";

import React, { useState } from "react";
import OpeningScene from "@/components/intro/OpeningScene";
import HeroSection from "@/components/hero/HeroSection";
import MemoryGallery from "@/components/gallery/MemoryGallery";
import LoveConstellation from "@/components/constellation/LoveConstellation";
import BengaliPoetrySection from "@/components/poetry/BengaliPoetrySection";
import LoveLetter from "@/components/love-letter/LoveLetter";
import MagicalCakeSection from "@/components/birthday-cake/MagicalCakeSection";
import FinalSurprise from "@/components/finale/FinalSurprise";
import AudioController from "@/components/audio/AudioController";
import RomanticCursor from "@/components/ui/RomanticCursor";
import EasterEggModal from "@/components/ui/EasterEggModal";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function BirthdayPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [audioTrigger, setAudioTrigger] = useState(false);

  const handleEnterUniverse = (enableAudio: boolean) => {
    setHasEntered(true);
    if (enableAudio) {
      setAudioTrigger(true);
    }
  };

  const handleReplayOpening = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setHasEntered(false);
  };

  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#151014] text-[#FFF7EF]">
        {/* Custom romantic cursor */}
        <RomanticCursor />

        {/* Floating Audio Soundtrack Controller */}
        <AudioController autoStartTrigger={audioTrigger} />

        {/* Secret Easter Egg Key */}
        <EasterEggModal />

        {/* 1. Full-screen Cinematic Opening Scene */}
        {!hasEntered && (
          <OpeningScene onEnter={handleEnterUniverse} />
        )}

        {/* Main Experience Chapters */}
        <div className={`transition-opacity duration-1000 ${hasEntered ? "opacity-100" : "opacity-0"}`}>
          {/* 2. Hero Section: Her Birthday, Her Universe */}
          <HeroSection />

          {/* 3. Our Memories: Interactive Storybook Gallery */}
          <MemoryGallery />

          {/* 4. The Reasons I Love You: 3D Love Constellation */}
          <LoveConstellation />

          {/* 6. Romantic Bengali Poetry: Rabindranath Tagore, Jibanananda, Sarat Chandra, Nazrul */}
          <BengaliPoetrySection />

          {/* 7. A Personal Letter: The Emotional Centerpiece */}
          <LoveLetter />

          {/* 7. The Magical Birthday Cake: Interactive Candle Blowout */}
          <MagicalCakeSection />

          {/* 8. The Final Surprise: Grand Rose Petals & Forever Message */}
          <FinalSurprise onReplay={handleReplayOpening} />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
