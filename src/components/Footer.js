// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-gray-300 py-8 border-t border-slate-200 dark:border-cyan-500/20">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 Noah Kasmanoff. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://www.linkedin.com/in/noahkasmanoff" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 dark:text-cyan-400 dark:hover:text-cyan-300 mx-2">LinkedIn</a>
          <a href="https://github.com/nkasmanoff" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 dark:text-cyan-400 dark:hover:text-cyan-300 mx-2">GitHub</a>
          <a href="https://twitter.com/noahpunintended" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 dark:text-cyan-400 dark:hover:text-cyan-300 mx-2">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;