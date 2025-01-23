// components/Header.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-4 px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b border-border">
      <nav className="flex justify-center items-center">
        <ul className="flex space-x-8">
          <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors text-xl font-medium">Projects</a></li>
          <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-xl font-medium">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;