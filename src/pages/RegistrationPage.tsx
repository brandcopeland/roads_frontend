import React, { useState } from 'react';
import axios from 'axios';
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
    const [authData, setAuthData] = useState(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/register/', form);
            setAuthData(response.data);
            console.log('Register Response:', response.data);
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
