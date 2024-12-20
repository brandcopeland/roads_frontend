import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RoadCard from "../components/RoadCard";
import Breadcrumbs from "../components/Breadcrumbs";

import { fetchRoads, setQuery } from "../redux/roadsSlice";
import { RootState, AppDispatch } from "../redux/store";

const RoadsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { roads, query, roads_added, loading, error } = useSelector((state: RootState) => state.roads);

    const handleSearch = (searchQuery: string) => {
        dispatch(setQuery(searchQuery));
        dispatch(fetchRoads(searchQuery)); 
    };

    useEffect(() => {
        dispatch(fetchRoads(query));
    }, [dispatch, query]);

    return (
        <div className="wrapper">
            <Navbar />
            <Breadcrumbs path={`/roads/`} />
            <div className="container">
                <div className="search-cart-wrapper">
                    {/* Контейнер для поиска */}
                    <div className="search-bar-container">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    {/* Кнопка-корзина */}
                    <div
                        className={`cart-button ${roads_added > 0 ? "" : "disabled"}`}
                        onClick={() => roads_added > 0 && navigate("/payment")}
                    >
                        <span>Корзина</span>
                        <span className="cart-count">{roads_added}</span>
                    </div>
                </div>

                {/* Уведомления о загрузке и ошибках */}
                {loading && <p>Загрузка дорог...</p>}
                {error && <p className="error-message">Ошибка: {error}</p>}

                <div className="cards-wrapper">
                    {roads.map((road) => (
                        <RoadCard key={road.id} road={road} onAdd={() => handleSearch(query)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoadsPage;
