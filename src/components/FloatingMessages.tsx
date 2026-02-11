"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
    "You are loved 💖",
    "So cute! 😻",
    "Bestie ✨",
    "XOXO 💋",
    "HUGS 🤗",
    "Thinking of you 💭",
    "You matter 🌟",
    "Sending warmth ☀️",
    "🧸", "🎀", "💖", "💌", "🌹", "✨", "🦋", "🦄"
];

export const FloatingMessages = () => {
    const [floatingTexts, setFloatingTexts] = useState<{ id: number; x: number; text: string; rotation: number; scale: number; isSticker: boolean }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFloatingTexts(prev => [
                ...prev.slice(-8), // Keep fewer messages
                {
                    id: Date.now(),
                    // Ensure spacing: alternate sides or random but with clear margins
                    x: Math.random() * 60 + 20, // Keep within 20-80% to avoid edges
                    text: messages[Math.floor(Math.random() * messages.length)],
                    rotation: Math.random() * 40 - 20, // -20 to 20 deg tilt
                    scale: Math.random() * 0.5 + 0.8, // 0.8 to 1.3 scale
                    isSticker: Math.random() > 0.6 // 40% chance of being a pure sticker style
                }
            ]);
        }, 2000); // Slower generation
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {floatingTexts.map((msg) => (
                <motion.div
                    key={msg.id}
                    className={`absolute bottom-0 font-hand font-bold drop-shadow-md backdrop-blur-sm border border-pink-100 flex items-center justify-center
                        ${msg.text.length < 3 ? "text-5xl p-2 bg-transparent border-none drop-shadow-xl" : "text-2xl md:text-3xl text-pink-600 bg-white/80 px-4 py-2 rounded-full"}
                    `}
                    style={{ left: `${msg.x}%`, rotate: msg.rotation, scale: msg.scale }}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                        y: "-100vh",
                        opacity: [0, 1, 1, 0],
                        x: [0, Math.random() * 100 - 50, 0] // Natural sway
                    }}
                    transition={{
                        duration: Math.random() * 5 + 7, // 7-12s duration
                        ease: "easeInOut",
                        times: [0, 0.2, 0.8, 1]
                    }}
                >
                    {msg.text}
                </motion.div>
            ))}
        </div>
    );
};
