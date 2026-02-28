"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
    {
        id: "01",
        title: "Pre-Interview",
        description: "Upload your resume and job description. BuildX analyzes the requirements and crafts a custom interview strategy, complete with edge-case questions tailored to your background.",
    },
    {
        id: "02",
        title: "During Interview",
        description: "Engage in a voice or text-based conversation. The agent listens, dynamically adjusts its probing questions, and challenges your weak points just like a senior hiring manager.",
    },
    {
        id: "03",
        title: "Post-Interview",
        description: "Receive a hyper-detailed breakdown of your performance, including confidence metrics, technical accuracy, and actionable rewrite suggestions for your answers.",
    },
];

export function HowItWorksSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                <div className="absolute top-24 text-center z-20">
                    <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
                </div>

                {/* Progress Line */}
                <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-1 bg-white/10 rounded-full overflow-hidden z-0">
                    <motion.div
                        className="h-full bg-[var(--color-accent)] origin-left"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>

                <div className="w-full max-w-6xl mx-auto px-4 relative z-10 flex h-full items-center">
                    {steps.map((step, index) => {
                        // Calculate dynamic opacity and scale based on scroll position
                        const target = (index + 0.5) / 3;
                        const start = target - 0.2;
                        const end = target + 0.2;

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(scrollYProgress, [start, target, end], [0.2, 1, 0.2]);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const scale = useTransform(scrollYProgress, [start, target, end], [0.8, 1, 0.8]);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const y = useTransform(scrollYProgress, [start, target, end], [50, 0, -50]);

                        return (
                            <motion.div
                                key={step.id}
                                style={{ opacity, scale, y }}
                                className="flex-1 flex flex-col items-center text-center px-4 md:px-8"
                            >
                                <div className="text-[var(--color-accent)] font-mono text-xl mb-4 border border-[var(--color-accent)]/30 rounded-full w-12 h-12 flex items-center justify-center bg-black">
                                    {step.id}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="text-white/60 leading-relaxed max-w-xs">{step.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
