import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейсы
interface Road {
    id: number;
    name: string;
    speed: number;
    image: string;
    value?: boolean;
}

interface RoadsState {
    roads: Road[];
    query: string; // Для сохранения текущего поискового запроса
}

// Начальное состояние
const initialState: RoadsState = {
    roads: [],
    query: "",
};

// Slice
const roadsSlice = createSlice({
    name: "roads",
    initialState,
    reducers: {
        setRoads(state, action: PayloadAction<Road[]>) {
            state.roads = action.payload;
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
    },
});

// Экспортируем actions и reducer
export const { setRoads, setQuery } = roadsSlice.actions;
export default roadsSlice.reducer;
