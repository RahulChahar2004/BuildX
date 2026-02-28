"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { buildxApi } from "@/lib/api";
import { FadeIn } from "@/components/ui/fade-in";
import { TiltCard } from "@/components/ui/tilt-card";
import { CheckCircle2, AlertCircle, Lightbulb, Loader2 } from "lucide-react";

export default function ReportPage() {
    const { id } = useParams();
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            buildxApi.getReport(id as string)
                .then(res => setReport(res.report))
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-[var(--color-accent)] animate-spin" />
                <p className="text-white/60 animate-pulse">Agent is finalizing your evaluation...</p>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-red-400">Failed to load interview report. Please try again later.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-24 bg-black relative">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-accent)]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container max-w-5xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Interview Evaluation</h1>
                    <p className="text-white/60">Comprehensive Agentic Breakdown</p>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { label: 'Overall Score', score: report.scores?.overall || 0, color: 'text-white' },
                        { label: 'Technical Depth', score: report.scores?.technical || 0, color: 'text-[var(--color-accent)]' },
                        { label: 'Communication', score: report.scores?.communication || 0, color: 'text-white/80' }
                    ].map((s, i) => (
                        <FadeIn key={i} delay={i * 0.1} direction="up">
                            <TiltCard className="bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center text-center h-full">
                                <span className={`text-6xl font-black mb-2 ${s.color}`}>{s.score}</span>
                                <span className="text-white/60 font-medium uppercase tracking-wider text-sm">{s.label}</span>
                            </TiltCard>
                        </FadeIn>
                    ))}
                </div>

                {/* Feedback Sections */}
                <div className="space-y-8">
                    {/* Strengths */}
                    <FadeIn delay={0.4} direction="up">
                        <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-green-400">
                                <CheckCircle2 className="w-6 h-6" /> Key Strengths
                            </h3>
                            <ul className="space-y-4">
                                {report.feedback?.strengths?.map((str: string, i: number) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                                        <span className="text-white/80 leading-relaxed">{str}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Weaknesses */}
                    <FadeIn delay={0.5} direction="up">
                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-red-400">
                                <AlertCircle className="w-6 h-6" /> Areas for Improvement
                            </h3>
                            <ul className="space-y-4">
                                {report.feedback?.weaknesses?.map((wk: string, i: number) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                        <span className="text-white/80 leading-relaxed">{wk}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Actionable Suggestions */}
                    <FadeIn delay={0.6} direction="up">
                        <div className="bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-[var(--color-accent)]">
                                <Lightbulb className="w-6 h-6" /> Actionable Advice
                            </h3>
                            <ul className="space-y-4">
                                {report.feedback?.suggestions?.map((sug: string, i: number) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                                        <span className="text-white/90 leading-relaxed">{sug}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
