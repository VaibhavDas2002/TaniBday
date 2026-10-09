"use client";

import React, { useState, useEffect } from "react";
import { Cake, Sparkles } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    isBirthdayToday: boolean;
  } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(birthdayConfig.recipient.birthdayDate);
      const now = new Date();

      // Check if same month and day
      const isToday =
        now.getMonth() === targetDate.getMonth() &&
        now.getDate() === targetDate.getDate();

      if (isToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, isBirthdayToday: true });
        return;
      }

      // If date has passed this year, count down to next year
      const targetThisYear = new Date(
        now.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate()
      );

      if (targetThisYear.getTime() < now.getTime()) {
        targetThisYear.setFullYear(now.getFullYear() + 1);
      }

      const diff = targetThisYear.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      setTimeLeft({ days, hours, minutes, isBirthdayToday: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B779]/30 bg-[#350B20]/50 px-4 py-1 text-xs text-[#D9B779] backdrop-blur-md">
      {timeLeft.isBirthdayToday ? (
        <span className="flex items-center gap-1.5 font-semibold text-[#FFF7EF] animate-pulse">
          <Cake className="h-3.5 w-3.5 text-[#F5C8D5]" />
          TODAY IS YOUR SPECIAL DAY! 🎂
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-[#D9B779]" />
          Countdown: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m until your birthday!
        </span>
      )}
    </div>
  );
}
