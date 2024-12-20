// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { loginUser } from '../redux/authSlice';
import Navbar from '../components/Navbar';
import '../components/Auth.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap(); // Асинхронный вызов с unwrap
      navigate('/roads'); // Успешный переход
    } catch (err) {
      console.error('Ошибка авторизации:', err); // Логирование ошибки
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
        <button className="auth-button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
        {error && <p className="auth-error">Ошибка: {error}</p>}
      </div>
    </>
  );
};

export default LoginPage;
