import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = 20 / 2;

const HoloCard = ({ children, className = "", onClick, ...props }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const [isFlashed, setIsFlashed] = useState(false);

    const handleClick = (e) => {
        setIsFlashed(true);
        setTimeout(() => setIsFlashed(false), 200);
        if (onClick) onClick(e);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={`relative h-full w-full rounded-xl border border-white/10 bg-card/10 backdrop-blur-md transition-all duration-200 hover:shadow-[0_0_50px_-12px_rgba(0,255,255,0.3)] group ${className}`}
        >
            {/* Flash Overlay */}
            <div
                className={`absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-100 ${isFlashed ? 'opacity-20' : 'opacity-0'}`}
                style={{ borderRadius: 'inherit' }}
            />

            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 grid place-content-center rounded-xl bg-transparent"
            >
                {/* Internal content is passed as children, usually placed here or outside depending on layout needs */}
                {/* Note: In this specific implementation, we might want children to be less deeply nested for layout flexibility.
              Let's adjust to wrap children directly but give them 3D depth.
          */}
            </div>

            <div className="relative h-full w-full p-6 [transform-style:preserve-3d]">
                <div className="[transform:translateZ(20px)] w-full h-full">
                    {children}
                </div>
            </div>

            {/* Holographic Border Gradient */}
            <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
        </motion.div>
    );
};

export default HoloCard;
