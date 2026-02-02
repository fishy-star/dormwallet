import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFinance } from './FinanceContext';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const { savingsPots, walletBalance } = useFinance();
    const [cyberLevel, setCyberLevel] = useState(0);
    const [hueShift, setHueShift] = useState(0);

    useEffect(() => {
        // Calculate total wealth
        const totalSavings = savingsPots.reduce((acc, pot) => acc + pot.current, 0);
        const totalWealth = walletBalance + totalSavings;

        // Gamification Logic:
        // Level 0-100 based on wealth. Max wealth for full effects = 50,000 (arbitrary goal)
        const maxWealth = 50000;
        const progress = Math.min(totalWealth / maxWealth, 1);

        setCyberLevel(Math.floor(progress * 100));

        // Shift Hue based on progress
        // Start at Cyan (180), shift towards Purple (280) and then Red/Gold as they get richer
        const shiftAmount = progress * 100; // Shift up to 100 degrees
        setHueShift(shiftAmount);

        // Update CSS Variables dynamically
        const root = document.documentElement;

        // Dynamic Primary Color
        // Base is 180 (Cyan). We shift it.
        const newPrimaryHue = 180 + shiftAmount;
        root.style.setProperty('--primary', `${newPrimaryHue} 100% 50%`);

        // Dynamic Glow Intensity
        const glowIntensity = 10 + (progress * 20); // 10px to 30px
        root.style.setProperty('--neon-glow', `0 0 ${glowIntensity}px hsl(${newPrimaryHue}, 100%, 50%), 0 0 ${glowIntensity * 2}px hsl(${newPrimaryHue}, 100%, 50%)`);

    }, [savingsPots, walletBalance]);

    return (
        <ThemeContext.Provider value={{ cyberLevel, hueShift }}>
            {children}
        </ThemeContext.Provider>
    );
};
