// src/pages/ProfilePage.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/authSlice';
import { AppDispatch } from '../redux/store'; // Импортируем AppDispatch для типизации dispatch

import Navbar from '../components/Navbar';
import '../components/ProfilePage.css';

const ProfilePage = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>(); // Указываем тип dispatch
    const navigate = useNavigate();

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        // Отправка данных для обновления
        dispatch(updateUser({ email, currentPassword, newPassword, confirmPassword }))
            .then((result) => {
                if (updateUser.fulfilled.match(result)) {
                    alert('Данные успешно обновлены!');
                    navigate('/'); // Перенаправление после успешного обновления
                }
            })
            .catch((error: any) => {  // Указываем тип ошибки как 'any'
                alert('Ошибка обновления данных: ' + error.message);
            });
    };

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <h2 className="profile-title">Личный кабинет</h2>
                <form onSubmit={handlePasswordChange} className="profile-form">
                    <div className="profile-form-group">
                        <label htmlFor="email">Электронная почта</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите ваш email"
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="current-password">Текущий пароль</label>
                        <input
                            type="password"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Введите текущий пароль"
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="new-password">Новый пароль</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Введите новый пароль"
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="confirm-password">Подтвердите новый пароль</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Подтвердите новый пароль"
                        />
                    </div>
                    <button type="submit" className="profile-button">Изменить данные</button>
                </form>
            </div>
        </>
    );
};

export default ProfilePage;
