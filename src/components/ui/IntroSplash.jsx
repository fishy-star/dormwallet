import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

const IntroSplash = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 1000); // Logo Fade In
        const timer2 = setTimeout(() => setStep(2), 2500); // Slide Out / Complete

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={step === 2 ? { y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } } : {}}
            onAnimationComplete={() => {
                if (step === 2) onComplete && onComplete();
            }}
        >
            <div className="relative">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <GlitchText text="DormWallet" className="text-6xl md:text-8xl font-black tracking-tighter mix-blend-difference" />
                </motion.div>

                {/* Cyberpunk Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10 scale-150" />

                {/* Subtitle Reveal */}
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute -bottom-12 left-0 right-0 text-center"
                        >
                            <p className="text-lg text-primary font-mono tracking-[0.5em] uppercase glow-text">
                                System Initializing...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Loading Bar */}
            <div className="absolute bottom-20 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary shadow-[0_0_15px_theme('colors.primary.DEFAULT')]"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
};

export default IntroSplash;
