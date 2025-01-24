// components/Footer.js
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white z-100 border-t border-border/40 shadow-md py-4">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 Noah Kasmanoff. All rights reserved.</p>
        <div className="mt-2 flex justify-center items-center gap-4">
          <a 
            href="https://www.linkedin.com/in/noahkasmanoff" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <FaLinkedin className="text-xl" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://github.com/nkasmanoff" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <FaGithub className="text-xl" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://twitter.com/noahpunintended" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <FaTwitter className="text-xl" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;