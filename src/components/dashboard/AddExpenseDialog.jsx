import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { X, Calendar as CalendarIcon, Wand2 } from 'lucide-react';

const AddExpenseDialog = ({ isOpen, onClose, onAdd }) => {
    const { suggestCategory } = useFinance();
    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Food');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            title,
            amount: Number(amount),
            category,
            date
        });
        setAmount('');
        setTitle('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Log Expense</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Smart Entry (AI)</label>
                            <div className="relative group">
                                <Wand2 className="absolute left-3 top-3 h-4 w-4 text-primary animate-pulse" />
                                <textarea
                                    required
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 group-hover:border-primary/50"
                                    placeholder="e.g. Spent 250 on mess for lunch"
                                    value={title}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setTitle(val);

                                        // Smart Detection Logic
                                        const amountMatch = val.match(/(\d+)/);
                                        if (amountMatch) setAmount(amountMatch[0]);

                                        const lowerVal = val.toLowerCase();
                                        if (lowerVal.includes('mess') || lowerVal.includes('food') || lowerVal.includes('pizza') || lowerVal.includes('burger')) setCategory('Food');
                                        else if (lowerVal.includes('uber') || lowerVal.includes('ola') || lowerVal.includes('cab') || lowerVal.includes('auto')) setCategory('Transport');
                                        else if (lowerVal.includes('movie') || lowerVal.includes('netflix') || lowerVal.includes('game')) setCategory('Entertainment');
                                        else if (lowerVal.includes('book') || lowerVal.includes('course') || lowerVal.includes('print')) setCategory('Education');
                                        else if (lowerVal.includes('rent') || lowerVal.includes('wifi') || lowerVal.includes('bill')) setCategory('Utilities');
                                    }}
                                />
                                <div className="absolute right-2 bottom-2">
                                    <span className="text-[10px] uppercase tracking-wider text-primary font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                        Analyzing...
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Detected Value</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                                    <input
                                        required
                                        type="number"
                                        className={`flex h-10 w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring transition-all duration-500 ${amount ? 'border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : ''}`}
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Detected Category</label>
                                <select
                                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring transition-all duration-500 ${category !== 'Other' ? 'border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : ''}`}
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Education">Education</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Education">Education</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Save Expense</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AddExpenseDialog;
