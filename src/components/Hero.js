// components/Hero.js
import React from 'react';
import ReactGA from 'react-ga4';
import { Button } from './ui/button';

const Hero = () => {
    const handleResumeClick = () => {
        ReactGA.event({
            category: 'User Interaction',
            action: 'Click Resume',
            label: 'Hero Section',
        });
    };

    return (
        <section className="py-32 text-center font-mono">
            <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tighter text-foreground">
                Noah Kasmanoff
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-2xl mx-auto font-light">
                Data Scientist | Full Stack Developer | Machine Learning Engineer
            </p>
            <div className="flex justify-center space-x-4">
                <Button
                    className="text-lg px-8 py-6 rounded-full transition-all hover:scale-105"
                    asChild
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .querySelector('#projects')
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        View Projects
                    </a>
                </Button>
                <Button
                    variant="outline"
                    className="text-lg px-8 py-6 rounded-full transition-all hover:scale-105 border-foreground/20 hover:border-foreground"
                    asChild
                >
                    <a
                        href="https://drive.google.com/file/d/1DkaFCQA37sctRtrEZd25FE4KuGogT9Fc/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleResumeClick}
                    >
                        Resume
                    </a>
                </Button>
            </div>
        </section>
    );
};

export default Hero;
