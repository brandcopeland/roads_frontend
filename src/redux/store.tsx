import { configureStore } from '@reduxjs/toolkit';
import roadsReducer from './threatsSlice';

const store = configureStore({
    reducer: {
        roads: roadsReducer, // Добавляем редьюсер дорог
    },
});

// Типы для использования с TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;