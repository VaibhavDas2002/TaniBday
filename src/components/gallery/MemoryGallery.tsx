"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Calendar, MapPin, Eye, Sparkles } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import PhotoLightbox from "./PhotoLightbox";
import { audioManager } from "@/utils/audio";

export default function MemoryGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const items = birthdayConfig.memories.items;

  const openPhoto = (index: number) => {
    audioManager.playStarChime();
    setSelectedPhotoIndex(index);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section id="memories" className="relative min-h-screen w-full bg-[#151014] px-6 py-24 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-[#791F42]/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-[450px] w-[450px] rounded-full bg-[#D9B779]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-[#D9B779]/20 pb-8 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#D9B779] uppercase">
              <Camera className="h-4 w-4 text-[#D9B779]" />
              <span>{birthdayConfig.memories.sectionTitle}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFF7EF]">
              {birthdayConfig.memories.sectionSubtitle}
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#FFF7EF]/70 font-light">
              {birthdayConfig.memories.description}
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={scrollLeft}
              aria-label="Scroll memories left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9B779]/30 bg-[#350B20]/40 text-[#D9B779] backdrop-blur-md transition hover:bg-[#791F42] hover:text-[#FFF7EF]"
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll memories right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9B779]/30 bg-[#350B20]/40 text-[#D9B779] backdrop-blur-md transition hover:bg-[#791F42] hover:text-[#FFF7EF]"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Draggable / Scrollable Gallery */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-10 pt-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item, index) => {
            const isPolaroid = index % 2 === 0;

            return (
              <div
                key={item.id}
                onClick={() => openPhoto(index)}
                style={{
                  transform: `rotate(${item.rotation || 0}deg)`,
                }}
                className={`group relative flex-none w-[300px] sm:w-[350px] snap-center cursor-pointer transition-all duration-500 hover:scale-105 hover:z-20 hover:rotate-0 ${
                  isPolaroid
                    ? "rounded-2xl border border-[#D9B779]/30 bg-[#FFF7EF] p-4 text-[#151014] shadow-2xl shadow-black/60"
                    : "rounded-2xl border border-[#D9B779]/30 bg-[#23121d] p-3 text-[#FFF7EF] shadow-2xl shadow-black/80"
                }`}
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="350px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter saturate-[1.05]"
                  />

                  {/* Hover Overlay with View Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-[#D9B779] bg-[#350B20]/90 px-4 py-2 text-xs font-semibold tracking-wider text-[#FFF7EF] uppercase shadow-lg">
                      <Eye className="h-3.5 w-3.5 text-[#D9B779]" /> View Story
                    </span>
                  </div>

                  {/* Badge */}
                  {item.tag && (
                    <div className="absolute top-3 left-3 rounded-full bg-[#151014]/70 px-3 py-1 text-[10px] uppercase tracking-wider text-[#D9B779] backdrop-blur-md">
                      {item.tag}
                    </div>
                  )}
                </div>

                {/* Caption / Details footer */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] opacity-75">
                    {item.date && (
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="h-3 w-3 text-[#791F42]" />
                        {item.date}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-[#791F42]" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`font-display text-xl font-medium line-clamp-1 ${
                      isPolaroid ? "text-[#151014]" : "text-[#FFF7EF]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`font-editorial text-xs italic line-clamp-2 ${
                      isPolaroid ? "text-[#151014]/80" : "text-[#FFF7EF]/80"
                    }`}
                  >
                    &ldquo;{item.caption}&rdquo;
                  </p>
                </div>

                {/* Polaroid hand-signed bottom note */}
                {isPolaroid && (
                  <div className="mt-3 flex justify-end border-t border-[#151014]/10 pt-2">
                    <span className="font-script text-sm text-[#791F42]">
                      Always in my heart ♥
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom gallery guidance */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs tracking-wider text-[#D9B779]/70 uppercase">
          <Sparkles className="h-3.5 w-3.5 text-[#D9B779]" />
          <span>Click any memory to open high-resolution storybook preview</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        items={items}
        currentIndex={selectedPhotoIndex ?? 0}
        isOpen={selectedPhotoIndex !== null}
        onClose={() => setSelectedPhotoIndex(null)}
        onSelectIndex={(idx) => setSelectedPhotoIndex(idx)}
      />
    </section>
  );
}
