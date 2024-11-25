// src/components/RoadCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

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
    return (
        <div className="card">
            <img src={road.image} alt={road.name} className="road-preview" />
            <div className="card-body">
                <h5 className="card-title">{road.name}</h5>
                <p className="card-text">Разрешенная скорость: {road.speed} км/ч</p>
                {road.value !== undefined && (
                    <div className="form-group">
                        <label>Ночь</label>
                        <input className="form-control" value={road.value ? "Да" : "Нет"} disabled />
                    </div>
                )}
                <Link to={`/roads/${road.id}`} className="btn btn-primary">Открыть</Link>
            </div>
        </div>
    );
};

export default RoadCard;
