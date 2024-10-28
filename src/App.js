import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Preloader from '../src/components/Pre';
import Home from './pages/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Project from './pages/Project';

function App() {
    const [load, upadateLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            upadateLoad(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            <Router>
                <Preloader load={load} />
                <div className="App" id={load ? 'no-scroll' : 'scroll'}>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/projects" element={<Project />}></Route>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
