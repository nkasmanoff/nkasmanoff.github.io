// components/Header.js
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const isBlogPost = location.pathname.startsWith('/blog/');

    const handleNavigation = (sectionId) => {
        if (isBlogPost) {
            // If we're on a blog post, navigate to home with the section
            navigate(`/#${sectionId}`);
        } else if (location.pathname !== '/') {
            // If we're not on the home page, navigate to home with the section
            navigate(`/#${sectionId}`);
        } else if (location.hash) {
            // If we have a hash in the URL, update it
            navigate(`/#${sectionId}`);
        } else {
            // If we're on the home page with no hash, scroll to the section
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className="py-4 px-6 bg-white dark:bg-slate-900 sticky top-0 z-10 border-b border-border/40 shadow-md">
            <nav className="flex justify-center items-center">
                <ul className="flex space-x-8">
                    <li>
                        <button
                            onClick={() => handleNavigation('projects')}
                            className="text-muted-foreground hover:text-primary transition-colors text-xl font-medium"
                        >
                            Projects
                        </button>
                    </li>
                    <li>
                        <Link
                            to="/#blog"
                            className="text-muted-foreground hover:text-primary transition-colors text-xl font-medium"
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('contact')}
                            className="text-muted-foreground hover:text-primary transition-colors text-xl font-medium"
                        >
                            Contact
                        </button>
                    </li>
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
