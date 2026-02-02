import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Receipt, ArrowRight } from 'lucide-react';

const GroupCard = ({ group, onView }) => {
    const totalBills = group.bills.length;
    const totalAmount = group.bills.reduce((sum, bill) => sum + Number(bill.amount), 0);

    // Calculate relative debt/credit for "You" roughly for display
    // In a real app, this logic is complex (graph simplification). 
    // Here we just mock it or show simpler aggregates.
    const myPaid = group.bills.filter(b => b.paidBy === 'You').reduce((sum, b) => sum + Number(b.amount), 0);
    const myShare = totalAmount / group.members.length; // Assuming equal split for overview
    const balance = myPaid - myShare;

    return (
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={onView}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{group.name}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{group.members.length} Members</p>
                        <div className="flex -space-x-2 overflow-hidden">
                            {group.members.map((member, i) => (
                                <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                                    {member[0]}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Your Balance</p>
                        <p className={`text-lg font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {balance >= 0 ? '+' : ''}₹{Math.abs(balance).toFixed(0)}
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-secondary/20 p-3">
                <div className="flex items-center w-full justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Receipt className="h-3 w-3" /> {totalBills} Bills</span>
                    <Button variant="ghost" size="sm" className="h-6 gap-1">View Details <ArrowRight className="h-3 w-3" /></Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default GroupCard;
