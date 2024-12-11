import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface RoadCardProps {
    road: {
        id: number;
        name: string;
        speed: number;
        image: string;
        value?: boolean;
    };
}

const RoadCard: React.FC<RoadCardProps> = ({ road }) => {
    const handleAddToPayment = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/roads/${road.id}/add_to_payment/`,
                {}, // Тело запроса пустое
                {
                    withCredentials: true, // Включает отправку cookies
                }
            );
            console.log('Добавлено в оплату:', response.data);
            console.log('Дорога успешно добавлена в оплату!');
        } catch (error) {
            console.error('Ошибка при добавлении дороги:', error);
            console.log('Не удалось добавить дорогу в оплату.');
        }
    };

    return (
        <div className="card">
            <img src={road.image} alt={road.name} className="road-preview" />
            <div className="card-body">
                <h5 className="card-title">{road.name}</h5>
                <p className="card-text">Разрешенная скорость: {road.speed} км/ч</p>
                {/* Если значение "value" присутствует */}
                {/* {road.value !== undefined && (
                    <div className="form-group">
                        <label>Ночь</label>
                        <input className="form-control" value={road.value ? "Да" : "Нет"} disabled />
                    </div>
                )} */}
                <Link to={`/roads/${road.id}`} className="btn btn-primary">
                    Открыть
                </Link>
                <button onClick={handleAddToPayment} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default RoadCard;
