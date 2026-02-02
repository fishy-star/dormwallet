import React from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, className = "", as: Component = "h1" }) => {
    return (
        <div className={`relative inline-block group ${className}`}>
            <Component className="relative z-10">{text}</Component>

            {/* Glitch Layer 1 - Red/Cyan Shift */}
            <Component
                className="absolute top-0 left-0 -z-10 w-full opacity-0 group-hover:opacity-100 animate-pulse text-red-500 translate-x-[2px]"
                aria-hidden="true"
            >
                {text}
            </Component>
            <Component
                className="absolute top-0 left-0 -z-10 w-full opacity-0 group-hover:opacity-100 animate-pulse delay-75 text-cyan-500 -translate-x-[2px]"
                aria-hidden="true"
            >
                {text}
            </Component>
        </div>
    );
};

export default GlitchText;
