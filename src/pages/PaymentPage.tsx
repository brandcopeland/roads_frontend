// src/pages/PaymentPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RoadCard from '../components/RoadCard';

interface Payment {
    date: string;
    number: string;
    roads: {
        id: number;
        name: string;
        speed: number;
        image: string;
    }[];
}

const PaymentPage: React.FC = () => {
    const [payment, setPayment] = useState<Payment | null>(null);

    useEffect(() => {
        // Загрузка данных о платежах через API или использование мок-данных
        setPayment({
            date: '2024-11-18',
            number: 'A123BC',
            roads: [
                { id: 1, name: 'Дорога 1', speed: 60, image: 'http://localhost:9000/images/1.png' },
                { id: 2, name: 'Дорога 2', speed: 80, image: 'http://localhost:9000/images/2.png' }
            ],
        });
    }, []);

    if (!payment) {
        return <div className="text-center my-5">Загрузка данных...</div>;
    }

    return (
        <div className="wrapper">
            <Navbar />
            <main className="container">
                <h3 className="text-center">Проезд</h3>
                <p>Дата проезда: {payment.date}</p>
                <p>Номер машины: {payment.number}</p>

                <h4 className="text-center">Дороги</h4>
                <div className="cards-wrapper d-flex flex-column">
                    {payment.roads.map((road) => (
                        <RoadCard key={road.id} road={road} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PaymentPage;
