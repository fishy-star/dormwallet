import React from 'react';
import { motion } from 'framer-motion';

const CyberCard = ({ children, className = "", hover = true, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            className={`
        relative bg-card/50 backdrop-blur-md border border-white/10 p-6 rounded-sm overflow-hidden
        ${hover ? 'hover:border-primary/50 transition-colors duration-300 group' : ''}
        ${className}
      `}
        >
            {/* Neon Glow Border Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_theme('colors.primary.DEFAULT')]" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-50" />
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

            {children}
        </motion.div>
    );
};

export default CyberCard;
