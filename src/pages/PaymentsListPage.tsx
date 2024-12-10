// src/pages/PaymentsListPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../components/PaymentsListPage.css'; // Импорт стилей

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
                credentials: 'include', // Чтобы передать cookie с session_id
            });
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных оплат');
            }
            const data = await response.json();
            
            setPayments(data);
        } catch (error) {
            console.error('Ошибка при загрузке данных оплат:', error);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div className="wrapper">
            <Navbar />
            <div className="container">
                <h2>Мои оплаты</h2>
                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>Номер заявки</th>
                            {/* <th>Владелец</th>
                            <th>Модератор</th> */}
                            <th>Статус</th>
                            {/* <th>Дата создания</th> */}
                            {/* <th>Дата формирования</th>
                            <th>Дата завершения</th> */}
                            <th>Дата</th>
                            <th>Номер</th>
                            {/* <th>Время с транспондера</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                {/* <td>{payment.owner}</td>
                                <td>{payment.moderator ?? 'Не назначен'}</td> */}
                                <td>{payment.status ?? 'Не указано'}</td>
                                {/* <td>{payment.date_created ?? 'Не указано'}</td> */}
                                {/* <td>{payment.date_formation ?? 'Не указано'}</td>
                                <td>{payment.date_complete ?? 'Не завершено'}</td> */}
                                <td>{payment.date ?? 'Не указано'}</td>
                                <td>{payment.number ?? 'Не указано'}</td>
                                {/* <td>{payment.time ?? 'Не указано'}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsListPage;
