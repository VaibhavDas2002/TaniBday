// Web Audio API romantic soundscape & effects synthesizer

class AudioManager {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private ambientTimer: NodeJS.Timeout | null = null;
  private chordIndex = 0;
  private soundEffectsEnabled = true;
  private bgAudioElement: HTMLAudioElement | null = null;

  private initContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setSoundEffectsEnabled(enabled: boolean) {
    this.soundEffectsEnabled = enabled;
  }

  // Play a soft high celestial star chime
  public playStarChime(freqMultiplier = 1) {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      const baseFreq = freqs[Math.floor(Math.random() * freqs.length)] * freqMultiplier;

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.8);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play a delicate sparkle effect (3 rapid ascending notes)
  public playSparkle() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const notes = [880, 1174.66, 1760];
      notes.forEach((freq, i) => {
        const now = ctx.currentTime + i * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      });
    } catch {
      // Ignored
    }
  }

  // Play candle blowout whoosh + sparkle
  public playCandleBlow() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Soft wind noise
      const bufferSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.7);
      filter.Q.value = 3;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.8);

      // Delicate bell toll after blow
      setTimeout(() => {
        this.playStarChime(1.2);
      }, 350);
    } catch {
      // Ignored
    }
  }

  // Grand celebratory petal harp cascade
  public playCelebrationCascade() {
    if (!this.soundEffectsEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const chords = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
      chords.forEach((freq, idx) => {
        const now = ctx.currentTime + idx * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      });
    } catch {
      // Ignored
    }
  }

  // Ambient Romantic Arpeggio synthesizer loop (Plays soothing Clair de lune style chords)
  public startAmbientMelody(customUrl?: string) {
    if (this.isAmbientPlaying) return;
    this.isAmbientPlaying = true;

    // Check if custom MP3 exists and works
    if (customUrl && typeof Audio !== "undefined") {
      try {
        if (!this.bgAudioElement) {
          this.bgAudioElement = new Audio(customUrl);
          this.bgAudioElement.loop = true;
          this.bgAudioElement.volume = 0.35;
        }
        const promise = this.bgAudioElement.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // If custom audio fails (e.g. 404), fall back to beautiful procedural synthesizer!
            this.startProceduralAmbient();
          });
          return;
        }
      } catch {
        // Fall back to procedural
      }
    }

    this.startProceduralAmbient();
  }

  private startProceduralAmbient() {
    const ctx = this.initContext();
    if (!ctx) return;

    // Chord progressions: Romantic Fmaj9, Cmaj7, Am9, Gsus4
    const chords = [
      [174.61, 261.63, 329.63, 392.0, 440.0],  // F maj9
      [130.81, 196.0, 261.63, 329.63, 392.0],  // C maj9
      [110.0, 164.81, 220.0, 261.63, 329.63],  // Am9
      [98.0, 146.83, 196.0, 293.66, 392.0],   // Gsus4
    ];

    const playChordStep = () => {
      if (!this.isAmbientPlaying) return;
      const currentChord = chords[this.chordIndex % chords.length];
      this.chordIndex++;

      currentChord.forEach((note, noteIdx) => {
        const offset = noteIdx * 0.25;
        const now = ctx.currentTime + offset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(note, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.4);
      });

      this.ambientTimer = setTimeout(playChordStep, 3800);
    };

    playChordStep();
  }

  public stopAmbientMelody() {
    this.isAmbientPlaying = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
    if (this.bgAudioElement) {
      try {
        this.bgAudioElement.pause();
      } catch {
        // Ignored
      }
    }
  }

  public toggleAmbient(shouldPlay: boolean, customUrl?: string) {
    if (shouldPlay) {
      this.startAmbientMelody(customUrl);
    } else {
      this.stopAmbientMelody();
    }
  }

  public getIsPlaying(): boolean {
    return this.isAmbientPlaying;
  }
}

export const audioManager = new AudioManager();
