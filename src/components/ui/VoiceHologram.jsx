import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles } from 'lucide-react';

const suggestions = [
    "Try cooking pasta to save ₹150",
    "You're spending 20% more on food this week",
    "Weekends are your highest spend days",
    "Netflix subscription renewing soon",
    "Check your shared bills, you owe ₹500"
];

const VoiceHologram = () => {
    const [activeSuggestion, setActiveSuggestion] = useState(suggestions[0]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsSpeaking(true);
            setActiveSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
            setTimeout(() => setIsSpeaking(false), 4000);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isSpeaking && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-4 mr-2 bg-card/80 backdrop-blur-xl border border-primary/50 text-cyan-200 p-3 rounded-xl shadow-[0_0_20px_theme('colors.primary.DEFAULT')] max-w-[200px] text-sm"
                    >
                        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-widest text-primary font-bold">
                            <Sparkles size={12} /> AI Insight
                        </div>
                        {activeSuggestion}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={{
                    boxShadow: isSpeaking
                        ? ["0 0 20px #00ffff", "0 0 40px #00ffff", "0 0 20px #00ffff"]
                        : "0 0 0px #00ffff",
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative h-16 w-16 rounded-full bg-black/50 border border-primary/50 flex items-center justify-center backdrop-blur-md pointer-events-auto cursor-pointer hover:border-primary"
                onClick={() => {
                    setIsSpeaking(true);
                    setTimeout(() => setIsSpeaking(false), 4000);
                }}
            >
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin-slow" />
                <div className="absolute inset-2 rounded-full border-b-2 border-secondary animate-spin-reverse" />
                <Mic className={`text-primary transition-all duration-300 ${isSpeaking ? 'scale-110' : 'scale-100'}`} />

                {/* Hologram Beam effect */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-8 h-32 bg-gradient-to-t from-primary/20 to-transparent blur-md pointer-events-none" />
            </motion.div>
        </div>
    );
};

export default VoiceHologram;
