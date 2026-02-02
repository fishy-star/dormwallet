import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const COLORS = ['#00FFFF', '#FF00CC', '#B026FF', '#FFFF00', '#00FF00', '#FF4500'];

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
    const RADIAN = Math.PI / 180;
    const midAngle = (startAngle + endAngle) / 2;
    const sx = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
    const sy = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);

    return (
        <g>
            <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={fill} className="text-xl font-bold font-mono">
                {payload.name}
            </text>
            <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#fff" className="text-sm font-light">
                {`₹${value}`}
            </text>
            <sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 6}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                className="drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            />
            <sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 8}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${sx},${sy}`} stroke={fill} fill="none" />
        </g>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/80 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <p className="text-primary font-bold text-lg">{payload[0].name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: payload[0].fill }} />
                    <span className="text-white font-mono">₹{payload[0].value}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    {((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}% of total
                </p>
            </div>
        );
    }
    return null;
};

const ExpenseChart = () => {
    const { expenses } = useFinance();
    const [view, setView] = useState('basic');
    const [activeIndex, setActiveIndex] = useState(0);
    const [monthView, setMonthView] = useState('current'); // 'current' or 'last'

    // Mock Last Month Data
    const lastMonthData = [
        { name: 'Food', value: 4500 },
        { name: 'Transport', value: 1200 },
        { name: 'Entertainment', value: 3000 },
        { name: 'Utilities', value: 800 }
    ];

    // Current Data Logic
    const currentData = Object.values(expenses.reduce((acc, curr) => {
        const cat = curr.category || 'Other';
        if (!acc[cat]) acc[cat] = { name: cat, value: 0 };
        acc[cat].value += Number(curr.amount);
        return acc;
    }, {}));

    // Calculate total for percentages
    const activeData = monthView === 'current' ? currentData : lastMonthData;
    const total = activeData.reduce((sum, item) => sum + item.value, 0);
    const finalData = activeData.map(item => ({ ...item, total }));

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <Card className="h-full overflow-hidden relative group perspective-1000 border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center" />

            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-lg flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                        Spending Breakdown
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    </span>
                    <span className="text-xs font-normal text-muted-foreground font-mono">
                        {monthView === 'current' ? 'THIS MONTH' : 'LAST MONTH'}
                    </span>
                </CardTitle>
                <div className="flex bg-secondary/20 rounded-lg p-1 gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-7 px-2 text-xs font-mono rounded-md transition-all ${monthView === 'current' ? 'bg-primary text-black shadow-[0_0_10px_rgba(0,255,255,0.4)]' : 'hover:bg-white/10'}`}
                        onClick={() => setMonthView('current')}
                    >
                        NOW
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-7 px-2 text-xs font-mono rounded-md transition-all ${monthView === 'last' ? 'bg-secondary text-white shadow-[0_0_10px_rgba(176,38,255,0.4)]' : 'hover:bg-white/10'}`}
                        onClick={() => setMonthView('last')}
                    >
                        PREV
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="h-[250px] w-full mt-2 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={finalData}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={90}
                                dataKey="value"
                                stroke="none"
                                onMouseEnter={onPieEnter}
                                animationBegin={0}
                                animationDuration={1000}
                                animationEasing="ease-out"
                            >
                                {finalData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="stroke-background stroke-2"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {finalData.slice(0, 4).map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                            <span className="text-muted-foreground">{entry.name}</span>
                        </div>
                    ))}
                    {finalData.length > 4 && (
                        <div className="px-2 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider text-muted-foreground">
                            +{finalData.length - 4} More
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ExpenseChart;
