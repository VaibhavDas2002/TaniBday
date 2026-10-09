"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import confetti from "canvas-confetti";
import { Sparkles, Flame, RotateCcw, Heart, Mic } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

const BirthdayCakeCanvas = dynamic(
  () => import("@/components/three/BirthdayCakeCanvas"),
  { ssr: false }
);

export default function MagicalCakeSection() {
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [micActive, setMicActive] = useState(false);

  const cake = birthdayConfig.cake;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleBlowOut = () => {
    if (!isCandleLit) return;
    setIsCandleLit(false);
    setWishMade(true);

    // Audio SFX
    audioManager.playCandleBlow();

    // Golden sparkles and rose petal explosion
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#D9B779", "#F5C8D5", "#FFF7EF", "#791F42"],
      });
    } catch {
      // Ignored
    }
  };

  const handleRelight = () => {
    audioManager.playStarChime();
    setIsCandleLit(true);
    setWishMade(false);
  };

  // Optional experimental mic blow listener
  const toggleMic = async () => {
    if (micActive) {
      setMicActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicActive(true);
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkBlow = () => {
        if (!micActive && !isCandleLit) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < 20; i++) {
          sum += dataArray[i]; // Low frequencies typical of blowing into mic
        }
        const average = sum / 20;
        if (average > 90) {
          handleBlowOut();
          stream.getTracks().forEach((track) => track.stop());
          setMicActive(false);
          return;
        }
        requestAnimationFrame(checkBlow);
      };

      checkBlow();
    } catch {
      alert("Microphone permission was not granted. You can tap the button to blow out your candles!");
      setMicActive(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#151014] px-6 py-28 lg:px-16 overflow-hidden border-t border-[#D9B779]/15">
      {/* Background candle illumination */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#791F42]/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-[#D9B779]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/30 bg-[#350B20]/40 px-4 py-1 text-xs tracking-[0.25em] text-[#D9B779] uppercase backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#D9B779]" />
            <span>{cake.sectionTitle}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#FFF7EF]">
            {cake.prompt}
          </h2>

          <p className="font-bengali-serif text-xl sm:text-2xl text-[#D9B779] font-normal tracking-wide text-glow-gold">
            &ldquo;একটি সুন্দর ইচ্ছে করো... তোমার সকল স্বপ্ন পূর্ণ হোক&rdquo;
          </p>

          <p className="font-editorial text-base sm:text-lg italic text-[#F5C8D5]">
            Close your eyes, make a wish from the bottom of your heart, and blow out the candle.
          </p>
        </div>

        {/* 3D Cake Canvas Container */}
        <div className="relative mx-auto h-[400px] sm:h-[480px] w-full max-w-xl rounded-3xl border border-[#D9B779]/20 bg-[#1f121a]/60 shadow-2xl overflow-hidden backdrop-blur-sm">
          {hasMounted && (
            <BirthdayCakeCanvas
              isCandleLit={isCandleLit}
              onBlowOut={handleBlowOut}
            />
          )}

          {/* Candle status badge */}
          <div className="pointer-events-none absolute top-4 inset-x-0 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9B779]/30 bg-[#151014]/70 px-4 py-1 text-xs uppercase tracking-widest text-[#D9B779] backdrop-blur-md">
              <Flame className={`h-3.5 w-3.5 ${isCandleLit ? "text-orange-400 animate-pulse" : "text-gray-500"}`} />
              {isCandleLit ? "Candle is Glowing" : "Candle Extinguished"}
            </span>
          </div>
        </div>

        {/* Interactive Controls & Wish Result */}
        <div className="flex flex-col items-center gap-6">
          {isCandleLit ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Blow Button */}
              <button
                onClick={handleBlowOut}
                className="group relative inline-flex items-center gap-3 rounded-full border border-[#D9B779] bg-gradient-to-r from-[#791F42] to-[#B83B68] px-8 py-4 text-xs font-semibold tracking-[0.25em] text-[#FFF7EF] uppercase shadow-2xl shadow-[#791F42]/40 transition duration-300 hover:scale-105 hover:bg-[#791F42]"
              >
                <Flame className="h-4 w-4 text-[#D9B779] transition group-hover:scale-110" />
                <span>Blow Out the Candle</span>
              </button>

              {/* Optional Mic Blow Button */}
              <button
                onClick={toggleMic}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-xs tracking-wider transition ${
                  micActive
                    ? "border-red-400 bg-red-950/60 text-red-200 animate-pulse"
                    : "border-[#D9B779]/30 bg-[#151014]/60 text-[#D9B779] hover:bg-[#350B20]"
                }`}
              >
                <Mic className="h-3.5 w-3.5" />
                <span>{micActive ? "Listening for Blow..." : "Blow via Mic (Optional)"}</span>
              </button>
            </div>
          ) : (
            /* Granted Wish Animation Card */
            <div className="rounded-3xl border border-[#D9B779]/50 bg-gradient-to-b from-[#350B20]/90 to-[#1f121a]/95 p-8 max-w-lg shadow-2xl backdrop-blur-xl animate-fade-in space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D9B779]/20 text-[#D9B779] border border-[#D9B779]/40">
                <Heart className="h-7 w-7 fill-[#D9B779]" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-light text-[#FFF7EF] text-glow-gold">
                {cake.wishGrantedTitle}
              </h3>

              <p className="font-editorial text-lg italic text-[#F5C8D5]">
                &ldquo;{cake.wishGrantedMessage}&rdquo;
              </p>

              <div className="pt-2">
                <button
                  onClick={handleRelight}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/40 bg-white/5 px-6 py-2.5 text-xs uppercase tracking-widest text-[#D9B779] transition hover:bg-white/10 hover:border-[#D9B779]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{cake.relightButtonText}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
