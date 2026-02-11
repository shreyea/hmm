"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const gradients = [
    "linear-gradient(to bottom right, rgba(255, 154, 158, 0.8), rgba(250, 208, 196, 0.8))", // Pink -> Peach
    "linear-gradient(to bottom right, rgba(161, 140, 209, 0.8), rgba(251, 194, 235, 0.8))", // Purple -> Pink
    "linear-gradient(to bottom right, rgba(250, 208, 196, 0.8), rgba(255, 209, 255, 0.8))", // Peach -> Light Pink
    "linear-gradient(to bottom right, rgba(255, 236, 210, 0.8), rgba(252, 182, 159, 0.8))", // Light Orange -> Peach
];

export const Background = ({
    intensity = "normal",
}: {
    intensity?: "normal" | "high" | "chaos";
}) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let intervalTime = 3000;
        if (intensity === "high") intervalTime = 1000;
        if (intensity === "chaos") intervalTime = 200;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % gradients.length);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [intensity]);

    return (
        <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
            <Image
                src="/bghearts.jpg"
                alt="Hearts Background"
                fill
                className="object-cover opacity-60"
                priority /* Ensure it loads fast */
            />
            <motion.div
                className="absolute inset-0 h-full w-full"
                style={{
                    background: gradients[index],
                    transition: "background 1s ease-in-out",
                }}
                animate={{
                    background: gradients[index],
                }}
                transition={{
                    duration: intensity === "chaos" ? 0.2 : 1,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};
