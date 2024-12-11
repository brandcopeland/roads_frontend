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
    draft_payment_id: any;
    roads_added:any;
}

// Начальное состояние
const initialState: RoadsState = {
    roads: [],
    query: "",
    draft_payment_id:"",
    roads_added:0,
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
        setDraftPaymentId(state, action: PayloadAction<string>) {
            state.draft_payment_id = action.payload;
        },
        setRoadsAdded(state, action: PayloadAction<string>) {
            state.roads_added = action.payload;
        },
    },
});

// Экспортируем actions и reducer
export const { setRoads, setQuery, setDraftPaymentId, setRoadsAdded } = roadsSlice.actions;
export default roadsSlice.reducer;
