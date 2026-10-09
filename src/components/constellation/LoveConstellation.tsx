"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { birthdayConfig, ConstellationPoint } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

const ConstellationCanvas = dynamic(
  () => import("@/components/three/ConstellationCanvas"),
  { ssr: false }
);

export default function LoveConstellation() {
  const points = birthdayConfig.constellation.points;
  const [activePoint, setActivePoint] = useState<ConstellationPoint>(points[0]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSelectStar = (pt: ConstellationPoint) => {
    audioManager.playStarChime();
    audioManager.playSparkle();
    setActivePoint(pt);
  };

  const currentIndex = points.findIndex((p) => p.id === activePoint.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % points.length;
    handleSelectStar(points[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + points.length) % points.length;
    handleSelectStar(points[prevIdx]);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#151014] px-6 py-24 lg:px-16 overflow-hidden border-t border-[#D9B779]/15">
      {/* Background starlight glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-[#791F42]/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-[450px] w-[450px] rounded-full bg-[#D9B779]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/30 bg-[#350B20]/40 px-4 py-1 text-xs tracking-[0.25em] text-[#D9B779] uppercase backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#D9B779]" />
            <span>{birthdayConfig.constellation.sectionTitle}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFF7EF]">
            {birthdayConfig.constellation.sectionSubtitle}
          </h2>

          <p className="text-sm sm:text-base text-[#FFF7EF]/75 font-light">
            {birthdayConfig.constellation.instructions}
          </p>
        </div>

        {/* Constellation Workspace: 3D Celestial Canvas on left/center, Interactive Card on right */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
          {/* 3D Canvas Container */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] w-full rounded-3xl border border-[#D9B779]/20 bg-[#1f121a]/60 shadow-2xl overflow-hidden">
            {hasMounted && (
              <ConstellationCanvas
                points={points}
                activePoint={activePoint}
                onSelectStar={handleSelectStar}
              />
            )}

            {/* Canvas Hint */}
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between items-center text-[11px] text-[#D9B779]/80 uppercase tracking-widest bg-[#151014]/60 px-4 py-2 rounded-xl backdrop-blur-md">
              <span>Drag to rotate constellation</span>
              <span>Tap a star to reveal</span>
            </div>
          </div>

          {/* Right Column: Revealing Story Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-3xl border border-[#D9B779]/40 bg-gradient-to-b from-[#350B20]/90 to-[#1f121a]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              {/* Star Badge & Navigation */}
              <div className="flex items-center justify-between border-b border-[#D9B779]/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#791F42] text-xs font-bold text-[#FFF7EF]">
                    ★
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#D9B779]">
                    Star #{currentIndex + 1} of {points.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous reason"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9B779]/30 text-[#D9B779] hover:bg-[#791F42] hover:text-[#FFF7EF] transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next reason"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9B779]/30 text-[#D9B779] hover:bg-[#791F42] hover:text-[#FFF7EF] transition"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Star Title & Short Text */}
              <div className="space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-light text-[#FFF7EF] text-glow-gold">
                  {activePoint.title}
                </h3>
                <p className="font-editorial text-base sm:text-lg italic text-[#F5C8D5]">
                  &ldquo;{activePoint.shortText}&rdquo;
                </p>
                <div className="h-0.5 w-16 bg-[#D9B779]/40 my-3" />
                <p className="text-sm sm:text-base text-[#FFF7EF]/90 font-light leading-relaxed">
                  {activePoint.detail}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-4 flex items-center justify-between border-t border-[#FFF7EF]/10 text-xs text-[#D9B779]">
                <span className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 fill-[#791F42] text-[#F5C8D5]" />
                  A piece of my heart
                </span>
                <span className="font-script text-base text-[#FFF7EF]">
                  Forever Treasured
                </span>
              </div>
            </div>

            {/* Quick Star Selector Pills */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {points.map((pt, idx) => (
                <button
                  key={pt.id}
                  onClick={() => handleSelectStar(pt)}
                  className={`rounded-full px-3 py-1 text-xs transition-all ${
                    pt.id === activePoint.id
                      ? "bg-[#D9B779] text-[#151014] font-semibold shadow-md shadow-[#D9B779]/30"
                      : "border border-[#D9B779]/30 bg-[#350B20]/40 text-[#FFF7EF]/70 hover:border-[#D9B779] hover:text-[#FFF7EF]"
                  }`}
                >
                  #{idx + 1} {pt.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
