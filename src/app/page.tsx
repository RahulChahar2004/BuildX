import { HeroSection } from "@/components/sections/hero";
import { ProblemSolutionSection } from "@/components/sections/problem-solution";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { TechnologySection } from "@/components/sections/technology";
import { ImpactSection } from "@/components/sections/impact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <HeroSection />
      <ProblemSolutionSection />
      <HowItWorksSection />
      <TechnologySection />
      <ImpactSection />

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/50 text-center text-white/40">
        <p>© {new Date().getFullYear()} BuildX. All rights reserved.</p>
      </footer>
    </main>
  );
}
