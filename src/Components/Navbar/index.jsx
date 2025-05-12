import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarSup from '../NavbarSup';
import NavbarInf from '../NavbarInf';
import './styles.css';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
    const handleScroll = () => {
        const isScrolled = window.scrollY > 1;
        console.log("ScrollY:", window.scrollY, "| scrolled:", isScrolled);
        setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecuta al montar

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, []);


    // Determina la clase según scroll y si está en home
    const navbarClass = isHome
        ? scrolled ? 'navbar scrolled' : 'navbar'
        : 'navbar scrolled';

    return (
        <nav className={navbarClass}>
            <NavbarSup />
            <NavbarInf />
        </nav>
    );
}

export default Navbar;
