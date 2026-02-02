import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LiquidButton = ({ children, className, onClick, variant = "primary" }) => {
    const isPrimary = variant === "primary";

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-lg px-6 py-2 font-semibold uppercase tracking-wider backdrop-blur-sm transition-all duration-300",
                isPrimary
                    ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_theme('colors.primary.DEFAULT')] hover:bg-primary/30"
                    : "bg-secondary/20 text-secondary border border-secondary/50 shadow-[0_0_15px_theme('colors.secondary.DEFAULT')] hover:bg-secondary/30",
                className
            )}
        >
            <span className="relative z-10">{children}</span>

            {/* Liquid Ripple Background (simplified as a gradient sweep for now) */}
            <div className="absolute inset-0 -z-10 translate-y-[100%] bg-gradient-to-t from-white/20 to-transparent transition-transform duration-300 group-hover:translate-y-0" />
        </motion.button>
    );
};

export default LiquidButton;
