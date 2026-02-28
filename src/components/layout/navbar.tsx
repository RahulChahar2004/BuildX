import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[var(--color-accent)] flex items-center justify-center">
                        <span className="text-black font-black text-sm">X</span>
                    </div>
                    <span>BuildX</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/features" className="text-sm text-white/70 hover:text-white transition-colors">
                        Features
                    </Link>
                    <Link href="/how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">
                        How It Works
                    </Link>
                    <Link href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">
                        Pricing
                    </Link>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="hidden sm:inline-block text-sm text-white/70 hover:text-white transition-colors">
                                Login
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-[var(--color-accent)] rounded-full overflow-hidden transition-transform active:scale-95">
                                <span className="relative z-10 flex items-center gap-1">
                                    Sign Up <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
