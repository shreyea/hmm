"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const text = "If hugs were messages… I’d spam you forever 🤗";

export const FloatingText = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [visibleChars, setVisibleChars] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setVisibleChars(prev => Math.min(prev + 1, text.length));
        };

        const handleTouchMove = (e: TouchEvent) => {
            setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
            setVisibleChars(prev => Math.min(prev + 1, text.length));
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden cursor-none">
            <h2 className="text-4xl md:text-6xl font-bold text-center pointer-events-none select-none px-4">
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: i < visibleChars ? 1 : 0.1,
                            y: i < visibleChars ? 0 : 20,
                            scale: i === visibleChars - 1 ? 1.5 : 1
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {char}
                    </motion.span>
                ))}
            </h2>

            {/* Follower */}
            <motion.div
                className="fixed w-8 h-8 bg-pink-500/50 rounded-full blur-xl pointer-events-none z-0"
                animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
        </div>
    );
};
