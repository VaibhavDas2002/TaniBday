"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Volume2, Heart } from "lucide-react";
import dynamic from "next/dynamic";
import { birthdayConfig } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

// Dynamically import 3D Canvas with ssr: false
const OpeningHeartCanvas = dynamic(
  () => import("@/components/three/OpeningHeartCanvas"),
  { ssr: false }
);

interface OpeningSceneProps {
  onEnter: (enableAudio: boolean) => void;
}

export default function OpeningScene({ onEnter }: OpeningSceneProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handleOpenUniverse = (soundEnabled = true) => {
    if (isDissolving) return;
    setIsDissolving(true);

    if (soundEnabled) {
      audioManager.playSparkle();
      audioManager.playCelebrationCascade();
    }

    // Shower of rose petals & champagne gold confetti
    try {
      confetti({
        particleCount: 55,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#791F42", "#F5C8D5", "#D9B779", "#B83B68", "#FFF7EF"],
        shapes: ["circle"],
        scalar: 1.2,
        ticks: 200,
      });

      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.7 },
          colors: ["#D9B779", "#F5C8D5"],
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.7 },
          colors: ["#791F42", "#F5C8D5"],
        });
      }, 350);
    } catch {
      // Confetti fallback
    }

    setRevealed(true);

    // Transition smoothly after animation
    setTimeout(() => {
      onEnter(soundEnabled);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#151014] via-[#350B20] to-[#151014] px-6 py-10 text-center select-none">
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#791F42]/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-[#D9B779]/15 blur-[120px]" />

      {/* Top Header Text */}
      <div className="relative z-10 max-w-xl transition-all duration-1000">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/30 bg-[#350B20]/40 px-4 py-1.5 text-xs tracking-[0.25em] text-[#D9B779] uppercase backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#D9B779]" />
          <span>{birthdayConfig.openingScene.eyebrow} • আজকের রাত শুধুই তোমার</span>
        </div>
        <p className="font-display mt-3 text-xl sm:text-2xl text-[#F5C8D5] italic font-light tracking-wide text-glow-rose">
          &ldquo;{birthdayConfig.openingScene.subtitle}&rdquo;
        </p>
        <p className="font-bengali-serif mt-2 text-lg sm:text-xl text-[#D9B779] font-light text-glow-gold tracking-wider">
          &ldquo;তুমি রবে নীরবে হৃদয়ে মম...&rdquo;
        </p>
      </div>

      {/* Center 3D Heart or CSS Fallback */}
      <div className="relative z-10 flex h-64 sm:h-80 w-full max-w-md items-center justify-center my-auto">
        {isMounted && hasWebGL ? (
          <OpeningHeartCanvas
            isDissolving={isDissolving}
            onHeartClick={() => handleOpenUniverse(true)}
          />
        ) : (
          /* CSS Fallback if WebGL unavailable */
          <div
            onClick={() => handleOpenUniverse(true)}
            className="group relative flex h-48 w-48 cursor-pointer items-center justify-center rounded-full transition-transform duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-full bg-[#791F42]/30 blur-2xl animate-pulse-glow" />
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-[#D9B779]/40 bg-[#350B20]/60 backdrop-blur-md shadow-2xl">
              <Heart className="h-16 w-16 text-[#F5C8D5] fill-[#791F42] transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        )}

        {/* Revealed message in center */}
        {revealed && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center animate-fade-in">
            <p className="font-editorial text-2xl sm:text-3xl text-[#FFF7EF] tracking-wider text-glow-gold">
              {birthdayConfig.openingScene.revealedMessage}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Interactive Prompts */}
      <div className="relative z-10 flex flex-col items-center gap-4 pb-4">
        {!isDissolving ? (
          <>
            <button
              onClick={() => handleOpenUniverse(true)}
              className="group relative flex items-center gap-3 rounded-full border border-[#D9B779]/40 bg-gradient-to-r from-[#791F42]/80 to-[#350B20]/90 px-8 py-3.5 text-sm tracking-widest text-[#FFF7EF] uppercase shadow-lg shadow-[#791F42]/30 backdrop-blur-md transition-all duration-300 hover:border-[#D9B779] hover:scale-105 hover:shadow-[#D9B779]/30"
            >
              <Volume2 className="h-4 w-4 text-[#D9B779] transition group-hover:scale-110" />
              <span>{birthdayConfig.openingScene.interactionPrompt}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-[#D9B779]">
                →
              </span>
            </button>

            <button
              onClick={() => handleOpenUniverse(false)}
              className="text-xs text-[#F5C8D5]/60 hover:text-[#FFF7EF] transition-colors underline-offset-4 hover:underline tracking-wider"
            >
              Enter quietly without music
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2 text-xs tracking-widest text-[#D9B779] uppercase">
            <span className="inline-block h-2 w-2 rounded-full bg-[#D9B779] animate-ping" />
            Opening your little universe...
          </div>
        )}
      </div>
    </div>
  );
}
