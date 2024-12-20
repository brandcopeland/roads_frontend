// src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserRegistrationData {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

// Interface for user data update
interface UserUpdateData {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    is_staff: boolean;
    error: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: null,
    is_staff: false,
    error: null,
    loading: false,
};



// Thunk для логина
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/users/login/',
                { username, password },
                { withCredentials: true }
            );
            console.log("login", response.data)
            return response.data; // Предполагается, что API возвращает { username, is_staff }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
        }
    }
);

// Thunk для логаута
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post('http://localhost:8000/api/users/logout/', {}, { withCredentials: true });
            return;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при выходе.');
        }
    }
);

// Thunk для обновления данных пользователя
export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userData: UserUpdateData, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                'http://localhost:8000/api/users/1/update/', // Указываем API endpoint
                {
                    email: userData.email,
                    current_password: userData.currentPassword,
                    new_password: userData.newPassword,
                    confirm_password: userData.confirmPassword,
                },
                { withCredentials: true } // Добавляем сессию или токен, если требуется
            );
            return response.data; // Предполагается, что API возвращает обновленные данные пользователя
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка обновления данных');
        }
    }
);

// Thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: UserRegistrationData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/users/register/',
                userData
            );
            return response.data; // Предполагается, что API возвращает данные пользователя
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Registration
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.is_staff = action.payload.is_staff;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.is_staff = action.payload.is_staff;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.username = null;
                state.is_staff = false;
                state.error = null;
                state.loading = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default authSlice.reducer;
