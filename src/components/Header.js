// components/Header.js
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isBlogPost = location.pathname.startsWith('/blog/');

    const handleNavigation = (sectionId) => {
        if (isBlogPost) {
            navigate(`/#${sectionId}`);
        } else if (location.pathname !== '/') {
            navigate(`/#${sectionId}`);
        } else if (location.hash) {
            navigate(`/#${sectionId}`);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className="py-4 px-6 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/40 font-mono">
            <nav className="flex justify-center items-center">
                <ul className="flex space-x-8 items-center">
                    <li>
                        <button
                            onClick={() => handleNavigation('projects')}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                        >
                            Projects
                        </button>
                    </li>
                    <li>
                        <Link
                            to="/#blog"
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('contact')}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                        >
                            Contact
                        </button>
                    </li>
                    <li>
                        <a
                            href="https://drive.google.com/file/d/1DkaFCQA37sctRtrEZd25FE4KuGogT9Fc/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium flex items-center gap-1"
                        >
                            <FaFileAlt className="text-sm" />
                            <span>Resume</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
