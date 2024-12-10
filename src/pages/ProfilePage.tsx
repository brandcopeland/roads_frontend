// src/pages/Profile.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../components/ProfilePage.css';

const ProfilePage = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        // Логика для изменения пароля (например, API запрос)
        alert('Пароль изменен!');
        navigate('/'); // Перенаправление на главную страницу
    };

    return (
        <>
        <Navbar />
        <div className="profile-container">
            <h2>Личный кабинет</h2>
            <form onSubmit={handlePasswordChange} className="profile-form">
                <div className="form-group">
                    <label htmlFor="email">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите ваш email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="current-password">Текущий пароль</label>
                    <input
                        type="password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Введите текущий пароль"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="new-password">Новый пароль</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Введите новый пароль"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Подтвердите новый пароль</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Подтвердите новый пароль"
                    />
                </div>
                <button type="submit" className="profile-button">Изменить пароль</button>
            </form>
        </div>
        </>
    );
};

export default ProfilePage;
