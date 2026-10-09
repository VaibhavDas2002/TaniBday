"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Film, Maximize2, Sparkles } from "lucide-react";
import { birthdayConfig, VideoMemoryItem } from "@/config/birthday";
import { audioManager } from "@/utils/audio";

export default function VideoMemories() {
  const [activeVideo, setActiveVideo] = useState<VideoMemoryItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const items = birthdayConfig.videos.items;

  const handleSelectVideo = (item: VideoMemoryItem) => {
    audioManager.playStarChime();
    setActiveVideo(item);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!videoRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) {
      setIsMuted(!isMuted);
      return;
    }
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#151014] px-6 py-24 lg:px-16 overflow-hidden border-t border-[#D9B779]/15">
      {/* Background cinematic vignette */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#151014]/60 to-[#151014]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#791F42]/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/30 bg-[#350B20]/40 px-4 py-1 text-xs tracking-[0.25em] text-[#D9B779] uppercase backdrop-blur-md">
            <Film className="h-3.5 w-3.5 text-[#D9B779]" />
            <span>{birthdayConfig.videos.sectionTitle}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFF7EF]">
            {birthdayConfig.videos.sectionSubtitle}
          </h2>

          <p className="text-sm sm:text-base text-[#FFF7EF]/75 font-light leading-relaxed">
            {birthdayConfig.videos.description}
          </p>
        </div>

        {/* Featured Cinematic Theater Frame */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#D9B779]/35 bg-[#1a0f17] p-2 sm:p-4 shadow-2xl shadow-black/90">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
            {activeVideo && activeVideo.videoUrl ? (
              <video
                ref={videoRef}
                src={activeVideo.videoUrl}
                poster={activeVideo.poster}
                playsInline
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                className="h-full w-full object-cover"
              />
            ) : (
              /* High-End Cinematic Interactive Poster Player */
              <div className="relative h-full w-full">
                <Image
                  src={activeVideo ? activeVideo.poster : items[0].poster}
                  alt={activeVideo ? activeVideo.title : items[0].title}
                  fill
                  className="object-cover filter contrast-[1.05]"
                  priority
                />

                {/* Film Overlay Shader */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <button
                    onClick={togglePlay}
                    aria-label="Play video memory"
                    className="group relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-2 border-[#D9B779] bg-[#791F42]/80 text-[#FFF7EF] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#FFF7EF] hover:bg-[#791F42]"
                  >
                    <span className="absolute -inset-2 rounded-full border border-[#D9B779]/40 animate-ping opacity-60" />
                    {isPlaying ? (
                      <Pause className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFF7EF]" />
                    ) : (
                      <Play className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFF7EF] translate-x-0.5" />
                    )}
                  </button>

                  <h3 className="font-display mt-6 text-2xl sm:text-3xl text-[#FFF7EF] font-light">
                    {activeVideo ? activeVideo.title : items[0].title}
                  </h3>
                  <p className="font-editorial mt-2 max-w-md text-sm sm:text-base italic text-[#F5C8D5]">
                    &ldquo;{activeVideo ? activeVideo.caption : items[0].caption}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* Cinematic Minimal Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 to-transparent p-4 sm:p-6 flex flex-col gap-2">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#791F42] to-[#D9B779] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#FFF7EF]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="hover:text-[#D9B779] transition"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="hover:text-[#D9B779] transition"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <span className="text-white/60">
                    {activeVideo ? activeVideo.duration || "Cinematic Film" : items[0].duration || "Cinematic Film"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-editorial italic text-xs text-[#D9B779]">
                    Cinematic Memory Reel
                  </span>
                  <button
                    onClick={() => {
                      if (videoRef.current && videoRef.current.requestFullscreen) {
                        videoRef.current.requestFullscreen();
                      }
                    }}
                    className="hover:text-[#D9B779] transition"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist Thumbnails */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((vid) => {
            const isCurrent = activeVideo?.id === vid.id || (!activeVideo && vid.id === items[0].id);

            return (
              <div
                key={vid.id}
                onClick={() => handleSelectVideo(vid)}
                className={`group relative flex items-center gap-4 cursor-pointer rounded-2xl border p-3 transition-all duration-300 hover:scale-[1.02] ${
                  isCurrent
                    ? "border-[#D9B779] bg-[#350B20]/60 shadow-lg shadow-[#791F42]/30"
                    : "border-[#D9B779]/20 bg-[#1f121a]/50 hover:border-[#D9B779]/50"
                }`}
              >
                <div className="relative aspect-video w-32 flex-none overflow-hidden rounded-xl bg-black">
                  <Image
                    src={vid.poster}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition">
                    <Play className="h-5 w-5 text-[#FFF7EF]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#D9B779]">
                    <span>{vid.date || "Film"}</span>
                    {vid.duration && <span>• {vid.duration}</span>}
                  </div>
                  <h4 className="font-display text-base font-light text-[#FFF7EF] line-clamp-1">
                    {vid.title}
                  </h4>
                  <p className="font-editorial text-xs italic text-[#FFF7EF]/70 line-clamp-1">
                    {vid.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-[#FFF7EF]/50">
          <Sparkles className="inline h-3.5 w-3.5 text-[#D9B779] mr-1.5" />
          <span>Place your personal MP4/WebM files in <code className="text-[#D9B779]">public/videos/</code> to play real footage</span>
        </div>
      </div>
    </section>
  );
}
