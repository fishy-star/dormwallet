import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Wallet as WalletIcon, RefreshCw, Check, X, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const WalletConnect = () => {
    const { walletBalance, recurringBills, toggleAutoPay } = useFinance();

    const handleToggle = (id, currentStatus) => {
        toggleAutoPay(id);
        toast(currentStatus ? "Auto-pay disabled" : "Auto-pay enabled for recurring bill");
    };

    return (
        <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
                <div className="absolute right-0 top-0 h-32 w-32 bg-secondary/20 rounded-bl-full" />
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center">
                            <WalletIcon className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">Connected Wallet</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm opacity-80">Total Balance</p>
                        <h2 className="text-4xl font-bold">₹{walletBalance.toLocaleString()}</h2>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <Button variant="secondary" size="sm" className="text-primary font-bold">Top Up</Button>
                        <Button variant="outline" size="sm" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground">Scan & Pay</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-600" /> Auto-Pay Necessities
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recurringBills.map(bill => (
                        <div key={bill.id} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center border">
                                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium">{bill.name}</p>
                                    <p className="text-xs text-muted-foreground">₹{bill.amount} • Due {bill.date}</p>
                                </div>
                            </div>
                            <Button
                                variant={bill.autoPay ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleToggle(bill.id, bill.autoPay)}
                                className={bill.autoPay ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                                {bill.autoPay ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" />}
                                {bill.autoPay ? "Active" : "Enable"}
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default WalletConnect;
