import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ThermalFeedback = ({
    children,
    intensity = 'low', // low, medium, high, critical
    className
}) => {
    const getIntensityStyles = () => {
        switch (intensity) {
            case 'critical':
                return {
                    container: "border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.4)]",
                    overlay: "bg-red-500/10 mix-blend-overlay",
                    animate: { scale: [1, 1.02, 1], filter: ["blur(0px)", "blur(1px)", "blur(0px)"] }
                };
            case 'high':
                return {
                    container: "border-orange-500 shadow-[0_0_20px_rgba(255,165,0,0.3)]",
                    overlay: "bg-orange-500/5 mix-blend-overlay",
                    animate: { scale: [1, 1.01, 1] }
                };
            case 'medium':
                return {
                    container: "border-yellow-500 shadow-[0_0_15px_rgba(255,255,0,0.2)]",
                    overlay: "bg-yellow-500/5 mix-blend-overlay",
                    animate: {}
                };
            default: // low or safe (cool blue)
                return {
                    container: "border-blue-500/30",
                    overlay: "bg-blue-500/5 mix-blend-overlay",
                    animate: {}
                };
        }
    };

    const styles = getIntensityStyles();

    return (
        <motion.div
            className={cn("relative overflow-hidden rounded-xl border transition-all duration-500", styles.container, className)}
            animate={styles.animate}
            transition={{ duration: 0.2, repeat: intensity === 'critical' ? Infinity : 0, repeatDelay: 0.1 }}
        >
            <div className={`absolute inset-0 pointer-events-none z-0 ${styles.overlay}`} />

            {/* Heat Haze Distortion (Simulated) */}
            {intensity === 'critical' && (
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 bg-repeat animate-grain pointer-events-none z-10 mix-blend-screen" />
            )}

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default ThermalFeedback;
