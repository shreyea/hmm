"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, Dispatch, SetStateAction } from "react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface HugMeterProps {
    onComplete: () => void;
    setBgIntensity: Dispatch<SetStateAction<"normal" | "high" | "chaos">>;
}

export const HugMeter = ({ onComplete, setBgIntensity }: HugMeterProps) => {
    const [fill, setFill] = useState(0);
    const controls = useAnimation();
    const [message, setMessage] = useState("Tap to hug 🤗");
    const [isExploded, setIsExploded] = useState(false);

    const handleTap = async () => {
        if (isExploded) return;

        // Haptics
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(50);
        }

        // Increase fill
        const increment = 10;
        const newFill = Math.min(fill + increment, 100);
        setFill(newFill);

        // Animate hug button
        controls.start({
            scale: [1, 0.8, 1.2, 1],
            transition: { duration: 0.2 },
        });

        // Flash background
        setBgIntensity("high");
        setTimeout(() => setBgIntensity("normal"), 200);

        // Messages
        if (newFill >= 20 && newFill < 50) setMessage("Aww 🤍");
        else if (newFill >= 50 && newFill < 80) setMessage("That’s warm 🥰");
        else if (newFill >= 80 && newFill < 100) setMessage("Okay WOW 😳");
        else if (newFill === 100) {
            handleExplosion();
        }
    };

    const handleExplosion = () => {
        setIsExploded(true);
        setMessage("TOO MANY HUGS SENT 🤗🤗🤗");
        setBgIntensity("chaos");

        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#ff0000", "#ff69b4", "#ffffff"],
        });

        // Rain effect
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#ff0000", "#ff69b4", "#ffffff"],
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#ff0000", "#ff69b4", "#ffffff"],
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            } else {
                onComplete();
            }
        })();
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
            {/* Messages */}
            <motion.p
                key={message}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl font-bold text-black text-center h-8"
            >
                {message}
            </motion.p>

            {/* Hug Button */}
            <motion.button
                className="text-[100px] leading-none select-none cursor-pointer outline-none touch-manipulation transform-gpu"
                animate={controls}
                whileTap={{ scale: 0.9 }}
                onClick={handleTap}
                disabled={isExploded}
            >
                🤗
            </motion.button>

            {/* Meter */}
            <div className="w-full bg-black/10 h-8 rounded-full overflow-hidden relative border-2 border-black/20">
                <motion.div
                    className={cn(
                        "h-full bg-gradient-to-r from-pink-400 to-red-500",
                        isExploded && "animate-pulse"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${fill}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs font-bold text-black/50 tracking-widest uppercase">
                        Hug Level {fill}%
                    </span>
                </div>
            </div>
        </div>
    );
};
