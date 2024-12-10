import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice'; // Import login action
import Cookie from 'js-cookie';
import Navbar from '../components/Navbar';
import '../components/Auth.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Error state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            Cookie.remove('csrftoken');
            Cookie.remove('sessionid');
            const response = await axios.post(
                'http://localhost:8000/api/users/login/',
                {
                    username,
                    password,
                },
                {
                    withCredentials: true, // Включает отправку и получение cookie
                }
            );

            console.log('Login Response:', response.data);

            let is_staff = false;
            if (response.data.staff === true) {
                is_staff = true;
            }
            dispatch(login({ username, is_staff }));
            navigate('/roads');
            // // Доступ к cookies через document.cookie
            // const cookies = document.cookie;
            // const sessionId = cookies
            //     .split('; ')
            //     .find(cookie => cookie.startsWith('session_id='))
            //     ?.split('=')[1];

            // if (sessionId) {
            //     // Сохраняем session_id в localStorage
            //     localStorage.setItem('session_id', sessionId);
            //     console.log('Session ID сохранён в localStorage:', sessionId);
            // } else {
            //     console.warn('Session ID не найден в cookies.');
            // }
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <h2 className="auth-title">Вход</h2>
                <div className="auth-inputs">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="auth-input"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                    />
                </div>
                <button className="auth-button" onClick={handleLogin}>
                    Войти
                </button>
            </div>
        </>
    );
};

export default LoginPage;
