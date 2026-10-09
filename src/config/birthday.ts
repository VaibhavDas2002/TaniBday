export interface MemoryItem {
  id: string;
  image: string;
  title: string;
  date?: string;
  location?: string;
  caption: string;
  rotation?: number; // degrees for polaroid tilt
  tag?: string;
}

export interface VideoMemoryItem {
  id: string;
  title: string;
  date?: string;
  caption: string;
  poster: string;
  videoUrl?: string; // Optional local/remote MP4/WebM URL
  duration?: string;
}

export interface ConstellationPoint {
  id: string;
  title: string;
  shortText: string;
  detail: string;
  position: [number, number, number]; // 3D coordinates [x, y, z]
  color?: string;
}

export interface BengaliPoem {
  id: string;
  poet: string;
  poetBengali: string;
  title: string;
  titleBengali: string;
  verses: string[];
  transliteration?: string;
  englishMeaning: string;
  context: string;
  calligraphySnippet: string;
  theme: string;
}

export interface BirthdayConfig {
  recipient: {
    name: string;
    fullName: string;
    nickname: string;
    nameBengali?: string;
    fullNameBengali?: string;
    birthdayDate: string; // YYYY-MM-DD
  };
  visualIdentity: {
    colors: {
      burgundyMidnight: string;
      roseDeep: string;
      blushRomantic: string;
      goldChampagne: string;
      ivoryWarm: string;
      blackSoft: string;
    };
  };
  audio: {
    musicTitle: string;
    musicArtist: string;
    musicUrl?: string; // Optional custom MP3/AAC in /public/audio/
    enableSoundEffects: boolean;
  };
  openingScene: {
    eyebrow: string;
    subtitle: string;
    interactionPrompt: string;
    revealedMessage: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaText: string;
    heroImage: string;
  };
  memories: {
    sectionTitle: string;
    sectionSubtitle: string;
    description: string;
    items: MemoryItem[];
  };
  videos: {
    sectionTitle: string;
    sectionSubtitle: string;
    description: string;
    items: VideoMemoryItem[];
  };
  constellation: {
    sectionTitle: string;
    sectionSubtitle: string;
    instructions: string;
    points: ConstellationPoint[];
  };
  letter: {
    sectionTitle: string;
    sectionSubtitle: string;
    buttonLabel: string;
    date: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  cake: {
    sectionTitle: string;
    prompt: string;
    actionText: string;
    wishGrantedTitle: string;
    wishGrantedMessage: string;
    relightButtonText: string;
  };
  finale: {
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    personalMessage: string;
    signature: string;
    finaleImage: string;
    replayButtonText: string;
  };
  easterEgg: {
    hint: string;
    title: string;
    message: string;
  };
  poetry: {
    sectionTitle: string;
    sectionSubtitle: string;
    bengaliHeading: string;
    description: string;
    poems: BengaliPoem[];
  };
}

export const birthdayConfig: BirthdayConfig = {
  recipient: {
    name: "Tani",
    fullName: "Tania Bandhapadhyay",
    nickname: "Tani",
    nameBengali: "তানি",
    fullNameBengali: "তানিয়া বন্দ্যোপাধ্যায়",
    birthdayDate: "2026-10-09", // Set your girlfriend's birthday date (YYYY-MM-DD)
  },
  visualIdentity: {
    colors: {
      burgundyMidnight: "#350B20",
      roseDeep: "#791F42",
      blushRomantic: "#F5C8D5",
      goldChampagne: "#D9B779",
      ivoryWarm: "#FFF7EF",
      blackSoft: "#151014",
    },
  },
  audio: {
    musicTitle: "Clair de Lune & Soft Strings",
    musicArtist: "Romantic Piano Suite",
    musicUrl: "/audio/romantic-ambient.mp3", // Place your MP3 in public/audio/romantic-ambient.mp3, or let the built-in ambient synthesizer play
    enableSoundEffects: true,
  },
  openingScene: {
    eyebrow: "TONIGHT IS ALL ABOUT YOU",
    subtitle: "To the girl who makes my world more beautiful...",
    interactionPrompt: "Tap to open your little universe",
    revealedMessage: "Welcome to your story, my love.",
  },
  hero: {
    badge: "A CELEBRATION OF YOU",
    titleLine1: "HAPPY BIRTHDAY,",
    titleLine2: "MY FAVORITE PERSON.",
    subtitle:
      "To the most enchanting soul I have ever known. Every second spent with you feels like poetry written in the stars.",
    ctaText: "ENTER YOUR LITTLE UNIVERSE ♥",
    heroImage: "/images/hero-portrait.jpg",
  },
  memories: {
    sectionTitle: "OUR MEMORIES",
    sectionSubtitle: "Moments Frozen in Warm Golden Light",
    description:
      "A collection of tiny moments, spontaneous laughter, quiet conversations, and all the days where I fell in love with you just a little bit more.",
    items: [
      {
        id: "mem-1",
        image: "/images/hero-portrait.jpg",
        title: "The Evening You Stole the Sunset",
        date: "September 14",
        location: "Paris Balcony",
        caption: "One of my favorite days. That smile still gets me every single time.",
        rotation: -2,
        tag: "Timeless",
      },
      {
        id: "mem-2",
        image: "/images/memory-sunset.jpg",
        title: "Barefoot by the Ocean",
        date: "July 22",
        location: "Sunset Coast",
        caption: "The sound of the waves and your laughter. A little moment I wish I could relive forever.",
        rotation: 3,
        tag: "Pure Joy",
      },
      {
        id: "mem-3",
        image: "/images/memory-roses.jpg",
        title: "Morning Garden Roses",
        date: "May 08",
        location: "Cotswold Path",
        caption: "You held those flowers and outshined every single one of them without even trying.",
        rotation: -1.5,
        tag: "Gentle Moments",
      },
      {
        id: "mem-4",
        image: "/images/memory-stargazing.jpg",
        title: "Whispers Under Fairy Lights",
        date: "November 19",
        location: "Under the Lantern Trees",
        caption: "And somehow, you keep making every memory warmer, richer, and brighter.",
        rotation: 2.5,
        tag: "Magic",
      },
      {
        id: "mem-5",
        image: "/images/memory-cafe.jpg",
        title: "Quiet Morning Coffee",
        date: "December 04",
        location: "Little Corner Bistro",
        caption: "Just your eyes across the wooden table, steaming cappuccino, and nowhere else I’d rather be.",
        rotation: -3,
        tag: "Heartfelt",
      },
      {
        id: "mem-6",
        image: "/images/finale-portrait.jpg",
        title: "A Glimpse of Forever",
        date: "Special Keepsake",
        location: "City Twilight",
        caption: "If the universe gave me a million lifetimes, I would choose you in every single one.",
        rotation: 1.5,
        tag: "Always",
      },
    ],
  },
  videos: {
    sectionTitle: "CINEMATIC MEMORIES",
    sectionSubtitle: "Motion, Laughter & Moving Pictures",
    description:
      "Some moments are too alive for still photographs. Press play to step back inside our favorite memories.",
    items: [
      {
        id: "vid-1",
        title: "The Golden Hour Serenade",
        date: "Summer Romance",
        caption: "That day we laughed until our stomachs hurt and the sun melted into warm rose gold.",
        poster: "/images/memory-stargazing.jpg",
        videoUrl: "", // Leave blank to show the interactive luxury cinematic player or supply /videos/memory-1.mp4
        duration: "0:45",
      },
      {
        id: "vid-2",
        title: "Coastal Breeze & Endless Smiles",
        date: "Autumn Getaway",
        caption: "The candid moments when you didn't know I was recording your pure, radiant happiness.",
        poster: "/images/memory-sunset.jpg",
        videoUrl: "",
        duration: "1:12",
      },
    ],
  },
  constellation: {
    sectionTitle: "THINGS I ADORE ABOUT YOU",
    sectionSubtitle: "An Interactive Constellation of Why You Are So Special",
    instructions: "Click any glowing star in our constellation to uncover a reason my heart chooses you.",
    points: [
      {
        id: "star-1",
        title: "Your Smile",
        shortText: "It lights up everything around you.",
        detail:
          "The way your eyes crinkle at the corners, the effortless warmth that can instantly melt away the hardest day. Your smile is my favorite visual in the entire world.",
        position: [-2.2, 1.4, 0.5],
        color: "#F5C8D5",
      },
      {
        id: "star-2",
        title: "The Way You Care",
        shortText: "Your gentle, boundless empathy.",
        detail:
          "You love with your whole being. The tenderness you give to the people around you, the way you remember the little details others overlook—it reveals the golden purity of your heart.",
        position: [1.8, 1.8, -0.4],
        color: "#D9B779",
      },
      {
        id: "star-3",
        title: "Your Beautiful Mind",
        shortText: "Curious, witty, and brilliantly thoughtful.",
        detail:
          "I could talk to you for ten hours straight about everything and nothing. Your curiosity, your perspective on life, and your sharp wit keep me constantly inspired.",
        position: [2.5, -0.8, 0.8],
        color: "#FFF7EF",
      },
      {
        id: "star-4",
        title: "Your Infectious Laugh",
        shortText: "The sweetest melody I know.",
        detail:
          "Nothing brings me deeper joy than hearing you laugh completely unguarded. It is intoxicating, genuine, and the sweetest sound in any room.",
        position: [-1.5, -1.6, -0.3],
        color: "#F5C8D5",
      },
      {
        id: "star-5",
        title: "Comfort in Your Presence",
        shortText: "With you, I am always home.",
        detail:
          "In a loud and chaotic world, being near you feels like stepping into peaceful sanctuary. You make silence comfortable and existence serene.",
        position: [0.0, 2.2, 0.2],
        color: "#D9B779",
      },
      {
        id: "star-6",
        title: "The Little Quirks",
        shortText: "The magic that is uniquely you.",
        detail:
          "The cute faces you make when you are thinking, the passionate way you explain things you love, the tiny habits that make you irreplaceable.",
        position: [-0.4, -0.5, 1.6],
        color: "#FFF7EF",
      },
      {
        id: "star-7",
        title: "Your Resilient Grace",
        shortText: "Strength wrapped in softness.",
        detail:
          "Even when things are challenging, you carry yourself with unmatched grace and bravery. I admire you more than words can convey.",
        position: [0.9, -1.9, -1.0],
        color: "#F5C8D5",
      },
      {
        id: "star-8",
        title: "Just Being You",
        shortText: "Simply the most wonderful person I know.",
        detail:
          "You don't have to try to be extraordinary; you just are. Thank you for being the highlight of my universe.",
        position: [-2.4, 0.2, -1.2],
        color: "#D9B779",
      },
    ],
  },
  letter: {
    sectionTitle: "A LITTLE SOMETHING FROM MY HEART",
    sectionSubtitle: "An Unfolding Digital Love Letter",
    buttonLabel: "READ MY LETTER",
    date: "On your special birthday",
    salutation: "Happy Birthday, Tania (my dearest Tani).",
    paragraphs: [
      "If I could give you one thing today, it would be the ability to see yourself through my eyes, even for just a moment.",
      "Maybe then you would understand how special you are, how your smile can change an ordinary day, and how the smallest moments with you can become some of my favorite memories.",
      "Today is about celebrating you — your heart, your dreams, your laughter, and all the beautiful things that make you who you are.",
      "I hope this new chapter brings you countless reasons to smile, the courage to chase every dream, and all the happiness your heart can hold.",
      "Thank you for being you. Happy Birthday, Tania. You deserve a world full of love.",
    ],
    closing: "Forever cheering for you, ❤️",
    signature: "Yours Always, Vaibhav",
  },
  cake: {
    sectionTitle: "THE MAGICAL BIRTHDAY CAKE",
    prompt: "MAKE A WISH, BEAUTIFUL.",
    actionText: "Tap the candle flame to blow it out",
    wishGrantedTitle: "✨ A WISH SENT TO THE STARS ✨",
    wishGrantedMessage: "May all your beautiful wishes find their way to you.",
    relightButtonText: "MAKE ANOTHER WISH",
  },
  finale: {
    headlineLine1: "THE WORLD IS LUCKIER",
    headlineLine2: "BECAUSE YOU'RE IN IT.",
    subheadline: "Happy Birthday, my love. ❤️",
    personalMessage:
      "Today marks another year of you bringing warmth, elegance, and beauty into this world. I am so lucky to walk beside you, to love you, and to celebrate the masterpiece that you are. May your year ahead be as breathtaking and unforgettable as you are to me.",
    signature: "With all my love & endless devotion,",
    finaleImage: "/images/finale-portrait.jpg",
    replayButtonText: "REPLAY THE UNIVERSE",
  },
  easterEgg: {
    hint: "P.S. Look closely for a hidden golden key",
    title: "A SECRET CONFESSION ❤️",
    message:
      "You found the secret note! In case I didn't say it enough today: meeting you was the single luckiest turning point of my life. I fall more in love with your mind, your kindness, and your heart every sunrise. Happy Birthday, gorgeous!",
  },
  poetry: {
    sectionTitle: "BENGALI ROMANTIC POETRY",
    sectionSubtitle: "বাঙালির চিরন্তন প্রেমের কবিতা",
    bengaliHeading: "কাব্যলোকের কথামালা — রবীন্দ্রনাথ, জীবনানন্দ ও শরৎচন্দ্র",
    description:
      "Some emotions find their truest home in the timeless resonance of Bengali literature. Dedicated to you through the immortal verses of Bengal's greatest poets.",
    poems: [
      {
        id: "poem-tagore-1",
        poet: "Rabindranath Tagore",
        poetBengali: "রবীন্দ্রনাথ ঠাকুর",
        title: "Tumi Rabe Nirobe",
        titleBengali: "তুমি রবে নীরবে",
        verses: [
          "তুমি রবে নীরবে হৃদয়ে মম",
          "নিবিড় নিভৃত পূর্ণিমা নিশায়—",
          "মম জীবনে মম যমুনে,",
          "মম রজনীগন্ধায়...",
          "পূর্ণ চন্দ্রে যেমন হাসে আকাশ,",
          "তেমনি হাসিয়া রহিবে হৃদয়ে মম।"
        ],
        transliteration: "Tumi rabe nirobe hridoye momo, nibiro nibhrito purnima nishay...",
        englishMeaning:
          "In quiet serenity you shall forever abide within my soul, like the radiant full moon gracing a silent, peaceful night. In every quiet stream, in the fragrant blooms of my existence, you remain.",
        context: "From Geetobitan — the timeless Bengali anthem of quiet, eternal devotion.",
        calligraphySnippet: "তুমি রবে নীরবে হৃদয়ে মম",
        theme: "Eternal Devotion",
      },
      {
        id: "poem-tagore-2",
        poet: "Rabindranath Tagore",
        poetBengali: "রবীন্দ্রনাথ ঠাকুর",
        title: "Amar Poran Jaha Chay",
        titleBengali: "আমার পরাণ যাহা চায়",
        verses: [
          "আমার পরাণ যাহা চায়, তুমি তাই, তুমি তাই গো—",
          "তোমা ছাড়া আর এ জগতে মোর কেহ নাই, কিছু নাই গো।",
          "তুমি সুখ যদি নাহি পাও, যাও সুখের সন্ধানে যাও—",
          "আমি তোমারে পেয়েছি হৃদয়মাঝে, আর কিছু নাহি চাই গো..."
        ],
        transliteration: "Amar poran jaha chay, tumi tai, tumi tai go...",
        englishMeaning:
          "All that my soul longs for, you are that, only you. In this vast world, my heart recognizes no other. Having held you in the sanctity of my soul, I need nothing more from destiny.",
        context: "Tagore's declaration of pure, unconditional, self-transcending love.",
        calligraphySnippet: "আমার পরাণ যাহা চায়, তুমি তাই",
        theme: "Soulful Longing",
      },
      {
        id: "poem-jibanananda",
        poet: "Jibanananda Das",
        poetBengali: "জীবনানন্দ দাশ",
        title: "Banalata Sen",
        titleBengali: "বনলতা সেন",
        verses: [
          "হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে,",
          "সিংহল সমুদ্র থেকে নিশীথের অন্ধকারে মালয় সাগরে...",
          "চুল তার কবেকার অন্ধকার বিদিশার নিশা,",
          "মুখ তার শ্রাবস্তীর কারুকার্য; অতিদূর সমুদ্রের 'পর",
          "হাল ভেঙে যে-নাবিক হারায়েছে দিশা...",
          "তেমনি দেখেছি তারে অন্ধকারে; বলেছে সে, 'এতদিন কোথায় ছিলেন?'",
          "পাখির নীড়ের মতো চোখ তুলে নাটোরের বনলতা সেন।"
        ],
        transliteration: "Hajar bochhor dhore ami poth hatitechhi prithibir pothe...",
        englishMeaning:
          "For a thousand weary years I traversed the pathways of the earth, from the seas of Ceylon to dark Malayan waves. And through that exhaustion, she looked up with eyes soft as a bird's nest and asked with tender warmth, 'Where have you been all this time?'",
        context: "Widely regarded as the pinnacle of romantic imagery and poetic solace in Bengali literature.",
        calligraphySnippet: "পাখির নীড়ের মতো চোখ তুলে নাটোরের বনলতা সেন",
        theme: "Sanctuary & Serenity",
      },
      {
        id: "poem-saratchandra",
        poet: "Sarat Chandra Chattopadhyay",
        poetBengali: "শরৎচন্দ্র চট্টোপাধ্যায়",
        title: "Prem O Atmar Bandhan",
        titleBengali: "প্রেম ও আত্মার বন্ধন",
        verses: [
          "ভালোবাসা মানে শুধু কাউকে নিজের করে পাওয়ার নাম নয়—",
          "কাউকে নিজের সমগ্র সত্তা দিয়ে ভালোবাসার নাম,",
          "তার ভালো থাকায় নিজের সুখকে খুঁজে পাওয়ার নামই ভালোবাসা।",
          "যদি এই একটি জন্মে তোমায় সম্পূর্ণ করে নাও পাই,",
          "পরজন্মের সকল প্রার্থনায় প্রথম নামটা তোমারই লেখা থাকবে।"
        ],
        transliteration: "Bhalobasha mane shudhu kauke nijer kore paowar naam noy...",
        englishMeaning:
          "Love is not merely the desire to possess; it is the grace to love with every breath of your being, finding joy simply because they exist and smile. Distance and time have no power over souls entwined by fate.",
        context: "The profound emotional philosophy of unconditional devotion inspired by Sarat Chandra's timeless classics.",
        calligraphySnippet: "ভালোবাসা মানে কাউকে নিজের সমগ্র সত্তা দিয়ে ভালোবাসা",
        theme: "Unconditional Bond",
      },
      {
        id: "poem-nazrul",
        poet: "Kazi Nazrul Islam",
        poetBengali: "কাজী নজরুল ইসলাম",
        title: "Mor Priya Hobe Esho Rani",
        titleBengali: "মোর প্রিয়া হবে এসো রাণী",
        verses: [
          "মোর প্রিয়া হবে এসো রাণী, দেব খোঁপায় তারার ফুল—",
          "কর্ণে দোলাব তৃতীয়া চাঁদের রূপালী ঝুমকো দুল।",
          "মেঘের নীলিমায় পরাব তোমায় মায়াবী আলোর সাজ,",
          "ভালোবাসার সুরধুনী তীরে তোমায় বরণ করিব আজ..."
        ],
        transliteration: "Mor priya hobe esho rani, debo khopay tarar phool...",
        englishMeaning:
          "Come, be my queen, my adoration — I shall weave the stars of heaven into your hair, and suspend the silver crescent moon as jewel earrings upon your ear.",
        context: "Nazrul's celebrated ode of lyrical passion and romantic grandeur.",
        calligraphySnippet: "মোর প্রিয়া হবে এসো রাণী, দেব খোঁপায় তারার ফুল",
        theme: "Romantic Majesty",
      },
      {
        id: "poem-sunil",
        poet: "Sunil Gangopadhyay",
        poetBengali: "সুনীল গঙ্গোপাধ্যায়",
        title: "Tomake Bhalobeshe",
        titleBengali: "তোমাকে ভালোবেসে",
        verses: [
          "তোমাকে ভালোবেসে আমি মেঘ হতে পারি,",
          "বৃষ্টি হয়ে ভিজিয়ে দিতে পারি তোমার একলা দুপুর।",
          "তোমাকে ভালোবেসে এই জীবন এক অমর কবিতা,",
          "প্রতিটি নিঃশ্বাসে শুধু তোমারই নুপূরের সুর..."
        ],
        transliteration: "Tomake bhalobeshe ami megh hote pari...",
        englishMeaning:
          "Loving you, I could become the gentle summer cloud, the soothing rain embracing your quiet afternoons. Loving you, this life has transformed into an immortal poem.",
        context: "Modern Bengali romantic poetry celebrating intimacy and delicate presence.",
        calligraphySnippet: "তোমাকে ভালোবেসে এই জীবন এক অমর কবিতা",
        theme: "Poetic Romance",
      },
    ],
  },
};
