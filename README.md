# ✨ An Unforgettable Birthday Experience ❤️
### A Premium, Cinematic, 3D Animated Birthday Universe for My Girlfriend

This is a luxury, cinematic, 3D interactive birthday website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js**, **React Three Fiber**, **GSAP**, **Lenis Smooth Scroll**, **Framer Motion**, and the **Web Audio API**.

---

## 🎨 Art Direction & Visual Identity
- **Midnight Burgundy:** `#350B20`
- **Deep Rose:** `#791F42`
- **Romantic Blush:** `#F5C8D5`
- **Champagne Gold:** `#D9B779`
- **Warm Ivory:** `#FFF7EF`
- **Soft Black:** `#151014`

---

## 🌟 Interactive Chapters & Features

1. **Opening Scene — The Birthday Reveal:**
   - Full-screen burgundy atmosphere with twinkling golden particles.
   - Ambient sound permission prompt ("Experience with Sound" or "Enter quietly").
   - Rotating 3D crystal heart surrounded by fluttering rose petals.
   - Interaction prompt: *"Tap to open your little universe"*.
   - Tap initiates a camera zoom, shower of rose petals, heart dissolution, and reveals the welcome message.

2. **Hero Section — Her Birthday, Her Universe:**
   - Enormous editorial typography: *"HAPPY BIRTHDAY, MY FAVORITE PERSON."*
   - Interactive 3D glass heart with orbiting golden ring and cursor tilt physics.
   - Luxury framed portrait of your girlfriend with romantic golden hour bloom.
   - *"ENTER YOUR LITTLE UNIVERSE ♥"* CTA.

3. **Our Memories — Storybook Gallery & Lightbox:**
   - Horizontal draggable/scrollable carousel with polaroid tilts.
   - Blur-to-focus reveal on cards.
   - Lightbox inspection mode with captions, dates, locations, and keyboard navigation (`←`, `→`, `ESC`).

4. **Cinematic Video Memories:**
   - Widescreen film theater player with custom minimal controls (Play, Pause, Mute, Progress bar, Fullscreen).
   - Video playlist with poster frames.

5. **Things I Adore About You — 3D Love Constellation:**
   - Interactive 3D celestial star sphere with golden connecting lines.
   - Clickable stars triggering celestial chime sound effects and revealing personal reasons.
   - Quick star pill selectors and navigation arrows.

6. **A Personal Letter — Emotional Centerpiece:**
   - Sealed wax envelope with pulsating golden heart.
   - Unfolds into a warm ivory paper letter with elegant serif typography and handwritten signature.

7. **The Magical Birthday Cake:**
   - 3D multi-tier velvet cake with gold frosting pearls.
   - Glowing candle with flickering flame.
   - Tap or blow into microphone (optional) to extinguish the flame.
   - Plays candle blowout whoosh SFX and triggers confetti and wish animation (*"✨ A WISH SENT TO THE STARS ✨"*).
   - Relight button to make another wish.

8. **The Final Surprise & Fireworks:**
   - *"THE WORLD IS LUCKIER BECAUSE YOU'RE IN IT."*
   - Grand rose petal and gold confetti explosion.
   - Centerpiece photo keepsake.
   - *"REPLAY THE UNIVERSE"* button to experience everything again from the start.

9. **Romantic Audio Suite:**
   - Built-in procedural Web Audio API romantic piano/ambient synthesizer that plays romantic chords out of the box with zero external downloads required!
   - Can also play your custom MP3 placed at `public/audio/romantic-ambient.mp3`.
   - Synthesized sound effects for star chimes, sparkles, candle blowout, and fireworks.
   - Floating audio pill with animated equalizer bars.

10. **Secret Easter Egg:**
    - Discreet golden key icon in the bottom-left corner that opens a secret romantic confession modal.

---

## 🛠️ How to Personalize the Website

All personal content, girlfriend's name, dates, photos, messages, constellation stars, and letter are centrally configured in:

📁 `src/config/birthday.ts`

### 1. Change Her Name & Birthday Date
Open `src/config/birthday.ts` and edit:
```ts
recipient: {
  name: "Tani", // Change to her name or nickname
  nickname: "My Beautiful Tani",
  birthdayDate: "2026-10-09", // YYYY-MM-DD
}
```

### 2. Replace Photographs
Place your photos in `public/images/`:
- `public/images/hero-portrait.jpg` — Hero section portrait
- `public/images/memory-sunset.jpg` — Memory 1
- `public/images/memory-roses.jpg` — Memory 2
- `public/images/memory-stargazing.jpg` — Memory 3
- `public/images/memory-cafe.jpg` — Memory 4
- `public/images/finale-portrait.jpg` — Final surprise portrait

You can add or remove memories in `birthdayConfig.memories.items` in `src/config/birthday.ts`.

### 3. Add Personal Videos
Place MP4 or WebM video files in:
`public/videos/memory-1.mp4`
Then in `src/config/birthday.ts`, set:
```ts
videoUrl: "/videos/memory-1.mp4"
```

### 4. Edit the Love Letter
In `src/config/birthday.ts`, edit `birthdayConfig.letter`:
```ts
letter: {
  sectionTitle: "A LITTLE SOMETHING FROM MY HEART",
  date: "On your special birthday",
  salutation: "Happy Birthday, my love.",
  paragraphs: [
    "Your personalized paragraph 1...",
    "Your personalized paragraph 2...",
  ],
  closing: "Forever cheering for you, ❤️",
  signature: "Yours Always, Vaibhav",
}
```

### 5. Add Background Music
To use a specific romantic song or instrumental track, place an MP3 at:
`public/audio/romantic-ambient.mp3`
If no MP3 is present, the website automatically plays the built-in procedural Web Audio romantic synthesizer.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Next.js will automatically detect the settings (`Framework Preset: Next.js`).
5. Click **Deploy**.
6. Share the link with your girlfriend! ❤️
"# TaniBday" 
