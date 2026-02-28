import { FadeIn } from "@/components/ui/fade-in";
import { TextReveal } from "@/components/ui/text-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Brain, Zap, Target } from "lucide-react";

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-black">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                        <TextReveal text="Advanced Agentic Features" />
                    </h1>
                    <FadeIn delay={0.2} direction="up">
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Transform your interview preparation with cutting-edge AI capabilities.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <FadeIn delay={0.3} direction="up">
                        <TiltCard className="h-full bg-white/5 border-white/10 p-8">
                            <Brain className="w-12 h-12 text-[var(--color-accent)] mb-6" />
                            <h3 className="text-xl font-bold mb-4">Adaptive Questioning</h3>
                            <p className="text-white/60">
                                The AI reads your resume and dynamically adjusts the difficulty based on your answers in real-time.
                            </p>
                        </TiltCard>
                    </FadeIn>
                    <FadeIn delay={0.4} direction="up">
                        <TiltCard className="h-full bg-white/5 border-white/10 p-8">
                            <Zap className="w-12 h-12 text-[var(--color-accent)] mb-6" />
                            <h3 className="text-xl font-bold mb-4">Real-time Feedback</h3>
                            <p className="text-white/60">
                                Get instant, actionable insights on your tone, pacing, and technical accuracy as you speak.
                            </p>
                        </TiltCard>
                    </FadeIn>
                    <FadeIn delay={0.5} direction="up">
                        <TiltCard className="h-full bg-white/5 border-white/10 p-8">
                            <Target className="w-12 h-12 text-[var(--color-accent)] mb-6" />
                            <h3 className="text-xl font-bold mb-4">Industry Specific</h3>
                            <p className="text-white/60">
                                Trained on thousands of real interviews across tech, finance, and consulting sectors.
                            </p>
                        </TiltCard>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
