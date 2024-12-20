import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

import { logoutUser } from "../redux/authSlice.tsx";
import { fetchRoads, setQuery } from "../redux/roadsSlice.tsx";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, username } = useSelector((state: RootState) => state.auth);
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Переключение состояния меню
    const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

    // Логаут пользователя
    const handleLogout = async () => {
        const result = await dispatch(logoutUser());
        if (logoutUser.fulfilled.match(result)) {
            dispatch(fetchRoads("")); // Очищаем дороги
            dispatch(setQuery("")); // Сбрасываем поисковый запрос
            navigate("/login"); // Перенаправляем на страницу логина
        }
    };

    return (
        <header className="navbar bg-header-bg py-4 px-6 flex justify-between items-center">
            <Link to="/" className="navbar-brand text-xl font-semibold">
                Платные дороги
            </Link>

            <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                <Link to="/roads" className="nav-link">
                    Дороги
                </Link>

                {isAuthenticated ? (
                    <>
                        <Link to="/payments-list" className="nav-link">
                            Список оплат
                        </Link>
                        <Link to="/profile" className="nav-link">
                            Личный кабинет ({username})
                        </Link>
                        <Link to="/roads" onClick={handleLogout} className="nav-link">
                            Выйти
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">
                            Войти
                        </Link>
                        <Link to="/register" className="nav-link">
                            Регистрация
                        </Link>
                    </>
                )}
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
