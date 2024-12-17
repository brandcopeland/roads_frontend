import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../components/PaymentsListPage.css'; // Import styles

const STATUS_CHOICES = [
    [1, 'Введён'],
    [2, 'В работе'],
    [3, 'Завершен'],
    [4, 'Отклонен'],
    [5, 'Удален']
];

const PaymentsListPage: React.FC = () => {
    const [payments, setPayments] = useState<any[]>([
        {
            "id": 9,
            "owner": "user1",
            "moderator": null,
            "status": 2,
            "date_created": "2024-09-18T16:56:13.683399+03:00",
            "date_formation": "2024-10-16T08:32:44.334603+03:00",
            "date_complete": null,
            "date": "2024-09-18",
            "number": "A777AA777",
            "time": null
        },
        {
            "id": 23,
            "owner": "user1",
            "moderator": "root1",
            "status": 4,
            "date_created": "2024-06-20T14:59:56.833015+03:00",
            "date_formation": "2024-09-17T08:20:06.863344+03:00",
            "date_complete": "2024-11-29T14:07:07.426692+03:00",
            "date": "2024-11-06",
            "number": "A777AA777",
            "time": null
        },
        {
            "id": 17,
            "owner": "user1",
            "moderator": "root8",
            "status": 4,
            "date_created": "2024-06-22T07:26:19.963032+03:00",
            "date_formation": "2024-07-23T05:57:48.354355+03:00",
            "date_complete": "2024-10-07T04:44:22.064786+03:00",
            "date": "2024-11-09",
            "number": "A777AA777",
            "time": null
        },
        {
            "id": 24,
            "owner": "user1",
            "moderator": "root6",
            "status": 3,
            "date_created": "2024-04-15T22:38:50.428100+03:00",
            "date_formation": "2024-06-16T09:33:03.865291+03:00",
            "date_complete": "2024-09-12T10:03:38.097886+03:00",
            "date": "2024-09-25",
            "number": "A777AA777",
            "time": "18:34:54.356452"
        }
    ]);

    const fetchPayments = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/payments/', {
                method: 'GET',
                credentials: 'include', // To send session_id cookie
            });
            if (!response.ok) {
                throw new Error('Error fetching payments data');
            }
            const data = await response.json();
            setPayments(data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // Function to convert status ID to the corresponding label
    const getStatusLabel = (statusId: number) => {
        const status = STATUS_CHOICES.find(([id]) => id === statusId);
        return status ? status[1] : 'Не указано';
    };

    // Function to format the date into a readable format
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

    // Function to format time
    const formatTime = (timeString: string | null) => {
        if (!timeString) return 'Не указано';
        const [hours, minutes, seconds] = timeString.split(':');
        return `${hours}:${minutes}:${seconds.split('.')[0]}`;
    };

    return (
        <div className="wrapper">
            <Navbar />
            <div className="container">
                <div className="card-header">
                    <h2>Мои оплаты</h2>
                </div>
                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>Номер оплаты</th>
                            <th>Статус оплаты</th>
                            <th>Дата формирования оплаты</th>
                            <th>Время с транспондера</th>
                            <th>Создатель</th>
                            <th>Дата поездки</th>
                            <th>Номер автомобиля</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{getStatusLabel(payment.status)}</td>
                                <td>{payment.date_formation ? formatDate(payment.date_formation) : 'Не указано'}</td>
                                <td>{formatTime(payment.time)}</td>
                                <td>{payment.owner}</td>
                                <td>{payment.date ?? 'Не указано'}</td>
                                <td>{payment.number ?? 'Не указано'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsListPage;
