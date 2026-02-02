import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import BudgetOverview from '@/components/dashboard/BudgetOverview';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import AddExpenseDialog from '@/components/dashboard/AddExpenseDialog';
import MonthlyWrap from '@/components/dashboard/MonthlyWrap';
import WalletConnect from '@/components/wallet/WalletConnect';
// import { Button } from '@/components/ui/Button'; // Replaced by LiquidButton
import LiquidButton from '@/components/ui/LiquidButton';
import { Plus, Gift } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'; // Replaced by HoloCard
import { Toaster, toast } from 'sonner';
import Reminders from '@/components/common/Reminders';

import GlitchText from '@/components/ui/GlitchText';
import Sparkles from '@/components/ui/Sparkles';
import { useTheme } from '@/context/ThemeContext';
import VoiceHologram from '@/components/ui/VoiceHologram';
import HoloCard from '@/components/ui/HoloCard';

import { motion } from 'framer-motion';
import HoloBanner from '@/components/ui/HoloBanner';
import Interactive3D from '@/components/ui/Interactive3D';
import ThermalFeedback from '@/components/ui/ThermalFeedback';
import FinancialPulse from '@/components/dashboard/FinancialPulse';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const Dashboard = () => {
    const { budget, addExpense, weeklyLimit, totalSpent } = useFinance();
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [showHologram, setShowHologram] = useState(false);
    const { cyberLevel } = useTheme();

    const percentage = Math.min((totalSpent / budget) * 100, 100);
    const thermalIntensity = percentage > 90 ? 'critical' : percentage > 75 ? 'high' : percentage > 50 ? 'medium' : 'low';

    return (
        <motion.div
            className="space-y-6 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Interactive3D />
            <Toaster position="top-right" theme="dark" />
            <Reminders />
            <VoiceHologram />

            <HoloBanner className="mb-4 rounded-xl border border-primary/20" />

            {showHologram && <MonthlyWrap onClose={() => setShowHologram(false)} />}

            <div className="flex items-center justify-between relative z-10">
                <div>
                    <GlitchText text="Dashboard" className="text-5xl font-bold tracking-tight mb-2 font-display" />
                    <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
                        System Status: <span className="text-primary drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">Connected</span> // Level: {cyberLevel}%
                    </p>
                </div>
                <div className="flex gap-4">
                    <Sparkles>
                        <LiquidButton variant="secondary" onClick={() => setShowHologram(true)} className="flex items-center gap-2">
                            <Gift className="h-4 w-4" /> Monthly Wrap
                        </LiquidButton>
                    </Sparkles>
                    <Sparkles>
                        <LiquidButton onClick={() => setIsAddExpenseOpen(true)} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Expense
                        </LiquidButton>
                    </Sparkles>
                </div>
            </div>

            <AddExpenseDialog
                isOpen={isAddExpenseOpen}
                onClose={() => setIsAddExpenseOpen(false)}
                onAdd={addExpense}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 h-full relative z-10">
                <div className="col-span-4 space-y-6 h-full flex flex-col">
                    <motion.div variants={itemVariants} className="flex-1">
                        <ThermalFeedback intensity={thermalIntensity}>
                            <BudgetOverview />
                        </ThermalFeedback>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <FinancialPulse />
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex-[2]">
                        <RecentTransactions />
                    </motion.div>
                </div>
                <div className="col-span-3 space-y-6 flex flex-col">
                    <motion.div variants={itemVariants}>
                        <WalletConnect />
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex-1">
                        <ExpenseChart />
                    </motion.div>
                </div>
            </div>

            <HoloBanner messages={["SYSTEM OPTIMIZED", "NO THREATS DETECTED", "KEEP SAVING"]} className="mt-8 rounded-xl border border-secondary/20" />
        </motion.div>
    );
};

export default Dashboard;
