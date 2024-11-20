// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
    return (
        <div className="wrapper1 home-page">
            <Navbar />
            <main className="main-content">
                <div className="background-image"></div> {/* Фоновая картинка */}
                <h1 className="page-title">Платные дороги</h1>
                <div className="button-container">
                    <Link to="/roads" className="btn btn-left">
                        Дороги
                    </Link>
                    {/* <Link to="/payments" className="btn btn-right">
                        Сформированные оплаты
                    </Link> */}
                    <div  className="btn btn-right">
                        Сформированные оплаты
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
