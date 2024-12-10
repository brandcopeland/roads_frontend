import { configureStore } from '@reduxjs/toolkit';
import roadsReducer from './threatsSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        roads: roadsReducer, // Добавляем редьюсер дорог
        auth: authReducer,
    },
});

// Типы для использования с TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;