// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    return (
        <header className="navbar bg-header-bg py-4 px-6 flex justify-between items-center">
            <Link to="/" className="navbar-brand text-xl font-semibold">
                Платные дороги
            </Link>
            <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/roads" className="nav-link">
                    Дороги
                </Link>
                {/* <Link to="/payments" className="nav-link">
                    Сформированные оплаты
                </Link> */}
                 {/* <Link to="/payments" className="nav-link">
                    Сформированные оплаты
                </Link> */}
            </nav>
            <div className="burger-menu" onClick={toggleMenu}>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
            </div>
        </header>
    );
};

export default Navbar;
