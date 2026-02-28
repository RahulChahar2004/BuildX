import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-black flex items-center justify-center relative overflow-hidden">
            {/* Subtle ambient core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container px-4 relative z-10 w-full max-w-md">
                <FadeIn delay={0.1} direction="up">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 rounded bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-6">
                                <span className="text-black font-black text-xl">X</span>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                            <p className="text-white/60">Log in to continue your interview prep.</p>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors"
                                    placeholder="agent@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-white/10 bg-black/50 text-[var(--color-accent)] focus:ring-0" />
                                    <span className="text-white/60">Remember me</span>
                                </label>
                                <a href="#" className="text-[var(--color-accent)] hover:underline">Forgot password?</a>
                            </div>

                            <button type="button" className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-black bg-[var(--color-accent)] hover:opacity-90 transition-opacity">
                                Login Access <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-white/60">
                            Don't have an account? <Link href="/signup" className="text-white hover:text-[var(--color-accent)] transition-colors">Sign up</Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
