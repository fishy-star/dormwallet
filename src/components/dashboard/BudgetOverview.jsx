import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import HoloCard from '@/components/ui/HoloCard';
import GhostNumber from '@/components/ui/GhostNumber';

const BudgetOverview = () => {
    const { budget, totalSpent, remainingBudget, weeklyLimit } = useFinance();
    const percentage = Math.min((totalSpent / budget) * 100, 100);

    return (
        <HoloCard>
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg text-muted-foreground tracking-widest uppercase mb-1">Total Balance</h3>
                    <div className="text-5xl font-bold text-primary font-display tracking-tight drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                        <GhostNumber value={remainingBudget} prefix="₹" />
                    </div>
                    <p className="text-sm text-muted-foreground font-mono mt-2 opacity-80">
                        / TARGET: ₹{budget}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget Usage</span>
                        <span className="text-foreground font-mono">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 w-full bg-secondary/10 rounded-full overflow-hidden border border-secondary/20">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out shadow-[0_0_10px_theme('colors.primary.DEFAULT')]"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Spent</p>
                        <p className="text-2xl font-bold text-foreground">
                            <GhostNumber value={totalSpent} prefix="₹" />
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Weekly Limit</p>
                        <div className="flex items-center gap-2">
                            <input
                                className="text-2xl font-bold text-accent bg-transparent border-none w-24 focus:ring-0 p-0"
                                value={weeklyLimit}
                                onChange={(e) => setWeeklyLimit(Number(e.target.value))}
                                type="number"
                            />
                            <span className="text-xs text-muted-foreground">(Edit)</span>
                        </div>
                    </div>
                </div>
            </div>
        </HoloCard>
    );
};

export default BudgetOverview;
