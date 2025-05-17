import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://localhost:7020/api/Event';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
});

export const createEvent = createAsyncThunk('events/createEvent', async ({ eventData, token }, thunkAPI) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    });

    if (!res.ok) return thunkAPI.rejectWithValue(await res.text());
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventData, token }, thunkAPI) => {
  try {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    });

    console.log(eventData);
    console.log(res.json());
    if (!res.ok) return thunkAPI.rejectWithValue(await res.text());
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async ({ id, token }, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) return thunkAPI.rejectWithValue(await res.text());
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: null,
    error: null,
    message: null
  },
  reducers: {
    clearMessages: (state) => {
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.message = 'Event created successfully';
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.events[index] = action.payload;
        state.message = 'Event updated successfully';
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(e => e.id !== action.payload);
        state.message = 'Event deleted successfully';
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected'),
        (state, action) => {
          state.error = action.payload || 'Something went wrong';
        }
      );
  }
});

export const { clearMessages } = eventSlice.actions;
export default eventSlice.reducer;
