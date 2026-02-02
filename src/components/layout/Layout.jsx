import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Wallet,
    Users,
    Zap,
    Menu,
    X,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const SidebarItem = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )
        }
    >
        <Icon className="h-5 w-5" />
        {label}
    </NavLink>
);

import FloatingElements from '@/components/ui/FloatingElements';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // We can access theme info if we want to display the "Cyber Level" in the header
    // import { useTheme } from '@/context/ThemeContext';
    // const { cyberLevel } = useTheme(); 

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen w-full bg-transparent font-sans text-foreground overflow-hidden selection:bg-primary/30 selection:text-primary relative">
            <FloatingElements /> {/** 3D Background */}

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/80 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Glass Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-white/5 bg-card/10 backdrop-blur-xl px-4 py-6 transition-transform duration-300 md:relative md:flex md:translate-x-0 shadow-[0_0_40px_rgba(0,0,0,0.5)]",
                    !isSidebarOpen && "-translate-x-full"
                )}
            >
                <div className="mb-8 flex items-center justify-between px-2 group">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_theme('colors.primary.DEFAULT')] group-hover:shadow-[0_0_30px_theme('colors.primary.DEFAULT')] transition-shadow duration-500">
                            <Wallet className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight uppercase" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                            Dorm<span className="text-primary drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">Wallet</span>
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-primary" onClick={toggleSidebar}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsSidebarOpen(false)} />
                    <SidebarItem to="/expenses" icon={Wallet} label="My Expenses" onClick={() => setIsSidebarOpen(false)} />
                    <SidebarItem to="/shared" icon={Users} label="Shared Utils" onClick={() => setIsSidebarOpen(false)} />
                    <SidebarItem to="/insights" icon={Zap} label="Smart Insights" onClick={() => setIsSidebarOpen(false)} />
                </nav>

                <div className="mt-auto">
                    <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-primary/5 p-4 backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shine delay-1000" />
                        <h4 className="mb-1 text-sm font-semibold text-primary font-mono tracking-widest">SYSTEM TIP //</h4>
                        <p className="text-xs text-muted-foreground">Save 10% more by cooking dinner twice a week!</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto w-full relative">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-transparent px-6 backdrop-blur-sm">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="ml-auto flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative hover:bg-white/5 rounded-full transition-colors">
                            <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_theme('colors.accent.DEFAULT')]" />
                        </Button>
                        <div className="h-9 w-9 rounded-full border border-white/20 bg-gradient-to-br from-primary/80 to-secondary/80 cursor-pointer shadow-[0_0_20px_theme('colors.primary.DEFAULT')] hover:scale-110 transition-transform" />
                    </div>
                </header>

                <div className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10 w-full max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
