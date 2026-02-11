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
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
        clamp: true
    });

    const [popups, setPopups] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
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
        <div ref={containerRef} className="relative w-full py-20 overflow-hidden bg-black">
            {/* Light Sticker */}
            <motion.img
                src="/stickers/light.png"
                className="absolute top-0 right-0 w-32 md:w-48 z-50 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            />

            <motion.div className="flex flex-col gap-8 items-center justify-center min-h-screen relative z-10">
                <motion.div
                    className="absolute inset-0 z-0 opacity-30"
                    style={{
                        backgroundImage: "radial-gradient(circle at center, #ff0000 0%, transparent 70%)",
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.h2
                    className="text-7xl md:text-9xl font-black text-white text-center drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]"
                    style={{ skewX: velocityFactor }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    MORE LOVE
                </motion.h2>
                <motion.h2
                    className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-center drop-shadow-sm border-y-4 border-white py-2"
                    style={{ skewX: velocityFactor }}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    EVEN MORE LOVE
                </motion.h2>
                <motion.div
                    className="text-6xl text-white font-bold tracking-widest"
                    animate={{ opacity: [0.5, 1, 0.5], y: [0, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
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
