// components/Footer.js
import React from 'react';
import { FaGithub, FaGraduationCap, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-8 font-mono">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground mb-4">&copy; 2025 Noah Kasmanoff. All rights reserved.</p>
        <div className="flex justify-center items-center gap-6">
          <a 
            href="https://www.linkedin.com/in/noahkasmanoff" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaLinkedin className="text-xl" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a 
            href="https://github.com/nkasmanoff" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaGithub className="text-xl" />
            <span className="sr-only">GitHub</span>
          </a>
          <a 
            href="https://twitter.com/noahpunintended" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaTwitter className="text-xl" />
            <span className="sr-only">Twitter</span>
          </a>
          <a 
            href="https://scholar.google.com/citations?user=pzTcPxEAAAAJ&hl=en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaGraduationCap className="text-xl" />
            <span className="sr-only">Scholar</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
