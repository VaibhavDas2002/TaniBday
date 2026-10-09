"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, MapPin, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { MemoryItem } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

interface PhotoLightboxProps {
  items: MemoryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function PhotoLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: PhotoLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    audioManager.playStarChime(0.9);
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    audioManager.playStarChime(1.1);
    onSelectIndex((currentIndex + 1) % items.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#151014]/95 p-4 sm:p-8 backdrop-blur-2xl">
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close photo preview"
        className="absolute top-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#D9B779]/40 bg-[#350B20]/80 text-[#FFF7EF] transition hover:bg-[#791F42] hover:scale-105"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Nav buttons */}
      <button
        onClick={handlePrev}
        aria-label="Previous photo"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#D9B779]/30 bg-[#151014]/80 text-[#D9B779] backdrop-blur-md transition hover:bg-[#791F42] hover:text-[#FFF7EF]"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next photo"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#D9B779]/30 bg-[#151014]/80 text-[#D9B779] backdrop-blur-md transition hover:bg-[#791F42] hover:text-[#FFF7EF]"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Modal Card Content */}
      <div className="relative mx-auto flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#D9B779]/30 bg-[#1f121a] shadow-2xl lg:flex-row">
        {/* Photo View */}
        <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:w-3/5 bg-black">
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Story & Details View */}
        <div className="flex w-full flex-col justify-between p-6 sm:p-8 lg:w-2/5 border-t border-[#D9B779]/20 lg:border-t-0 lg:border-l">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#D9B779]">
              <span className="tracking-widest uppercase">{currentItem.tag || "Memory"}</span>
              <span className="text-[#FFF7EF]/50">
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-light text-[#FFF7EF]">
              {currentItem.title}
            </h3>

            <div className="flex flex-wrap gap-4 text-xs text-[#F5C8D5]/80">
              {currentItem.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#D9B779]" />
                  <span>{currentItem.date}</span>
                </div>
              )}
              {currentItem.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#D9B779]" />
                  <span>{currentItem.location}</span>
                </div>
              )}
            </div>

            <p className="font-editorial text-base sm:text-lg italic text-[#FFF7EF]/90 leading-relaxed pt-2 border-t border-[#FFF7EF]/10">
              &ldquo;{currentItem.caption}&rdquo;
            </p>
          </div>

          <div className="mt-6 pt-4 flex items-center justify-between border-t border-[#FFF7EF]/10 text-xs text-[#D9B779]">
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 fill-[#791F42] text-[#F5C8D5]" />
              Cherished Moment
            </span>
            <span className="font-script text-base text-[#F5C8D5]">
              Forever & Always
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
