import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../../pages/style.css';

function Header() {
    const [expand, updateExpanded] = useState(false);
    const [navColour, updateNavbar] = useState(false);

    function scrollHandler() {
        if (window.scrollY >= 20) {
            updateNavbar(true);
        } else {
            updateNavbar(false);
        }
    }

    window.addEventListener('scroll', scrollHandler);

    return (
        <Navbar
            expanded={expand}
            fixed="top"
            expand="md"
            className={navColour ? 'sticky' : 'navbar'}
        >
            <Navbar.Toggle
                className="navbar-toggler"
                aria-controls="responsive-navbar-nav"
                onClick={() => {
                    updateExpanded(expand ? false : 'expanded');
                }}
            >
                <span></span>
                <span></span>
                <span></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav" className="responsive-navbar">
                <Nav className="ms-auto" defaultActiveKey="#home">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                            {' '}
                            Home{' '}
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link as={Link} to="/projects" onClick={() => updateExpanded(false)}>
                            Projects
                        </Nav.Link>
                    </Nav.Item>

                    <Button
                        onClick={() => {
                            window.open(
                                'https://drive.google.com/file/d/1DkaFCQA37sctRtrEZd25FE4KuGogT9Fc/view?usp=sharing',
                            );
                        }}
                        className="resumebtn"
                    >
                        <span>Resume</span>
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
