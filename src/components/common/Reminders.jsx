import React, { useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { toast } from 'sonner';

const Reminders = () => {
    const { groups, totalSpent, budget, weeklyLimit } = useFinance();

    useEffect(() => {
        // 1. Debt Logic
        let iOwe = 0;
        let owedToMe = 0;

        groups.forEach(group => {
            group.bills.forEach(bill => {
                const splitAmount = bill.amount / group.members.length; // Assuming equal split for now based on current mock
                if (bill.paidBy === 'You') {
                    // I paid, so (members - 1) people owe me
                    owedToMe += splitAmount * (group.members.length - 1);
                } else {
                    // Someone else paid, I owe my share
                    iOwe += splitAmount;
                }
            });
        });

        // Debounce/Delay to not overwhelm on load
        const timer = setTimeout(() => {
            // Debt Reminders
            if (iOwe > 500) {
                toast.error(`Pay Up! You owe a total of ₹${iOwe.toFixed(0)} to your friends.`, {
                    description: "Better settle up before things get awkward.",
                    duration: 6000,
                });
            }

            if (owedToMe > 1000) {
                toast.info(`You are owed ₹${owedToMe.toFixed(0)}!`, {
                    description: "Don't forget to ask for your money back.",
                    duration: 6000,
                });
            }

            // Budget Reminders
            const percentage = (totalSpent / budget) * 100;
            if (percentage > 90) {
                toast.warning("Critical Balance Alert", {
                    description: `You've used ${percentage.toFixed(0)}% of your monthly budget!`,
                    duration: 8000,
                });
            } else if (percentage > 75) {
                toast.warning("Slow down!", {
                    description: "You've crossed 75% of your budget.",
                    duration: 5000,
                });
            }

        }, 2000); // 2 second delay after mount

        return () => clearTimeout(timer);
    }, [groups, totalSpent, budget]);

    return null; // Headless component
};

export default Reminders;
