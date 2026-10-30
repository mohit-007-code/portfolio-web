import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/navigation/navbar";
import { Preloader } from "@/components/ui/preloader";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohit — AI & Python Developer",
  description:
    "Freelance AI & Web Developer crafting cinematic, interactive digital experiences for ambitious brands and high-scale products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#faf8f2] text-[#141210] min-h-screen selection:bg-[#141210] selection:text-[#faf8f2]">
        <Preloader />
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

