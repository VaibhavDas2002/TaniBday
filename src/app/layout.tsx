import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Manrope,
  Great_Vibes,
  Noto_Serif_Bengali,
  Hind_Siliguri,
} from "next/font/google";
import "./globals.css";
import { birthdayConfig } from "@/config/birthday";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vibes",
  display: "swap",
});

const notoBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali-serif",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://happy-birthday-tani.vercel.app"),
  title: `Happy Birthday, ${birthdayConfig.recipient.fullName} (${birthdayConfig.recipient.nickname}) | An Unforgettable Celebration`,
  description: `A cinematic 3D romantic universe and digital love letter crafted exclusively for ${birthdayConfig.recipient.fullName} (${birthdayConfig.recipient.nickname}). Happy Birthday my favorite person.`,
  openGraph: {
    title: `Happy Birthday, ${birthdayConfig.recipient.fullName} (${birthdayConfig.recipient.nickname}) ❤️`,
    description: `A cinematic 3D romantic universe crafted with all my love for ${birthdayConfig.recipient.fullName}.`,
    images: ["/images/tani-traditional-saree.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${manrope.variable} ${greatVibes.variable} ${notoBengali.variable} ${hindSiliguri.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#151014] text-[#FFF7EF] overflow-x-hidden selection:bg-[#791F42] selection:text-[#FFF7EF]">
        {children}
      </body>
    </html>
  );
}
