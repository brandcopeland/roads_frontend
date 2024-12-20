// src/redux/roadsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Road {
    id: number;
    name: string;
    speed: number;
    image: string;
    description:string;
    start:number;
    end:number;
    value?: boolean;
}

interface Payment {
    id: number;
    date: string;
    number: string;
    date_formation: any;
    status:number;
    owner:number;
    time:any;
    roads: {
        id: number;
        name: string;
        speed: number;
        image: string;
        day_night: boolean;
    }[];
}

interface RoadsState {
    road: Road | null;
    roads: Road[];
    payments: Payment[]; // Поле для платежей
    payment: Payment | null;
    query: string;
    draft_payment_id: string | null;
    roads_added: number;
    loading: boolean;
    error: string | null;
}

const initialState: RoadsState = {
    road: null,
    roads: [],
    payments: [], // Инициализация нового поля
    query: '',
    draft_payment_id: null,
    roads_added: 0,
    loading: false,
    error: null,
    payment: null,
};


// Thunk для загрузки дорог
export const fetchRoads = createAsyncThunk(
    'roads/fetchRoads',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/roads/', {
                params: { road_name: query },
                withCredentials: true,
            });
            console.log("Roads",response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки дорог');
        }
    }
);

// Thunk для загрузки данных о дороге
export const fetchRoad = createAsyncThunk(
    'roads/fetchRoad',
    async (roadId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/roads/${roadId}/`, {
                withCredentials: true,
            });
            console.log("Road",response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки данных дороги');
        }
    }
);


// Thunk для загрузки списка платежей
export const fetchPayments = createAsyncThunk(
    'roads/fetchPayments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/payments/', {
                withCredentials: true,
            });
            console.log("Payments",response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки списка платежей');
        }
    }
);

// Thunk для получения данных платежа
export const fetchPayment = createAsyncThunk(
    'roads/fetchPayment',
    async (draftPaymentId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get<Payment>(
                `http://localhost:8000/api/payments/${draftPaymentId}/`,
                { withCredentials: true }
            );
            console.log("Payment",response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки платежа');
        }
    }
);

// Thunk для добавления дороги в оплату
export const addRoadToPayment = createAsyncThunk(
    'roads/addRoadToPayment',
    async (roadId: number, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/roads/${roadId}/add_to_payment/`,
                {},
                { withCredentials: true }
            );
            console.log('Дорога успешно добавлена в оплату!', response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка добавления дороги в оплату');
        }
    }
);



// Thunk для обновления статуса день/ночь
export const updateDayNightStatus = createAsyncThunk(
    'roads/updateDayNightStatus',
    async ({ draftPaymentId, roadId, currentStatus }: { draftPaymentId: string; roadId: number; currentStatus: boolean }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/payments/${draftPaymentId}/update_road/${roadId}/`,
                { day_night: !currentStatus },
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка обновления статуса день/ночь');
        }
    }
);

// Thunk для удаления дороги из оплаты
export const deleteRoadFromPayment = createAsyncThunk(
    'roads/deleteRoadFromPayment',
    async ({ draftPaymentId, roadId }: { draftPaymentId: string; roadId: number }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/payments/${draftPaymentId}/delete_road/${roadId}/`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка удаления дороги из оплаты');
        }
    }
);

const roadsSlice = createSlice({
    name: 'roads',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchRoads
            .addCase(fetchRoads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoads.fulfilled, (state, action) => {
                state.loading = false;
                state.roads = action.payload.roads;
                state.draft_payment_id = action.payload.draft_payment_id;
                state.roads_added = action.payload.roads_count;
            })
            .addCase(fetchRoads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            //fetchRoad
            .addCase(fetchRoad.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoad.fulfilled, (state, action) => {
                state.loading = false;
                state.road = action.payload; // Сохраняем конкретную дорогу
            })
            .addCase(fetchRoad.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // fetchPayment
            .addCase(fetchPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
            })
            .addCase(fetchPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // fetchPayments
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // updateDayNightStatus
            .addCase(updateDayNightStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDayNightStatus.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateDayNightStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // AddRoadtoPayment
            .addCase(addRoadToPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRoadToPayment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addRoadToPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // deleteRoadFromPayment
            .addCase(deleteRoadFromPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRoadFromPayment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteRoadFromPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setQuery } = roadsSlice.actions;
export default roadsSlice.reducer;
