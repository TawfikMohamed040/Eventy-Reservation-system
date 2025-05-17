import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegister = createAsyncThunk(
    'account/fetchRegister',
    async (userData, thunkAPI) => {
        try {
            const response = await fetch('https://localhost:7020/api/Account/Register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }

            return await response.json();
        } catch (err) {
            return thunkAPI.rejectWithValue({ message: err.message });
        }
    }
);


export const fetchLogin = createAsyncThunk(
    'account/fetchLogin',
    async (userData, thunkAPI) => {
        try {
            const response = await fetch('https://localhost:7020/api/Account/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }

            const result = await response.json();
            localStorage.setItem('token', result.token); // ✅ Save token
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Registration failed';
            })

            // Login
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Login failed';
            });
    },
});

export default accountSlice.reducer;
