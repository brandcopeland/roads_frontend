import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
    updatePayment,
    deletePayment,
    savePayment,
    fetchPayment,
    updateDayNightStatus,
    deleteRoadFromPayment,
} from '../redux/roadsSlice';
import Navbar from '../components/Navbar';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); 
    const { payment, draft_payment_id, loading, error } = useSelector((state: RootState) => state.roads);

    useEffect(() => {
        if (draft_payment_id) {
            dispatch(fetchPayment(draft_payment_id));
        }
    }, [dispatch, draft_payment_id]);

    const handleDayNightToggle = (roadId: number, currentStatus: boolean) => {
        if (draft_payment_id) {
            dispatch(updateDayNightStatus({ draftPaymentId: draft_payment_id, roadId, currentStatus }));
        }
    };

    const handleDeleteRoad = (roadId: number) => {
        if (draft_payment_id) {
            dispatch(deleteRoadFromPayment({ draftPaymentId: draft_payment_id, roadId }))
                .unwrap()
                .then(() => {
                    dispatch(fetchPayment(draft_payment_id));
                })
                .catch((error) => {
                    console.error('Ошибка при удалении дороги:', error);
                });
        }
    };

    const handleUpdatePayment = (PaymentId: number) => {
        dispatch(updatePayment(PaymentId))
            .unwrap() // Дожидаемся выполнения действия
            .then(() => {
                navigate('/payments-list'); // Перенаправление на PaymentsListPage
            })
            .catch((error) => {
                console.error('Ошибка при обновлении оплаты:', error);
            });
    };

    const handleDeletePayment = (PaymentId: number) => {
        dispatch(deletePayment(PaymentId));
    };

    const handleSavePayment = (PaymentId: number) => {
        dispatch(savePayment(PaymentId));
    };

    if (loading) return <div>Загрузка данных...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return payment ? (
        <div className="payment-wrapper">
            <Navbar />
            <main className="payment-container">
                <div className="payment-header">
                    <h3 className="payment-title">Оплата проезда</h3>
                </div>

                <div className="payment-details">
                    <p><strong>Дата проезда:</strong> {payment.date}</p>
                    <p><strong>Номер машины:</strong> {payment.number}</p>
                    <div className="payment-buttons">
                        <button
                            className="payment-delete-btn"
                            onClick={() => handleUpdatePayment(payment.id)}
                        >
                            Сформировать
                        </button>
                        <button
                            className="payment-delete-btn"
                            onClick={() => handleDeletePayment(payment.id)}
                        >
                            Удалить заявку
                        </button>
                        <button
                            className="payment-delete-btn"
                            onClick={() => handleSavePayment(payment.id)}
                        >
                            Сохранить заявку
                        </button>
                    </div>
                </div>

                <div className="payment-cards">
                    {payment.roads.map((road) => (
                        <div key={road.id} className="payment-card">
                            <div className="payment-card-header">
                                <h4>{road.name}</h4>
                            </div>
                            <div className="payment-card-body">
                                <div className="payment-card-info">
                                    <p><strong>Скорость:</strong> {road.speed} км/ч</p>
                                    <img src={road.image} alt={road.name} className="payment-road-img" />
                                    <p>
                                        <strong>День/Ночь: </strong>
                                        <button
                                            className="payment-toggle-btn"
                                            onClick={() => handleDayNightToggle(road.id, road.day_night)}
                                        >
                                            {road.day_night ? 'День' : 'Ночь'}
                                        </button>
                                    </p>
                                    <button
                                        className="payment-delete-btn"
                                        onClick={() => handleDeleteRoad(road.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    ) : (
        <div>Данные оплаты не найдены</div>
    );
};

export default PaymentPage;
