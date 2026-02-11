"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import React from "react";

interface ScreenWrapperProps extends MotionProps {
    children: React.ReactNode;
    className?: string;
}

export const ScreenWrapper = ({
    children,
    className,
    ...props
}: ScreenWrapperProps) => {
    return (
        <motion.section
            className={cn(
                "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-8 text-center snap-center",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
        >
            {children}
        </motion.section>
    );
};
