import React, { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

const Sparkles = ({ children, className = "" }) => {
    const triggerSpark = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 15,
            spread: 30,
            origin: { x, y },
            colors: ['#00FFFF', '#FF1A8C', '#FFFF00'], // Cyan, Pink, Yellow
            disableForReducedMotion: true,
            scalar: 0.5,
            drift: 0,
            ticks: 50
        });
    };

    return (
        <div
            onMouseEnter={triggerSpark}
            className={`inline-block cursor-none ${className}`}
        >
            {children}
        </div>
    );
};

export default Sparkles;
