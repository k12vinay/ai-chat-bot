"use client";

import { useVoice } from "@/hooks/useVoice";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const { isListening, isSpeaking, transcript, response, error, startListening, stopListening } = useVoice();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-slate-100 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 z-0" />

            {/* Content */}
            <div className="z-10 flex flex-col items-center gap-8 w-full max-w-2xl text-center">

                <header className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-2">
                        AI Voice Twin
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Ask me anything about my journey.
                    </p>
                </header>

                {/* Visualizer Orb */}
                <div className="relative group cursor-pointer" onClick={isListening ? stopListening : startListening}>
                    {/* Outer Glow */}
                    <motion.div
                        animate={{
                            scale: isListening ? [1, 1.2, 1] : isSpeaking ? [1, 1.1, 1] : 1,
                            opacity: isListening ? 0.6 : isSpeaking ? 0.8 : 0.3,
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: isListening ? 1.5 : isSpeaking ? 0.5 : 3,
                        }}
                        className={`absolute inset-0 rounded-full blur-3xl ${isListening ? "bg-red-500" : isSpeaking ? "bg-orange-500" : "bg-orange-600"
                            }`}
                    />

                    {/* Main Orb */}
                    <motion.div
                        animate={{
                            scale: isListening ? 1.1 : 1,
                        }}
                        className={`relative w-48 h-48 rounded-full flex items-center justify-center border-4 backdrop-blur-sm transition-all duration-500 shadow-2xl ${isListening
                            ? "border-red-500/50 bg-red-950/30 shadow-red-500/20"
                            : isSpeaking
                                ? "border-cyan-500/50 bg-cyan-950/30 shadow-cyan-500/20"
                                : "border-blue-500/30 bg-blue-950/30 hover:border-blue-400/60 shadow-blue-500/10"
                            }`}
                    >
                        {isListening ? (
                            <Mic className="w-16 h-16 text-red-400" />
                        ) : isSpeaking ? (
                            <Volume2 className="w-16 h-16 text-orange-400" />
                        ) : (
                            <Mic className="w-16 h-16 text-orange-400/80 group-hover:text-orange-300 transition-colors" />
                        )}
                    </motion.div>

                    <p className="absolute -bottom-12 left-0 right-0 text-sm font-medium text-slate-500 uppercase tracking-widest">
                        {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Tap to Speak"}
                    </p>
                </div>

                {/* Captions Area */}
                <div className="min-h-[150px] w-full mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <AnimatePresence mode="wait">
                        {transcript && (
                            <motion.div
                                key="transcript"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 text-left"
                            >
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">You asked</span>
                                <p className="text-xl text-slate-200 font-light">"{transcript}"</p>
                            </motion.div>
                        )}

                        {response && (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-left mt-6 pt-6 border-t border-white/10"
                            >
                                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1">AI Response</span>
                                <p className="text-lg text-orange-100/90 leading-relaxed font-light">{response}</p>
                            </motion.div>
                        )}

                        {!transcript && !response && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full text-slate-600 gap-2"
                            >
                                <p>Try asking:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-slate-800 text-xs border border-slate-700">What is your superpower?</span>
                                    <span className="px-3 py-1 rounded-full bg-slate-800 text-xs border border-slate-700">Tell me your life story</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-950/50 text-red-200 text-sm rounded-lg border border-red-900/50">
                        Error: {error}
                    </div>
                )}

            </div>

            <footer className="absolute bottom-4 text-slate-600 text-xs z-10">
                Powered by Groq (Llama 3) & Web Speech API
            </footer>
        </main>
    );
}
