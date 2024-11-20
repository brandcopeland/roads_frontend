// src/components/SearchBar.tsx
import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar flex gap-4 mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите название дороги"
                className="form-control w-full"
            />
            <button type="submit" className="btn btn-primary">Поиск</button>
        </form>
    );
};

export default SearchBar;
