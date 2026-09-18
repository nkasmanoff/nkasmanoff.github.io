// App.js
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Analytics from './components/Analytics';
import Footer from './components/Footer';
import Header from './components/Header';
import { routes } from './routes';

const ScrollToHash = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return null;
};

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

// The router itself is provided by whoever mounts App: BrowserRouter in
// src/index.js, StaticRouter in scripts/prerender.js.
function App() {
    return (
        <div className="min-h-screen bg-background">
            <Analytics />
            <Header />
            <main className="container mx-auto px-4">
                <ScrollToTop />
                <ScrollToHash />
                <Routes>
                    {routes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
