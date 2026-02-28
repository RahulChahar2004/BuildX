"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    className?: string;
    duration?: number;
}

export function FadeIn({
    children,
    delay = 0,
    direction = "none",
    className,
    duration = 0.5,
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const getHiddenVariant = () => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: 40 };
            case "down":
                return { opacity: 0, y: -40 };
            case "left":
                return { opacity: 0, x: 40 };
            case "right":
                return { opacity: 0, x: -40 };
            default:
                return { opacity: 0 };
        }
    };

    const getVisibleVariant = () => {
        switch (direction) {
            case "up":
            case "down":
                return { opacity: 1, y: 0 };
            case "left":
            case "right":
                return { opacity: 1, x: 0 };
            default:
                return { opacity: 1 };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: getHiddenVariant(),
                visible: getVisibleVariant(),
            }}
            transition={{
                duration: duration,
                ease: [0.25, 0.1, 0.25, 1],
                delay: delay,
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
