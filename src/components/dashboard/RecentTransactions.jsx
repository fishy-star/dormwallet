import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import HoloCard from '@/components/ui/HoloCard';
import { ShoppingBag, BookOpen, Car, Coffee, Music, Zap } from 'lucide-react';

const getIcon = (category) => {
    switch (category) {
        case 'Food': return <Coffee className="h-5 w-5 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />;
        case 'Transport': return <Car className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />;
        case 'Education': return <BookOpen className="h-5 w-5 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]" />;
        case 'Entertainment': return <Music className="h-5 w-5 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />;
        case 'Utilities': return <Zap className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />;
        default: return <ShoppingBag className="h-5 w-5 text-gray-400" />;
    }
};

const RecentTransactions = () => {
    const { expenses } = useFinance();

    return (
        <HoloCard className="h-full">
            <h3 className="text-xl font-bold tracking-tight mb-4 text-primary">Recent Activity</h3>
            <div className="space-y-4">
                {expenses.slice(0, 5).map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
                                {getIcon(expense.category)}
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none text-foreground group-hover:text-primary transition-colors">{expense.title}</p>
                                <p className="text-xs text-muted-foreground">{expense.date}</p>
                            </div>
                        </div>
                        <div className="font-semibold text-sm text-foreground">
                            -₹{expense.amount}
                        </div>
                    </div>
                ))}
                {expenses.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">No recent activity detected.</div>
                )}
            </div>
        </HoloCard>
    );
};

export default RecentTransactions;
