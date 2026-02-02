import React from 'react';
import { motion } from 'framer-motion';

const defaultMessages = [
    "⚠ SPENDING ALERT: COFFEE BUDGET EXCEEDED",
    "⚡ SYSTEM OPTIMAL: SAVINGS GOAL ON TRACK",
    "⚠ DETECTED NEW SUBSCRIPTION: NETFLIX",
    "⚡ CRYPTO WALLET CONNECTED: ETH +2.4%",
    "⚠ RENT DUE IN 3 DAYS: PREPARE FUNDS"
];

const HoloBanner = ({ messages = defaultMessages, className = "" }) => {
    return (
        <div className={`relative w-full overflow-hidden bg-black/40 border-y border-primary/20 backdrop-blur-sm h-10 flex items-center select-none ${className}`}>
            {/* Moving Stream */}
            <motion.div
                className="flex whitespace-nowrap gap-16 items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {[...messages, ...messages].map((msg, i) => (
                    <div key={i} className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
                        <span className="text-secondary animate-pulse">■</span>
                        <span className="font-mono text-sm tracking-widest text-primary/80 group-hover:drop-shadow-[0_0_8px_theme('colors.primary.DEFAULT')]">
                            {msg}
                        </span>
                    </div>
                ))}
            </motion.div>

            {/* Static Glitch Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,255,0.05)_50%,transparent_100%)] animate-scan-fast pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
    );
};

export default HoloBanner;
