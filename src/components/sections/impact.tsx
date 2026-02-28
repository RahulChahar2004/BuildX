"use client";

import { TiltCard } from "@/components/ui/tilt-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Target, TrendingUp, ShieldCheck } from "lucide-react";

export function ImpactSection() {
    const impacts = [
        {
            icon: TrendingUp,
            title: "Realism",
            description: "Interviews simulate the exact pressure, pacing, and dynamic follow-ups of a top-tier tech interview.",
        },
        {
            icon: Target,
            title: "Actionable Feedback",
            description: "Stop guessing. Get a rubric-based scorecard on your communication, technical depth, and framing.",
        },
        {
            icon: ShieldCheck,
            title: "Confidence",
            description: "Build muscle memory through reps. Enter your real interview with the swagger of someone who's already passed.",
        },
    ];

    return (
        <section className="py-32 bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-accent)]/5 pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <FadeIn direction="up">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">The Impact</h2>
                        <p className="text-xl text-white/50 max-w-2xl mx-auto">
                            We measure success by the offers you sign.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {impacts.map((item, i) => (
                        <FadeIn key={i} delay={i * 0.2} direction="up" className="h-full">
                            <TiltCard className="h-full">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 text-[var(--color-accent)]">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed text-lg">{item.description}</p>
                            </TiltCard>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
