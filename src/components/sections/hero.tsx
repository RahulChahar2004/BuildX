"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Sparkles } from "lucide-react";

import { RobotAnimation } from "@/components/ui/robot-animation";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
            {/* Background gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-accent)]/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text & CTA */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <FadeIn delay={0.1} direction="down">
                            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-[var(--color-accent)] mb-8">
                                <Sparkles className="mr-2 h-4 w-4" />
                                <span>Agentic AI Mock Interview Platform</span>
                            </div>
                        </FadeIn>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-6">
                            <TextReveal text="The AI Interviewer That Thinks Like a Human" />
                        </h1>

                        <FadeIn delay={0.6} direction="up" className="max-w-[600px]">
                            <p className="text-xl text-white/60 mb-10">
                                Stop practicing with static scripts. BuildX uses adaptive, agentic AI to simulate real-world, dynamic interviews tailored to your career.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.8} direction="up">
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-black bg-[var(--color-accent)] rounded-full overflow-hidden transition-transform active:scale-95">
                                    <span className="relative z-10 flex items-center">
                                        Start Mock Interview
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                </button>
                                <button className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors active:scale-95">
                                    See How It Works
                                </button>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Column: Robot Animation */}
                    <FadeIn delay={0.3} direction="left" className="w-full flex justify-center lg:justify-end">
                        <RobotAnimation />
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
