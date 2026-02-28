"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { motion } from "framer-motion";
import { Database, Monitor, BrainCircuit, Server } from "lucide-react";

export function TechnologySection() {
    return (
        <section className="py-32 bg-black relative overflow-hidden border-y border-white/5">
            <div className="container px-4 mx-auto relative z-10">
                <FadeIn direction="up">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Under The Hood</h2>
                        <p className="text-xl text-white/50 max-w-2xl mx-auto">
                            A robust architecture designed for sub-second latency and intelligent memory.
                        </p>
                    </div>
                </FadeIn>

                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">

                        {/* Animated connection line */}
                        <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block -translate-y-1/2" />

                        <motion.div
                            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent hidden md:block w-32 -translate-y-1/2"
                            animate={{ left: ["0%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {[
                            { icon: Monitor, label: "Next.js UI", id: 1 },
                            { icon: Server, label: "Edge Functions", id: 2 },
                            { icon: BrainCircuit, label: "Agentic AI", id: 3, highlight: true },
                            { icon: Database, label: "Vector DB", id: 4 },
                        ].map((tech, i) => (
                            <FadeIn key={i} delay={i * 0.2} direction="up" className="relative z-10 w-full md:w-auto">
                                <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-4 bg-black w-full md:w-40 aspect-square ${tech.highlight ? 'border-[var(--color-accent)]/50 shadow-[0_0_20px_rgba(204,255,0,0.1)]' : 'border-white/10'}`}>
                                    <tech.icon className={`w-8 h-8 ${tech.highlight ? 'text-[var(--color-accent)]' : 'text-white/40'}`} />
                                    <span className={`text-sm font-medium ${tech.highlight ? 'text-white' : 'text-white/60'}`}>{tech.label}</span>
                                </div>
                            </FadeIn>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}
