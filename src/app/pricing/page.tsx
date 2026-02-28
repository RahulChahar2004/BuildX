import { FadeIn } from "@/components/ui/fade-in";
import { TextReveal } from "@/components/ui/text-reveal";
import { Check } from "lucide-react";

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        <TextReveal text="Simple, Transparent Pricing" />
                    </h1>
                    <FadeIn delay={0.2} direction="up">
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Invest in your career with plans designed for serious professionals.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Basic Plan */}
                    <FadeIn delay={0.3} direction="up" className="h-full">
                        <div className="relative h-full bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:border-white/20 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-2">Starter</h3>
                                <p className="text-white/60 mb-6">Perfect for upcoming interviews</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">$29</span>
                                    <span className="text-white/60">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {['10 Agentic Interviews per month', 'Basic resume parsing', 'Text & Voice options', 'Standard performance analytics'].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <Check className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 rounded-xl font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                                Get Started
                            </button>
                        </div>
                    </FadeIn>

                    {/* Pro Plan */}
                    <FadeIn delay={0.4} direction="up" className="h-full">
                        <div className="relative h-full bg-black border border-[var(--color-accent)]/50 rounded-3xl p-8 flex flex-col shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                            <div className="absolute top-0 right-8 -translate-y-1/2">
                                <span className="bg-[var(--color-accent)] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                                <p className="text-white/60 mb-6">For aggressive career growth</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">$79</span>
                                    <span className="text-white/60">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {['Unlimited Agentic Interviews', 'Advanced resume & JD gap analysis', 'Industry-specific expert personas', 'Deep emotional & tonal analytics', 'Priority GPU processing'].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <Check className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 rounded-xl font-semibold text-black bg-[var(--color-accent)] hover:opacity-90 transition-opacity">
                                Upgrade to Pro
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
