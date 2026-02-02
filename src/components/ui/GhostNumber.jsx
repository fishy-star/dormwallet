import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GhostNumber = ({ value, prefix = "", className = "" }) => {
    const [displayValue, setDisplayValue] = useState(value);
    const [ghosts, setGhosts] = useState([]);
    const prevValue = useRef(value);

    useEffect(() => {
        if (prevValue.current !== value) {
            // Create a ghost of the old value
            const id = Date.now();
            setGhosts(prev => [...prev, { id, value: prevValue.current }]);

            // Update display value
            setDisplayValue(value);
            prevValue.current = value;

            // Clean up ghost after animation
            setTimeout(() => {
                setGhosts(prev => prev.filter(g => g.id !== id));
            }, 1000);
        }
    }, [value]);

    return (
        <div className={`relative inline-block ${className}`}>
            <span className="relative z-10">{prefix}{displayValue}</span>

            <AnimatePresence>
                {ghosts.map(ghost => (
                    <motion.span
                        key={ghost.id}
                        initial={{ opacity: 0.8, y: 0, scale: 1, filter: "blur(0px)" }}
                        animate={{ opacity: 0, y: -20, scale: 1.5, filter: "blur(4px)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-0 left-0 text-primary pointer-events-none select-none"
                    >
                        {prefix}{ghost.value}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default GhostNumber;
