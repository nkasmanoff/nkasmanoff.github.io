// components/Hero.js
import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="py-20 text-center">
      <h1 className="text-6xl font-bold mb-4 text-foreground">Hi! I'm Noah</h1>
      <p className="text-3xl mb-8 text-muted-foreground">Data Scientist | Full Stack Developer | Machine Learning Engineer</p>
      <div className="flex justify-center space-x-4">
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-lg px-6 py-2" 
          asChild
        >
          <a href="#projects" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          }}>View Projects</a>
        </Button>
        <Button 
          variant="outline" 
          className="border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_0_var(--primary-glow,0px)_var(--primary)] hover:shadow-[0_0_20px_var(--primary-glow,2px)_var(--primary)] relative after:absolute after:inset-0 after:z-[-1] after:bg-gradient-to-r after:from-primary/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity text-lg px-6 py-2" 
          asChild
        >
          <a href="https://drive.google.com/file/d/1DkaFCQA37sctRtrEZd25FE4KuGogT9Fc/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume →</a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;