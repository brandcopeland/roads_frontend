// src/pages/RoadsPage.tsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import RoadCard from '../components/RoadCard';
import Breadcrumbs from '../components/Breadcrumbs';

import defaultImage from '../assets/default.png';

// Интерфейс для описания типа дороги
interface Road {
    id: number;
    name: string;
    speed: number;
    image: string;
    value?: boolean; // Опциональное поле
}

const RoadsPage: React.FC = () => {
    const [roads, setRoads] = useState<Road[]>([]);
    // const [filteredRoads, setFilteredRoads] = useState<Road[]>([]);

    const fetchRoads = async (query: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/roads/?road_name=${query}`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных дорог');
            }
            const data = await response.json();
            console.log(data)
            setRoads(data.roads);
            // setFilteredRoads(data.roads);
        } catch (error) {
            console.error('Ошибка при загрузке данных дорог:', error);
        }
    };

    useEffect(() => {
        console.log('useEffect активирован')
        // Загрузка данных о дорогах (мок данные)
        setRoads([
            { id: 1, name: 'Дорога 1', speed: 60, image: defaultImage, value: true },
            { id: 2, name: 'Дорога 2', speed: 80, image: defaultImage, value: false },
        ]);
    }, []);

    useEffect(() => {
        fetchRoads('');
    }, []);

    const handleSearch = (query: string) => {
        fetchRoads(query);
    };

    return (
        <div className="wrapper">
            <Navbar />
            <Breadcrumbs path={`/roads/`}/>
            <div className="container">
                <SearchBar onSearch={handleSearch} />
                <div className="cards-wrapper">
                    {roads.map((road) => (
                        <RoadCard key={road.id} road={road} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoadsPage;
