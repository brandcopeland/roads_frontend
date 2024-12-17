import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import RoadCard from '../components/RoadCard';
import Breadcrumbs from '../components/Breadcrumbs';
import defaultImage from '../assets/default.png';

import { useDispatch, useSelector } from "react-redux";
import { setRoads, setDraftPaymentId, setRoadsAdded } from "../redux/threatsSlice";
import { RootState } from "../redux/store";

const RoadsPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roads = useSelector((state: RootState) => state.roads.roads);
    const roadsAdded = useSelector((state: RootState) => state.roads.roads_added); // Количество дорог в корзине
    const query = useSelector((state: RootState) => state.roads.query);

    const fetchRoads = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/roads/', {
                params: { road_name: query },
                withCredentials: true, // Передача credentials для отправки cookies
            });

            const data = response.data;
            console.log("roadsData", data);

            // Обработка полученных данных
            dispatch(setRoads(data.roads));
            dispatch(setDraftPaymentId(data.draft_payment_id));
            dispatch(setRoadsAdded(data.roads_count));
        } catch (error) {
            console.error('Ошибка при загрузке данных дорог:', error);
        }
    };

    useEffect(() => {
        // Загружаем данные при изменении query
        fetchRoads();
    }, [query]);

    useEffect(() => {
        console.log('useEffect активирован');
        // Загрузка данных о дорогах (мок данные)
        dispatch(setRoads([
            { id: 1, name: 'Дорога 1', speed: 60, image: defaultImage, value: true },
            { id: 2, name: 'Дорога 2', speed: 80, image: defaultImage, value: false },
        ]));
    }, []);

    return (
        <div className="wrapper">
            <Navbar />
            <Breadcrumbs path={`/roads/`} />
            <div className="container">
            <div className="search-cart-wrapper">
    {/* Контейнер для поиска */}
    <div className="search-bar-container">
        <SearchBar onSearch={fetchRoads} />
    </div>

    {/* Кнопка-корзина */}
    <div
        className={`cart-button ${roadsAdded > 0 ? '' : 'disabled'}`}
        onClick={() => roadsAdded > 0 && navigate('/payment')}
    >
        <span>Корзина</span>
        <span className="cart-count">{roadsAdded}</span>
    </div>
</div>

                <div className="cards-wrapper">
                    {roads.map((road, index) => (
                        <RoadCard
                            key={index}
                            road={road}
                            onAdd={fetchRoads}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoadsPage;
