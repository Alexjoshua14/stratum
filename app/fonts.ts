import { Commissioner, Geist } from "next/font/google";

export const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist",
});

export const commissioner = Commissioner({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-commissioner",
});
