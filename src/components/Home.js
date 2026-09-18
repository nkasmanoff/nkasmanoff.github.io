// components/Home.js
import React from 'react';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Blog from './Blog';
import Contact from './Contact';

// The landing page: every top-level section stacked in order.
const Home = () => (
    <>
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
    </>
);

export default Home;
