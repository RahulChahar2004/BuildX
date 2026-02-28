"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { buildxApi } from "@/lib/api";
import { FadeIn } from "@/components/ui/fade-in";
import { Mic, Send, Loader2, Square, Video, VideoOff, MicOff, MessageSquare, X, AlertTriangle } from "lucide-react";
import { RobotAnimation } from "@/components/ui/robot-animation";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// TensorFlow for Proctoring
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

export default function InterviewRoomPage() {
    const { id } = useParams();
    const { userId } = useAuth();
    const router = useRouter();

    const [interview, setInterview] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isAgentTyping, setIsAgentTyping] = useState(false);

    // Call UI States
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [showChat, setShowChat] = useState(true);

    // Audio & Speech States
    const {
        transcript: speechTranscript,
        listening: isListening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // Sync speech transcript to input box live
    useEffect(() => {
        if (isListening && speechTranscript) {
            setInput(speechTranscript);
        }
    }, [speechTranscript, isListening]);

    // Proctoring State
    const [faceAlert, setFaceAlert] = useState<string | null>(null);
    const detectorRef = useRef<blazeface.BlazeFaceModel | null>(null);
    const reqAnimationFrameRef = useRef<number | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, isAgentTyping, faceAlert]);

    // TTS: Speak a string using Browser SpeechSynthesis
    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // stop previous speech
            const utterance = new SpeechSynthesisUtterance(text);

            // Try to find a good authoritative/premium English voice (e.g., Google UK or US male/female depending on OS)
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Samantha")) || voices[0];

            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.pitch = 0.9;
            utterance.rate = 1.0;

            window.speechSynthesis.speak(utterance);
        }
    };

    // Initialize initial context
    useEffect(() => {
        if (id && userId) {
            buildxApi.getInterview(id as string).then(res => {
                setInterview(res.interview);
                setMessages(res.interview.transcript || []);

                if (res.interview.transcript.length === 0) {
                    setIsAgentTyping(true);
                    setTimeout(() => {
                        const greeting = "Hi there. I've reviewed your resume and the job description. Let's start by having you walk me through your most recent complex technical project.";
                        setMessages([{ role: 'agent', content: greeting }]);
                        setIsAgentTyping(false);
                        speakText(greeting);
                    }, 1500);
                }
            }).catch(console.error);
        }
    }, [id, userId]);

    // Proctoring Loop using TFJS BlazeFace
    const detectFaces = useCallback(async () => {
        if (!videoRef.current || !detectorRef.current || !isVideoOn) return;

        // Ensure video has actual dimensions before passing to TFJS
        if (videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
            try {
                const returnTensors = false;
                const predictions = await detectorRef.current.estimateFaces(videoRef.current, returnTensors);

                if (predictions.length > 1) {
                    setFaceAlert("Multiple faces detected in frame. Please ensure you are alone.");
                } else if (predictions.length === 0) {
                    // Optional: You could warn if NO face is detected, but multiple faces is the main proctoring requirement
                    setFaceAlert(null);
                } else {
                    setFaceAlert(null); // Normal state, 1 face
                }
            } catch (err) {
                // Ignore intermittent TF errors reading video frames
            }
        }

        reqAnimationFrameRef.current = requestAnimationFrame(detectFaces);
    }, [isVideoOn]);

    // Setup Video Stream & TFJS
    useEffect(() => {
        let activeStream: MediaStream | null = null;

        async function enableStreamAndAI() {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); // Audio must be true to actually capture mic eventually
                    activeStream = s;
                    setStream(s);
                    if (videoRef.current) {
                        videoRef.current.srcObject = s;
                    }
                }
            } catch (err) {
                console.error("Camera access denied or error:", err);
                setIsVideoOn(false);
            }

            // Load TFJS Backend and Blazeface
            try {
                await tf.setBackend('webgl');
                detectorRef.current = await blazeface.load();
                if (isVideoOn) {
                    detectFaces(); // Start loop
                }
            } catch (err) {
                console.error("Failed to load TFJS Blazeface", err);
            }
        }

        enableStreamAndAI();

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop());
            }
            if (reqAnimationFrameRef.current) {
                cancelAnimationFrame(reqAnimationFrameRef.current);
            }
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Re-trigger Face Detection loop if video toggles back on
    useEffect(() => {
        if (isVideoOn && detectorRef.current) {
            detectFaces();
        } else if (!isVideoOn && reqAnimationFrameRef.current) {
            cancelAnimationFrame(reqAnimationFrameRef.current);
        }
    }, [isVideoOn, detectFaces]);

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = !isVideoOn;
            });
            setIsVideoOn(!isVideoOn);
        }
    };

    const toggleMuteAndMic = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = isMuted; // inverted because isMuted represents current "muted" state visually
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleListening = () => {
        if (!browserSupportsSpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Try Chrome.");
            return;
        }

        if (isListening) {
            SpeechRecognition.stopListening();
        } else {
            // Need to ensure mic isn't hardware muted to hear them
            if (isMuted) toggleMuteAndMic();

            resetTranscript();
            SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
        }
    };

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const textToSubmit = input.trim();
        if (!textToSubmit || isAgentTyping) return;

        setInput("");

        // Stop listening on send
        if (isListening) {
            SpeechRecognition.stopListening();
        }

        setMessages(prev => [...prev, { role: 'user', content: textToSubmit }]);
        setIsAgentTyping(true);

        try {
            const res = await buildxApi.sendChatMessage(id as string, textToSubmit);
            setMessages(res.transcript); // Full synced transcript

            // Speak the last agent message
            if (res.transcript.length > 0) {
                const lastMsg = res.transcript[res.transcript.length - 1];
                if (lastMsg.role === 'agent') {
                    speakText(lastMsg.content);
                }
            }
        } catch (error) {
            console.error(error);
            const errMsg = "I'm having trouble connecting to the network right now. Can you try saying that again?";
            setMessages(prev => [...prev, { role: 'agent', content: errMsg }]);
            speakText(errMsg);
        } finally {
            setIsAgentTyping(false);
        }
    };

    const handleEndInterview = async () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        try {
            await buildxApi.finalizeInterview(id as string);
            router.push(`/report/${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    if (!interview) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 text-[var(--color-accent)] animate-spin" /></div>;

    return (
        <main className="h-screen bg-black flex flex-col overflow-hidden relative pt-16">

            {/* Top Bar */}
            <div className="absolute top-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-white font-semibold">Live Interview Recording</span>
                    </div>
                </div>
                <div className="text-white/50 font-mono text-sm">
                    ID: {id?.slice(0, 8)}...
                </div>
            </div>

            {/* Main Stage */}
            <div className={`flex-1 flex overflow-hidden transition-all duration-300 ${showChat ? 'pr-[400px]' : ''}`}>

                {/* Video Area */}
                <div className="flex-1 relative flex items-center justify-center bg-[#0a0a0a] p-4 pb-24">

                    {/* Proctoring Warning Overlay */}
                    {faceAlert && (
                        <div className="absolute top-8 w-full max-w-lg z-50 animate-in slide-in-from-top-4 fade-in">
                            <div className="bg-red-500/90 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-red-400 shadow-2xl shadow-red-500/20">
                                <AlertTriangle className="w-8 h-8 text-white shrink-0" />
                                <div className="text-white">
                                    <h4 className="font-bold">Proctoring Alert</h4>
                                    <p className="text-sm">{faceAlert}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Agent Large Video */}
                    <div className="w-full h-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-black/50 relative shadow-2xl flex items-center justify-center mt-4 mb-4">
                        <RobotAnimation />

                        {/* Agent Identifier */}
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
                            Agentic Interviewer
                        </div>
                    </div>

                    {/* User PiP Video */}
                    <div className="absolute top-8 right-8 w-64 aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/20 shadow-2xl z-20">
                        {isVideoOn ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover -scale-x-100"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                                    <span className="text-gray-400 text-xl font-medium">You</span>
                                </div>
                            </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 text-white text-xs font-medium flex items-center gap-2">
                            {isMuted ? <MicOff className="w-3 h-3 text-red-500" /> : <Mic className="w-3 h-3 text-green-500" />}
                            You
                        </div>
                    </div>

                </div>
            </div>

            {/* Side Chat Panel */}
            <div
                className={`absolute top-16 right-0 w-[400px] h-[calc(100vh-64px-80px)] bg-black border-l border-white/10 flex flex-col transform transition-transform duration-300 z-40 ${showChat ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" /> Transcript
                    </h2>
                    <button onClick={() => setShowChat(false)} className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <span className="text-xs text-white/40 mb-1 px-1">{msg.role === 'user' ? 'You' : 'Interviewer'}</span>
                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-[var(--color-accent)] text-black rounded-tr-sm' : 'bg-white/10 text-white rounded-tl-sm border border-white/5'}`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}

                    {isAgentTyping && (
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-white/40 mb-1 px-1">Interviewer</span>
                            <div className="bg-white/5 border border-white/5 text-white/50 rounded-2xl p-3 rounded-tl-sm flex items-center gap-2 text-sm">
                                <span className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                                </span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input form in Sidebar */}
                <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-md">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isListening ? "Listening..." : "Type or speak..."}
                            className={`w-full bg-white/5 border rounded-full pl-4 pr-12 py-3 text-white text-sm focus:outline-none transition-all ${isListening ? 'border-[var(--color-accent)]' : 'border-white/10 focus:border-[var(--color-accent)]/50'}`}
                        />
                        <button
                            type="button"
                            onClick={toggleListening}
                            className={`absolute right-10 p-1.5 transition-colors ${isListening ? 'text-[var(--color-accent)]' : 'text-white/40 hover:text-white'}`}
                        >
                            <Mic className="w-4 h-4" />
                        </button>
                        <button
                            type="submit"
                            disabled={!input.trim() || isAgentTyping}
                            className="absolute right-2 p-1.5 bg-[var(--color-accent)] text-black rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Zoom-like Bottom Control Bar */}
            <div className="absolute bottom-0 w-full h-20 bg-[#111] border-t border-white/10 flex items-center justify-center px-6 z-50 gap-4">

                {/* Audio/Video Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleMuteAndMic}
                        className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors ${isMuted ? 'text-red-500 hover:bg-red-500/10' : 'text-white/80 hover:bg-white/10'}`}
                    >
                        {isMuted ? <MicOff className="w-5 h-5 mb-1" /> : <Mic className="w-5 h-5 mb-1" />}
                        <span className="text-[10px] font-medium">{isMuted ? "Unmute" : "Mute"}</span>
                    </button>

                    <button
                        onClick={toggleVideo}
                        className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors ${!isVideoOn ? 'text-red-500 hover:bg-red-500/10' : 'text-white/80 hover:bg-white/10'}`}
                    >
                        {!isVideoOn ? <VideoOff className="w-5 h-5 mb-1" /> : <Video className="w-5 h-5 mb-1" />}
                        <span className="text-[10px] font-medium">{!isVideoOn ? "Start Video" : "Stop Video"}</span>
                    </button>

                    {/* Quick Live Speech Button in main bar */}
                    <button
                        onClick={toggleListening}
                        title="Speech to Text"
                        disabled={isMuted} // Can't voice type if hardware is muted
                        className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isListening ? 'text-black bg-[var(--color-accent)] shadow-[0_0_15px_rgba(204,255,0,0.5)]' : 'text-white/80 hover:bg-white/10'}`}
                    >
                        <MessageSquare className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-medium">{isListening ? "Listening" : "Speak"}</span>
                    </button>
                </div>

                <div className="w-px h-8 bg-white/10 mx-2" />

                {/* Chat Control */}
                <button
                    onClick={() => setShowChat(!showChat)}
                    className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors ${showChat ? 'text-white bg-white/20' : 'text-white/80 hover:bg-white/10'}`}
                >
                    <MessageSquare className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium">Transcript</span>
                </button>

                <div className="flex-1" /> {/* Spacer */}

                {/* End Call */}
                <button
                    onClick={handleEndInterview}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-red-900/20"
                >
                    <Square className="w-4 h-4 fill-current" /> End Interview
                </button>

            </div>

        </main>
    );
}
