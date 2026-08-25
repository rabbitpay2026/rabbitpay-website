import { Geist_Mono, Plus_Jakarta_Sans, Poppins } from "next/font/google";

/**
 * Self-hosted equivalents of the three Google Fonts the React site loaded.
 *
 * The React project loaded them TWICE — an `@import` in `index.css` (weights
 * 300–800 + Geist Mono) and a `<link>` in `index.html` (weights 400–800). The
 * `@import` set is the superset and the one Tailwind's font stack referenced,
 * so it is the set reproduced here. next/font self-hosts the files, which
 * removes the render-blocking request without changing how the type looks.
 */

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${poppins.variable} ${plusJakartaSans.variable} ${geistMono.variable}`;
