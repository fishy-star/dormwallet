import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import BalancesList from '@/components/shared/BalancesList';
import AddBillDialog from '@/components/shared/AddBillDialog';
import { Button } from '@/components/ui/Button';
import { Plus, ArrowLeft, Receipt, Users, CheckCircle } from 'lucide-react';

import GlitchText from '@/components/ui/GlitchText';
import Sparkles from '@/components/ui/Sparkles';
import HoloCard from '@/components/ui/HoloCard';
import LiquidButton from '@/components/ui/LiquidButton';

const Shared = () => {
    const { groups, addBill } = useFinance();
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [isAddBillOpen, setIsAddBillOpen] = useState(false);

    const activeGroup = groups.find(g => g.id === selectedGroupId);

    if (activeGroup) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedGroupId(null)} className="hover:text-primary">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <GlitchText text={activeGroup.name} className="text-2xl font-bold tracking-tight" />
                            <p className="text-sm text-muted-foreground font-mono">{activeGroup.members.length} MEMBERS // ACTIVE</p>
                        </div>
                    </div>
                    <Sparkles>
                        <LiquidButton onClick={() => setIsAddBillOpen(true)} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Bill
                        </LiquidButton>
                    </Sparkles>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <HoloCard>
                            <h3 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
                                <Receipt className="h-5 w-5" /> EXPENDITURE LOG
                            </h3>
                            <div className="space-y-2">
                                {activeGroup.bills.map((bill) => (
                                    <div key={bill.id} className="flex items-center justify-between border-b border-white/5 last:border-0 py-4 px-2 hover:bg-white/5 rounded-lg transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_10px_theme('colors.primary.DEFAULT')] transition-all">
                                                <Receipt className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{bill.title}</p>
                                                <p className="text-xs text-muted-foreground">{bill.paidBy} paid ₹{bill.amount} • {bill.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary font-mono text-lg">₹{bill.amount}</p>
                                        </div>
                                    </div>
                                ))}
                                {activeGroup.bills.length === 0 && (
                                    <div className="py-8 text-center text-muted-foreground opacity-50">NO DATA LOGGED</div>
                                )}
                            </div>
                        </HoloCard>
                    </div>

                    <div className="space-y-6">
                        <HoloCard>
                            <h3 className="font-bold mb-4 text-primary">Balances</h3>
                            <BalancesList group={activeGroup} />
                        </HoloCard>

                        <HoloCard className="border-secondary/30 bg-secondary/5">
                            <div className="p-2">
                                <h3 className="font-bold mb-2 text-secondary flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Settle Up?</h3>
                                <p className="text-sm opacity-90 mb-4 text-muted-foreground">Initiate protocol to clear outstanding debts.</p>
                                <Sparkles>
                                    <LiquidButton variant="secondary" className="w-full justify-center">Settlement Options</LiquidButton>
                                </Sparkles>
                            </div>
                        </HoloCard>
                    </div>
                </div>

                <AddBillDialog
                    isOpen={isAddBillOpen}
                    onClose={() => setIsAddBillOpen(false)}
                    members={activeGroup.members}
                    onAdd={(bill) => addBill(activeGroup.id, bill)}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <GlitchText text="Shared Utils" className="text-4xl font-bold tracking-tight mb-2 font-display" />
                    <p className="text-muted-foreground font-mono tracking-wide">GROUP SYNC PROTOCOLS</p>
                </div>
                <LiquidButton variant="secondary" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> New Group
                </LiquidButton>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groups.map(group => (
                    <div key={group.id} onClick={() => setSelectedGroupId(group.id)} className="cursor-pointer">
                        <HoloCard className="hover:border-primary/80 transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,255,255,0.1)] group-hover:shadow-[0_0_20px_theme('colors.primary.DEFAULT')] transition-shadow">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{group.name}</h3>
                                    <p className="text-xs text-muted-foreground font-mono">{group.members.length} MEMBERS</p>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-xs text-muted-foreground mb-1">Active Bills</p>
                                <p className="text-2xl font-bold font-mono text-foreground">{group.bills.length}</p>
                            </div>
                        </HoloCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shared;
