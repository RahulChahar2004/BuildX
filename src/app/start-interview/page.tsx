"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { buildxApi } from "@/lib/api";
import { FadeIn } from "@/components/ui/fade-in";
import { Upload, FileText, Briefcase, Loader2 } from "lucide-react";

export default function StartInterviewPage() {
    const { userId } = useAuth();
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");
    const [roleLevel, setRoleLevel] = useState("Mid-Senior");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || !file || !jd) return alert("Please complete all fields");

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("clerkId", userId);
            formData.append("resume", file);
            formData.append("jobDescription", jd);
            formData.append("roleLevel", roleLevel);

            const result = await buildxApi.setupInterview(formData);

            if (result.success) {
                router.push(`/interview/${result.interview._id}`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to initialize interview context");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-24 bg-black flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container px-4 relative z-10 w-full max-w-2xl">
                <FadeIn delay={0.1} direction="up">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Configure Your Interview</h1>
                            <p className="text-white/60">Upload your context to generate the agentic blueprint.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Resume Upload */}
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[var(--color-accent)]" />
                                    Resume (PDF)
                                </label>
                                <div className="relative group cursor-pointer">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={`w-full p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${file ? 'border-[var(--color-accent)]/50 bg-[var(--color-accent)]/5' : 'border-white/20 bg-black/50 group-hover:border-[var(--color-accent)]/30'}`}>
                                        <Upload className={`w-8 h-8 mb-2 ${file ? 'text-[var(--color-accent)]' : 'text-white/40'}`} />
                                        <span className={file ? 'text-white font-medium' : 'text-white/40'}>
                                            {file ? file.name : "Click to upload or drag & drop"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-[var(--color-accent)]" />
                                    Target Job Description
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors resize-none"
                                    placeholder="Paste the full job description here..."
                                />
                            </div>

                            {/* Role Level */}
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Role Level</label>
                                <select
                                    value={roleLevel}
                                    onChange={(e) => setRoleLevel(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[var(--color-accent)]/50 appearance-none"
                                >
                                    <option value="Junior">Entry Level / Junior</option>
                                    <option value="Mid-Senior">Mid to Senior Level</option>
                                    <option value="Staff">Staff / Principal</option>
                                    <option value="Manager">Engineering Manager</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !file || !jd}
                                className="w-full mt-8 py-4 rounded-xl font-bold text-black bg-[var(--color-accent)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Extracting Context...
                                    </>
                                ) : (
                                    "Generate Blueprint & Start"
                                )}
                            </button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
