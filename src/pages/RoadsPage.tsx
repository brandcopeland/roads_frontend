import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import RoadCard from '../components/RoadCard';
import Breadcrumbs from '../components/Breadcrumbs';
// import defaultImage from '../assets/default.png';

import { useDispatch, useSelector } from "react-redux";
import { setRoads } from "../redux/threatsSlice";
import { RootState } from "../redux/store";

const RoadsPage: React.FC = () => {
    const dispatch = useDispatch();
    const roads = useSelector((state: RootState) => state.roads.roads);
    const query = useSelector((state: RootState) => state.roads.query);

    const fetchRoads = async (query: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/roads/?road_name=${query}`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных дорог');
            }
            const data = await response.json();
            dispatch(setRoads(data.roads));
        } catch (error) {
            console.error('Ошибка при загрузке данных дорог:', error);
        }
    };

    useEffect(() => {
        // Загружаем данные при изменении query
        fetchRoads(query);
    }, [query, dispatch]);

    return (
        <div className="wrapper">
            <Navbar />
            <Breadcrumbs path={`/roads/`} />
            <div className="container">
                <SearchBar onSearch={(query) => fetchRoads(query)} />
                <div className="cards-wrapper">
                    {roads.map((road, index) => (
                        <RoadCard key={index} road={road} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoadsPage;
