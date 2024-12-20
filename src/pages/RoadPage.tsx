// src/pages/RoadPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { fetchRoad } from '../redux/roadsSlice';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';

const RoadPage: React.FC = () => {
    const { roadId } = useParams<{ roadId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, road } = useSelector((state: RootState) => state.roads); // Заменили на road вместо roads

    useEffect(() => {
        if (roadId) {
            dispatch(fetchRoad(roadId)); // Запрашиваем данные для конкретной дороги
        }
    }, [dispatch, roadId]);

    if (loading) return <div className="text-center my-5">Загрузка данных дороги...</div>;
    if (error) return <div className="text-center my-5">Ошибка: {error}</div>;
    if (!road) return <div className="text-center my-5">Дорога не найдена</div>;

    return (
        <div className="wrapper">
            <Navbar />
            <Breadcrumbs path={`/roads/${road.name}`} />
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
                        <Link to="/roads" className="btn btn-primary my-4 w-25 return-btn">
                            Домой
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RoadPage;
