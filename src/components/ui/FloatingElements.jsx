import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Coffee, BookOpen, Heart, Wallet } from 'lucide-react';

const icons = [
    { Icon: Coins, color: 'text-yellow-400', x: '10%', y: '20%', delay: 0 },
    { Icon: Coffee, color: 'text-orange-400', x: '80%', y: '15%', delay: 2 },
    { Icon: BookOpen, color: 'text-blue-400', x: '20%', y: '80%', delay: 4 },
    { Icon: Heart, color: 'text-pink-400', x: '85%', y: '70%', delay: 1 },
    { Icon: Wallet, color: 'text-primary', x: '50%', y: '50%', delay: 3 },
];

const FloatingElements = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {/* Background Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary/20"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: 0.1
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        width: Math.random() * 4 + 2 + 'px',
                        height: Math.random() * 4 + 2 + 'px',
                    }}
                />
            ))}

            {/* Floating Icons */}
            {icons.map(({ Icon, color, x, y, delay }, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${color} opacity-20`}
                    initial={{ x: 0, y: 0 }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 6,
                        delay: delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ left: x, top: y }}
                >
                    <Icon size={48} />
                </motion.div>
            ))}

            {/* Aurora Gradient */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000" />
        </div>
    );
};

export default FloatingElements;
