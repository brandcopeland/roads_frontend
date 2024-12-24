import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
import '../components/PaymentPageOne.css';

const PaymentPageOne: React.FC = () => {
    const { paymentId } = useParams<{ paymentId: string }>(); // Получаем paymentId из маршрута
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { payment, loading, error } = useSelector((state: RootState) => state.roads);
    
    const [date, setDate] = useState<string>(''); // Локальное состояние для даты
    const [number, setNumber] = useState<string>(''); // Локальное состояние для номера

    useEffect(() => {
        if (paymentId) {
            dispatch(fetchPayment(paymentId)).unwrap().then((data: any) => {
                setDate(data.date || '');
                setNumber(data.number || '');
            });
        }
    }, [dispatch, paymentId]);

    const handleDayNightToggle = (roadId: number, currentStatus: boolean) => {
        if (paymentId) {
            dispatch(updateDayNightStatus({ draftPaymentId: paymentId, roadId, currentStatus }))
            .unwrap()
                .then(() => {
                    dispatch(fetchPayment(paymentId));
                })
        }
    };

    const handleDeleteRoad = (roadId: number) => {
        if (paymentId) {
            dispatch(deleteRoadFromPayment({ draftPaymentId: paymentId, roadId }))
                .unwrap()
                .then(() => {
                    dispatch(fetchPayment(paymentId));
                })
                .catch((error) => {
                    console.error('Ошибка при удалении дороги:', error);
                });
        }
    };

    const handleUpdatePayment = (PaymentId: number) => {
        dispatch(updatePayment(PaymentId))
            .unwrap()
            .then(() => {
                navigate('/payments-list');
            })
            .catch((error) => {
                console.error('Ошибка при обновлении оплаты:', error);
            });
    };

    const handleDeletePayment = (PaymentId: number) => {
        dispatch(deletePayment(PaymentId))
        .unwrap()
            .then(() => {
                navigate('/payments-list');
            })
    };

    const handleSavePayment = () => {
        if (paymentId) {
            dispatch(savePayment({ id: parseInt(paymentId, 10), date, number }))
                .unwrap()
                .then(() => {
                    console.log('Сохранение выполнено');
                })
                .catch((error) => {
                    console.error('Ошибка при сохранении:', error);
                });
        }
    };

    if (loading) return <div>Загрузка данных...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return payment ? (
        <div className="paymentone-wrapper">
            <Navbar />
            <main className="paymentone-container">
                <div className="paymentone-header">
                    <h3 className="paymentone-title">Оплата проезда</h3>
                </div>

                <div className="paymentone-details">
                <label>
                        <strong>Дата проезда:</strong>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="paymentone-input"
                        />
                    </label>
                    <label>
                        <strong>Номер машины:</strong>
                        <input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="paymentone-input"
                        />
                    </label>
                    <div className="paymentone-buttons">
                        <button
                            className="paymentone-delete-btn"
                            onClick={() => handleUpdatePayment(payment.id)}
                        >
                            Сформировать
                        </button>
                        <button
                            className="paymentone-delete-btn"
                            onClick={() => handleDeletePayment(payment.id)}
                        >
                            Удалить заявку
                        </button>
                        <button
                            className="paymentone-delete-btn"
                            onClick={() => handleSavePayment()}
                        >
                            Сохранить заявку
                        </button>
                    </div>
                </div>

                <div className="paymentone-cards">
                    {payment.roads.map((road) => (
                        <div key={road.id} className="paymentone-card">
                            <div className="paymentone-card-header">
                                <h4>{road.name}</h4>
                            </div>
                            <div className="paymentone-card-body">
                                <div className="paymentone-card-info">
                                    <p><strong>Скорость:</strong> {road.speed} км/ч</p>
                                    <img src={road.image} alt={road.name} className="paymentone-road-img" />
                                    <p>
                                        <strong>День/Ночь: </strong>
                                        <button
                                            className="paymentone-toggle-btn"
                                            onClick={() => handleDayNightToggle(road.id, road.day_night)}
                                        >
                                            {road.day_night ? 'День' : 'Ночь'}
                                        </button>
                                    </p>
                                    <button
                                        className="paymentone-delete-btn"
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

export default PaymentPageOne;
