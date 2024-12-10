import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../components/Auth.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authData, setAuthData] = useState(null);

    const handleLogin = async () => {
        try {
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
            setAuthData(response.data);
            console.log('Login Response:', response.data);

            // Доступ к cookie через document.cookie
            console.log('Session ID:', document.cookie);
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
