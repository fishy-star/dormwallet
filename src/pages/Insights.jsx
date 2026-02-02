import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { TrendingUp, AlertTriangle, CheckCircle, BrainCircuit, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

import GlitchText from '@/components/ui/GlitchText';

const Insights = () => {
    const { budget, totalSpent, expenses } = useFinance();
    const percentage = (totalSpent / budget) * 100;

    // Simulation of daily spending trend
    const dailyData = [
        { day: 'Mon', amount: 120 },
        { day: 'Tue', amount: 80 },
        { day: 'Wed', amount: 250 },
        { day: 'Thu', amount: 90 },
        { day: 'Fri', amount: 400 },
        { day: 'Sat', amount: 150 },
        { day: 'Sun', amount: 300 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <GlitchText text="Smart Insights" className="text-3xl font-bold tracking-tight mb-2" />
                <p className="text-muted-foreground font-mono">AI-powered analytics for your wallet.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground border-primary/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg text-primary">
                            <BrainCircuit className="h-5 w-5" /> Prediction
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {percentage > 90 ? (
                            <p className="text-2xl font-bold text-red-500">Risk of Overdraft!</p>
                        ) : (
                            <p className="text-2xl font-bold text-green-400">On Track</p>
                        )}
                        <p className="text-sm opacity-80 mt-1 text-muted-foreground">
                            You are projected to {percentage > 90 ? 'exceed' : 'save'} your budget by end of month based on current trends.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Highest Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-secondary">Food</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg Daily Spend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">₹{Math.round(totalSpent / 20)}</div> {/* Mock current date 20th */}
                        <p className="text-xs text-muted-foreground">Recommended: ₹{Math.round(budget / 30)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Savings Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-accent">₹500</div>
                        <div className="w-full bg-secondary/20 h-2 mt-2 rounded-full overflow-hidden">
                            <div className="bg-accent h-full w-[45%] shadow-[0_0_10px_theme('colors.accent.DEFAULT')]"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Spending Trend (Last 7 Days)</CardTitle>
                        <CardDescription>You spent more on weekends.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dailyData}>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: 'black', borderColor: '#333', color: 'white', borderRadius: '4px' }}
                                    />
                                    <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500 bg-yellow-500/5">
                    <CardHeader>
                        <CardTitle className="text-yellow-500">Actionable Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Food expenses are high</h4>
                                <p className="text-sm text-muted-foreground">You've visited cafes 4 times this week. Try the hostel mess for a few days to save ~₹500.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                                <CheckCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Subscription Alert</h4>
                                <p className="text-sm text-muted-foreground">Your Netflix subscription renews in 3 days. Ensure you have balance.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* NEW: Savings Opportunities */}
            <div className="grid gap-6">
                <Card className="bg-gradient-to-r from-emerald-900/10 to-teal-900/10 border-emerald-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-emerald-400">
                            <Wallet className="h-5 w-5" /> Where you can save
                        </CardTitle>
                        <CardDescription>Based on your recent spending habits</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                        <div className="bg-black/40 p-4 rounded-sm border border-emerald-500/20 shadow-sm hover:border-emerald-500/50 transition-colors">
                            <h4 className="font-semibold text-emerald-300 mb-1">Cook vs Eat Out</h4>
                            <p className="text-sm text-muted-foreground">You spent ₹850 on dinner last week. Cooking pasta could save you ~₹600.</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-sm border border-emerald-500/20 shadow-sm hover:border-emerald-500/50 transition-colors">
                            <h4 className="font-semibold text-emerald-300 mb-1">Bulk Buying</h4>
                            <p className="text-sm text-muted-foreground">Buying snacks daily cost ₹200. A weekly grocery run would cost ₹120.</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-sm border border-emerald-500/20 shadow-sm hover:border-emerald-500/50 transition-colors">
                            <h4 className="font-semibold text-emerald-300 mb-1">Transport</h4>
                            <p className="text-sm text-muted-foreground">Taking 'Ola' 3 times cost ₹450. The metro would have cost ₹60.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Insights;
