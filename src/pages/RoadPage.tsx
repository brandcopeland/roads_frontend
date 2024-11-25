// src/pages/RoadPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';

interface Road {
    id: number;
    name: string;
    description: string;
    speed: number;
    start: number;
    end: number;
    image: string;
}

const RoadPage: React.FC = () => {
    const { roadId } = useParams<{ roadId: string }>();
    const [road, setRoad] = useState<Road | null>(null);

    useEffect(() => {
        // Загрузка данных о дороге через API или использование мок-данных
        const mockRoad = {
            id: parseInt(roadId || '0', 10),
            name: 'Дорога 1',
            description: 'Описание этой дороги.',
            speed: 60,
            start: 10,
            end: 100,
            image:  '../src/assets/default.png',
            value: true,
        };

        setRoad(mockRoad);
    }, [roadId]);

    useEffect(() => {
        // Fetch road data by ID from API
        const fetchRoad = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/roads/${roadId}/`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных дороги');
                }
                const data = await response.json();
                console.log("RoadData", data)
                setRoad(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных дороги:', error);
            }
        };

        fetchRoad();
    }, [roadId]);

    if (!road) {
        return <div className="text-center my-5">Загрузка данных дороги...</div>;
    }

    return (
        <div className="wrapper">
            <Navbar />
            <Breadcrumbs path={`/roads/${road.name}`}/>
            <main className="container road-page">
                <div className="row">
                    <div className="col-6">
                        <img src={road.image} className="road-image" alt={road.name} />
                    </div>
                    <div className="col-6 d-flex flex-md-column gap-md-3">
                        <h1>{road.name}</h1>
                        <p>Описание: {road.description}</p>
                        <p>Разрешенная скорость: {road.speed} км/ч</p>
                        <p>
                            Участок дороги (км): с{' '}
                            <input type="text" value={road.start} disabled className="text-center w-16" /> по{' '}
                            <input type="text" value={road.end} disabled className="text-center w-16" />
                        </p>
                        <a href="/roads" className="btn btn-primary my-4 w-25 return-btn">Домой</a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RoadPage;
