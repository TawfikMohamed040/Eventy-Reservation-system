import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'https://localhost:7020/api/Reservation';

export const createReservation = createAsyncThunk(
  'reservation/createReservation',
  async (reservationDto, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reservationDto),
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const fetchUserReservations = createAsyncThunk(
  'reservation/fetchUserReservations',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE}/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }

      return await response.json();
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

// Slice
const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservations: [],
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReservation.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createReservation.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
      state.reservations.push(action.payload.reservation);
    });
    builder.addCase(createReservation.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Failed to create reservation';
    });

    builder.addCase(fetchUserReservations.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserReservations.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.reservations = action.payload;
    });
    builder.addCase(fetchUserReservations.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Failed to fetch reservations';
    });
  },
});

export default reservationSlice.reducer;
