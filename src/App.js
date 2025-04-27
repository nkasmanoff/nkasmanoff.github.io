// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './components/About';
import Analytics from './components/Analytics';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import FirstPost from './posts/first-post';
import { ThemeProvider } from './contexts/ThemeContext';

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

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="min-h-screen bg-background">
                    <Analytics />
                    <Header />
                    <main className="container mx-auto px-4">
                        <ScrollToHash />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Hero />
                                        <About />
                                        <Projects />
                                        <Blog />
                                        <Contact />
                                    </>
                                }
                            />
                            <Route path="/blog/notebook-copilot" element={<FirstPost />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
