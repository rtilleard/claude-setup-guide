import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Submission — Claude for Small Business, UK&I",
  description:
    "A memo on the UK&I launch of Claude for Small Business. By Robbie Tilleard.",
  robots: { index: false, follow: false },
};

export default function PitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sourceSerif.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
