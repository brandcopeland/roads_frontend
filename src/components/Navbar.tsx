// src/components/Navbar.tsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import {setQuery, setRoads} from '../redux/threatsSlice'

import { logout } from "../redux/authSlice.tsx";
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { RootState } from "../redux/store";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, username } = useSelector((state) => state.auth); // Получаем данные о пользователе из Redux состояния
    const roadsAdded = useSelector((state: RootState) => state.roads.roads_added);



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    const handleLogout = async () => {
        
        try {
            
            const response = await axios.post(
                'http://localhost:8000/api/users/logout/',
                {}, // Тело запроса (если пустое, передаём пустой объект)
                {
                    withCredentials:true
                }
            );
    
            console.log(response.status, response.data)
            if (response.status === 200) {
                dispatch(setRoads([]));
                dispatch(setQuery(''))
                dispatch(logout()); // Вызываем экшен для логута в Redux
                navigate('/login'); // Перенаправляем на страницу логина
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            alert('Ошибка при выходе. Пожалуйста, попробуйте позже.');
        }
    };

    return (
        <header className="navbar bg-header-bg py-4 px-6 flex justify-between items-center">
            <Link to="/" className="navbar-brand text-xl font-semibold">
                Платные дороги
            </Link>
            <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/roads" className="nav-link">
                    Дороги
                </Link>
                
                {isAuthenticated ? (
                    <>
                    
                    <Link to="/payments-list" className="nav-link">
                    Список оплат
                    </Link>

                    <Link to="/payment" className="nav-link">
                    Корзина ({roadsAdded})
                    </Link>
                    
                    <Link to="/profile" className="nav-link">
                        Личный кабинет ({username})
                    </Link>

                    <Link to="/roads" onClick={handleLogout} className="nav-link">
                            Выйти
                        </Link>
                    </>
                    
                ) : (
                    // Отображаем кнопки "Войти" и "Регистрация" для неавторизованных
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
