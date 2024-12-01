import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../redux/threatsSlice";
import { RootState } from "../redux/store";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const dispatch = useDispatch();
    const query = useSelector((state: RootState) => state.roads.query);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query); // Передаем query из глобального состояния
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar flex gap-4 mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => dispatch(setQuery(e.target.value))} // Сохраняем значение в Redux
                placeholder="Введите название дороги"
                className="form-control w-full"
            />
            <button type="submit" className="btn btn-primary">Поиск</button>
        </form>
    );
};

export default SearchBar;
