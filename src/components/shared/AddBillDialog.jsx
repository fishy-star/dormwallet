import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { X, Split, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const AddBillDialog = ({ isOpen, onClose, onAdd, members }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [paidBy, setPaidBy] = useState('You');
    const [splitMode, setSplitMode] = useState('equal'); // 'equal' or 'auto'

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            title: description,
            amount: Number(amount),
            paidBy: paidBy,
            split: splitMode,
            date: new Date().toISOString().split('T')[0]
        });
        setAmount('');
        setDescription('');
        toast.success(splitMode === 'auto' ? "Bill added & auto-split calculated!" : "Shared bill added!");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Add Shared Bill</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Description</label>
                            <input
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="e.g. Electricity Bill"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                                <input
                                    required
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Paid By</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={paidBy}
                                onChange={e => setPaidBy(e.target.value)}
                            >
                                {members.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        <div className="flex gap-2 mt-2">
                            <div
                                className={`flex-1 rounded-lg border p-3 cursor-pointer transition-colors flex items-center justify-center gap-2 ${splitMode === 'equal' ? 'bg-primary/10 border-primary text-primary' : 'hover:bg-accent'}`}
                                onClick={() => setSplitMode('equal')}
                            >
                                <Split className="h-4 w-4" /> Equal
                            </div>
                            <div
                                className={`flex-1 rounded-lg border p-3 cursor-pointer transition-colors flex items-center justify-center gap-2 ${splitMode === 'auto' ? 'bg-primary/10 border-primary text-primary' : 'hover:bg-accent'}`}
                                onClick={() => setSplitMode('auto')}
                            >
                                <Wand2 className="h-4 w-4" /> Auto-Split
                            </div>
                        </div>

                        {splitMode === 'auto' && (
                            <p className="text-xs text-muted-foreground text-center">
                                AI will calculate shares based on past consumption history.
                            </p>
                        )}

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Add Bill</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AddBillDialog;
