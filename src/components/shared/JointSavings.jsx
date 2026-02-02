import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PiggyBank, Plus, Target } from 'lucide-react';
import { toast } from 'sonner';

const JointSavings = () => {
    const { savingsPots, addToPot, walletBalance } = useFinance();
    const [contribution, setContribution] = useState(100);

    const handleContribute = (id) => {
        if (walletBalance < contribution) {
            toast.error("Insufficient wallet balance!");
            return;
        }
        addToPot(id, contribution);
        toast.success(`Ajded ₹${contribution} to pot!`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">Joint Savings Pots</h2>
                <Button size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" /> New Pot
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {savingsPots.map(pot => {
                    const progress = Math.min((pot.current / pot.target) * 100, 100);
                    return (
                        <Card key={pot.id} className="overflow-hidden">
                            <CardHeader className="pb-2 bg-secondary/10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-base">{pot.name}</CardTitle>
                                        <p className="text-xs text-muted-foreground">Target: ₹{pot.target.toLocaleString()}</p>
                                    </div>
                                    <PiggyBank className="h-5 w-5 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex justify-between text-sm font-medium mb-1">
                                    <span>₹{pot.current.toLocaleString()}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden mb-4">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="w-full"
                                        onClick={() => handleContribute(pot.id)}
                                    >
                                        Add ₹100
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default JointSavings;
