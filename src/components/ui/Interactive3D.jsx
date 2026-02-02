import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Coins, Pizza, Smartphone, Gamepad2, Rocket } from 'lucide-react';

const objects = [
    { id: 1, Icon: Pizza, color: 'text-orange-500', x: '15%', y: '25%', size: 64 },
    { id: 2, Icon: Coins, color: 'text-yellow-400', x: '85%', y: '15%', size: 56 },
    { id: 3, Icon: Gamepad2, color: 'text-purple-500', x: '10%', y: '75%', size: 48 },
    { id: 4, Icon: Smartphone, color: 'text-blue-400', x: '90%', y: '65%', size: 52 },
    { id: 5, Icon: Rocket, color: 'text-red-500', x: '50%', y: '90%', size: 72 },
];

const FloatingObject = ({ obj }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    return (
        <motion.div
            style={{
                left: obj.x,
                top: obj.y,
                x: x,
                y: y,
                rotateX: rotateX,
                rotateY: rotateY,
                zIndex: 0
            }}
            className={`absolute cursor-pointer perspective-1000 ${obj.color}`}
            onMouseMove={handleMouse}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            whileHover={{ scale: 1.2, rotate: 15, zIndex: 10 }}
            whileTap={{ scale: 0.8, rotate: -15 }}
            animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
            }}
            transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
            onClick={() => {
                // "Explode" animation could be triggered here via state if needed, keeping simple "bounce" for now
            }}
        >
            <div className="relative group">
                <div className="absolute inset-0 bg-current blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
                <obj.Icon
                    size={obj.size}
                    strokeWidth={1.5}
                    className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                />
            </div>
        </motion.div>
    );
};

const Interactive3D = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {objects.map(obj => (
                <div key={obj.id} className="pointer-events-auto">
                    <FloatingObject obj={obj} />
                </div>
            ))}
        </div>
    );
};

export default Interactive3D;
