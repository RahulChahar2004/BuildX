import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { Terminal } from "lucide-react";

export default function SignupPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-black flex items-center justify-center relative overflow-hidden">
            {/* Grid background for tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container px-4 relative z-10 flex flex-col items-center w-full max-w-lg">
                <FadeIn delay={0.1} direction="down" className="w-full">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl mb-6">
                            <Terminal className="w-8 h-8 text-[var(--color-accent)]" />
                        </div>
                        <h1 className="text-4xl font-bold mb-3">Initialize Profile</h1>
                        <p className="text-white/60">Create your account and start your agentic training.</p>
                    </div>

                    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="first">First Name</label>
                                    <input type="text" id="first" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" placeholder="Ada" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="last">Last Name</label>
                                    <input type="text" id="last" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" placeholder="Lovelace" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="email">Work Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" placeholder="ada@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="password">Password</label>
                                <input type="password" id="password" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" placeholder="Create a strong password" />
                            </div>

                            <button type="button" className="w-full mt-6 py-4 rounded-lg font-semibold text-black bg-[var(--color-accent)] hover:scale-[0.98] transition-transform">
                                Create Account
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-white/60">
                            Already initialized? <Link href="/login" className="text-white hover:text-[var(--color-accent)] transition-colors">Log in</Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
