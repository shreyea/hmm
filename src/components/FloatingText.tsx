"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const text = "If hugs were messages… I’d spam you forever 🤗";

export const FloatingText = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [visibleChars, setVisibleChars] = useState(0);

    useEffect(() => {
        // Auto-reveal text slowly as an idle animation or hint
        const timer = setInterval(() => {
            setVisibleChars(prev => {
                if (prev < text.length) return prev + 1;
                return prev;
            });
        }, 100);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            // Accelerate reveal on interaction
            setVisibleChars(prev => Math.min(prev + 2, text.length));
        };

        const handleTouchMove = (e: TouchEvent) => {
            setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
            setVisibleChars(prev => Math.min(prev + 2, text.length));
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        return () => {
            clearInterval(timer);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden cursor-none">
            <p className="absolute top-10 text-black/30 font-bold uppercase tracking-widest text-sm animate-pulse">
                Move your cursor / touch to read
            </p>

            <h2 className="text-4xl md:text-7xl font-bold text-center pointer-events-none select-none px-4 leading-relaxed max-w-4xl text-pink-600">
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: i < visibleChars ? 1 : 0.2,
                            y: i < visibleChars ? 0 : 10,
                            scale: i === visibleChars - 1 ? 1.3 : 1,
                            color: i < visibleChars ? "#db2777" : "transparent",
                            textShadow: i < visibleChars ? "0px 0px 0px transparent" : "0px 0px 8px rgba(219, 39, 119, 0.5)"
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </h2>

            {/* Follower */}
            <motion.div
                className="fixed w-32 h-32 bg-pink-400/30 rounded-full blur-2xl pointer-events-none z-0 mix-blend-multiply"
                animate={{ x: mousePos.x - 64, y: mousePos.y - 64 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
        </div>
    );
};
