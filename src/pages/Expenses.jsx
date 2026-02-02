import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import HoloCard from '@/components/ui/HoloCard';
import LiquidButton from '@/components/ui/LiquidButton';
import { Input } from '@/components/ui/Input';
import { Filter, Search, Trash2, Zap } from 'lucide-react';
import GlitchText from '@/components/ui/GlitchText';
import Sparkles from '@/components/ui/Sparkles';
import { motion, AnimatePresence } from 'framer-motion';
import ThermalFeedback from '@/components/ui/ThermalFeedback';

const ExplodingRow = ({ expense, onDelete, index }) => {
    const [isExploding, setIsExploding] = useState(false);

    const handleDelete = () => {
        setIsExploding(true);
        // Wait for animation to finish before actual delete
        setTimeout(() => {
            onDelete(expense.id);
        }, 800);
    };

    return (
        <AnimatePresence>
            {!isExploding ? (
                <motion.div
                    layout
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                        scale: 1.5,
                        rotate: Math.random() * 20 - 10,
                        opacity: 0,
                        filter: "blur(10px) brightness(2)",
                        height: 0,
                        marginBottom: 0,
                        transition: { duration: 0.5 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                    <HoloCard className="p-0 border-white/5 hover:border-primary/30">
                        <div className="flex items-center justify-between p-4 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors group-hover:animate-spin-slow">
                                    <span className="text-lg font-bold text-primary">₹</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{expense.title}</h3>
                                    <p className="text-sm text-muted-foreground">{expense.category} • {expense.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <span className="text-xl font-bold tracking-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">₹{expense.amount}</span>
                                <LiquidButton
                                    variant="secondary"
                                    className="px-3 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/100 hover:text-white transition-all duration-300"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </LiquidButton>
                            </div>
                        </div>
                    </HoloCard>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                        opacity: 0,
                        scale: [1, 2, 0],
                        x: [0, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 100 - 50, 0],
                        height: 0,
                        padding: 0,
                        margin: 0
                    }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex items-center justify-center overflow-hidden"
                >
                    <div className="text-red-500 font-bold text-2xl animate-ping">DELETED</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Expenses = () => {
    const { expenses, deleteExpense } = useFinance();
    const [filter, setFilter] = useState('');

    const filteredExpenses = expenses.filter(expense =>
        expense.title.toLowerCase().includes(filter.toLowerCase()) ||
        expense.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div>
                <GlitchText text="My Expenses" className="text-4xl font-bold tracking-tight mb-2 font-display" />
                <p className="text-muted-foreground font-mono tracking-wide">LOGGED TRANSACTIONS // HISTORY</p>
            </div>

            <div className="flex items-center gap-4 bg-card/20 p-4 rounded-xl border border-white/5 backdrop-blur-md">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <ThermalFeedback intensity={filter.length > 0 ? 'medium' : 'low'} className="rounded-lg">
                        <Input
                            placeholder="Search logs..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="pl-9 bg-black/40 border-transparent focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 transition-all rounded-lg h-10"
                        />
                    </ThermalFeedback>
                </div>
                <Sparkles>
                    <LiquidButton variant="secondary" className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </LiquidButton>
                </Sparkles>
            </div>

            <div className="grid gap-4">
                {filteredExpenses.map((expense, index) => (
                    <ExplodingRow
                        key={expense.id}
                        expense={expense}
                        index={index}
                        onDelete={deleteExpense}
                    />
                ))}

                {filteredExpenses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="inline-block p-4 rounded-full bg-white/5 mb-4 animate-bounce">
                            <Zap className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">No data found in current sector.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Expenses;
