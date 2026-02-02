import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const MonthlyWrap = ({ onClose }) => {
    const { totalSpent, savingsPots } = useFinance();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            >
                <div className="relative perspective-1000">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-12 right-0 text-white hover:bg-white/20"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                    </Button>

                    <motion.div
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="relative w-[340px] md:w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                        style={{
                            background: "linear-gradient(135deg, #003049 0%, #669bbc 100%)",
                            border: "2px solid rgba(255,255,255,0.2)"
                        }}
                    >
                        {/* Holographic Sheen Layer */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)",
                                backgroundSize: "200% 100%",
                                animation: "shine 3s infinite linear",
                                mixBlendMode: "overlay"
                            }}
                        />

                        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-white relative z-10">
                            <div className="mb-6 relative">
                                <div className="absolute inset-0 blur-xl bg-yellow-400/30 rounded-full animate-pulse" />
                                <Trophy className="h-20 w-20 text-yellow-400 relative z-10 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                            </div>

                            <h2 className="text-3xl font-bold mb-2 tracking-tight">Monthly Wrap</h2>
                            <p className="text-blue-100 mb-8">You crushed your finance goals!</p>

                            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                                    <p className="text-xs text-blue-200">Total Spent</p>
                                    <p className="text-xl font-bold">₹{totalSpent.toLocaleString()}</p>
                                </div>
                                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                                    <p className="text-xs text-blue-200">Savings Added</p>
                                    <p className="text-xl font-bold">₹800</p>
                                </div>
                            </div>

                            <div className="space-y-2 w-full">
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    <span className="text-sm font-medium">Top 5% Saver in Hostel</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <TrendingUp className="h-5 w-5 text-green-400" />
                                    <span className="text-sm font-medium">Reduced Food Cost by 12%</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Particles */}
                        <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                        <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-700" />

                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MonthlyWrap;
