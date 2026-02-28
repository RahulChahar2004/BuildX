"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { Bot, MessageSquare, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProblemSolutionSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            <div className="container px-4 md:px-6 mx-auto">
                <FadeIn direction="up">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Static vs. Agentic</h2>
                        <p className="text-xl text-white/50 max-w-2xl mx-auto">
                            Traditional mock interviews fall flat. BuildX creates dynamic, evolving conversations that truly test your limits.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
                    {/* Vertical divider line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                    {/* Problem Side */}
                    <FadeIn direction="right" delay={0.2} className="relative group">
                        <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-3xl group-hover:bg-red-500/10 transition-colors" />
                        <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
                                    <Bot size={32} />
                                </div>
                                <h3 className="text-2xl font-semibold text-white/80">Static Chatbots</h3>
                            </div>

                            <ul className="space-y-6">
                                {[
                                    "Pre-programmed, predictable questions",
                                    "Cannot adapt to your unique experience",
                                    "Provides generic, templated feedback",
                                    "Feels like talking to a machine",
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start text-white/50">
                                        <XCircle className="w-6 h-6 shrink-0 text-red-500/50 mt-0.5" />
                                        <span className="text-lg line-through decoration-red-500/30">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Solution Side */}
                    <FadeIn direction="left" delay={0.4} className="relative group">
                        <div className="absolute inset-0 bg-[var(--color-accent)]/5 blur-3xl rounded-3xl group-hover:bg-[var(--color-accent)]/15 transition-colors" />
                        <div className="relative p-8 rounded-3xl border border-[var(--color-accent)]/20 bg-white/[0.02] h-full shadow-[0_0_30px_rgba(204,255,0,0.05)]">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-2xl bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                                    <MessageSquare size={32} />
                                </div>
                                <h3 className="text-2xl font-semibold text-white">Agentic AI</h3>
                            </div>

                            <ul className="space-y-6">
                                {[
                                    "Dynamically generated contextual questions",
                                    "Deep-dives into your specific resume claims",
                                    "Actionable, hyper-personalized feedback",
                                    "Interrupts and probes like a real human",
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start text-white/90">
                                        <CheckCircle2 className="w-6 h-6 shrink-0 text-[var(--color-accent)] mt-0.5" />
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
