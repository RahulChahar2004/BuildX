import { FadeIn } from "@/components/ui/fade-in";
import { TextReveal } from "@/components/ui/text-reveal";
import Image from "next/image";

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-black overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        <TextReveal text="The Interview Process" />
                    </h1>
                    <FadeIn delay={0.2} direction="up">
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Three simple steps to mastering your next big career move using our advanced Agentic AI pipeline.
                        </p>
                    </FadeIn>
                </div>

                <div className="max-w-4xl mx-auto space-y-24">
                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row gap-8 items-center">
                        <FadeIn delay={0.3} direction="right" className="md:w-1/2">
                            <div className="text-[var(--color-accent)] font-mono text-xl mb-2">01 — Preparation</div>
                            <h3 className="text-3xl font-bold mb-4">Upload Context</h3>
                            <p className="text-white/60 text-lg">
                                Upload your resume and paste the job description you are targeting. Our AI instantly analyzes the core requirements, technologies, and necessary soft skills.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.4} direction="left" className="md:w-1/2 h-64 w-full bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                            <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Data Parsing" fill className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--color-accent)]/20 shadow-[0_0_20px_var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <span className="text-white font-mono z-10 mix-blend-overlay">Resume Parsing Engine...</span>
                        </FadeIn>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row-reverse gap-8 items-center">
                        <FadeIn delay={0.5} direction="left" className="md:w-1/2">
                            <div className="text-[var(--color-accent)] font-mono text-xl mb-2">02 — Execution</div>
                            <h3 className="text-3xl font-bold mb-4">Live Simulation</h3>
                            <p className="text-white/60 text-lg">
                                Enter a dynamic voice-to-voice or text-based interview. The agentic AI adapts its persona (technical lead, behavioral HR) and pivots based on your specific answers.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.6} direction="right" className="md:w-1/2 h-64 w-full bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                            <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Live Interview Simulation" fill className="object-cover opacity-50 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
                            <div className="relative z-20 w-16 h-16 rounded-full border border-[var(--color-accent)]/80 flex items-center justify-center animate-[spin_10s_linear_infinite] shadow-[0_0_15px_var(--color-accent)]">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/80 blur-[2px]" />
                            </div>
                        </FadeIn>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row gap-8 items-center">
                        <FadeIn delay={0.7} direction="right" className="md:w-1/2">
                            <div className="text-[var(--color-accent)] font-mono text-xl mb-2">03 — Action</div>
                            <h3 className="text-3xl font-bold mb-4">Deep Analytics</h3>
                            <p className="text-white/60 text-lg">
                                Receive a comprehensive breakdown of your performance. View exact moments where you hesitated, missed technical keywords, or excelled in communication.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.8} direction="left" className="md:w-1/2 h-64 w-full bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                            <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Analytics Dashboard" fill className="object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />

                            <div className="relative z-20 flex gap-2 items-end justify-center w-full h-full p-8">
                                {[40, 70, 45, 90, 65].map((h, i) => (
                                    <div key={i} className="w-8 bg-white/20 rounded-t-sm group-hover:bg-[var(--color-accent)]/80 transition-colors duration-500 shadow-[0_0_10px_rgba(204,255,0,0)] group-hover:shadow-[0_0_10px_rgba(204,255,0,0.5)]" style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }} />
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </main>
    );
}
