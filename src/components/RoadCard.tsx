import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface RoadCardProps {
    road: {
        id: number;
        name: string;
        speed: number;
        image: string;
    };
    canBeDeleted?: boolean;
    onDelete?: (roadId: number) => void;
    onAdd?: () => void; // Без аргументов
}

const RoadCard: React.FC<RoadCardProps> = ({ road, canBeDeleted, onDelete, onAdd }) => {
    const handleAddToPayment = async () => {
        try {
            await axios.post(
                `http://localhost:8000/api/roads/${road.id}/add_to_payment/`,
                {},
                { withCredentials: true }
            );
            console.log('Дорога успешно добавлена в оплату!');
            if (onAdd) {
                onAdd(); // Вызов функции onAdd
            }
        } catch (error) {
            console.error('Ошибка при добавлении дороги:', error);
        }
    };

    const handleDelete = () => {
        if (onDelete) onDelete(road.id);
    };

    return (
        <div className="card">
            <img src={road.image} alt={road.name} className="road-preview" />
            <div className="card-body">
                <h5 className="card-title">{road.name}</h5>
                <p className="card-text">Разрешенная скорость: {road.speed} км/ч</p>
                <Link to={`/roads/${road.id}`} className="btn btn-primary">
                    Открыть
                </Link>
                {canBeDeleted ? (
                    <button
                        onClick={handleDelete}
                        className="btn btn-danger"
                        style={{ marginLeft: '10px' }}
                    >
                        Удалить
                    </button>
                ) : (
                    <button
                        onClick={handleAddToPayment}
                        className="btn btn-secondary"
                        style={{ marginLeft: '10px' }}
                    >
                        Добавить
                    </button>
                )}
            </div>
        </div>
    );
};

export default RoadCard;
