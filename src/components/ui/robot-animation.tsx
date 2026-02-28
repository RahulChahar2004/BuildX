"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RobotAnimationProps {
    className?: string;
}

export function RobotAnimation({ className }: RobotAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Extremely light parallax on scroll (barely noticeable)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scrollY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

    return (
        <motion.div
            ref={containerRef}
            style={{ y: scrollY }}
            className={cn("relative w-full max-w-[500px] aspect-square flex items-center justify-center", className)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        >
            {/* Soft, minimal background glow */}
            <div className="absolute inset-0 bg-[var(--color-accent)]/5 blur-[80px] rounded-full" />

            {/* Continuous floating idle loop (4-6s, smooth sinusoidal) */}
            <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center"
            >
                {/* Robot Head with minimal stabilization */}
                <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-48 h-40 bg-white/5 border border-white/10 rounded-[40px] shadow-xl backdrop-blur-md flex flex-col items-center justify-center overflow-hidden z-20"
                >
                    {/* Inner dark face plate */}
                    <div className="w-40 h-28 bg-black/80 rounded-[28px] border border-white/5 relative flex items-center justify-center gap-6 overflow-hidden">
                        {/* Scanline effect */}
                        <motion.div
                            className="absolute left-0 right-0 h-1 bg-[var(--color-accent)]/10 blur-sm z-20"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Left Eye */}
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 bg-[var(--color-accent)] rounded-full blur-md opacity-40" />
                            <div className="absolute inset-2 bg-white rounded-full shadow-[0_0_10px_var(--color-accent)]" />
                            <div className="absolute inset-3 bg-black rounded-full" />
                        </div>

                        {/* Right Eye */}
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 bg-[var(--color-accent)] rounded-full blur-md opacity-40" />
                            <div className="absolute inset-2 bg-white rounded-full shadow-[0_0_10px_var(--color-accent)]" />
                            <div className="absolute inset-3 bg-black rounded-full" />
                        </div>

                        {/* Digital Mouth / Audio Wave (subtle) */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 bg-[var(--color-accent)] rounded-full opacity-60"
                                    animate={{ height: ["4px", `${Math.random() * 4 + 4}px`, "4px"] }}
                                    transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: i * 0.2 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Head Antenna */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-6 bg-white/10 rounded-t-full flex flex-col items-center justify-end">
                        <motion.div
                            className="w-3 h-3 rounded-full bg-[var(--color-accent)] absolute -top-1 shadow-[0_0_8px_var(--color-accent)]"
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>

                {/* Neck Joint */}
                <motion.div
                    className="w-8 h-6 flex flex-col justify-between py-1 z-10"
                    animate={{ scaleY: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-full h-1 bg-white/20 rounded-full" />
                    <div className="w-full h-1 bg-white/20 rounded-full" />
                    <div className="w-full h-1 bg-white/20 rounded-full" />
                </motion.div>

                {/* Robot Torso with subtle breathing */}
                <motion.div
                    className="relative w-56 h-48 bg-white/5 border border-white/10 rounded-t-[50px] rounded-b-3xl shadow-xl backdrop-blur-sm flex flex-col items-center pt-8 overflow-hidden"
                    animate={{ scaleX: [1, 1.02, 1], scaleY: [1, 0.98, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Core Energy Reactor */}
                    <div className="relative w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                        <motion.div
                            className="absolute inset-0 border border-[var(--color-accent)]/30 rounded-full border-dashed"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="w-8 h-8 rounded-full bg-[var(--color-accent)]/60 blur-[6px] shadow-[0_0_15px_var(--color-accent)]"
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Torso details */}
                    <div className="w-32 h-1 bg-white/5 mt-8 rounded-full" />
                    <div className="w-24 h-1 bg-white/5 mt-2 rounded-full" />
                </motion.div>

            </motion.div>
        </motion.div>
    );
}
