import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  AppDispatch } from '../redux/store';
import { addRoadToPayment } from '../redux/roadsSlice';

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
    
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToPayment = async () => {
        try {
            await dispatch(addRoadToPayment(road.id)).unwrap();
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
