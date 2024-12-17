// src/pages/PaymentPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import Navbar from '../components/Navbar';

interface Payment {
    date: string;
    number: string;
    roads: {
        id: number;
        name: string;
        speed: number;
        image: string;
        day_night: boolean; // Added to track day/night status
    }[];
}

const PaymentPage: React.FC = () => {
    const [payment, setPayment] = useState<Payment | null>(null);
    const draft_payment_id = useSelector((state: RootState) => state.roads.draft_payment_id);

    useEffect(() => {
        fetchPayment();
    }, []);

    const fetchPayment = async () => {
        try {
            const response = await axios.get<Payment>(
                `http://localhost:8000/api/payments/${draft_payment_id}/`,
                { withCredentials: true }
            );
            setPayment(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке данных о платеже:', err);
        }
    };

    const updateDayNightStatus = async (roadId: number, currentStatus: boolean) => {
        try {
            const updatedStatus = !currentStatus; // Toggle between true/false
            await axios.put(
                `http://localhost:8000/api/payments/${draft_payment_id}/update_road/${roadId}/`,
                { day_night: updatedStatus },
                { withCredentials: true }
            );
            fetchPayment(); // Refresh the payment data after the update
        } catch (error) {
            console.error('Ошибка при обновлении статуса день/ночь:', error);
        }
    };

    const deleteRoadFromPayment = async (roadId: number) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/payments/${draft_payment_id}/delete_road/${roadId}/`,
                { withCredentials: true }
            );
            fetchPayment();
        } catch (error) {
            console.error('Ошибка при удалении дороги из оплаты:', error);
        }
    };

    if (!payment) {
        return <div className="payment-loading">Загрузка данных...</div>;
    }

    return (
        <div className="payment-wrapper">
            <Navbar />
            <main className="payment-container">
                <div className="payment-header">
                    <h3 className="payment-title">Список заявок</h3>
                </div>

                <div className="payment-details">
                    <p><strong>Дата проезда:</strong> {payment.date}</p>
                    <p><strong>Номер машины:</strong> {payment.number}</p>
                </div>

                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Скорость</th>
                            <th>Изображение</th>
                            <th>День/Ночь</th> {/* Added column for day/night */}
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment.roads.map((road) => (
                            <tr key={road.id}>
                                <td>{road.name}</td>
                                <td>{road.speed} км/ч</td>
                                <td><img src={road.image} alt={road.name} className="payment-road-image" /></td>
                                <td>
                                    <button
                                        className="payment-toggle-btn"
                                        onClick={() => updateDayNightStatus(road.id, road.day_night)}
                                    >
                                        {road.day_night ? 'День' : 'Ночь'}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="payment-delete-btn"
                                        onClick={() => deleteRoadFromPayment(road.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default PaymentPage;
