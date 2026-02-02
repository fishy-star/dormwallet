import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
    // Dummy Data
    const [budget, setBudget] = useState(5000);
    const [expenses, setExpenses] = useState([
        { id: 1, title: 'Grocery Run', amount: 450, date: '2025-01-20', category: 'Food' },
        { id: 2, title: 'Notebooks', amount: 120, date: '2025-01-21', category: 'Education' },
        { id: 3, title: 'Uber to Mall', amount: 200, date: '2025-01-22', category: 'Transport' },
        { id: 4, title: 'Netflix Subscription', amount: 199, date: '2025-01-22', category: 'Entertainment' },
        { id: 5, title: 'Late Night Snack', amount: 80, date: '2025-01-23', category: 'Food' },
    ]);

    const [groups, setGroups] = useState([
        {
            id: 1,
            name: 'Room 304',
            members: ['You', 'Rahul', 'Sneha', 'Vikram'],
            bills: [
                { id: 101, title: 'Wifi Bill', amount: 600, paidBy: 'Rahul', split: 'equal', date: '2025-01-05' },
                { id: 102, title: 'Pizza Party', amount: 1200, paidBy: 'You', split: 'equal', date: '2025-01-15' },
            ]
        }
    ]);

    // New Features
    const [walletBalance, setWalletBalance] = useState(2500);
    const [savingsPots, setSavingsPots] = useState([
        { id: 1, name: 'Weekend Trip', target: 5000, current: 1500, deadline: '2025-02-15' },
        { id: 2, name: 'Birthday Fund', target: 2000, current: 800, deadline: '2025-03-01' }
    ]);
    const [weeklyLimit, setWeeklyLimit] = useState(1500);
    const [recurringBills, setRecurringBills] = useState([
        { id: 1, name: 'Spotify', amount: 119, date: '5th', autoPay: true },
        { id: 2, name: 'Phone Bill', amount: 299, date: '20th', autoPay: false }
    ]);

    // Friend Reliability (Private Data)
    const [friends, setFriends] = useState([
        { id: 1, name: 'Rahul', reliability: 'high', notes: 'Pays immediately via UPI' },
        { id: 2, name: 'Sneha', reliability: 'medium', notes: 'Needs one reminder usually' },
        { id: 3, name: 'Vikram', reliability: 'low', notes: 'Often delays, ask for split upfront' }
    ]);

    // AI Categorization Helper
    const suggestCategory = (title) => {
        const t = title.toLowerCase();
        if (t.includes('burger') || t.includes('pizza') || t.includes('coffee') || t.includes('tea') || t.includes('snack')) return 'Food';
        if (t.includes('grocery') || t.includes('vegetables') || t.includes('milk')) return 'Food';
        if (t.includes('uber') || t.includes('ola') || t.includes('cab') || t.includes('bus') || t.includes('metro')) return 'Transport';
        if (t.includes('netflix') || t.includes('spotify') || t.includes('movie')) return 'Entertainment';
        if (t.includes('book') || t.includes('pen') || t.includes('print')) return 'Education';
        if (t.includes('wifi') || t.includes('electricity') || t.includes('water')) return 'Utilities';
        return 'Other';
    };

    const addExpense = (expense) => {
        setExpenses(prev => [{ id: Date.now(), ...expense }, ...prev]);
        if (walletBalance >= expense.amount) {
            setWalletBalance(prev => prev - expense.amount);
        }
    };

    const addGroup = (group) => {
        setGroups(prev => [...prev, { ...group, id: Date.now(), bills: [] }]);
    };

    const addBill = (groupId, bill) => {
        setGroups(prev => prev.map(g => {
            if (g.id === groupId) {
                return { ...g, bills: [...g.bills, { ...bill, id: Date.now() }] };
            }
            return g;
        }));
    };

    const createSavingsPot = (pot) => {
        setSavingsPots(prev => [...prev, { ...pot, id: Date.now(), current: 0 }]);
    }

    const addToPot = (potId, amount) => {
        setSavingsPots(prev => prev.map(p => {
            if (p.id === potId && walletBalance >= amount) {
                setWalletBalance(b => b - amount);
                return { ...p, current: p.current + Number(amount) };
            }
            return p;
        }));
    }

    const toggleAutoPay = (id) => {
        setRecurringBills(prev => prev.map(bill =>
            bill.id === id ? { ...bill, autoPay: !bill.autoPay } : bill
        ));
    }

    // Derived state
    const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const remainingBalance = budget - totalSpent;

    return (
        <FinanceContext.Provider value={{
            budget,
            setBudget,
            expenses,
            addExpense,
            groups,
            addGroup,
            addBill,
            totalSpent,
            remainingBalance,
            walletBalance,
            savingsPots,
            createSavingsPot,
            addToPot,
            weeklyLimit,
            setWeeklyLimit,
            recurringBills,
            toggleAutoPay,
            friends,
            suggestCategory
        }}>
            {children}
        </FinanceContext.Provider>
    );
};
