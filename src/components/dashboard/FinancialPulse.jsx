import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useFinance } from '@/context/FinanceContext';
import { TrendingUp, AlertTriangle, CheckCircle, BrainCircuit, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const FinancialPulse = () => {
    const { totalSpent, budget, expenses } = useFinance();
    const percentage = (totalSpent / budget) * 100;

    // "Why am I broke?" Logic
    const highSpendCategory = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
    }, {});

    // Sort to find highest
    const sortedCategories = Object.entries(highSpendCategory).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories.length > 0 ? sortedCategories[0] : ['None', 0];

    const alerts = [];
    if (percentage > 80) alerts.push({ type: 'danger', message: 'You are consuming funds too fast!' });
    if (topCategory[0] === 'Food') alerts.push({ type: 'warning', message: 'You spent a lot on Food. Try cooking?' });
    if (topCategory[0] === 'Transport') alerts.push({ type: 'info', message: 'Transport costs are high. Walk more?' });

    return (
        <div className="space-y-6">
            <div className="relative overflow-hidden rounded-xl border border-red-500/20 bg-gradient-to-br from-red-900/10 to-black p-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <AlertTriangle className="h-32 w-32 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-red-400 mb-2 flex items-center gap-2">
                    <Zap className="h-6 w-6" /> Why am I broke?
                </h2>
                <p className="text-muted-foreground z-10 relative">
                    You have spent <span className="text-red-400 font-mono font-bold">₹{totalSpent}</span> out of <span className="text-green-400 font-mono">₹{budget}</span>.
                </p>

                <div className="mt-6 space-y-4 relative z-10">
                    {alerts.map((alert, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-white/10">
                            {alert.type === 'danger' && <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />}
                            {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                            {alert.type === 'info' && <BrainCircuit className="h-5 w-5 text-blue-500 mt-0.5" />}
                            <div>
                                <p className="text-sm font-semibold text-foreground">{alert.message}</p>
                                <p className="text-xs text-muted-foreground">Based on your recent activity.</p>
                            </div>
                        </div>
                    ))}
                    {alerts.length === 0 && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-900/10 border border-green-500/20">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <p className="text-sm font-semibold text-green-400">You are actually doing great! Keep it up.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-black/40 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Top Spending Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">{topCategory[0]}</div>
                        <p className="text-sm text-muted-foreground">₹{topCategory[1]} spent this month</p>
                    </CardContent>
                </Card>
                <Card className="bg-black/40 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Daily Average</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-secondary">₹{Math.round(totalSpent / 20)}</div>
                        <p className="text-sm text-muted-foreground">Recommended: ₹{Math.round(budget / 30)}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FinancialPulse;
