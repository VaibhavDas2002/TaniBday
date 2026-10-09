"use client";

import React, { useState, useEffect } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";
import { audioManager } from "@/utils/audio";
import { birthdayConfig } from "@/config/birthday";

interface AudioControllerProps {
  autoStartTrigger?: boolean;
}

export default function AudioController({ autoStartTrigger }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (autoStartTrigger && !isPlaying) {
      audioManager.toggleAmbient(true, birthdayConfig.audio.musicUrl);
      setIsPlaying(true);
    }
  }, [autoStartTrigger, isPlaying]);

  const toggleMusic = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    audioManager.toggleAmbient(nextState, birthdayConfig.audio.musicUrl);
    if (nextState) {
      audioManager.playSparkle();
    }
  };

  const toggleSfx = () => {
    const nextSfx = !sfxEnabled;
    setSfxEnabled(nextSfx);
    audioManager.setSoundEffectsEnabled(nextSfx);
    if (nextSfx) {
      audioManager.playStarChime();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Mini details dropdown when expanded */}
      {isExpanded && (
        <div className="mb-1 rounded-2xl border border-[#D9B779]/30 bg-[#151014]/90 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#791F42]/40 text-[#D9B779]">
              <Music className={`h-5 w-5 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D9B779] uppercase">Romantic Audio Suite</p>
              <p className="font-display text-sm text-[#FFF7EF]">{birthdayConfig.audio.musicTitle}</p>
              <p className="text-xs text-[#F5C8D5]/70">{birthdayConfig.audio.musicArtist}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[#FFF7EF]/10 pt-3 text-xs text-[#FFF7EF]/80">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#D9B779]" /> Sound Effects
            </span>
            <button
              onClick={toggleSfx}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition ${
                sfxEnabled
                  ? "bg-[#D9B779]/20 text-[#D9B779] border border-[#D9B779]/40"
                  : "bg-white/5 text-white/50 border border-white/10"
              }`}
            >
              {sfxEnabled ? "ON" : "MUTED"}
            </button>
          </div>
        </div>
      )}

      {/* Main floating controller pill */}
      <div className="flex items-center gap-1 rounded-full border border-[#D9B779]/30 bg-[#151014]/80 p-1.5 shadow-xl backdrop-blur-md transition-all hover:border-[#D9B779]/60">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Mute music" : "Play music"}
          className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium transition-all ${
            isPlaying
              ? "bg-[#791F42] text-[#FFF7EF] shadow-md shadow-[#791F42]/30"
              : "bg-white/5 text-[#D9B779] hover:bg-white/10"
          }`}
        >
          {isPlaying ? (
            <>
              {/* Equalizer animation */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-[#D9B779] rounded-full animate-bounce h-3" style={{ animationDelay: "0ms" }} />
                <span className="w-0.5 bg-[#D9B779] rounded-full animate-bounce h-2" style={{ animationDelay: "150ms" }} />
                <span className="w-0.5 bg-[#D9B779] rounded-full animate-bounce h-3.5" style={{ animationDelay: "300ms" }} />
                <span className="w-0.5 bg-[#D9B779] rounded-full animate-bounce h-1.5" style={{ animationDelay: "450ms" }} />
              </div>
              <span className="hidden sm:inline">Playing Soundtrack</span>
            </>
          ) : (
            <>
              <VolumeX className="h-4 w-4 text-[#D9B779]" />
              <span className="hidden sm:inline">Music Muted</span>
            </>
          )}
        </button>

        {/* Quick expand/info toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Sound settings"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#D9B779]/80 transition hover:bg-white/10 hover:text-[#D9B779]"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
