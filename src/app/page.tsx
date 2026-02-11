"use client";

import { Background } from "@/components/Background";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Particles } from "@/components/Particles";
import { motion, useScroll, useSpring, useMotionValueEvent, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef, useState } from "react";
import { HugMeter } from "@/components/HugMeter";
import { ChaoticMode } from "@/components/ChaoticMode";
import { FloatingText } from "@/components/FloatingText";
import { SpinningWheel } from "@/components/SpinningWheel";
import { FloatingMessages } from "@/components/FloatingMessages";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgIntensity, setBgIntensity] = useState<"normal" | "high" | "chaos">("normal");

  return (
    <main ref={containerRef} className="relative h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <Background intensity={bgIntensity} />


      <div className="fixed inset-0 pointer-events-none z-0">
        <Particles count={30} />
      </div>

      {/* Screen 1: Entry */}
      <ScreenWrapper className="snap-start z-10">
        <motion.h1
          className="font-hand text-6xl md:text-8xl font-bold mb-8 text-black drop-shadow-sm"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          HEY YOU ❤️
        </motion.h1>
        <motion.p
          className="text-2xl md:text-4xl font-medium text-black/80 mb-12"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          I couldn’t stop myself…
        </motion.p>

        {/* Intro Stickers */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.img
            src="/stickers/ok.png"
            className="absolute top-24 left-10 w-24 h-auto opacity-90"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/stickers/star.svg"
            className="absolute top-40 right-10 w-12 h-12 opacity-80"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            src="/stickers/okk.png"
            className="absolute bottom-32 right-8 w-28 h-auto opacity-85"
            animate={{ y: [0, 10, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/stickers/sparkle.svg"
            className="absolute top-20 left-1/2 w-10 h-10 opacity-70"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/stickers/okkk.png"
            className="absolute bottom-20 left-16 w-32 h-auto opacity-90"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-8 h-8 text-black/60" />
        </motion.div>
      </ScreenWrapper>

      {/* Screen 2: Warning */}
      <ScreenWrapper className="snap-start z-10 h-screen">
        <motion.h2 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
          I have <br />
          <motion.span
            className="inline-block text-red-600 text-6xl md:text-9xl my-4"
            animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            WAY TOO MANY
          </motion.span>
          <br /> HUGS FOR YOU.
        </motion.h2>
      </ScreenWrapper>

      {/* Screen 3: Hug Meter */}
      <ScreenWrapper className="snap-start z-20 h-screen">
        <HugMeter
          onComplete={() => {
            setBgIntensity("chaos");
          }}
          setBgIntensity={setBgIntensity}
        />
      </ScreenWrapper>

      {/* Screen 4: Spinning Wheel */}
      <ScreenWrapper className="snap-start z-20 h-screen">
        <SpinningWheel />
      </ScreenWrapper>

      {/* Screen 5: Floating Text */}
      <ScreenWrapper className="snap-start z-20 h-screen">
        <FloatingText />
      </ScreenWrapper>

      {/* Screen 7: Sign Off */}
      <ScreenWrapper className="snap-start z-20 h-screen pb-20 relative">
        <FloatingMessages />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-9xl mb-8"
        >
          🤗
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-sm">Happy Hug Day 🤍</h2>
        <p className="text-xl md:text-2xl opacity-75">Come back whenever you need one.</p>
      </ScreenWrapper>

    </main>
  );
}
