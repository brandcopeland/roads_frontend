// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="navbar bg-header-bg py-4 px-6 flex justify-between items-center">
            <Link to="/" className="navbar-brand text-xl font-semibold">
                Платные дороги
            </Link>
            <nav className="space-x-4">
                {/* <Link to="/payments" className="hover:text-gray-300">Корзина</Link> */}
                <div className="hover:text-gray-300">Корзина</div>
            </nav>
        </header>
    );
};

export default Navbar;
