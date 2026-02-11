"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const emojis = ["💗", "💖", "💕", "🤍", "✨"];

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    emoji: string;
    duration: number;
    delay: number;
}

export const Particles = ({ count = 20 }: { count?: number }) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // vw
            y: Math.random() * 100, // vh
            size: Math.random() * 20 + 10,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            duration: Math.random() * 20 + 10, // Slow floating
            delay: Math.random() * 10,
        }));
        setParticles(newParticles);
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    initial={{ x: `${p.x}vw`, y: "110vh", opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                    style={{
                        fontSize: `${p.size}px`,
                        left: 0,
                        top: 0,
                    }}
                >
                    {p.emoji}
                </motion.div>
            ))}
        </div>
    );
};
