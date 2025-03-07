// components/Header.js
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-4 px-6 bg-background/90 backdrop-blur-md sticky top-0 z-10 border-b border-border/40 shadow-md">
      <nav className="flex justify-center items-center">
        <ul className="flex space-x-8">
          <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors text-xl font-medium">Projects</a></li>
          <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-xl font-medium">Contact</a></li>
          <li>
            <a 
              href="https://drive.google.com/file/d/1DkaFCQA37sctRtrEZd25FE4KuGogT9Fc/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors text-xl font-medium flex items-center gap-1"
            >
              <FaFileAlt className="text-lg" />
              <span>Resume</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;