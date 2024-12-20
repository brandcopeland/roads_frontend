// src/pages/RegistrationPage.tsx
import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'; // Импортируем тип Dispatch
import { registerUser } from '../redux/authSlice';
import Navbar from '../components/Navbar';
import '../components/Auth.css';

const RegistrationPage: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch<AppDispatch>(); // Указываем тип Dispatch


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleRegister = async () => {
        try {
            const actionResult = await dispatch(registerUser(form));
            if (registerUser.fulfilled.match(actionResult)) {
                console.log('Register Response:', actionResult.payload);
            }
        } catch (error) {
            console.error('Register Error:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <h2 className="auth-title">Регистрация</h2>
                <div className="auth-inputs">
                    <input
                        type="text"
                        name="username"
                        placeholder="Логин"
                        value={form.username}
                        onChange={handleChange}
                        className="auth-input"
                    />
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Имя"
                        value={form.first_name}
                        onChange={handleChange}
                        className="auth-input"
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Фамилия"
                        value={form.last_name}
                        onChange={handleChange}
                        className="auth-input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="auth-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        className="auth-input"
                    />
                </div>
                <button className="auth-button" onClick={handleRegister}>
                    Зарегистрироваться
                </button>
            </div>
        </>
    );
};

export default RegistrationPage;
