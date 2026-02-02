import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const BalancesList = ({ group }) => {
    // Simplified logic: Everyone owes equally for now
    // Real logic would require a proper debt simplification algorithm

    const totalAmount = group.bills.reduce((sum, bill) => sum + Number(bill.amount), 0);
    const perPerson = totalAmount / group.members.length;

    // Calculate net balances
    const balances = group.members.map(member => {
        const paid = group.bills.filter(b => b.paidBy === member).reduce((sum, b) => sum + Number(b.amount), 0);
        return { member, net: paid - perPerson };
    });

    const owers = balances.filter(b => b.net < 0).sort((a, b) => a.net - b.net);
    const owed = balances.filter(b => b.net > 0).sort((a, b) => b.net - a.net);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Who Owes Who</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {owers.length === 0 && owed.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center">All settled up!</p>
                ) : (
                    <div className="space-y-3">
                        {owers.map((ower, i) => {
                            // Simplified matching logic (just visualization suitable for demo)
                            // Matches first ower to top owed. 
                            const target = owed[0]; // Just picking first for demo simplicity
                            if (!target) return null;

                            return (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                                            {ower.member[0]}
                                        </div>
                                        <span className="font-medium">{ower.member}</span>
                                    </div>
                                    <div className="flex flex-col items-center px-2">
                                        <span className="text-xs text-muted-foreground">owes</span>
                                        <div className="h-[1px] w-12 bg-border relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-border rotate-45 border-r border-t border-muted-foreground"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-right">{target.member}</span>
                                        <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                                            {target.member[0]}
                                        </div>
                                    </div>
                                    <div className="font-bold ml-2">₹{Math.abs(ower.net).toFixed(0)}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default BalancesList;
