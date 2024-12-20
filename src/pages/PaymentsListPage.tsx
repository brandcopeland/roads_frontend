// src/pages/PaymentsListPage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchPayments } from '../redux/roadsSlice';
import Navbar from '../components/Navbar';
import '../components/PaymentsListPage.css';

const STATUS_CHOICES = [
    [1, 'Введён'],
    [2, 'В работе'],
    [3, 'Завершен'],
    [4, 'Отклонен'],
    [5, 'Удален'],
];

const PaymentsListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, payments } = useSelector((state: RootState) => state.roads);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch]);

    const getStatusLabel = (statusId: number) => {
        const status = STATUS_CHOICES.find(([id]) => id === statusId);
        return status ? status[1] : 'Не указано';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatTime = (timeString: string | null) => {
        if (!timeString) return 'Не указано';
        const [hours, minutes, seconds] = timeString.split(':');
        return `${hours}:${minutes}:${seconds.split('.')[0]}`;
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    const filteredPayments = payments.filter((payment) => {
        const paymentDate = new Date(payment.date_formation);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (
            (start ? paymentDate >= start : true) &&
            (end ? paymentDate <= end : true)
        );
    });

    if (loading) return <div>Загрузка данных...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="wrapper">
            <Navbar />
            <div className="container">
                <div className="card-header">
                    <h2>Мои оплаты</h2>
                    <div className="filter-container">
                        <label htmlFor="start-date-filter">с: </label>
                        <input
                            type="date"
                            id="start-date-filter"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                        <label htmlFor="end-date-filter">по: </label>
                        <input
                            type="date"
                            id="end-date-filter"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </div>
                </div>
                <div className="payments-cards-wrapper">
                    <div className="payments-cards">
                        <div className="payments-cards-header">
                            <span>Номер оплаты</span>
                            <span>Статус</span>
                            <span>Дата формирования</span>
                            <span>Время</span>
                            <span>Создатель</span>
                            <span>Дата поездки</span>
                            <span>Номер авто</span>
                            <span>Действия</span>
                        </div>
                        {filteredPayments.map((payment) => (
                            <div key={payment.id} className="payments-card">
                                <span>{payment.id}</span>
                                <span>{getStatusLabel(payment.status)}</span>
                                <span>{payment.date_formation ? formatDate(payment.date_formation) : 'Не указано'}</span>
                                <span>{payment.time ? formatTime(payment.time) : 'Не указано'}</span>
                                <span>{payment.owner}</span>
                                <span>{payment.date ?? 'Не указано'}</span>
                                <span>{payment.number ?? 'Не указано'}</span>
                                <div className="actions">
                                    <button>Сформировать</button>
                                    <button>Удалить заявку</button>
                                    <button>Удалить М-М</button>
                                    <button>Редактировать М-М</button>
                                    <button>Сохранить заявку</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsListPage;
