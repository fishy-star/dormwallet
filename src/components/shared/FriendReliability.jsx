import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Lock, Check, AlertTriangle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const FriendReliability = () => {
    const { friends } = useFinance();

    const getStatus = (reliability) => {
        switch (reliability) {
            case 'high': return { icon: check, color: 'text-green-500', bg: 'bg-green-100', text: 'Pays on time' };
            case 'medium': return { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-100', text: 'Often delays' };
            case 'low': return { icon: RefreshCcw, color: 'text-red-500', bg: 'bg-red-100', text: 'Needs reminders' };
            default: return { icon: check, color: 'text-gray-500', bg: 'bg-gray-100', text: 'Unknown' };
        }
    };

    return (
        <Card className="border-l-4 border-l-primary/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
                <Lock className="h-24 w-24" />
            </div>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Reliability Score
                    <span className="text-xs font-normal text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded-full">Private</span>
                </CardTitle>
                <CardDescription>Only visible to you. Helps with reminder tones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {friends.map((friend) => {
                    const status = getStatus(friend.reliability);
                    const Icon = status.icon;

                    return (
                        <motion.div
                            key={friend.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-background/50 border hover:shadow-sm transition-all"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                                    {friend.name[0]}
                                </div>
                                <div>
                                    <p className="font-medium">{friend.name}</p>
                                    <p className="text-xs text-muted-foreground">{friend.notes}</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                                <Icon className="h-3 w-3" />
                                {status.text}
                            </div>
                        </motion.div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default FriendReliability;
