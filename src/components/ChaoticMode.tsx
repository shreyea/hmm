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
            <motion.div className="flex flex-col gap-10 items-center justify-center min-h-screen">
                <motion.h2
                    className="text-6xl md:text-8xl font-black text-white text-center drop-shadow-lg"
                    style={{ skewX: velocityFactor }}
                >
                    MORE LOVE
                </motion.h2>
                <motion.h2
                    className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500 text-center drop-shadow-sm border-2"
                    style={{ skewX: velocityFactor, x: useTransform(velocityFactor, v => v * 10) }}
                >
                    EVEN MORE LOVE
                </motion.h2>
                <motion.div
                    className="text-4xl text-white font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    🔥🔥🔥🔥🔥
                </motion.div>
            </motion.div>

            {/* Random Popups */}
            {popups.map(p => (
                <motion.div
                    key={p.id}
                    className="fixed bg-white/90 px-4 py-2 rounded-full shadow-xl text-pink-600 font-bold pointer-events-none z-30"
                    style={{ left: `${p.x}vw`, top: `${p.y}vh` }}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0, opacity: [1, 1, 0] }}
                    transition={{ duration: 2 }}
                    onAnimationComplete={() => setPopups(prev => prev.filter(item => item.id !== p.id))}
                >
                    {p.text}
                </motion.div>
            ))}
        </div>
    );
};
