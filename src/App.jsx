import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import { ThemeProvider } from './context/ThemeContext';
import IntroSplash from './components/ui/IntroSplash';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Shared from './pages/Shared';
import Insights from './pages/Insights';

function App() {
    const [showIntro, setShowIntro] = React.useState(true);

    return (
        <FinanceProvider>
            <ThemeProvider>
                {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="expenses" element={<Expenses />} />
                            <Route path="shared" element={<Shared />} />
                            <Route path="insights" element={<Insights />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </FinanceProvider>
    );
}

export default App;
