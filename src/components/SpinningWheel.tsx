"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

const segments = [
    "Virtual Hug 🤗",
    "Kiss 💋",
    "Date Night 🍷",
    "Massage 💆‍♀️",
    "Chocolate 🍫",
    "Cuddle 🧸",
    "Compliment 💖",
    "Surprise 🎁",
];

const colors = [
    "#FF9AA2",
    "#FFB7B2",
    "#FFDAC1",
    "#E2F0CB",
    "#B5EAD7",
    "#C7CEEA",
    "#fbc2eb",
    "#a18cd1",
];

export const SpinningWheel = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const controls = useAnimation();

    const spin = async () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setResult(null);

        const randomRotation = Math.floor(Math.random() * 360) + 1800; // At least 5 spins
        const segmentAngle = 360 / segments.length;

        // Calculate result based on final rotation
        // The pointer is usually at top (0 degrees). 
        // If we rotate CLOCKWISE, the segment at the top will be (360 - (rotation % 360)) / segmentAngle

        await controls.start({
            rotate: randomRotation,
            transition: { duration: 4, ease: "circOut" }
        });

        const normalizedRotation = randomRotation % 360;
        const resultIndex = Math.floor((360 - normalizedRotation + (segmentAngle / 2)) % 360 / segmentAngle);
        const winningSegment = segments[resultIndex % segments.length];

        setResult(winningSegment);
        setIsSpinning(false);

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff0000", "#ff69b4", "#ffffff"],
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-10">
            <h2 className="text-4xl font-bold bg-white/80 px-6 py-2 rounded-full shadow-lg text-pink-600">Spin for Love!</h2>

            <div className="relative">
                {/* Pointer */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600 drop-shadow-lg" />

                {/* Wheel */}
                <motion.div
                    className="w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-white shadow-2xl overflow-hidden relative"
                    animate={controls}
                    style={{ rotate: 0 }}
                >
                    {segments.map((seg, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-[50%] bg-pink-300 origin-bottom left-0 top-0 flex items-start justify-center pt-4"
                            style={{
                                transform: `rotate(${i * (360 / segments.length)}deg)`,
                                backgroundColor: colors[i % colors.length],
                                clipPath: "polygon(0 0, 100% 0, 50% 100%)", // Triangle slice attempt - simpler CSS conic gradient might be better but this allows text rotation
                                // Applying proper slice rendering is hard with divs, using conic gradient for bg and absolute text is easier.
                            }}
                        />
                    ))}

                    {/* Better approach: Layered content on top of a conic background */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `conic-gradient(${segments.map((_, i) => `${colors[i % colors.length]} ${i * (100 / segments.length)}% ${(i + 1) * (100 / segments.length)}%`).join(", ")})`
                        }}
                    />

                    {/* Text Labels */}
                    {segments.map((seg, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{
                                transform: `rotate(${i * (360 / segments.length) + (360 / segments.length / 2)}deg)`,
                            }}
                        >
                            <span
                                className="text-xs md:text-sm font-bold text-black/80 -translate-y-24 md:-translate-y-32 rotate-180"
                                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                            >
                                {seg}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Center cap */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md z-10" />
            </div>

            <motion.button
                onClick={spin}
                disabled={isSpinning}
                className="px-8 py-4 bg-pink-500 text-white text-xl font-bold rounded-full shadow-xl hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.95 }}
            >
                {isSpinning ? "Spinning..." : "SPIN IT! 💖"}
            </motion.button>

            {result && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={() => setResult(null)}
                >
                    <motion.div
                        className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-sm w-full"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">You won:</h3>
                        <p className="text-5xl font-black text-pink-600 mb-6">{result}</p>
                        <button
                            onClick={() => setResult(null)}
                            className="px-6 py-2 bg-gray-100 rounded-full font-bold hover:bg-gray-200"
                        >
                            Yay! Claim it 🎁
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};
