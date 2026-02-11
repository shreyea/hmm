"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useRef } from "react";

const randomMessages = ["🤍 hug delivered", "💗 another one", "✨ you’re loved", "😍 sending love", "🌹 for you"];

export const ChaoticMode = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const [popups, setPopups] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setPopups(prev => [
                    ...prev.slice(-5),
                    {
                        id: Date.now(),
                        x: Math.random() * 80 + 10,
                        y: Math.random() * 80 + 10,
                        text: randomMessages[Math.floor(Math.random() * randomMessages.length)]
                    }
                ]);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full py-20 overflow-hidden">
            <motion.div className="flex flex-col gap-10 items-center justify-center min-h-screen relative z-10">
                <motion.div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(45deg, #ff0000 25%, transparent 25%, transparent 75%, #ff0000 75%, #ff0000), linear-gradient(45deg, #ff0000 25%, transparent 25%, transparent 75%, #ff0000 75%, #ff0000)",
                        backgroundSize: "60px 60px",
                        backgroundPosition: "0 0, 30px 30px",
                    }}
                    animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                <motion.h2
                    className="text-7xl md:text-9xl font-black text-white text-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                    style={{ skewX: velocityFactor }}
                    animate={{ scale: [1, 1.1, 0.9, 1], rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                >
                    MORE LOVE
                </motion.h2>
                <motion.h2
                    className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-center drop-shadow-sm border-4 border-white p-4"
                    style={{ skewX: velocityFactor, x: useTransform(velocityFactor, v => v * 15) }}
                    animate={{ x: [-10, 10, -10] }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                >
                    EVEN MORE LOVE
                </motion.h2>
                <motion.div
                    className="text-6xl text-white font-bold tracking-widest"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                >
                    🔥🔥🔥🔥🔥
                </motion.div>
            </motion.div>

            {/* Random Popups */}
            {popups.map(p => (
                <motion.div
                    key={p.id}
                    className="fixed bg-yellow-300 border-4 border-black px-6 py-4 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black font-black text-2xl md:text-4xl pointer-events-none z-50 uppercase transform -rotate-2"
                    style={{ left: `${p.x}vw`, top: `${p.y}vh` }}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: Math.random() * 10 - 5, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
                    onAnimationComplete={() => setPopups(prev => prev.filter(item => item.id !== p.id))}
                >
                    {p.text}
                </motion.div>
            ))}
        </div>
    );
};
