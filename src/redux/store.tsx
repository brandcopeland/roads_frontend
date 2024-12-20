import { configureStore } from '@reduxjs/toolkit';
import roadsReducer from './roadsSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        roads: roadsReducer,
        auth: authReducer,
    },
});

//Типы для работы с TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
