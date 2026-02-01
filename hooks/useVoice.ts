import { useState, useEffect, useRef, useCallback } from "react";

// Add support for the Web Speech API in TypeScript
declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

export function useVoice() {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Setup Speech Recognition
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = "en-US";

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);
                recognition.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                    setError(`Microphone Error: ${event.error}`);
                    setIsListening(false);
                };
                recognition.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    setTranscript(text);
                    handleUserQuery(text);
                };

                recognitionRef.current = recognition;
            } else {
                setError("Browser does not support Speech Recognition.");
            }

            // Setup Speech Synthesis
            if (window.speechSynthesis) {
                synthRef.current = window.speechSynthesis;

                // Pre-load voices (Chrome needs this)
                const loadVoices = () => {
                    synthRef.current?.getVoices();
                };
                loadVoices();
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (!synthRef.current) {
            console.error("SpeechSynthesis not found");
            return;
        }

        // Cancel current speech to avoid overlap
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Explicitly set voice
        const voices = synthRef.current.getVoices();
        // Try to find a good sounding voice
        const preferredVoice = voices.find(
            (v) =>
                (v.name.includes("Google") && v.name.includes("English")) ||
                v.name.includes("Samantha") ||
                v.lang === "en-US"
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log("Using voice:", preferredVoice.name);
        } else {
            console.log("Using default voice");
        }

        // Add logging for speech events
        utterance.onstart = () => {
            console.log("Speech started");
            setIsSpeaking(true);
        };
        utterance.onend = () => {
            console.log("Speech ended");
            setIsSpeaking(false);
        };
        utterance.onerror = (e) => {
            console.error("Speech error", e);
            setIsSpeaking(false);
            setError("Audio output failed. Check browser permissions.");
        };

        console.log("Speaking:", text);
        synthRef.current.speak(utterance);
    }, []);

    const handleUserQuery = async (query: string) => {
        try {
            console.log("Sending query:", query);
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: query }),
            });

            const data = await res.json();
            console.log("API Response:", data);

            if (data.reply) {
                setResponse(data.reply);
                speak(data.reply);
            } else if (data.error) {
                setError(data.error);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            const fallback = "Sorry, I can't connect to the server right now.";
            setResponse(fallback);
            speak(fallback);
        }
    };

    const startListening = () => {
        setError(null);
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Start error:", e);
            }
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    return {
        isListening,
        isSpeaking,
        transcript,
        response,
        error,
        startListening,
        stopListening,
    };
}
